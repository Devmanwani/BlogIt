import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { useUserContext } from '../contexts/UserContext';
import {FaSignOutAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';



export const Appbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useUserContext();
    

    const navigate = useNavigate();
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        
        const confirm = window.confirm('Are you sure you want to Logout?')

        if(confirm){
        localStorage.removeItem('token');
        navigate('/signin');}
    };  

    return (
        <div className="bg-white z-20 fixed top-0 border-b flex justify-between items-center px-10 w-screen py-3">
            {/* BlogIt logo */}
            <Link to="/blogs">
                <div className="font-bold text-xl">BlogIt</div>
            </Link>

            
            <div className="flex flex-row">
                <Link to="/CreateBlog">
                    <button className="mr-5">
                        <img className="h-11" src="https://cdn-icons-png.flaticon.com/512/11896/11896058.png" alt="Create" />
                    </button>
                </Link>

                
                <div className="relative">
                    <button onClick={toggleDropdown}>
                        <Avatar name={user?.firstName || ''} size="medium" color={user?.color || '#3A67B3'} />
                    </button>
                    {showDropdown && (
                        <div className={`flex flex-col items-center absolute right-0 mt-5 bg-white rounded shadow-lg ${window.innerWidth > 768 ? 'w-40 text-xl' : 'w-37 text-sm'}`}>
                            
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
    );
};
