import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate= useNavigate()
    const [articleTitle, setArticleTitle]= useState("")
    const [articleContent, setArticleContent]= useState("")

    async function sendPublishRequest(){
        const response= await axios.post('https://backend.devratdave02.workers.dev/api/v1/blog', {title: articleTitle, content: articleContent} , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        navigate('/home')
        return alert(`${response.data.message}`)
}

    return(
        <div className="">
            <AppBar />
            <div>
                <div className="flex justify-center">
                <div className="w-full md:max-w-4xl">
                <div className="mb-6">
                    <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" placeholder="Article Title" onChange={(e)=>setArticleTitle(e.target.value)} />
                </div>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <textarea id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus ring-0" placeholder="Article content..." onChange={(e)=>setArticleContent(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t">
                        <button type="submit" onClick={sendPublishRequest} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                            Publish Article
                        </button>   
                    </div>
                </div>
                </div>
            </div>     
                                    
            </div>
        </div>
    )
}