import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { SoundProvider, preloadSounds } from 'react-sounds';
import { ContextProvider } from './Contexts/UserContext';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './global.scss';

// 🎧 Sonidos que quieres usar
const sonidos = ['ui/blocked', 'ui/success_bling', 'ui/submit', 'notification/error', 'ui/success_blip', 'ui/radio_select', 'ui/window_open', 'ui/window_close'];

// 🧠 Función para iniciar la app después del intento de precarga
const startApp = () => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<React.StrictMode>
			<ContextProvider>
				<SoundProvider
					preload={sonidos}
					initialEnabled={true}
				>
					<App />
					<Toaster />
					<SpeedInsights />
				</SoundProvider>
			</ContextProvider>
		</React.StrictMode>
	);
};

// 🚀 Intenta precargar sonidos, pero no bloquea la app si falla
preloadSounds(sonidos)
	.then(() => {
		console.log('✅ Sonidos precargados correctamente');
		startApp();
	})
	.catch((err) => {
		console.warn('⚠️ Error precargando sonidos. Continuando sin preload:', err);
		startApp(); // 🔁 Igual cargamos la app
	});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
