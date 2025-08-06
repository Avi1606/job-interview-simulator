import api from './api'

export const interviewService = {
  // Start new interview session
  startSession: async (sessionData) => {
    try {
      const response = await api.post('/interviews/start', sessionData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get interview session details
  getSession: async (sessionId) => {
    try {
      const response = await api.get(`/interviews/${sessionId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Pause interview session
  pauseSession: async (sessionId) => {
    try {
      const response = await api.put(`/interviews/${sessionId}/pause`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Resume interview session
  resumeSession: async (sessionId) => {
    try {
      const response = await api.put(`/interviews/${sessionId}/resume`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Complete interview session
  completeSession: async (sessionId, sessionData) => {
    try {
      const response = await api.post(`/interviews/${sessionId}/complete`, sessionData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get user's interview history
  getHistory: async (params = {}) => {
    try {
      const response = await api.get('/interviews/history', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get interview statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/interviews/statistics')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Save interview response
  saveResponse: async (sessionId, questionId, responseData) => {
    try {
      const response = await api.post(`/interviews/${sessionId}/responses`, {
        questionId,
        ...responseData
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Upload recording
  uploadRecording: async (sessionId, recordingData) => {
    try {
      const formData = new FormData()
      formData.append('recording', recordingData.file)
      formData.append('type', recordingData.type)
      formData.append('questionId', recordingData.questionId)

      const response = await api.post(`/interviews/${sessionId}/recordings`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete interview session
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/interviews/${sessionId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}