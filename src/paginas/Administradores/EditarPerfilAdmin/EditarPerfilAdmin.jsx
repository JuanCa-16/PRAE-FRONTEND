import React, { useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../../Contexts/UserContext';
import Alerta from '../../../componentes/Alerta/Alerta';
import InputContainer from '../../../componentes/Input/InputContainer';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './EditarPerfilAdmin.scss';

const EditarPerfilAdmin = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user, setUser, bloqueoDemo } = useUser();
	
	const [cargando, setCargando] = useState(false)

	function capitalizeWords(str) {
		return str
			.split(' ') // Divide en palabras
			.map((word) =>
				word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
			)
			.join(' ');
	}

	// Estado inicial que se usará para comparar
	const initialFormData = useRef({
		apellidos: user.apellido,
		nombre: user.nombre,
		correo: user.email,
		doc: user.id,
		contrasena: '',
	});

	//Datos inciales a mostrar
	const [formData, setFormData] = useState(initialFormData.current);

	//Actualizar inputs
	const handleChange = (titulo, value) => {
		setFormData({
			...formData,
			[titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
		});
	};

	//Envio del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		const dataToSend = {
			...formData,
			contrasena: formData.contrasena || null,
		};

		console.log('Datos enviados:', dataToSend);

		if (!bloqueoDemo) {
			setCargando(true)
			try {
				const response = await fetch(`${API_URL}usuario/updateAdmin/${dataToSend.doc}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						nombre: dataToSend.nombre,
						apellido: dataToSend.apellidos,
						correo: dataToSend.correo,
						contraseña: dataToSend.contrasena || undefined,
						id_institucion: user.institucion.id_institucion,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					//toast
					throw new Error(`${errorData.error || response.status}`);
				}

				const data = await response.json();

				
				console.log('ADMIN EDITADO EXITOSAMENTE', data);
				Alerta.success('Datos actualizados correctamente');
				setCargando(false)

				if (data.token) {
					// 2. Guarda el nuevo token en localStorage
					localStorage.setItem('token', data.token);

					setUser(jwtDecode(data.token));
				}
			} catch (error) {
				
				setCargando(false)
				Alerta.error(error.message);
				console.error(error);
			}
		}
	};

	const isFormUnchanged =
		JSON.stringify({ ...formData, contrasena: '', doc: '' }) ===
			JSON.stringify({ ...initialFormData.current, contrasena: '', doc: '' }) && !formData.contrasena; // Permite activar si escriben algo en "contrasena"

	return (
		<div className='contenedorPerfilAdmin'>
			<div className='editar'>
				<TituloDes
					titulo='EDITA TU PERFIL'
					desc='Accede a tu perfil y actualiza tus datos personales para mantener tu información actualizada y garantizar una gestión eficiente en la plataforma.'
				/>
				<form
					onSubmit={handleSubmit}
					className='formulario'
				>
					<div className='inputs'>
						<InputContainer
							nomInput='apellidos'
							titulo='Apellidos'
							placeholder='Ingresa tus apellidos'
							value={formData.apellidos}
							inputType='text'
							required={true}
							onChange={(value) =>
								handleChange('apellidos', capitalizeWords(value))
							}
						/>
						<InputContainer
							nomInput='nombres'
							titulo='Nombres'
							placeholder='Ingresa tu(s) nombre(s)'
							value={formData.nombre}
							inputType='text'
							required={true}
							onChange={(value) =>
								handleChange('nombre', capitalizeWords(value))
							}
						/>
						<InputContainer
							nomInput='coreo'
							titulo='Correo'
							placeholder='Ej: correo@example.com'
							value={formData.correo}
							required={true}
							onChange={(value) => handleChange('correo', value)}
						/>
						<InputContainer
							nomInput='contra'
							titulo='Contraseña'
							placeholder='*******'
							value={formData.contrasena}
							required={false}
							inputType='password'
							onChange={(value) => handleChange('contrasena', value)}
						/>
						<InputContainer
							nomInput='doc'
							titulo='Documento'
							inputType='text'
							value={formData.doc}
							required={false}
							isDisabled={true}
							onChange={(value) => handleChange('doc', value)}
						/>
					</div>
					<button
						type='submit'
						disabled={bloqueoDemo || isFormUnchanged || cargando}
					>
						{cargando? 'Guardando...': 'Guardar'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditarPerfilAdmin;
