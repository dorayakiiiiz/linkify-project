import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Định nghĩa các route trong này

function App() {
    return (
        <>
            <Navbar />
            <main
                className="min-h-[534px] flex items-center justify-center"
            >

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                </Routes>
            </main>

            <Footer />
        </>
    )
}

export default App
