import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



 const UserNavigate =  ():any=>{
    
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

useEffect(()=>{if(token){
    navigate('/blogs');
}else{
    navigate('/signin');
}},[]);
    
}

export default UserNavigate;