const jwt = require("jsonwebtoken")
require('dotenv').config()


function auth(req, res, next) {
    console.log(req.headers)

    let token = req.headers.authorization
    if(!token){
        res.status(400).send({"msg":"Please Login"})
    }
    if (token.startsWith("Bearer")) {
        token = token.split(" ")[1]
        //   console.log(token,"**********")
        const decoded = jwt.verify(token, process.env.SECREAT_KEY)
        console.log(decoded)
        req.user = decoded
        console.log(req.user.ID)

        next()
    } else {
        res.status(400).send({ "msg": "Not authorized" })
    }
}

function admin(req,res,next){

    if(req.user.role == "admin"){
        next()
    }else{
        res.status(400).send({"msg":"Access Denied"})
    }
}





module.exports = { auth,admin }