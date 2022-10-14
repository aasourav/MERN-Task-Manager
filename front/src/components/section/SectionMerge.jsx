import axios from 'axios';
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import HeaderMerged from "../header/HeaderMerged";
import LoginPage from '../section/NotLoggedIn/LogIn/LoginPage';
import Register from '../section/NotLoggedIn/Register/RegisterPage';
import TasksLogTitle from "./LoggedIn/Tasks_LogTitle";

axios.defaults.withCredentials = true;

export default function SectionMerge(){

    const[validUser,setValid] = useState({
        username:'',
        id:''
    })
    const chkUser = async()=>{
        const res = await axios.get('http://localhost:8800/isValid',{
            withCredentials:true
        })

        return res.data
    }

    const[logged,setLogged] = useState(false)
    useEffect(()=>{
        const fn = async()=>{
            const Usr = await chkUser()
            setValid({
                username:Usr.username,
                id:Usr.id
            })
            // console.log(Usr.data)

            // setTasks(Usr.data)
            setLogged(true)
        } 
        fn()
        
    },[logged])



    // ///Getting User Tasks
    // const[usrTask,setTasks] = useState([])
    // const GetData = async()=>{
    //     const res = await axios.get('http://localhost:8800/tasks/',{
    //         withCredentials:true
    //     })

    //     return res.data
    // }
    // useEffect(()=>{
    //     const fn = async()=>{
    //         const Usr = await GetData()
    //         setTasks(Usr)
    //     }
    //     fn()
    // },[])




    const navigate = useNavigate();
   
    const[user,setUser] = useState({
        username:'',
        email:'',
        password:'',
    })
    const[login,setLogin] = useState({
        username:'',
        password:''
    })
    
    const handleRegChange = (e)=>{
        setUser(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const dataSend = async()=>{
        const {username,email,password}=user
        const res= await axios.post('http://localhost:8800/reg',{
            username,email,password
        })

        return res.data
    }
    const handleRegSubmit = async(e)=>{
        
        e.preventDefault()
        // console.log(user)
        try{
            await dataSend()
            alert("Successfully Register..")
            // console.log(Data)
            navigate('/')
        }
        catch(e){
            // console.log(e.message)
            alert("User Not Created. Try Again..")
        }
        
    }
    const handleLogChange =(e)=>{
        setLogin(prev=>({
            ...prev,    
            [e.target.name]:e.target.value
        }))
        // console.log(login)
    }

    const tryToLogin = async()=>{
        const {username,password}=login
        const res= await axios.post('http://localhost:8800/login',{
            username,password
        })
        return res.data
    }
    const handleLogSubmit = async(e)=>{
        e.preventDefault()
         try{
            const Data = await tryToLogin()
            alert("Successfully Logged in")
            // console.log(Data)
            if(!Data){
                return;
            }
            setLogged(true)
            navigate('/')
        }
        catch(e){
            // console.log(e)
            alert("Unauthorized!!")
        }
    }

//<<====================Logout Start===========>>
const logOut = async(e)=>{
    try{
        await axios.post('http://localhost:8800/logout',{},{
            withCredentials:true
        })
        setLogged(false)
    }
    catch(e){
        setLogged(false)
        // console.log("There was a problem logging out: ",e)
    }
}
//<<=================================================>>



////==============================================================================

//                               Task Management

//================================================================================

    
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
    setData({})
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
        if(!res){
            alert(`Can't add Todo`)
        }
        // console.log(res.data)
    }
    catch(e){
        // navigate('/login')
        setLogged(false)
        // console.log(e)
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
        // navigate('/login')
        setLogged(false)
    }
}
useEffect(()=>{
    const fn = async()=>{
        const Usr = await GetData()
        // console.log("Getting Data: ",Usr.status)
        setTasks(Usr.data)
        setETasks(Usr.data)
    }
    fn()
},[logged])

///<<<<================================================>>>>



///<<<<=================Edit Section Start=======================>>>>
const editChange = (e)=>{
    // console.log('Edit changing ',e.target.id)
    setETasks(prev => (
        prev.map((o,i)=> i===parseInt(e.target.id) ? {...o,[e.target.name]:e.target.value}:o)
    ))
}

const handleEditSubmit = async(e)=>{
    e.preventDefault()

    setTasks(tasksEdit)

    const{taskname,taskdes,status,created} = tasksEdit[parseInt(e.target.name)]
    try{
        const res = await axios.put(`http://localhost:8800/tasks/edit/${e.target.name}`,{
            taskname,
            taskdes,
            created,
            status,
        },
        {
            withCredentials:true
        })
        if(!res){
            alert('Edit Failed')
        }
        // console.log("edit task: ",res.status)
    }
    catch(e){
        // navigate('/login')
        setLogged(false)
        // console.log(e)
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
    // console.log("HELl: ",tasks)
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
        if(!res){
            alert('can not mark as completed.')
        }
        // console.log("Complete task: ",res.status)
    }
    catch(e){
        // navigate('/login')
        setLogged(false)
        // console.log(e)
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
        // console.log("Delete task: ",res.status)
        if(!res){
            alert('can not perform delete.')
        }
    }
    catch(e){
        // navigate('/login')
        setLogged(false)
        // console.log(e)
    }
}
///<<<<============================================>>>>



    return(
        <div>   
            <HeaderMerged loggedIn={logged} logOut={logOut}/>
              <Routes>
                <Route path="/" element={
                    !logged? 
                        <LoginPage 
                            handleLogChange={handleLogChange} 
                            handleLogSubmit={handleLogSubmit}
                            value={login}/> 
                     : 
                        <TasksLogTitle 
                            username={validUser.username}
                            modal={modal}
                            handleModal={handleModal}
                            handleAddChange={handleAddChange}
                            handleAddSubmit={handleAddSubmit}
                            data={data}
                            tasks={tasks}
                            handleEditSubmit={handleEditSubmit}
                            edit={edit}
                            tasksEdit={tasksEdit}
                            ID={ID}
                            editChange={editChange}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            handleToggleEdit={handleToggleEdit}
                        />}/>
                    
                <Route path='/login' element={<LoginPage 
                handleLogChange={handleLogChange} 
                handleLogSubmit={handleLogSubmit}
                value={login}/>}/>
                
                <Route path='/reg' element={<Register handleRegChange={handleRegChange} handleRegSubmit={handleRegSubmit}
                value={user}/>}/>
              </Routes>
             
             
            {/* {logged?
            <TasksLogTitle/>
            :
            null
            } */}
        </div>
    )
}