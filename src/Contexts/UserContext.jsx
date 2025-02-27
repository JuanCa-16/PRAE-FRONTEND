import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(()=>{
        const token = localStorage.getItem("token");
        return token ? jwtDecode(token) : null;
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);


