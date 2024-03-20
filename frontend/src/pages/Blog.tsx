import { useParams } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"

export const Blog = () => {
    const { id }= useParams()
    const {loading, blog}= useBlog({id: id || ""})

    if(loading){
        return(
            <div>
                <AppBar />
                loading...
            </div>
        )
    }
    
    return(
        <div>
            <AppBar />
            <div>
                {/* @ts-ignore */}
                <FullBlog title={blog.title} content={blog.content} author={blog.author}/>
            </div>
        </div>
    )
}