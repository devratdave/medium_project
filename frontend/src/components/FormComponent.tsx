import { ChangeEvent } from "react"

interface formComponentProps {
    label: string,
    type: string,
    placeholder: string
    onchange:(e: ChangeEvent<HTMLInputElement>)=> void
}


export const FormComponent = ({label, type, placeholder, onchange}: formComponentProps) =>{
    return(
        <div className="mt-4">
            <label className="block text-md font-medium leading-6 text-gray-900 mb-1">{label}</label>
            <input id={label} name={label} type={type} placeholder={placeholder} 
            onChange={onchange} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400" />
        </div>
)
}