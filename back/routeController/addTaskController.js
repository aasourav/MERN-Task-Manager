const UserModel = require("../model/User");

const addTaskController = async(req,res)=>{
    const id = req.ID;
    try{
        const user = await UserModel.findOne({_id:id})
        if(!user){
            return res.status(401).send("User not found at add taks")
        }
        const Tasks = [...user.tasks]
        Tasks.push(req.body)
        await UserModel.updateOne({_id:id},{
            $set:{
                tasks:[...Tasks]
            }
        },(err)=>{
            console.log("error in add tasks")
            res.status(401).send("Add task not possible")
        })

        res.status(200).json({message:"Add Successfull"})
    }
    catch(er){
        console.log("error in add task")
        res.status(401).send("add task not possible")
    }
}

module.exports = addTaskController