import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderMerged from "../header/HeaderMerged";
import LoggedIn from '../header/LoggedIn/LoggedIn';
import LoginPage from '../section/NotLoggedIn/LogIn/LoginPage';
import Register from '../section/NotLoggedIn/Register/RegisterPage';
import TasksLogTitle from "./LoggedIn/Tasks_LogTitle";

export default function SectionMerge(){
    const[logged,setLogged] = useState(false)
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
    const handleRegSubmit = (e)=>{
        e.preventDefault()
        console.log(user)
    }
    const handleLogChange = (e)=>{
        setLogin(prev=>({
            ...prev,    
            [e.target.name]:e.target.value
        }))
        // console.log(login)
    }
    const handleLogSubmit = (e)=>{
        e.preventDefault()
        console.log(login)
    }
    return(
        <>  
            <BrowserRouter>
            <HeaderMerged/>
              <Routes>
                <Route path="/" element={!logged? <LoginPage/> : <TasksLogTitle/>}/>
                <Route path='/login' element={<LoginPage 
                handleLogChange={handleLogChange} 
                handleLogSubmit={handleLogSubmit}
                value={login}/>}/>
                <Route path='/reg' element={<Register handleRegChange={handleRegChange} handleRegSubmit={handleRegSubmit}
                value={user}/>}/>
                <Route path='/logout' element={<LoggedIn />}/>
              </Routes>
            
             </BrowserRouter>
            {/* {logged?
            <TasksLogTitle/>
            :
            null
            } */}
        </>
    )
}