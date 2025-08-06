import api from './api'

export const questionService = {
  // Get questions by filters
  getQuestions: async (params = {}) => {
    try {
      const response = await api.get('/questions', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get random question set
  getRandomQuestions: async (params = {}) => {
    try {
      const response = await api.get('/questions/random', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get question by ID
  getQuestion: async (questionId) => {
    try {
      const response = await api.get(`/questions/${questionId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get question categories
  getCategories: async () => {
    try {
      const response = await api.get('/questions/categories')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Create new question (admin only)
  createQuestion: async (questionData) => {
    try {
      const response = await api.post('/questions', questionData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update question (admin only)
  updateQuestion: async (questionId, questionData) => {
    try {
      const response = await api.put(`/questions/${questionId}`, questionData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete question (admin only)
  deleteQuestion: async (questionId) => {
    try {
      const response = await api.delete(`/questions/${questionId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Search questions
  searchQuestions: async (query, filters = {}) => {
    try {
      const response = await api.get('/questions/search', {
        params: { query, ...filters }
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get questions by difficulty
  getQuestionsByDifficulty: async (difficulty) => {
    try {
      const response = await api.get(`/questions/difficulty/${difficulty}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get questions by job role
  getQuestionsByJobRole: async (jobRole) => {
    try {
      const response = await api.get(`/questions/job-role/${jobRole}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}