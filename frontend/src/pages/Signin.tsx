import axios from "axios"
import { Button } from "../components/Button"
import { FormComponent } from "../components/FormComponent"
import { Header } from "../components/Header"
import { useState } from "react"
import { SigninSchema, signinSchema } from "@devratdave/common"
import { useNavigate } from "react-router-dom"

export const Signin= ()=> {
    const navigate= useNavigate()
    const [signinInfo, setSigninInfo]= useState<SigninSchema>({
        email: "",
        password: ""
    })

    function sendRequest(){
        if (!signinSchema.safeParse(signinInfo).success){
            return alert("Invalid inputs, please check the values you have entered")
        }
        axios.post('https://backend.devratdave02.workers.dev/api/v1/user/signin', signinInfo)
        .then((res)=>{
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("name", res.data.name)
            navigate('/home')
            return alert(`Welcome back, ${res.data.name}`)
        })
        .catch((e)=>{
            alert(e.response.data.message)
            return navigate('/signin')
        })
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-slate-200">
            <div className="flex justify-center bg-white h-full">
                <div className="flex items-center">
                    <div className="inline-block bg-slate-200 p-10 border-0 border-solid rounded">
                        <Header header="Sign In"/>
                        <form className="mt-4 mb-2">
                            <FormComponent label="Email Address" type="email" placeholder="johndoe@gmail.com" onchange={(e)=>{setSigninInfo({...signinInfo, email:e.target.value})}}/>
                            <FormComponent label="Password" type="password" placeholder="password" onchange={(e)=>{setSigninInfo({...signinInfo, password:e.target.value})}}/>
                            <div className="mt-4">
                                <Button onclick={sendRequest} label="Sign In"/>
                            </div>

                        </form>
                        <div className="text-gray-500">
                            Don't have an account? <a className="text-gray-500 hover:text-gray-700 underline" href={'/signup'}>Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="flex justify-center h-full">
                    <div className="flex items-center">
                        <div className="p-8">
                            <div className="block text-xl font-semibold text-center pb-0">
                                The customer support I received was exceptional. The support team went above and beyond to address my concern.
                            </div>
                            <div className="block text-md font-semibold pl-8">
                                Jules Winnfield
                            </div>
                            <div className="block text-gray-500 text-sm pl-8">
                                CEO, ACME Inc
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}