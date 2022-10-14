const UserModel = require("../model/User");


const editTaskController = async(req,res)=>{
    
    // console.log("editing: ",req.body)
    const id = req.ID;
    try{
        const user = await UserModel.findOne({_id:id})
        if(!user){
            return res.status(500).send("user not foudn at edit task")
        }
        const Tasks = [...user.tasks]

        Tasks[req.params.id] = {...req.body}

        await UserModel.updateOne({_id:id},{
            $set:{
                tasks:[...Tasks]
            }
        })

        res.status(200).json({message:"Edit Done"})
    }
    catch(er){
        // console.log("error in edit tasks");
        res.status(500).send("Edit not possible")
    }
}

module.exports = editTaskController;