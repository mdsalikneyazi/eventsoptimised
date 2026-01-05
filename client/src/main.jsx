import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Global Axios configuration (serverless-friendly)
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL ?? "https://events-povy.onrender.com"

axios.defaults.timeout = 10000
axios.defaults.headers.common['Accept'] = 'application/json'

// React Query / caching provider will be added here later

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
