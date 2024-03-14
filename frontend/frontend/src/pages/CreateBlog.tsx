import MyEditor from "../components/EditorComponent";
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



 const CreateBlog = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        
        
        if (!localStorage.getItem('token')) {
            navigate('/signin');
            alert('You are not logged in!');
           
            return; 
        }
    },[])


    return <div>
        <Appbar />
        <div className="mt-20">
            <MyEditor id="" htmlContent="" edittitle="" />
        </div>
    </div>}

    export default CreateBlog;