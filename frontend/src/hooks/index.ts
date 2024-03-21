import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface blogParam{
        id: string,
        title: string,
        content: string,
        author: {
            name: string
        }
    }

interface userBlogParams {
    id: string,
    title: string,
    content: string
}

export const useBlog = ({id}: {id: string}) => {
    const navigate= useNavigate()
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
        .catch((e)=>{
            navigate('/home')
            return alert(`${e.response.data.message}`)
        })
    }, [])

    return(
        {loading, blog}
    )
    
}

export const useBlogs = () => {
    const navigate= useNavigate()
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
        .catch((e)=>{
            alert(e.response.data.message)
            navigate('/')
        })
    }, [])

    return(
        {loading, blogs}
    )
}

export const useUserBlogs = () => {
    const navigate= useNavigate()
    const [loading, setLoading]= useState(true)
    const [userBlogs, setUserBlogs]= useState<userBlogParams[]>([])

    useEffect(()=>{
        axios.get("https://backend.devratdave02.workers.dev/api/v1/blog/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            setUserBlogs(res.data.blogs)
            return setLoading(false)
        })
        .catch((e)=>{
            alert(e.response.data.message)
            navigate('/signin')
        })
    }, [])
    return{
        loading, userBlogs
    }
}