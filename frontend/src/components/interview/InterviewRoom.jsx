import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useInterview } from '../../context/InterviewContext'
import VideoRecorder from './VideoRecorder'
import QuestionDisplay from './QuestionDisplay'
import InterviewControls from './InterviewControls'
import SessionTimer from './SessionTimer'

const InterviewRoom = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { 
    currentSession, 
    currentQuestion, 
    sessionStatus, 
    startInterview, 
    completeInterview,
    resetSession 
  } = useInterview()
  
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    initializeInterview()
    
    return () => {
      // Cleanup on unmount
      if (sessionStatus === 'active') {
        resetSession()
      }
    }
  }, [])

  const initializeInterview = async () => {
    try {
      const { type = 'technical', difficulty = 'intermediate' } = location.state || {}
      
      // Mock session data - in real app this would call the API
      const sessionData = {
        type: type.toUpperCase(),
        difficulty: difficulty.toUpperCase(),
        jobRole: 'Software Engineer',
        company: 'Mock Company'
      }

      await startInterview(sessionData)
      setIsInitialized(true)
    } catch (error) {
      console.error('Failed to initialize interview:', error)
      setError('Failed to start interview. Please try again.')
    }
  }

  const handleCompleteInterview = async () => {
    try {
      await completeInterview()
      navigate('/dashboard', { 
        state: { message: 'Interview completed successfully!' }
      })
    } catch (error) {
      console.error('Failed to complete interview:', error)
      setError('Failed to complete interview. Please try again.')
    }
  }

  const handleExitInterview = () => {
    if (window.confirm('Are you sure you want to exit the interview? Your progress will be lost.')) {
      resetSession()
      navigate('/dashboard')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isInitialized || !currentSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your interview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {currentSession.title || 'Interview Practice Session'}
            </h1>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <span>Type: {currentSession.type}</span>
              <span>•</span>
              <span>Difficulty: {currentSession.difficulty}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SessionTimer />
            <button
              onClick={handleExitInterview}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Section */}
        <div className="flex-1 p-6">
          <VideoRecorder />
        </div>

        {/* Question and Controls Section */}
        <div className="w-96 bg-white flex flex-col">
          <div className="flex-1 p-6">
            <QuestionDisplay question={currentQuestion} />
          </div>
          
          <div className="border-t border-gray-200 p-6">
            <InterviewControls 
              onComplete={handleCompleteInterview}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewRoom