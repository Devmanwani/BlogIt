

import { Appbar } from "../components/Appbar";
import MyEditor from "../components/EditorComponent";
import { useBlog } from "../hooks/index";
import { useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

 const EditBlog = ()=>{
    const { user } = useUserContext();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const {loading,blog} = useBlog({
        id:id || ""
    });
    

    if(loading){
        return <div>
            loading...
        </div>
    }

    if(user.id!= blog?.author.id){
        navigate('/blogs');
    }

    return (
        <>
        <Appbar/>
        <div className="mt-20">
        {blog && <MyEditor id={id || ""} htmlContent={blog.content} edittitle={blog.title}/>}
        </div>
        </>
    )
}

export default EditBlog;