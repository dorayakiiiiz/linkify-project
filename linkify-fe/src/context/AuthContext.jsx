// cung cấp data global về authentication qua useContext

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // nếu có token thì fetch lại user từ API
    // useeffect ko dc dùng async trực tiếp
    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const res = await api.get('/user/account');
                    // data trả về nằm trong res.data
                    setUser(res.data.user);
                } catch (err) {
                    console.log('Error while getting user account: ', err);
                }
            }
            fetchUser();
        }
    }, [token]);

    // const login = (user, jwt) => {
    //     setUser(user);
    //     setToken(jwt);
    //     localStorage.setItem('token', jwt);
    // }

    const login = (jwt) => {
        setToken(jwt);
        localStorage.setItem('token', jwt);
    }

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLogin: !!token }}>
            {children}
        </AuthContext.Provider>
    )

}

