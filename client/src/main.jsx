import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Set the base URL globally for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://events-povy.onrender.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
