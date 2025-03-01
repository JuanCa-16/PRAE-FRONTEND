import React from 'react'
import './Selector.scss'
import Select from "react-select";
import { useTheme } from '../../Contexts/UserContext'
const Selector = ({titulo, multi = true, opciones, valores, onChange, placeholder}) => {
    const {theme} = useTheme() 
    return (
        <div className={`selector ${theme}`}>
            <h4>{titulo}</h4>
            <Select
                classNamePrefix="react-select"
                isMulti = {multi}
                options={opciones}
                value={valores}
                onChange={onChange}
                placeholder= {placeholder}
            />
        </div>
    )
}

export default Selector
