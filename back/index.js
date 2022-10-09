const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const regRouter = require('./routes/regRouter')



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

mongoose.connect('mongodb://localhost:27017/MERN_Todo').then(()=>{
    console.log("Mongodb Connected")
}).catch(err=>console.log("Monodb problem"))


// app.use('/login',loginRotuer)
app.use('/reg',regRouter)
// app.use('/tasks',verifyToken,tasksRouter)




app.listen(8800,()=>{
    console.log("Server is Running...")
})