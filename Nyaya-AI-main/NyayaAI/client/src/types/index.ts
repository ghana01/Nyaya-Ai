export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface HealthCheckResponse {
  status: string
  timestamp: string
  uptime: number
}
