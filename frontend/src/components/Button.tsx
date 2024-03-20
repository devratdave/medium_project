interface buttonProps {
    onclick: () => void
    label: string
}

export const Button = ({onclick, label}: buttonProps) => {

    return(
        <button onClick={onclick} type="button" className="block text-white bg-gray-800 hover:bg-gray-900 focus:ring-2 focus:ring-gray-300 font-medium rounded-md text-sm px-2.5 py-2.5 mt-4 ml-0 ">{label}</button>
    )
}