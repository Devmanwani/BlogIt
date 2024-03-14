import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";



 const Blog = ()=>{
    const navigate = useNavigate();
    

    useEffect(()=>{
        if (!localStorage.getItem('token')) {
            navigate('/signin');
            alert('You are not logged in!');
           
            return; 
        }
    },[])
    const {id} = useParams();
    
    const {loading,blog} = useBlog({
        id:id || ""
    });
    

    if(loading){
        return (
            <div className="p-4 bg-white rounded shadow-md ">
                {/* Placeholder for loading state */}
                <div className="animate-pulse">
                    {/* Header skeleton */}
                    <div className="h-8 w-3/4 mb-4 bg-gray-300 rounded"></div>


                    <div className="mx-20">

                    <div className=" h-10 w-40 bg-gray-300  font-extrabold ">
                    </div>

                    {/* Author skeleton */}
                    <div className="flex items-center mb-2 mt-32">
                        <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
                        <div className="h-10 w-20 bg-gray-300 rounded"></div>
                    </div>

                    {/* Date and read time skeleton */}
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>

                    {/* Content skeleton */}
                    <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
                </div>
                </div>
            </div>
        );
    }


    return (
        <>
        {blog && <FullBlog blog={blog}/>}
        {/* <div> {blog?.title}</div>
        <div> {blog?.content}</div> */}
        </>
    )
}

export default Blog;