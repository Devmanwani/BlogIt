import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { useMyBlogs } from '../hooks';
import { formatDate } from './Blogs';
import { Appbar } from '../components/Appbar';


 const MyBlogs = () => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    //const { user } = useUserContext();
    
    
    const { loading, blogs } = useMyBlogs();

    

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

    
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    

    return (
        <div className="flex justify-center flex-col items-center">
            <Appbar/>
            <div className="mt-20 w-full justify-center flex items-center flex-col">
                {currentBlogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.firstName + ' ' + blog.author.lastName}
                        title={blog.title}
                        content={blog.content}
                        color={blog.author.color || "#3A67B3"}
                        publishedDate={formatDate(blog.createdAt)}
                    />
                ))}
            </div>
            <div className="pagination">
    {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
        <button 
            className={`px-2 mb-1 border mt-1 ${index + 1 === currentPage ? 'bg-blue-500 text-white font-bold' : ''}`} 
            key={index} 
            onClick={() => paginate(index + 1)}
        >
            {index + 1}
        </button>
    ))}
</div>

        </div>
    );
};

export default MyBlogs;