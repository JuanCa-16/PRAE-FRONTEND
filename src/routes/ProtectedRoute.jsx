import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

/** 
 * Componente: ProtectedRoute
 * Descripción: Componente que protege rutas de acceso, permitiendo el acceso solo a usuarios autorizados.
 * Funcionalidad:
 *      - Verifica si el usuario tiene acceso a la ruta mediante la prop `isAllowed`.
 *      - Si el acceso no está permitido, redirige al usuario a la ruta especificada por la prop `redireccionar` (por defecto, "/login").
 *      - Si el acceso está permitido, renderiza los `children` o el `Outlet` para mostrar las rutas hijas.
 * Props:
 *      - `children` (elemento): Elementos hijos a renderizar si el acceso es permitido.
 *      - `isAllowed` (boolean): Controla si el usuario tiene acceso (true o false).
 *      - `redireccionar` (string): Ruta a la que redirigir si el acceso está denegado (por defecto: "/login").
 */

export const ProtectedRoute = ({ children, isAllowed, redireccionar="/login"}) => {

    if(!isAllowed){
        return <Navigate to={redireccionar} replace />
    }

    return children? children: <Outlet/>
}
