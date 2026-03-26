import axios from 'axios'

if (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.endsWith('/')) {
  import.meta.env.VITE_API_URL = import.meta.env.VITE_API_URL.slice(0, -1)
}

const API_URL = import.meta.env.VITE_API_URL
  ? (import.meta.env.VITE_API_URL.endsWith('/api')
      ? import.meta.env.VITE_API_URL
      : `${import.meta.env.VITE_API_URL}/api`)
  : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

// API methods
export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export default api
