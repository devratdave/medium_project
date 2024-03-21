import { useNavigate } from "react-router-dom"
import DropDown from "./Dropdown"

export const AppBar= ()=>{
    const navigate= useNavigate()
    const loginedUserName= localStorage.getItem('name')?.charAt(0).toUpperCase()
    return(
        <div className="mx-1 flex justify-between p-2 border-b mb-2 text-xl font-medium">
            <a className="flex items-center cursor-pointer" onClick={()=>{navigate('/home')}}>Medium</a>
            <div className="flex items-center">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mx-2 flex items-center font-normal"
                onClick={()=>{
                    navigate('/publish')
                }}>New</button>
                    <DropDown userName={loginedUserName} />

            </div>
            
        </div>
    )
}