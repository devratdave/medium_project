import { useEffect, useState } from 'react'
import axios from 'axios'

interface blogParam
    {
        id: string,
        title: string,
        content: string,
        author: {
            name: string
        }
    }

export const useBlog = ({id}: {id: string}) => {
    const [loading, setLoading]= useState(true)
    const [blog, setBlog]= useState<blogParam>()

    useEffect(()=>{
        axios.get(`https://backend.devratdave02.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            setBlog(res.data.blog)
            return setLoading(false)
        })
    }, [id])

    return(
        {loading, blog}
    )
    
}

export const useBlogs = () => {
    const [loading, setLoading]= useState(true)
    const [blogs, setBlogs]= useState<blogParam[]>([])

    useEffect(()=>{
        axios.get("https://backend.devratdave02.workers.dev/api/v1/blog", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            setBlogs(res.data.data)
            return setLoading(false)
        })
    }, [])

    return(
        {loading, blogs}
    )
}