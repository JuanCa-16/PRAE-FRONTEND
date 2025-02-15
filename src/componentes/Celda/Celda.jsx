import React from 'react'
import './Celda.scss' 

const Celda = ({txt="Valor", tipo="titulo", rol="ver"}) => {
    return (
        <div className={`celda ${tipo} ${rol}`}>
            <p>{txt}</p>
        </div>
)
}

export default Celda
