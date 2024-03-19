import { useNavigate } from "react-router-dom"
import { FormComponent } from "../components/FormComponent"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { SignupSchema, signupSchema } from "@devratdave/common"

export const Signup=()=> {
    const navigate= useNavigate()
    const [signupInfo, setSignupInfo]= useState<SignupSchema>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest(){
        if (!signupSchema.safeParse(signupInfo).success){
            return alert("Invalid inputs, please check the values you have entered")
        }
        const res= await axios.post("https://backend.devratdave02.workers.dev/api/v1/user/signup", signupInfo)
        
        localStorage.setItem('token', res.data.token)
        navigate('/home')
        return alert('Welcome, we hope you have a good time')
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-slate-200">
            <div className="flex justify-center bg-white h-full">
                <div className="flex items-center">
                    <div className="inline-block bg-slate-200 p-10 border-0 border-solid rounded">
                        <Header header="Create a new account"/>
                        <form className="mt-4 mb-2">
                            <FormComponent label="Name" type="text" placeholder="John Doe" onchange={(e)=>{setSignupInfo({...signupInfo, name:e.target.value})}} />
                            <FormComponent label="Email Address" type="email" placeholder="johndoe@gmail.com" onchange={(e)=>{setSignupInfo({...signupInfo, email:e.target.value})}}/>
                            <FormComponent label="Password" type="password" placeholder="password" onchange={(e)=>{setSignupInfo({...signupInfo, password:e.target.value})}}/>
                            <Button onclick={sendRequest} label="Sign Up"/>
                        </form>
                        <div className="text-gray-500">
                            Already have an account? <a className="text-gray-500 hover:text-gray-700 underline" href={'/signin'}>Login</a>
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

)}