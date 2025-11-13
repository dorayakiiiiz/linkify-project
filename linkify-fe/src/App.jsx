import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BaseLayout from './layouts/BaseLayout'
import BlankLayout from './layouts/BlankLayout'

// import PrivateRoute from './routes/PrivateRoute'
import CreatorRoute from './routes/CreatorRoute'
// import AdminRoute from './routes/AdminRoute'

import Onboarding from './pages/Onboarding'

import Dashboard from './pages/Dashboard/Dashboard'

import { AuthProvider } from './context/AuthContext'

// Định nghĩa các route trong này

function App() {
    return (
        <AuthProvider>
            <Routes>

                {/* Layout có navbar + footer */}
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<Home />} />


                    {/* <Route element={<CreatorRoute />}>
                        <Route path="/dashboard/creator" element={<DemoCreatorHome />} />
                    </Route> */}

                    
                </Route>

                {/* Layout ko có navbar + footer */}
                <Route element={<BlankLayout />}>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    
                    {/* fix ở đây đổi qua route  */}
                    <Route element={<CreatorRoute />}>
                        <Route path="/onboarding" element={<Onboarding />} />
                    </Route>








                    {/* <Route element={<AdminRoute />}>
                        <Route path="/dashboard/admin" element={<AdminDashboard />} />
                    </Route> */}

                    <Route path="/dashboard" element={<Dashboard />} />


                </Route>

            </Routes>
        </AuthProvider>
    )
}

export default App
