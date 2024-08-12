import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Error from './Screens/Error.jsx' 
import './index.css'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

createRoot(document.getElementById('root')).render
(
  <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/colombia_dash" replace />} />
        <Route path="/colombia_dash" element={<App />} />
        <Route path="*" element={<Error />} />
        </Routes>
      </Router>

)
