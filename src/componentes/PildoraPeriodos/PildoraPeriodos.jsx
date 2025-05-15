import React from 'react';
import PildoraMateriaGrado from '../PildoraMateriaGrado/PildoraMateriaGrado.jsx';
import InputContainer from '../Input/InputContainer.jsx';
import Alerta from '../Alerta/Alerta.jsx';
import './PildoraPeriodos.scss';

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
