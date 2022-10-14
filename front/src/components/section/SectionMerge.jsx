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
            console.log(Usr)
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
            const Data = await dataSend()
            alert("Successfully Register..")
            console.log(Data)
            navigate('/')
        }
        catch(e){
            console.log(e.message)
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
            console.log(Data)
            setLogged(true)
            navigate('/')
        }
        catch(e){
            console.log(e)
            alert("Unauthorized!!")
        }
    }

//<<====================Logout Start===========>>
const logOut = async(e)=>{
    try{
        const res = await axios.post('http://localhost:8800/logout',{},{
            withCredentials:true
        })
        navigate('/login')
        setLogged(false)
    }
    catch(e){
        console.log("There was a problem logging out: ",e)
    }
}
//<<=================================================>>


//=============================Task Management=======================>>>





    return(
        <>   
            <HeaderMerged loggedIn={logged} logOut={logOut}/>
              <Routes>
                <Route path="/" element={
                    !logged? 
                        <LoginPage 
                            handleLogChange={handleLogChange} 
                            handleLogSubmit={handleLogSubmit}
                            value={login}/> 
                     : 
                        <TasksLogTitle username={validUser.username}/>}/>
                    
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
        </>
    )
}