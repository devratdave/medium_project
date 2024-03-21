import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

interface userBlogparams{
    title: string,
    content: string,
    id: string
}

export const UserBlog = ({title, content, id}: userBlogparams) => {
    const navigate= useNavigate()
    return(
            <div className="pb-4 border-b m-2">
                <div className="text-lg font-semibold">
                    {title}
                </div>
                <div className="text-md font-normal mb-4">
                    {content.length > 100 ? `${content.slice(0, 100)} ...`: content}
                </div>
                <div className="text-xs text-gray-400 flex justify-between items-center">
                    <div>
                        {`${Math.ceil(content.length / 100)} minute(s) read` }
                    </div>
                    <div className="mr-4">
                        <Button label="Edit" onclick={()=>navigate(`/editblog/${id}`)}/>
                    </div>
                   
                </div>
            </div>
    )
    

}