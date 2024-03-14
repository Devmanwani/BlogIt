
import { Link } from "react-router-dom";



interface BlogCardProps{
    authorName:string;
    title: string;
    content:string,
    publishedDate:string,
    id:string,
    color:string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
    color
}: BlogCardProps)=>{
    const timeInMinutes = Math.ceil(content.length / 300);
    let time: string | number = timeInMinutes;
    let timeUnit: string = 'min';

    if (timeInMinutes > 60) {
        time = Math.ceil(timeInMinutes / 60);
        timeUnit = 'hr';
    }

    return (
        <Link to={`/blog/${id}`}>
        <div className="max-w-2xl mt-12 border-b w-screen px-8">
            
            <div className="flex items-center ">
            <div className="mr-1">
            <Avatar name={authorName} color={color} size="small"/>
            </div>
                <div className="flex font-semibold mt-1 text-base">
                {authorName} 
                </div>
            </div>
            <div className="font-bold text-xl">
                {title}
            </div>
            <div className="font-medium text-slate-500 mt-1" 
            dangerouslySetInnerHTML={{ __html: `${content.slice(0, 200)} ${content.length > 200 ? "..." : ""}` }}>
            </div>
            <div className="mt-3 mb-2 text-xs font-normal text-slate-700">
             {publishedDate} {"| "}
                {time} {time > 1 ? timeUnit + 's' : timeUnit} read
            </div>
        </div>
        </Link>
    );
};



export function Avatar({ name, size, color }: { name: string, size: string, color: string }) {
    return (
        <div className={`${size === "small" ? "w-6 h-6" : "w-10 h-10"} mr-2 relative inline-flex items-center justify-center overflow-hidden rounded-full`} style={{ backgroundColor: color }}>
            {color !== '' && <span className={`${size === "small" ? "text-xs" : "text-lg"} font-medium text-white`}>{name[0]}</span>}
        </div>
    );
}


