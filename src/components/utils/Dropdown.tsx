import React, {useState} from "react";
import { GoChevronDown } from "react-icons/go";
import { Option } from "../../model/option";
import './Dropdown.css'

interface DropdownItemProps {
    options: Array<Option>
  }

export const Dropdown: React.FC<DropdownItemProps> = ({ options}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }
  
    return (
      <div className="dropdown">
        <div className="dropdown-title" onClick={toggleDropdown}>
          <GoChevronDown />
        </div>
        {isOpen && <div className="dropdown-list-container">
          {options.map((option: Option) => {
           return(
              <button onClick= {()=> {setIsOpen(false);option.onClick()}} className="button">
              {option.value}
            </button>
           )
          })}
        </div>}
      </div>
    )
  }