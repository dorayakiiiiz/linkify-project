import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BaseLayout from './layouts/BaseLayout'
import BlankLayout from './layouts/BlankLayout'

// Định nghĩa các route trong này

function App() {
    return (
        <Routes>

            {/* Layout có navbar + footer */}
            <Route element={<BaseLayout />}>
                <Route path="/" element={<Home />} />

            </Route>

            {/* Layout ko có navbar + footer */}
            <Route element={<BlankLayout />}>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
            </Route>


        </Routes>
    )
}

export default App
