import React, { useState } from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './CrearObservacion.scss';
import Alerta from '../../../componentes/Alerta/Alerta';

const CrearObservacion = () => {
    
        //Datos inciales a mostrar
        const [formData, setFormData] = useState({
            observacion: '',
        });
    
        //Actualizar inputs
        const handleChange = (titulo, value) => {
            setFormData({
                ...formData,
                [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
            });
        };
    
        //Envio del formulario
        const handleSubmit = (e) => {
            e.preventDefault()
            Alerta.success('Observación realizada correctamente');
            console.log('Datos enviados:', formData);
            setFormData({observacion: ''})
        };
    
        return (
            <div className='contenedorCrearObser'>
                <div className="editar">
                    <TituloDes titulo='REALIZAR OBSERVACION ESTUDIANTE' desc='Realiza observacion a tu estudiante' />
                    <form onSubmit={handleSubmit} className="formulario">
                        <div className="inputs">
                            <div className="input-container">
                                <label htmlFor='observacionDocente'>Observaciones</label>
                                <textarea
                                    id='observacionDocente'
                                    value={formData.observacion}
                                    onChange={(e) => handleChange('observacion',  e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' >Guardar Cambios</button>
                    </form>
                </div>
            </div>
        );
    };



export default CrearObservacion
