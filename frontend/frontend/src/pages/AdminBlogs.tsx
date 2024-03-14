import { useState } from "react";
import { AdminBlogCard } from "../components/AdminBlogCard";
import { useAdminBlogs } from "../hooks";
import { formatDate } from './Blogs';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt , FaUserAlt } from 'react-icons/fa';
import PaginationComponent from "../components/PaginateComponent";

const AdminBlogs = () => {
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
   
    
    const { loading: blogLoading, blogs } = useAdminBlogs(searchTerm, isDeleted);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    
    useEffect(()=>{
        if (!localStorage.getItem('token')) {
            navigate('/admin');
            alert('You are not logged in!');
           
            return; 
        }
    },[])

    useEffect(() => {
        
        
        setCurrentPage(1);
    }, [searchTerm]);

    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/admin')
    }

    function handleUsers(){
        navigate('/admin/users');
    }

    const deleteBlog = () => {
        setIsDeleted(prevIsDeleted => !prevIsDeleted);
    };

    if (blogLoading) {
        return <div>Loading...</div>;
    }

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex justify-center flex-col items-center mt-20">
            <div className="bg-white z-20 fixed top-0 border-b flex justify-between items-center lg:px-10 md:px-2 px-10 w-screen py-3">
                <Link to={`/admin/blogs`}>
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
                <button  className="block text-center pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={handleUsers}>
                <FaUserAlt className="mr-2" /> 
                Users
                </button>
                <button className="block text-center pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={handleLogout}>
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                
            </div>
            <div className="w-full justify-center flex items-center flex-col">
                <h2 className="text-2xl font-bold mb-4">Blogs</h2>
                {currentBlogs.map(blog => (
                    <AdminBlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.firstName + ' ' + blog.lastName}
                        title={blog.title}
                        content={blog.content}
                        color={blog.color || "#3A67B3"}
                        publishedDate={formatDate(blog.createdAt)}
                        onDelete={deleteBlog}
                    />
                ))}
                <PaginationComponent currentPage={currentPage} paginate={paginate} totalPages={totalPages} />
             
            </div>
        </div>
    );
};

export default AdminBlogs;
