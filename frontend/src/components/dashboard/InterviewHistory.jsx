import { useState, useEffect } from 'react'
import { interviewService } from '../../services/interviewService'

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInterviewHistory()
  }, [])

  const loadInterviewHistory = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockData = [
        {
          id: 1,
          title: 'Technical Interview - Software Engineer',
          type: 'TECHNICAL',
          difficulty: 'INTERMEDIATE',
          status: 'COMPLETED',
          duration: 1800,
          score: 8.5,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 2,
          title: 'Behavioral Interview - Team Lead',
          type: 'BEHAVIORAL',
          difficulty: 'ADVANCED',
          status: 'COMPLETED',
          duration: 1200,
          score: 7.8,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        }
      ]
      
      setInterviews(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load interview history:', error)
      setLoading(false)
    }
  }

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'TECHNICAL':
        return '💻'
      case 'BEHAVIORAL':
        return '🧠'
      case 'HR':
        return '👥'
      default:
        return '📋'
    }
  }

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview History</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Interview History</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      {interviews.length > 0 ? (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(interview.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{interview.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{formatDuration(interview.duration)}</span>
                      <span>•</span>
                      <span>{formatDate(interview.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                    {interview.status.toLowerCase()}
                  </span>
                  {interview.score && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{interview.score}/10</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
          <p className="text-gray-500 mb-4">Start your first interview practice to see your history here.</p>
          <button className="btn-primary text-sm">
            Start First Interview
          </button>
        </div>
      )}
    </div>
  )
}

export default InterviewHistory