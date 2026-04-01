const express = require('express')
require('dotenv').config()
const cors = require('cors')

const dbConn = require('./config/db')

const taskRouter = require('./routes/taskRoute')
const userRouter = require('./routes/userRoute')



const port = process.env.PORT 
const app = express()

app.use(express.json())
app.use(cors())

// app.use('/',(req,res)=>{
//     res.send("I am Server ")
// })

app.use('/tasks', taskRouter)

app.use('/user',userRouter)


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})