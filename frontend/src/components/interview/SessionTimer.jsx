import { useState, useEffect } from 'react'
import { useInterview } from '../../context/InterviewContext'

const SessionTimer = () => {
  const { sessionTimer, setSessionTimer, sessionStatus } = useInterview()
  const [displayTime, setDisplayTime] = useState('00:00')

  useEffect(() => {
    let interval = null

    if (sessionStatus === 'active') {
      interval = setInterval(() => {
        setSessionTimer(prev => {
          const newTime = prev + 1
          updateDisplayTime(newTime)
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [sessionStatus, setSessionTimer])

  useEffect(() => {
    updateDisplayTime(sessionTimer)
  }, [sessionTimer])

  const updateDisplayTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    setDisplayTime(
      `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    )
  }

  const getStatusColor = () => {
    switch (sessionStatus) {
      case 'active':
        return 'text-green-600'
      case 'paused':
        return 'text-yellow-600'
      case 'completed':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = () => {
    switch (sessionStatus) {
      case 'active':
        return (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        )
      case 'paused':
        return (
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        )
      case 'completed':
        return (
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        )
      default:
        return (
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        )
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon()}
      <div className="text-sm">
        <span className={`font-mono font-medium ${getStatusColor()}`}>
          {displayTime}
        </span>
        <span className="text-gray-500 ml-1">
          {sessionStatus === 'paused' ? '(Paused)' : ''}
        </span>
      </div>
    </div>
  )
}

export default SessionTimer