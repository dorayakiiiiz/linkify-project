import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BaseLayout from './layouts/BaseLayout'
import BlankLayout from './layouts/BlankLayout'


import ProtectedRoute from './routes/ProtectedRoute'

import OnboardingProfile from './pages/Onboarding/OnboardingProfile'
import OnboardingLink from './pages/Onboarding/OnboardingLink'

import DashboardRedirector from './pages/DashboardRedirector'

import UserManagementPage from './pages/AdminDashboard/UserManagementPage'
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext'
import { LinkProvider } from './context/LinkContext'
import DashboardLayout from './layouts/DashboardLayout'
import LinksPage from './pages/CreatorDashboard/LinksPage'
import DesignPage from './pages/CreatorDashboard/DesignPage'
import ShopPage from './pages/CreatorDashboard/ShopPage'
import InsightsPage from './pages/CreatorDashboard/InsightsPage'

// Định nghĩa các route trong này

function App() {
    return (
        <AuthProvider>
            <ProfileProvider>
                <LinkProvider>
                    <Routes>

                        {/* Layout ở home có navbar + footer */}
                        <Route element={<BaseLayout />}>
                            <Route path="/" element={<Home />} />
                        </Route>

                        {/* Layout ko có navbar + footer */}
                        <Route element={<BlankLayout />}>

                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/register" element={<Register />} />

                            <Route element={<ProtectedRoute allowedRoles={['creator']} />}>
                                <Route path="/onboarding/profile" element={<OnboardingProfile />} />
                                <Route path="/onboarding/link" element={<OnboardingLink />} />
                            </Route>


                            <Route path="/dashboard">
                                <Route element={<ProtectedRoute />}>
                                    <Route index element={<DashboardRedirector />} />
                                </Route>

                                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                                    <Route path="admin/users" element={<UserManagementPage />} />
                                </Route>

                                <Route element={<ProtectedRoute allowedRoles={['creator']} />}>
                                    <Route element={<DashboardLayout />}>                            
                                        <Route path="links" element={<LinksPage />} />
                                        <Route path="design" element={<DesignPage />} />
                                        <Route path="shop" element={<ShopPage />} />
                                        <Route path="insights" element={<InsightsPage />} />
                                        {/* Các tool routes khác... */}
                                    </Route>
                                </Route>
                            </Route>




                        </Route>

                    </Routes>
                </LinkProvider>
            </ProfileProvider>
        </AuthProvider>
    )
}

export default App;
