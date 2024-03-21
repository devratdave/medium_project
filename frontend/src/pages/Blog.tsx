import { useParams } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton"

export const Blog = () => {
    const { id }= useParams()
    const {loading, blog}= useBlog({id: id || ""})

    if(loading){
        return(
            <div>
                <AppBar />   
            <div className="flex justify-center">
            <div className="w-full md:max-w-4xl">
                <div className="grid grid-cols-12">
                <div className="col-span-8 m-4">
                    <FullBlogSkeleton />
                </div>
                <div className="col-span-4 m-4">
                    <FullBlogSkeleton />
                </div>
                </div>
                </div>
            </div>
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