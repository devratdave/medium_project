import { Link } from "react-router-dom"

interface blogProps {
    authorName: string,
    title: string,
    content: string,
    id: string
}

export const Blogs = ({authorName, title, content, id}: blogProps) => {

    return(
        <Link to={`/blog/${id}`}>
            <div className=" pb-4 border-b m-2">
            <div className="">
                <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-gray-400 rounded-full inline-block text-xs flex items-center justify-center font-thin">
                        {authorName.charAt(0)}
                    </div>
                    <div className="flex items-center justify-center text-sm mx-1">
                        {authorName}
                    </div>
                    <div className="rounded-full bg-gray-400 h-1 w-1">
                    </div>
                </div>
            </div>
                <div className="text-lg font-semibold">
                    {title}
                </div>
                <div className="text-md font-normal mb-4">
                    {content.length > 100 ? `${content.slice(0, 100)} ...`: content}
                </div>
                <div className="text-xs text-gray-400">
                    {`${Math.ceil(content.length / 100)} minute(s) read` }
                </div>
            </div>

        </Link>
        
)}