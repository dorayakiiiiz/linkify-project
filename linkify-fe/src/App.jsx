import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import BaseLayout from "./layouts/BaseLayout";
import BlankLayout from "./layouts/BlankLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import OnboardingProfile from "./pages/Onboarding/OnboardingProfile";
import OnboardingLink from "./pages/Onboarding/OnboardingLink";

import DashboardRedirector from "./pages/DashboardRedirector";

import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { LinkProvider } from "./context/LinkContext";
import { ShopProvider } from "./context/ShopContext";

import PublicProfile from "./pages/PubicProfile";

import CreatorDashboardLayout from "./layouts/CreatorDashboardLayout";
import LinksPage from "./pages/CreatorDashboard/LinksPage";
import DesignPage from "./pages/CreatorDashboard/DesignPage";
import ShopPage from "./pages/CreatorDashboard/ShopPage";
import InsightsPage from "./pages/CreatorDashboard/InsightsPage";
import PostIdeaPage from "./pages/CreatorDashboard/Tools/PostIdeaPage";
import LinkShortenerPage from "./pages/CreatorDashboard/Tools/LinkShortenerPage";
import MobilePreview from "./components/CreatorDashboard/MobilePreview";

import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import UserManagementPage from "./pages/AdminDashboard/UserManagementPage";
import LinkManagementPage from "./pages/AdminDashboard/LinkManagementPage";
import ShopManagementPage from "./pages/AdminDashboard/ShopManagementPage";
import ThemeManagementPage from "./pages/AdminDashboard/ThemeManagementPage";

// Định nghĩa các route trong này

function App() {
    return (
        <AuthProvider>
            <ProfileProvider>
                <LinkProvider>
                    <ShopProvider>
                        <Routes>
                            {/* Layout ở home có navbar + footer */}
                            <Route element={<BaseLayout />}>
                                <Route path="/" element={<Home />} />
                            </Route>

                            {/* Layout ko có navbar + footer */}
                            <Route element={<BlankLayout />}>
                                <Route path="/auth/login" element={<Login />} />
                                <Route path="/auth/register" element={<Register />} />
                                <Route path="/auth/reset-password" element={<ResetPassword />} />

                                <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
                                    <Route path="/onboarding/profile" element={<OnboardingProfile />} />
                                    <Route path="/onboarding/link" element={<OnboardingLink />} />
                                </Route>

                                <Route path="/dashboard">
                                    {/* all route trong /dashboard phải qua dashboard redirector */}
                                    <Route element={<ProtectedRoute />}>
                                        <Route index element={<DashboardRedirector />} />
                                    </Route>

                                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                                        <Route path="admin" element={<AdminDashboardLayout />}>

                                            <Route path="users" element={<UserManagementPage />} />
                                            <Route path="links" element={<LinkManagementPage />} />
                                            <Route path="shop" element={<ShopManagementPage />} />
                                            <Route path="themes" element={<ThemeManagementPage />} />

                                        </Route>
                                    </Route>

                                    <Route
                                        element={<ProtectedRoute allowedRoles={["creator"]} />}
                                    >
                                        <Route element={<CreatorDashboardLayout />}>
                                            <Route path="links" element={<LinksPage />} />
                                            <Route path="design" element={<DesignPage />} />
                                            <Route path="shop" element={<ShopPage />} />
                                            <Route path="insights" element={<InsightsPage />} />
                                            <Route path="preview" element={<MobilePreview />} />

                                            {/* Tools */}
                                            <Route path="tools">
                                                <Route path="post-ideas" element={<PostIdeaPage />} />
                                            </Route>
                                        </Route>
                                    </Route>
                                </Route>

                                {/* linkify public profile */}
                                <Route path="/:username" element={<PublicProfile />} />
                            </Route>
                        </Routes>
                        {/* SHOP FEATURE - Close ShopProvider */}
                    </ShopProvider>
                </LinkProvider>
            </ProfileProvider>
        </AuthProvider>
    );
}

export default App;
