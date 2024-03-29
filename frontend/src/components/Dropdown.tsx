import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DropDown: FC<{userName: string | undefined}> = ({userName}) => 
{
  const navigate= useNavigate()
    const [isExpanded, setIsExpanded] = useState(false)
    const logout = () => {
      localStorage.clear()
      navigate('/')
      return alert('Thanks for stepping by, have a great day')
    }

    return (
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 flex items-center justify-center rounded-full px-2 py-1 hover:bg-gray-400 bg-gray-300 font-light"
        >
          <div className="">{userName}</div>

        </button>
        {isExpanded &&
          <div className="absolute right-1 top-8 bg-white rounded border border-gray-300 pb-1 mt-3 w-40">
            <ul>
                <li
                  onClick={() => {
                    setIsExpanded(false);
                    navigate('/account')
                  }}
                  className="hover:bg-blue-500 hover:text-white px-2 cursor-pointer border-b text-base py-2 font-normal"
                  key="account">
                  Account
                </li>
                <li
                  onClick={() => {
                    setIsExpanded(false);
                    logout()
                  }}
                  className="hover:bg-blue-500 hover:text-white px-2 cursor-pointer py-1 text-base font-normal"
                  key="logout">
                  Logout
                </li>
            </ul>
          </div>
        }
      </div>
    )
  }

export default DropDown