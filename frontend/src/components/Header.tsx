interface headerProps {
    header: string 
}

export const Header = ({header}: headerProps)=>{
    return(
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">{header}</h2>
    )
}