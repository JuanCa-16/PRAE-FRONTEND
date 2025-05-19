import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import TituloDes from '../../componentes/TituloDes/TituloDes';
import InputContainer from '../../componentes/Input/InputContainer';
import PildoraMateriaGrado from '../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Line from '../../componentes/Line/Line';
import posterCel from '../../assets/posterCel.png';
import Logo from '../../assets/logo.png';
import './Login.scss';

export default function Login({ func }) {
	//Valores de los inputs
	const [getDataLogin, SetgetDatasLogin] = useState({
		correo: '',
		password: '',
	});

	const { setBloqueoDemo } = useUser();

	const [demo, setDemo] = useState(false);

	const navigate = useNavigate();

	//captar info de los inputs
	const handleChange = (titulo, value) => {
		SetgetDatasLogin({
			...getDataLogin,
			[titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
		});
	};

	//ENVIO DEL FORMULARIO ------ BACK
	const handlerLogin = (e) => {
		e.preventDefault();
		console.log(getDataLogin);

		//Le envio a APP el resultado para actualiar valores del usuario. por ahora esto luego TOKEN
		func(getDataLogin.correo, getDataLogin.password);
		// navigate("/home") /* cambiar la ruta despues */
	};

	const handlerDemo = (rol) => {
		console.log(rol);
		setBloqueoDemo(true);
		func(rol,'no-password', true);
	};

	return (
		<div className={`contenedorLogin ${demo ? 'demoView' : ''}`}>
			<div className=' pagLogin'>
				<div className='izq'>
					<div className='imagen_logo'>
						<div className='contenedorPoster'>
							<img
								className='img_login'
								src={posterCel}
								alt='images'
							/>
						</div>
						<div className='info'>
							<img
								className='logo'
								src={Logo}
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
							titulo='Bienvenido'
							desc='Accede a tu información académica en un solo lugar.'
						></TituloDes>
					</div>
					<form
						onSubmit={handlerLogin}
						className='Form_login'
					>
						<div className='inputs'>
							<InputContainer
								placeholder='correo@gmail.com'
								titulo='correo electronico:'
								inputType='email'
								value={getDataLogin.correo}
								required={true}
								nomInput='correo'
								onChange={(value) => handleChange('correo', value)}
							/>
							<InputContainer
								placeholder='*'
								titulo='Clave:'
								inputType='password'
								value={getDataLogin.password}
								required={true}
								nomInput='password'
								onChange={(value) => handleChange('password', value)}
							/>
						</div>
						<p
							className='lato_1'
							onClick={() => navigate('/recuperar-clave')}
						>
							Olvidaste tu contraseña?
						</p>
						<div className='btn_login'>
							<button type='submit'>Ingresar</button>
						</div>
					</form>
					<div className='contenedorDemo'>
						<TituloDes
							titulo='Prueba PRAE sin tener cuenta'
							desc='Accede a una prueba, algunas acciones estaran bloqueadas.'
						></TituloDes>
						<PildoraMateriaGrado
							color='azul'
							texto='ADMINISTRADOR'
							onClick={() =>
								handlerDemo('admin')
							}
						></PildoraMateriaGrado>
						<PildoraMateriaGrado
							color='morado'
							texto='DOCENTE'
							onClick={() => handlerDemo('docente')}
						></PildoraMateriaGrado>
						<PildoraMateriaGrado
							color='amarillo'
							texto='ESTUDIANTE'
							onClick={() => handlerDemo('estudiante')}
						></PildoraMateriaGrado>
					</div>
					<Line></Line>
					<div className='btnDemo'>
						<button onClick={() => setDemo(!demo)}>
							{!demo ? 'Ir a demo' : 'Ir a Inicio'}{' '}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
