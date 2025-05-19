import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TituloDes from '../../componentes/TituloDes/TituloDes';
import InputContainer from '../../componentes/Input/InputContainer';
import Alerta from '../../componentes/Alerta/Alerta';
import imagenLogin from '../../assets/imagenLogin.png';
import emailLogo from '../../assets/emailLogo.png';

import './RecuperarClave.scss';

export default function RecuperarClave() {

	
	const API_URL = process.env.REACT_APP_API_URL;

	//Valores de los inputs
	const [getCorreo, SetGetCorreo] = useState({
		correo: '',
	});

	const [cargando, setCargado] = useState(false);

	const navigate = useNavigate();

	//captar info de los inputs
	const handleChange = (titulo, value) => {
		SetGetCorreo({
			...getCorreo,
			[titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
		});
	};

	//ENVIO DEL FORMULARIO ------ BACK
	const handlerRecuperacion = async (e) => {
		e.preventDefault();
		console.log(getCorreo);
		setCargado(true);

		try {
			const response = await fetch(`${API_URL}auth/recoverPassword`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: getCorreo.correo }),
			});

			if (!response.ok) {
				const errorData = await response.json(); // Obtiene respuesta del servidor
				console.log(errorData);
				throw new Error(`${errorData.detalle || response.status}`);
			}

			setCargado(false);
			
			console.log('Correo enviado');
			Alerta.success('Correo enviado con exito');
			navigate('/login');
		} catch (error) {
			
			console.error('Error al recuperar clave', error);
			Alerta.error(error.message);
			setCargado(false);
		}
	};

	return (
		<div className='contenedorRecuperarClave'>
			<div className=' pagRecuperar'>
				<div className='izq'>
					<div className='imagen_logo'>
						<img
							className='img_login'
							src={imagenLogin}
							alt='images'
						/>
						<div className='info'>
							<img
								className='logo'
								src={emailLogo}
								alt='imges_logo'
							/>
							<h4 className='lato'>
								Plataforma de Registro Académico Estudiantil
							</h4>
							<p className='lato'>
								Gestiona cursos, docentes y estudiantes de forma rápida
								y eficiente
							</p>
						</div>
					</div>
				</div>

				<div className='der'>
					<div className='title'>
						<TituloDes
							titulo='Recuperar Contraseña'
							desc='Digita el correo asociado a tu cuenta para recibir un enlace para reestablecerla.'
						></TituloDes>
					</div>
					<form
						onSubmit={handlerRecuperacion}
						className='Form_login'
					>
						<div className='inputs'>
							<InputContainer
								placeholder='correo@gmail.com'
								titulo='correo electronico:'
								inputType='email'
								value={getCorreo.correo}
								required={true}
								nomInput='correo'
								onChange={(value) => handleChange('correo', value)}
							/>
						</div>
						<p
							className='lato_1'
							onClick={() => navigate('/login')}
						>
							Iniciar Sesión
						</p>
						<div className='btn_login'>
							<button
								type='submit'
								disabled={cargando}
							>
								{cargando ? 'Enviando...' : 'Enviar'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
