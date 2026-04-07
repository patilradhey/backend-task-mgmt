const bcryptjs = require('bcryptjs')
const User = require('../models/userModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')

async function register(req, res) {

    const { name, email, password, contactNumber } = req.body
    try {

        regUser = await User.findOne({ where: { email: email } })
        console.log(regUser)

        if (regUser) {
            res.status(400).send({ msg: "email already registered" })
        } else {
            const salt = await bcryptjs.genSalt(8)
            const hashPassword = await bcryptjs.hash(password, salt)

            newUser = await User.create({
                name: name,
                email: email,
                password: hashPassword,
                contactNumber: contactNumber
            })
            res.status(200).send({ success: true, msg: "User registered successfully" })
        }

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

async function login(req, res) {
    const { email, password } = req.body
    try {
        const alreadyUser = await User.findOne({ where: { email: email } })
        console.log(alreadyUser)
        if (!alreadyUser) {
            res.status(400).send({ msg: "User not found" })
        } else {
            checkPassword = await bcryptjs.compare(password, alreadyUser.password)
            if (!checkPassword) {
                res.status(400).send({ msg: "Invalid Password" })
            } else {
                const ID = alreadyUser.id
                const role = alreadyUser.role
                const genToken = jwt.sign({ ID: ID, role: role }, process.env.SECREAT_KEY, { expiresIn: "7d" })
                res.status(202).send({ msg: "Login Successfull", token: genToken })
            }
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

async function getUserInfo(req, res) {
    try {
        const ID = req.user.ID
        const loggedUserInfo = await User.findByPk(ID, {
            attributes: {
                exclude: ["password"]
            }
        })
        res.status(200).send({ user: loggedUserInfo, success: true })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}



async function getAllUsers(req, res) {
    try {
        const allUsers = await User.findAll({ attributes: ['name'] })
        res.status(200).send({ success: true, users: allUsers })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

async function deleteUser(req, res) {
    try {
        const { user_ID  } = req.params
        await User.destroy({ where: { id:user_ID } })
        res.status(200).send({ success: true, msg: "User deleted successfully" })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

async function updateUser(req, res) {
    const user_ID = req.params.user_ID
    const user = await User.findByPk(user_ID)

    if (!user) {
        res.status(400).send({ msg: "user not found" })
    } else {
        const hashPassword = req.body.password ? await bcryptjs.hash(req.body.password, await bcryptjs.genSalt(8)) : user.password
        user.name = req.body.name || user.name
        user.password = hashPassword
        user.contactNumber = req.body.contactNumber || user.contactNumber
        user.updateBy = req.user.ID

        await user.save()
        res.status(200).send({ msg: "User updated successfully", success: true })
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    deleteUser,
    updateUser
}

// Test body for /register:
// {
//     "name": "John Doe",
//     "email": "john@example.com",
//     "password": "123456",
//     "contactNumber": "9876543210"
// }

// {
//     "name": "Elon Musk",
//     "email": "elon@example.com",
//     "password": "tesla",
//     "contactNumber": "9876543210"
// }

// {
//     "name": "admin",
//     "email": "admin@example.com",
//     "password": "admin",
//     "contactNumber": "9876543210"
// }