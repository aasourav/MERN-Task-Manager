const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const { validate } = require('../model/User')
dotenv.config()


const verifyUserCotroller = async(req,res)=>{
    const cookies = req.headers.cookie
    if(!cookies){
        return res.status(500).send("Cookies not found in verification")
    }
    try{
        const Token = cookies.split('=')[1]
        const validateToken = jwt.verify(Token,process.env.JWT)

        if(!validateToken){
            return res.status(500).send("Token not valid in verification")
        }
        // req.ID = validateToken.id;
        res.status(200).send({id:validateToken.id,username:validateToken.username})
    }
    catch(er){
        // console.log("Verification Unsuccessful...")
        return res.status(500).send("User Not Verified")
    }
}

module.exports = verifyUserCotroller;