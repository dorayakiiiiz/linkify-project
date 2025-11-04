import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BaseLayout from './layouts/BaseLayout'
import BlankLayout from './layouts/BlankLayout'
import PrivateRoute from './routes/PrivateRoute'

import Demo from './pages/Dashboard/Demo'

import { AuthProvider } from './context/AuthContext'

// Định nghĩa các route trong này

function App() {
    return (
        <AuthProvider>
            <Routes>

                {/* Layout có navbar + footer */}
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<Home />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard/" element={<Demo />} />
                    </Route>
                </Route>

                {/* Layout ko có navbar + footer */}
                <Route element={<BlankLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Route>

            </Routes>
        </AuthProvider>
    )
}

export default App
