import axios from "axios";

import AddModal from "./AddModal";
import TaskCard from "./TaskCard";


axios.defaults.withCredentials = true;

export default function TasksLogTitle({username,modal,handleModal,handleAddChange,handleAddSubmit,data,tasks,handleEditSubmit,edit,tasksEdit,ID,editChange,handleComplete,handleDelete,handleToggleEdit}){
    return(
        <div>
            <div className="
                flex justify-center
                text-xl 
                mt-10
                mb-3
            ">
                <h3 className="
                    w-1/2 font-normal text-3xl
                ">Hello 
                <strong className="text-blue-700 ml-2
                    text-3xl
                "
                >{username},</strong> Here is your incomplete tasks. Let's complete one by one...</h3>
            </div>
            
            <div  className="mt-8 w-1/2 flex flex-col
                items-center ml-16
            ">
                <button disabled={modal} className="
                    w-40 ml-8
                    border-2 rounded-md px-5 py-1
                    bg-blue-600 text-white
                    font-medium active:bg-white
                    active:text-sky-700 
                " onClick={handleModal} name='addTask'>Add New Task</button>

               {
                modal? 
                <AddModal 
                    handleModal={handleModal} 
                    handleAddChange={handleAddChange}
                    handleAddSubmit={handleAddSubmit}
                    value={data}
                />
                :
                null
                }
            </div>
            <div className="
                flex flex-col items-center
            ">
                <TaskCard 
                    tasks={tasks}
                    handleEditSubmit={handleEditSubmit}
                    Value={data}
                    ID={ID}
                    edit={edit}
                    editData={tasksEdit[ID]}    
                    editChange={editChange}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    handleToggleEdit={handleToggleEdit}
                />
            </div>
        </div>
    )
}