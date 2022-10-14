const UserModel = require("../model/User");


const deleteTaskController = async(req,res) =>{
    const id = req.ID;
    try{
        const user = await UserModel.findOne({_id:id})
        if(!user){
            return res.status(500).send("user not found on delete tasks")
        }
        
        const Tasks  = user.tasks.filter((_,index) => index!=req.params.id);

        await UserModel.updateOne({_id:id},{
            $set:{
                tasks: [...Tasks]
            }
        })

        res.status(200).json({message:"Delete done"})

    }
    catch(er){
        res.status(500).send("Error")
        // console.log("something error in delste tasks")
    }
    
}

module.exports = deleteTaskController;