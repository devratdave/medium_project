import axios from "axios"
import { AppBar } from "../components/AppBar"
import { useNavigate, useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { useEffect, useState } from "react"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton"

export const EditUserBlog = () => {
    const navigate= useNavigate()
    const { id }= useParams()
    //@ts-ignore
    const [loading, setLoading]= useState(true)
    const [newBlog, setNewBlog]= useState({
        title: "",
        content: ""
    })

    useEffect(()=>{
        axios.get(`https://backend.devratdave02.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            setNewBlog(res.data.blog)
            return setLoading(false)
        })
        .catch((e)=>{
            navigate('/home')
            return alert(`${e.response.data.message}`)
        })
    }, [id])

    if(loading){
        return(
            <div>
                <AppBar />   
            <div className="flex justify-center">
            <div className="w-full md:max-w-3xl">
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


    function sendRepublishRequest(){
        axios.put(`https://backend.devratdave02.workers.dev/api/v1/blog/${id}`,{
            title: newBlog.title,
            content: newBlog.content
        },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res=>{
            alert(res.data.message)
            return navigate('/account')
        })
        .catch((e)=>{
            alert(e.repsonse.data.message)
            return('/account')
        })
    }
    return(
        <div>
            <AppBar />
            <div>
            <div>
                <div className="flex justify-center">
                <div className="w-full md:max-w-3xl">
                <div className="mb-6">
                    <input type="text" value={newBlog.title} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" placeholder="Article Title" onChange={(e)=>setNewBlog({...newBlog, title:e.target.value})} />
                </div>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <textarea id="comment" rows={4} value={newBlog.content} className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus ring-0" placeholder="Article content..." onChange={(e)=>setNewBlog({...newBlog, content:e.target.value})}></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t">
                        <button type="submit" onClick={sendRepublishRequest} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                            Publish Article
                        </button>   
                    </div>
                </div>
                </div>
            </div>     
                                    
            </div>
            </div>
        </div>
    )
}