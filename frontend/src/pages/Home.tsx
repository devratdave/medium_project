import { AppBar } from "../components/AppBar"
import { Blogs } from "../components/Blogs"
import { useBlogs } from "../hooks"

export const Home= ()=> {
    const {loading, blogs}= useBlogs()

    if(loading){
        return(
            <div>
                <AppBar />
                loading...
            </div>
        )
    }

    return(
        <div className="">
            <AppBar />
            <div className="flex justify-center">
                <div className="w-full md:max-w-2xl">
                    {blogs.map((blog)=>{
                        return(
                                <Blogs key={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} id={blog.id}/>
                        )
                    })}
                </div>   
            </div>
        </div>
    )
}