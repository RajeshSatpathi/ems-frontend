import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const userContext = createContext();
function AuthContext({ children }) {
    const [userData, setuserData] = useState();
    const [loading, setloading] = useState(true);


    const login = (data) => {
        setuserData(data);
    }
    const logout = () => {
        setuserData(null)
        localStorage.removeItem("token");
       window.location.href = "/"; // ✅ correct browser redirect

    }
    useEffect(() => {
        const verifyUserAPICall = async () => {

            const token = localStorage.getItem("token");
            if (!token) {
                setuserData(null);
                setloading(false);
                return;
            }
            try {
                const url = "http://localhost:8000/api/auth/verify";


                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log(data)

                if (response.ok && data.success) {
                    setuserData(data.user);
                } else {
                    setuserData(null);
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                setuserData(null);
            } finally {
                setloading(false);
            }
        };

        verifyUserAPICall();
    }, []);
    if (loading) {
        return <div>Loading......</div>
    }

    return (
        <userContext.Provider value={{ userData, login, logout, loading }}>
            {children}
        </userContext.Provider>
    )
}
export const useAuth = () => useContext(userContext);

export default AuthContext