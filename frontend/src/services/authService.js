import api from './api'

export const authService = {
  // User login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // User registration
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const response = await api.post('/auth/reset-password', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update password
  updatePassword: async (data) => {
    try {
      const response = await api.put('/auth/update-password', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}