// cung cấp data global về authentication qua useContext

import { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/userService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoading, setIsLoading] = useState(true);


    // nếu có token thì fetch lại user từ API
    // useeffect ko dc dùng async trực tiếp
    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const { user } = await userService.getAccount();
                    // data trả về nằm trong res.data
                    setUser(user);
                } catch (err) {
                    console.log('Error while getting user account: ', err);
                } finally {
                    // loading xong
                    setIsLoading(false);
                }
            }
            fetchUser();
        } else {
            // must have, phải set loading false nếu ko sẽ bị mắt kẹt ở màn loading mãi
            setIsLoading(false);
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

    // render ra trang loading ở đây
    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-[#0060AD] text-5xl text-[#fff] font-momo">
                Linkify is loading...
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout, isLogin: !!token }}>
            {children}
        </AuthContext.Provider>
    )

}

