import { createContext, useContext, useState } from 'react'
import { interviewService } from '../services/interviewService'

const InterviewContext = createContext({})

export const useInterview = () => {
  const context = useContext(InterviewContext)
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider')
  }
  return context
}

export const InterviewProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [sessionTimer, setSessionTimer] = useState(0)
  const [responses, setResponses] = useState([])
  const [sessionStatus, setSessionStatus] = useState('idle') // idle, active, paused, completed

  const startInterview = async (sessionData) => {
    try {
      const session = await interviewService.startSession(sessionData)
      setCurrentSession(session)
      setQuestions(session.questions)
      setCurrentQuestionIndex(0)
      setSessionStatus('active')
      setSessionTimer(0)
      setResponses([])
      return session
    } catch (error) {
      throw error
    }
  }

  const pauseInterview = async () => {
    try {
      if (currentSession) {
        await interviewService.pauseSession(currentSession.id)
        setSessionStatus('paused')
      }
    } catch (error) {
      console.error('Failed to pause interview:', error)
    }
  }

  const resumeInterview = async () => {
    try {
      if (currentSession) {
        await interviewService.resumeSession(currentSession.id)
        setSessionStatus('active')
      }
    } catch (error) {
      console.error('Failed to resume interview:', error)
    }
  }

  const completeInterview = async () => {
    try {
      if (currentSession) {
        const result = await interviewService.completeSession(currentSession.id, {
          responses,
          duration: sessionTimer
        })
        setSessionStatus('completed')
        return result
      }
    } catch (error) {
      console.error('Failed to complete interview:', error)
      throw error
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const addResponse = (response) => {
    setResponses(prev => [
      ...prev.filter(r => r.questionId !== response.questionId),
      response
    ])
  }

  const resetSession = () => {
    setCurrentSession(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setIsRecording(false)
    setSessionTimer(0)
    setResponses([])
    setSessionStatus('idle')
  }

  const value = {
    currentSession,
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    isRecording,
    sessionTimer,
    responses,
    sessionStatus,
    startInterview,
    pauseInterview,
    resumeInterview,
    completeInterview,
    nextQuestion,
    previousQuestion,
    addResponse,
    resetSession,
    setIsRecording,
    setSessionTimer
  }

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  )
}