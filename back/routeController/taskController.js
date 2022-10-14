const UserModel = require("../model/User");

const taskController = async(req,res)=>{
    const id = req.ID;
    // console.log(id)
    try{
        const user = await UserModel.findOne({_id:id})
        if(!user){
            return res.status(500).send("User Not Found on get task")
        }
        const Tasks = user.tasks;
        res.status(200).send(Tasks)
    }
    catch(er){
        
        res.status(500).send("Something is error")
    }
}

module.exports = taskController