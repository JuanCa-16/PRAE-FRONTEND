import React from 'react';
import PildoraMateriaGrado from '../PildoraMateriaGrado/PildoraMateriaGrado.jsx';
import InputContainer from '../Input/InputContainer.jsx';
import Alerta from '../Alerta/Alerta.jsx';
import './PildoraPeriodos.scss';

/**
 * Componente PildoraPeriodos que muestra un formulario para gestionar un periodo académico, 
 * incluyendo el peso, la fecha de inicio y la fecha de fin. Realiza validaciones en los campos 
 * y permite la edición condicional de las fechas.
 * 
 * @component
 * 
 * @param {string} titulo - El título del periodo (e.g., "PERIODO 1", "PERIODO 2").
 * @param {Object} valores - Objeto que contiene los valores del periodo:
 *   - {string} peso - El peso del periodo (valor inicial, generalmente vacío).
 *   - {string} fecha_inicio - La fecha de inicio del periodo en formato `YYYY-MM-DD`.
 *   - {string} fecha_fin - La fecha de fin del periodo en formato `YYYY-MM-DD`.
 * @param {function} onChange - Función que se ejecuta cuando se modifica el valor de algún campo.
 *   Recibe un objeto con:
 *   - {string} periodoKey - El nombre del campo modificado (por ejemplo: 'peso', 'fecha_inicio', 'fecha_fin').
 *   - {string|number} value - El nuevo valor del campo.
 * @param {string} color - El color que se usa para personalizar el estilo del componente (por ejemplo, 'azul', 'morado').
 * @param {boolean} editable - Determina si los campos de fecha son editables o no.
 * @param {string} [minInicio] - La fecha mínima que se puede seleccionar en los campos de fecha, debe estar en formato `YYYY-MM-DD`.
 * 
 * @returns {JSX.Element} Un formulario que permite gestionar un periodo académico, con campos de entrada
 * para el peso y las fechas de inicio y fin, con validaciones y edición condicional de las fechas.
 */


const PildoraPeriodos = ({ titulo, valores, onChange, color, editable, minInicio }) => {
	//recibe el titulo del input que se modifico y el valor que recibio del inputContainer y llama a la funcion del padre con estos parametros
	const handleChange = (periodoKey, value) => {
		if (periodoKey === 'peso') {
			const num = Number(value);
			if (isNaN(num) || num < 0 || num > 100) {
				Alerta.error('Excederas el 100%');
				return; // No continuar si la validación falla
			}
		}

		// Validar fechas solo si se modifica inicio o fin y ambos existen
		if (periodoKey === 'inicio' || periodoKey === 'fin') {
			const nuevaFechaInicio = periodoKey === 'inicio' ? value : valores.inicio;
			const nuevaFechaFin = periodoKey === 'fin' ? value : valores.fin;

			if (nuevaFechaInicio && nuevaFechaFin) {
				const fechaInicioDate = new Date(nuevaFechaInicio);
				const fechaFinDate = new Date(nuevaFechaFin);

				if (fechaFinDate <= fechaInicioDate) {
					Alerta.error('La fecha de fin debe ser posterior a la fecha de inicio');
					return; // No continuar si la validación falla
				}
			}
		}
		onChange({ periodoKey, value });
	};
	return (
		<div className='periodoPildora'>
			<div className='formulario'>
				<div className='titulos'>
					<div className='tituloPeriodo'>
						<PildoraMateriaGrado
							texto={titulo}
							color={color}
						></PildoraMateriaGrado>
					</div>
					<div className='inputPorcentaje'>
						<InputContainer
							titulo='Peso:'
							placeholder='25%'
							required={true}
							value={valores.peso}
							onChange={(value) => handleChange('peso', value)}
							inputType='number'
						></InputContainer>
					</div>
				</div>
				<div className='inputs'>
					<InputContainer
						titulo='Fecha Inicio:'
						placeholder='DD/MM/AA'
						required={true}
						value={valores.fecha_inicio}
						onChange={(value) => handleChange('fecha_inicio', value)}
						inputType='date'
						isDisabled={!editable}
						tituloDisabled='Debes llenar primero el periodo anterior'
						minInicio={minInicio}
					></InputContainer>
					<InputContainer
						titulo='Fecha Fin:'
						placeholder='DD/MM/AA'
						required={true}
						value={valores.fecha_fin}
						onChange={(value) => handleChange('fecha_fin', value)}
						inputType='date'
						isDisabled={!editable}
						tituloDisabled='Debes llenar primero el periodo anterior'
						minInicio={minInicio}
					></InputContainer>
				</div>
			</div>
		</div>
	);
};

export default PildoraPeriodos;
