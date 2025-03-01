import React from 'react'
import './Line.scss'
import { useTheme } from '../../Contexts/UserContext'
const Line = () => {
  
    const {theme} = useTheme() 
    return (
    <div className={`linea ${theme}`}>
    
    </div>
  )
}

export default Line
