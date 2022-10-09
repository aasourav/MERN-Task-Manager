const UserModel = require("../model/User");


const deleteTaskController = async(req,res) =>{
    const id = req.ID;
    try{
        const user = await UserModel.findOne({_id:id})
        if(!user){
            return res.status(401).send("user not found on delete tasks")
        }
        
        const Tasks  = user.tasks.filter((_,index) => index!=req.params.id);

        await UserModel.updateOne({_id:id},{
            $set:{
                tasks: [...Tasks]
            }
        },(err)=>{
            console.log("error in Deleteing tasks")
            res.status(401).send("Delete Not Possible")
        })

        res.status(200).json({message:"Delete done"})

    }
    catch(er){
        console.log("something error in delste tasks")
    }
    
}

module.exports = deleteTaskController;