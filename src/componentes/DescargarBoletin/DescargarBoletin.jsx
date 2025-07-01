import React, { useState } from 'react';
import { PdfIcon } from '../Icons/Icons';
import { useUser } from '../../Contexts/UserContext';
import Alerta from '../Alerta/Alerta';
import './DescargarBoletin.scss';

const DescargarBoletin = ({ idEst }) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();
	const [descargando, setDescargando] = useState(false);

	const generarPdf = async () => {
		setDescargando(true);
		const ruta = user.rol === 'admin' ? `${API_URL}boletines/${idEst}` : `${API_URL}boletines/final`;
		try {
			const response = await fetch(ruta, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) throw new Error('Error al generar el PDF');

			// 1️⃣  Convertimos la respuesta en blob (bytes del PDF)
			const blob = await response.blob();

			// 2️⃣  Creamos una URL temporal en memoria
			const url = window.URL.createObjectURL(blob);

			// 3️⃣  Simulamos clic en un <a> oculto para iniciar la descarga
			const a = document.createElement('a');
			a.href = url;
			a.download = `boletin_${idEst || 'general'}.pdf`; // nombre sugerido
			document.body.appendChild(a);
			a.click();

			// 4️⃣  Limpieza
			a.remove();
			window.URL.revokeObjectURL(url);
			setDescargando(false);
		} catch (error) {
			console.error(error);
			Alerta.error('No se pudo descargar el PDF');
			setDescargando(false);
		}
	};

	return (
		<div className='contenedorDescarga'>
			<button
				disabled={descargando}
				onClick={generarPdf}
				className='pdf'
			>
				<PdfIcon></PdfIcon> {descargando ? 'Descargando...' : 'Descargar Boletin'}
			</button>
		</div>
	);
};

export default DescargarBoletin;
