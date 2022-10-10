const UserModel  = require('../model/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const loginController = async(req,res)=>{
    try{
        const exist = await UserModel.findOne({username:req.body.username})
        if(exist){
            const passCheck = await bcrypt.compare(req.body.password,exist.password)
            if(!passCheck){
                return res.status(401).send("user or pass is wrong") 
            }


            // creating token using jwt
            const token = jwt.sign({
                id:exist._id,
                username:exist.username,
                email:exist.email
            },process.env.JWT,{
                expiresIn:'30s'
            })
            
            // creating cookies
            res.cookie(String(exist._id),token,{
                path:'/',
                expires:new Date(Date.now()+1000*60),
                httpOnly:true,
                smaSite:'lax'
            })

            res.status(200).json({data:exist,token:token})
        }
        else{
            return res.status(404).send("User Not found")
        }
    }
    catch(er){
        console.log("Problem In login controller...: ",er)
    }
}

module.exports  = loginController;