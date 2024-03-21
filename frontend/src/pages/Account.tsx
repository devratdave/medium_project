import { AppBar } from "../components/AppBar"
import { Skeleton } from "../components/Skeleton"
import { UserBlog } from "../components/UserBlog"
import { useUserBlogs } from "../hooks"

export const Account = () => {
    const {loading, userBlogs}= useUserBlogs()

    if (loading){
        return(
            <div>
                <AppBar />
                
                <div className="flex justify-center">
                <div className="w-full md:max-w-4xl">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="w-full md:max-w-4xl">
                    <div className="text-2xl border-b mb-4 pb-2">
                        Your Blogs
                    </div>
                    {userBlogs.length==0 ? 
                        <div className="text-center">
                            You have no blogs uploaded. Click on 'new' to get started with your journey.
                        </div>
                    : 
                    userBlogs.map((blog)=>{
                        return(
                                <UserBlog key={blog.id} title={blog.title} content={blog.content} id={blog.id}/>
                        )
                    })}
                </div>   
            </div>
        </div>
    )
}