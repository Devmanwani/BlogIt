import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog{
    content:string,
    title:string,
    id: string,
    createdAt:string,
    author:{
        firstName:string,
        lastName:string,
        color:string,
        id:string
    }
}

export const useBlog = ({id}:{id:string}) =>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog | null>(null);

    useEffect(()=>{
        const url =  `${BACKEND_URL}/api/v1/blog/${id}`;
        
        const token = localStorage.getItem("token");
        axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setBlog(response.data);
            setLoading(false);
        })
    },[])


    return {
        loading,
        blog
    }
}

export interface SearchBlog{
    content:string,
    title:string,
    id: string,
    createdAt:string,
    
        firstName:string,
        lastName:string,
        color:string,
        
    
}


export const useBlogs = (searchTerm: string) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<SearchBlog[]>([]);
    

    

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = `${BACKEND_URL}/api/v1/blog/search?title=${searchTerm}`;
                const token = localStorage.getItem("token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();

        
        

       
       
    }, [searchTerm]); 

    return {
        loading,
        blogs,
        
    };
};

export const useAdminBlogs = (searchTerm: string, isDeleted:boolean) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<SearchBlog[]>([]);
    

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = `${BACKEND_URL}/api/v1/blog/search?title=${searchTerm}`;
                const token = localStorage.getItem("token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();

        
        

       
       
    }, [searchTerm, isDeleted]); 

    return {
        loading,
        blogs
        
    };
};



export const useMyBlogs = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        const url =  `${BACKEND_URL}/api/v1/blog/myBlogs`;
        const token = localStorage.getItem("token");

        axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response=>{
            setBlogs(response.data);
            setLoading(false);
        });
    },[])


    return {
        loading,
        blogs
    }
}



