const UserModel  = require('../model/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')


dotenv.config()

const regController = async(req,res)=>{
    try{
        const hash = await bcrypt.hash(req.body.password,parseInt(process.env.SALT))
        const User = new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        // console.log('hello')
        await User.save()
        res.status(201).send("User Created...")
    }
    catch(er){
        // console.log("Problem In regestration controller...: ",er.message)
        res.status(500).send("something is error in catch")
    }
}

module.exports  = regController;