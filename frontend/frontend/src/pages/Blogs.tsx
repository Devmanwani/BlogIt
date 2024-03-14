import React, { useState, useEffect } from 'react';
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";
import { Avatar } from '../components/BlogCard';
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import PaginationComponent from '../components/PaginateComponent';
import { Appbar } from '../components/Appbar';

export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};

 const Blogs = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const { user } = useUserContext();

    
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    
    const { loading, blogs } = useBlogs(searchTerm);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);


    useEffect(()=>{
        if (!localStorage.getItem('token')) {
            navigate('/signin');
            alert('You are not logged in!');
           
            return; 
        }
    },[])

    useEffect(() => {
        
        
        setCurrentPage(1);
    }, [searchTerm]);

   

    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center">
                <Appbar/>
                <div className="mt-20 w-full justify-center flex items-center flex-col">
                    {[...Array(blogsPerPage)].map((_, index) => (
                        <div className="w-full max-w-md bg-gray-200 p-4 mb-4 rounded-md" key={index}>
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    

    const handleLogout = () => {
        
        const confirm = window.confirm('Are you sure you want to Logout?')

        if(confirm){
        localStorage.removeItem('token');
        navigate('/signin');}
    };  

    
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex justify-center flex-col items-center">
            <div className=" bg-white z-20 fixed top-0 border-b flex justify-between items-center lg:px-10 md: px-2 px-10 w-screen py-3">
                <Link to={`/blogs`}>
                    <div className="font-bold text-xl sm:text-md">BlogIt</div>
                </Link>
                <div className="pl-3 pr-1 w-3/5">
                    <input className='pl-2 focus:outline-none flex-grow w-full border-2 rounded-lg py-1'
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search blogs..."
                    />
                </div>
                <div className="flex flex-row">
                    <Link to={"/CreateBlog"}>
                        <button className="mr-5">
                            <img className="h-11" src="https://cdn-icons-png.flaticon.com/512/11896/11896058.png" alt="Create" />
                        </button>
                    </Link>
                    <div className="relative">
                    <button onClick={toggleDropdown}>
                        <Avatar name={user?.firstName || ''} size="medium" color={user?.color || '#3A67B3'} />
                    </button>
                    {showDropdown && (
                        <div className='flex flex-col items-center absolute right-0 mt-5 bg-white rounded shadow-lg w-40 text-xl'>
                            
                            <Link to="/myblogs">
                                <button className="block w-full text-left pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center">
                                    <MdLibraryBooks className="mr-2" /> My Blogs
                                </button>
                            </Link>
                            
                            <div>
                            <button className="block w-full text-center pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={handleLogout}>
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
            <div className="mt-20 w-full justify-center flex items-center flex-col">
                {currentBlogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.firstName + ' ' + blog.lastName}
                        title={blog.title}
                        content={blog.content}
                        color={blog.color || "#3A67B3"}
                        publishedDate={formatDate(blog.createdAt)}
                    />
                ))}
            </div>
            <PaginationComponent currentPage={currentPage} paginate={paginate} totalPages={totalPages}/>

        </div>
    );
};

export default Blogs;
