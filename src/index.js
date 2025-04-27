import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './Contexts/UserContext';
import { Toaster } from 'react-hot-toast';
import "./componentes/Alerta/Alerta.scss";
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <Toaster />
      <SpeedInsights/>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
