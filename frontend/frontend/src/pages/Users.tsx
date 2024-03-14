import { useState, useEffect } from "react";
import { FaTrash, FaSignOutAlt } from 'react-icons/fa';
import PaginationComponent from "../components/PaginateComponent";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";

interface User {
    firstName: string;
    lastName: string;
    color: string;
    email: string;
    id: string;
}

 const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/signin');
            alert('You are not logged in!');
            return;
        }
    }, []);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const url = `${BACKEND_URL}/api/v1/admin/getUsers`;
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setUsers(res.data);
            });
        } catch (error) {
            alert("Error fetching details");
        }
    }, [isDeleted]);

    const deleteUser = (userId: string) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${BACKEND_URL}/api/v1/admin/getUser/${userId}`;
            axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                setIsDeleted(prevState => !prevState);
            });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    function handleBlogs(){
        navigate('/admin/blogs');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="flex justify-center flex-col items-center mt-20">
            <div className="bg-white z-20 fixed top-0 border-b flex justify-between items-center lg:px-10 md:px-2 px-10 w-screen py-3">
            <Link to={`/admin/blogs`}>
                    <div className="font-bold text-xl sm:text-md">BlogIt</div>
                </Link>
                <button  className="block text-center pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={handleBlogs}>
                <MdLibraryBooks className="mr-2" /> 
                Blogs
                </button>
                <button className="block text-center pr-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center" onClick={handleLogout}>
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </div>
            <div className="w-full justify-center flex items-center flex-col">
                <h2 className="text-2xl font-bold mb-4">User List</h2>
                <ul>
                    {currentUsers.map(user => (
                        <li key={user.id} className="flex items-center justify-between bg-gray-100 px-4 py-2 mb-2 rounded-lg text-lg">
                            <span>{user.firstName} {user.lastName}</span>
                            <button onClick={() => deleteUser(user.id)} className="text-red-600">
                                <FaTrash className="ml-4"/>
                            </button>
                        </li>
                    ))}
                </ul>
                <PaginationComponent
                    currentPage={currentPage}
                    paginate={paginate}
                    totalPages={Math.ceil(users.length / usersPerPage)}
                />
            </div>
        </div>
    );
};

export default Users;