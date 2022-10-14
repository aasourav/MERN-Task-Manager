import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddModal from "./AddModal";
import TaskCard from "./TaskCard";


axios.defaults.withCredentials = true;

export default function TasksLogTitle({username}){
    const navigate = useNavigate()
    // if(!usrTask){
    //     navigate('/')
    //     console.log(usrTask)
    // }
    
    const [edit,setEdit] = useState(false)
    const [ID,setId] = useState()


    const handleToggleEdit = (e)=>{
        setEdit((prev)=>!prev)
        setId(e.target.id)
        
    }

    const [modal,setModal] = useState(false)
    const handleModal = ()=>{
        setModal((prev)=>!prev)
    }

    
    
//<<<<===============Taking Single Data from User=====================>>>>

    const[tasks,setTasks]=useState([])
    const[tasksEdit,setETasks]=useState([])
    const date = new Date(Date.now())
    const[data,setData]=useState({
        taskname:'',
        taskdes:'',
        status:true,
        created:String(date.toLocaleDateString())+" "+String(date.toLocaleTimeString())
    })
    
    const handleAddChange = (e)=>{
        setData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
//<<<<======================================================================>>>>

    
///<<<<=================Add Task To the Server=======================>>>>
    const handleAddSubmit = async(e)=>{
        e.preventDefault();
        const tdata = [data]
        setTasks([...tasks,...tdata])
        setETasks([...tasks,...tdata])
        try{
                const res = await axios.post('http://localhost:8800/tasks/add',{
                taskname:data.taskname,
                taskdes:data.taskdes,
                status:true,
                created:String(date.toLocaleDateString())+" "+String(date.toLocaleTimeString())
            },
            {
                withCredentials:true
            })

            console.log(res.data)
        }
        catch(e){
            navigate('/login')
            console.log(e)
        }

        handleModal()
        setData({
            taskname:'',
            taskdes:'',
            status:true,
            created:Date.now()
        })
    }
///<<<<==============================================>>>>


    
 ///<<<<=================Getting User Tasks=======================>>>>

    const GetData = async()=>{
        try{
            const res = await axios.get('http://localhost:8800/tasks/',{
            withCredentials:true
             })
            return res
        }
        catch(e){
            navigate('/login')
        }
    }
    useEffect(()=>{
        const fn = async()=>{
            const Usr = await GetData()
            console.log("Getting Data: ",Usr.status)
            if(Usr.status!==200){
                navigate('/login')
            }
            setTasks(Usr.data)
            setETasks(Usr.data)
        }
        fn()
    },[])

///<<<<================================================>>>>



///<<<<=================Edit Section Start=======================>>>>
    const editChange = (e)=>{
        setETasks(prev => (
            prev.map((o,i)=> i===parseInt(ID) ? {...o,[e.target.name]:e.target.value}:o)
        ))
    }

    const handleEditSubmit = async(e)=>{
        e.preventDefault()
        setTasks(tasksEdit)

        const{taskname,taskdes,status,created} = tasksEdit[ID]
        try{
            const res = await axios.put(`http://localhost:8800/tasks/edit/${ID}`,{
                taskname,
                taskdes,
                created,
                status,
            },
            {
                withCredentials:true
            })

            console.log("edit task: ",res.status)
        }
        catch(e){
            navigate('/login')
            console.log(e)
        }

        setEdit((prev)=>!prev)
    }

    
///<<<<===================================================>>>>


///<<<<===============Mark Task Complete Section=================>>>>

    const handleComplete = async(e)=>{
        setTasks(prev => (
            prev.map((o,i)=> i===parseInt(e.target.id) ? {...o,[e.target.name]:!o.status}:o)
        ))
        setETasks([...tasks])
        const index = parseInt(e.target.id)
        const{taskname,taskdes,status,created} = tasks[index];
        console.log("HELl: ",tasks)
        try{
            const res = await axios.put(`http://localhost:8800/tasks/edit/${e.target.id}`,{
                taskname,
                taskdes,
                status:!status,
                created
            },
            {
                withCredentials:true
            })
            console.log("Complete task: ",res.status)
        }
        catch(e){
            navigate('/login')
            console.log(e)
        }
    }
///<<<<============================================>>>>


///<<<<==================Delete Task==========================>>>>
    const handleDelete = async(e) =>{
        const Tdata = tasksEdit.filter((_,i)=> i!==parseInt(e.target.id))
        setTasks([...Tdata])
        setETasks([...Tdata])
        try{
            const res = await axios.delete(`http://localhost:8800/tasks/${e.target.id}`,
            {
                withCredentials:true
            })
            console.log("Delete task: ",res.status)
        }
        catch(e){
            navigate('/login')
            console.log(e)
        }
    }
///<<<<============================================>>>>


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
                ">Hello 
                <strong className="text-blue-700 ml-2
                    text-2xl
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