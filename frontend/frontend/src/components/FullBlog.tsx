import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { formatDate } from "../pages/Blogs"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useUserContext } from "../contexts/UserContext"

export const FullBlog = ({blog}:{blog:Blog}) =>{

    const navigate = useNavigate();
    const { user } = useUserContext();
    
    const timeInMinutes = Math.ceil(blog.content.length / 300);
    let time: string | number = timeInMinutes;
    let timeUnit: string = 'min';
    const {id} = useParams();

    if (timeInMinutes > 60) {
        time = Math.ceil(timeInMinutes / 60);
        timeUnit = 'hr';
    }

    function handleClick(){
        navigate(`/EditBlog/${id}`)
    }

    return<div> 
        <Appbar/>
        <div className="mt-20">
        {user.id === blog.author.id?<div className="flex max-w-auto items-center justify-end pt-2">
        <button onClick={handleClick} className=" md:mr-5 max-w-20 mt-2 mr-3 py-1 pt-2 px-3 text-md md:text-xl font-semibold text-white rounded-lg bg-sky-500 flex justify-end"> EDIT</button>
        </div>:""}

        <div className="flex justify-center flex-row items-center">
            {/* <div className="grid md:grid-cols-12 px-10 w-full pt-12 max-w-screen-xl"> */}
           <div className="max-w-screen-xl px-10 w-full pt-8">
            <div className="">
                <div className=" text-2xl xl:text-5xl lg:text-3xl md:text-2xl font-extrabold ">
                    {blog.title}
                </div>
                <div className="flex items-center pt-5 ">
                    <div className="">
                        <Avatar name={blog.author.firstName} size="small" color={blog.author.color || "#3A67B3"}/>
                    </div>

                    <div className=" font-bold text-md xl:text-xl lg:text-xl md:text-lg  ">
                    {`${blog.author.firstName} ${blog.author.lastName}`}
                    </div>
                </div>
                <div className="text-slate-600 pt-3">
                    Posted on {formatDate(blog.createdAt)} {`| ${time} ${time > 1 ? timeUnit + 's' : timeUnit} read`}
                </div>
                <div className="text-xl pt-5" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                {/* <div className="text-xl pt-5">
                {blog.content}
                </div> */}
            </div>
            
        </div>
        </div>
    </div>

    
    </div>
}