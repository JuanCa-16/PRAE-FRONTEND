import React, {useState} from 'react'
import './Selector.scss'
import Select from "react-select";
import { useTheme } from '../../Contexts/UserContext'
const Selector = ({titulo, multi = true, opciones, valores, onChange, placeholder}) => {
    const {theme} = useTheme() 
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className={`selector ${theme}`}>
            <p className={`input-title lato ${isFocused? 'focused' : ''}`}>{titulo}</p>
            <Select
                classNamePrefix="react-select"
                isMulti = {multi}
                options={opciones}
                value={valores}
                onChange={onChange}
                placeholder= {placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    )
}

export default Selector
