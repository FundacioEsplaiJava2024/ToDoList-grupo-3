import React, {useState} from "react";
import {  BsThreeDotsVertical } from "react-icons/bs";
import { Option } from "../model/option";

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
          <BsThreeDotsVertical />
        </div>
        {isOpen && <div className="dropdown-list-container">
          {options.map((option: Option) => {
            /*return(
              <button onClick={option.value == "Edit" ? () => setIsOpen(false) : () => option.onClick()} className={` dropdown-list-btn`}>
                {option.value}
              </button>
            )*/
           return(
              <button onClick= {()=> {setIsOpen(false);option.onClick()}} className={` dropdown-list-btn`}>
              {option.value}
            </button>
           )
          })}
        </div>}
      </div>
    )
  }