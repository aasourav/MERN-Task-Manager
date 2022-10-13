import { useState } from "react"
import AddModal from "./AddModal"
import TaskCard from "./TaskCard"

export default function TasksLogTitle({name}){
    
    const [edit,setEdit] = useState(false)
    const [ID,setId] = useState()
    const handleToggleEdit = (e)=>{
        setEdit((prev)=>!prev)
        setId(e.target.id)
        
    }



    const [modal,setModal] = useState(false)
    
    


    const date = new Date(Date.now())

    const[data,setData]=useState({
        taskname:'',
        taskdes:'',
        status:true,
        created:String(date.toLocaleDateString())+" "+String(date.toLocaleTimeString())
    })





    const handleModal = ()=>{
        setModal((prev)=>!prev)
 
    }


    
    const[tasks,setTasks]=useState([])
    const[tasksEdit,setETasks]=useState([])

    // title: "",
    // des: "",
    // time: "",
    // status: false



    const handleAddChange = (e)=>{
        setData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
        
        //  console.log(data.taskname,data.taskdes)
    }

    const handleAddSubmit = (e)=>{
        e.preventDefault();
        // tasks.push(data)
        const tdata = [data]
        setTasks([...tasks,...tdata])
        setETasks([...tasks,...tdata])
        
        handleModal()
        setData({
            taskname:'',
            taskdes:'',
            status:true,
            created:Date.now()
        })
        // console.log(tasks)
    }

    const editChange = (e)=>{
        setETasks(prev => (
            prev.map((o,i)=> i===parseInt(ID) ? {...o,[e.target.name]:e.target.value}:o)
        ))
    }

    const handleEditSubmit = (e)=>{
        e.preventDefault()
        setTasks(tasksEdit)
        setEdit((prev)=>!prev)
    }

    const handleComplete = (e)=>{
        setTasks(prev => (
            prev.map((o,i)=> i===parseInt(e.target.id) ? {...o,[e.target.name]:!o.status}:o)
        ))
        setETasks([...tasks])
    }
    const handleDelete = (e) =>{
        const Tdata = tasksEdit.filter((_,i)=> i!==parseInt(e.target.id))
        setTasks([...Tdata])
        setETasks([...Tdata])
    }


    return(
        <div>
            <div className="
                flex justify-center
                text-xl italic font-mono
                mt-10
                mb-3
            ">
                <h3 className="
                    w-1/2
                ">Hello {name}, Here is your incomplete tasks. Let's complete one by one...</h3>
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