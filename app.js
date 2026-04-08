const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const dbConn = require('./config/db')
const association = require('./models/associations')

const taskRouter = require('./routes/taskRoute')
const userRouter = require('./routes/userRoute')
const assignTaskRouter = require('./routes/assignTaskRoute')



const port = process.env.PORT 
const app = express()

app.use(express.json())
app.use(cors())

// app.use('/',(req,res)=>{
//     res.send("I am Server ")
// })

app.use('/tasks', taskRouter)

app.use('/user',userRouter)

app.use('/assignTask',assignTaskRouter)

app.use('/upload',express.static(path.join(__dirname,'upload')))


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})