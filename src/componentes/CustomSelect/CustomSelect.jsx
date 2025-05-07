import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './CustomSelect.scss';

const CustomSelect = ({ opciones, valorSeleccionado, setValorSeleccionado, titulo = 'Titulo', placeholder }) => {
	const [abierto, setAbierto] = useState(false);
	const [filtro, setFiltro] = useState(valorSeleccionado || ''); // Estado del input
	const selectRef = useRef(null);
	const { theme } = useTheme();

	// Sincroniza el input con el valor seleccionado
	useEffect(() => {
		setFiltro(valorSeleccionado);
	}, [valorSeleccionado]);

	const opcionesFiltradas = opciones.filter((opcion) =>
		opcion?.toLowerCase().includes(filtro?.toLowerCase() || '')
	);

	const manejarSeleccion = (opcion) => {
		setValorSeleccionado(opcion);
		setFiltro(opcion);
		setAbierto(false);
	};

	useEffect(() => {
		const manejarClickFuera = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setAbierto(false);
			}
		};

		document.addEventListener('click', manejarClickFuera);
		return () => {
			document.removeEventListener('click', manejarClickFuera);
		};
	}, []);

	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={`custom-select ${theme}`}
			ref={selectRef}
		>
			<p
				htmlFor='selected'
				className={`input-title lato ${isFocused ? 'focused' : ''}`}
			>
				{titulo}
			</p>
			<input
				type='text'
				value={filtro}
				onChange={(e) => {
					setFiltro(e.target.value);
					setAbierto(true);
				}}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onClick={() => setAbierto(true)}
				placeholder={placeholder}
				className='selected'
			/>
			{abierto && (
				<div className='options'>
					<div
						className='option'
						onClick={() => manejarSeleccion('')}
					>
						{titulo}
					</div>
					{opcionesFiltradas.length > 0 ? (
						opcionesFiltradas.map((opcion, index) => (
							<div
								key={index}
								className='option'
								onClick={() => manejarSeleccion(opcion)}
							>
								{opcion}
							</div>
						))
					) : (
						<div className='option disabled'>No hay resultados</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
