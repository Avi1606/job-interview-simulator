import { useInterview } from '../../context/InterviewContext'

const InterviewControls = ({ onComplete }) => {
  const {
    questions,
    currentQuestionIndex,
    sessionStatus,
    pauseInterview,
    resumeInterview,
    nextQuestion,
    previousQuestion,
    isRecording
  } = useInterview()

  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const canProceed = !isRecording // Only allow navigation when not recording

  const handlePause = () => {
    if (sessionStatus === 'active') {
      pauseInterview()
    } else if (sessionStatus === 'paused') {
      resumeInterview()
    }
  }

  const handleNext = () => {
    if (canProceed && !isLastQuestion) {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (canProceed && !isFirstQuestion) {
      previousQuestion()
    }
  }

  const handleComplete = () => {
    if (window.confirm('Are you sure you want to complete this interview?')) {
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Recording Status */}
      <div className={`p-3 rounded-lg text-center text-sm font-medium ${
        isRecording
          ? 'bg-red-50 text-red-800 border border-red-200'
          : 'bg-gray-50 text-gray-800 border border-gray-200'
      }`}>
        {isRecording ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span>Recording in Progress</span>
          </div>
        ) : (
          'Ready to Record'
        )}
      </div>

      {/* Navigation Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion || !canProceed}
          className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFirstQuestion || !canProceed
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isLastQuestion || !canProceed}
          className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isLastQuestion || !canProceed
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Session Controls */}
      <div className="space-y-2">
        <button
          onClick={handlePause}
          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            sessionStatus === 'paused'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
          }`}
        >
          {sessionStatus === 'paused' ? 'Resume Interview' : 'Pause Interview'}
        </button>

        <button
          onClick={handleComplete}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Complete Interview
        </button>
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 text-center">
        {isRecording 
          ? 'Stop recording to navigate between questions'
          : 'Use the controls above to navigate through your interview'
        }
      </div>
    </div>
  )
}

export default InterviewControls