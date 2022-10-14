const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const regRouter = require('./routes/regRouter')
const loginRotuer = require('./routes/loginRouter')
const logutRotuer = require('./routes/logoutRouter')
const verification = require('./util/verification')
const tasksRouter = require('./routes/tasksRouter')
const validRouter = require('./routes/validRouter')



const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({credentials:true, origin:"http://localhost:3000"}))

mongoose.connect('mongodb://localhost:27017/MERN_Todo').then(()=>{
    console.log("Mongodb Connected")
}).catch(err=>console.log("Monodb problem"))


app.use('/login',loginRotuer)
app.use('/reg',regRouter)
app.use('/logout',logutRotuer)
app.use('/tasks',tasksRouter)
app.use('/isValid',validRouter)




app.listen(8800,()=>{
    console.log("Server is Running...")
})