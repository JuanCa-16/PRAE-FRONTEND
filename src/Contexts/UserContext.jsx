import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();
const ThemeContext = createContext();

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null; // Si no hay token, devuelve null

    try {
        console.log(jwtDecode(token));
        return jwtDecode(token);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null; // Devuelve null si el token es inválido
    }
});

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                return;
            }

            try {
                setUser(jwtDecode(token));
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });
    

    useEffect(() => {
        localStorage.setItem("theme", theme); // Guardar el tema en localStorage
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export const useTheme = () => useContext(ThemeContext);


