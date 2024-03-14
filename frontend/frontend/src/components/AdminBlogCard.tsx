import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Avatar } from "./BlogCard";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
    color: string;
    onDelete: () => void; 
}

export const AdminBlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    color,
    onDelete, 
}: BlogCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });
          
            onDelete();
        } catch (error) {
            setDeleteError("Failed to delete blog");
            console.error("Error deleting blog:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const timeInMinutes = Math.ceil(content.length / 300);
    let time: string | number = timeInMinutes;
    let timeUnit: string = "min";

    if (timeInMinutes > 60) {
        time = Math.ceil(timeInMinutes / 60);
        timeUnit = "hr";
    }

    return (
       
        <div className="max-w-2xl mt-12 border-b w-screen px-8">
             <Link to={`/blog/${id}`}>
            <div className="flex items-center">
                <div className="mr-1">
                    <Avatar name={authorName} color={color} size="small" />
                </div>
                <div className="flex font-semibold mt-1 text-base">
                    {authorName}
                </div>
            </div>
            <div className="font-bold text-xl">{title}</div>
            <div
                className="font-medium text-slate-500 mt-1"
                dangerouslySetInnerHTML={{
                    __html: `${content.slice(0, 200)} ${
                        content.length > 200 ? "..." : ""
                    }`,
                }}
            ></div>
            <div className="mt-3 mb-2 text-xs font-normal text-slate-700">
                {publishedDate} {"| "}
                {time} {time > 1 ? timeUnit + "s" : timeUnit} read
            </div>
            </Link>
            <div>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
                {deleteError && (
                    <div className="text-red-500 mt-2">{deleteError}</div>
                )}
            </div>
        </div>
        
    );
};
