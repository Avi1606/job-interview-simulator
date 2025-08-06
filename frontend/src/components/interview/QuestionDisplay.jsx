const QuestionDisplay = ({ question }) => {
  // Mock question data if none provided
  const mockQuestion = {
    id: '1',
    question: 'Tell me about yourself and your experience with software development.',
    category: 'BEHAVIORAL',
    difficulty: 'INTERMEDIATE',
    timeLimit: 180,
    expectedAnswerPoints: [
      'Professional background and experience',
      'Key skills and technologies',
      'Notable achievements or projects',
      'Career goals and motivations'
    ],
    followUpQuestions: [
      'What technologies do you enjoy working with most?',
      'Can you describe a challenging project you worked on?'
    ]
  }

  const currentQuestion = question || mockQuestion

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentQuestion.category === 'TECHNICAL' 
                ? 'bg-blue-100 text-blue-800'
                : currentQuestion.category === 'BEHAVIORAL'
                ? 'bg-green-100 text-green-800'
                : 'bg-purple-100 text-purple-800'
            }`}>
              {currentQuestion.category}
            </span>
            <span className="text-xs text-gray-500">
              {currentQuestion.difficulty}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {formatTime(currentQuestion.timeLimit)} suggested
          </div>
        </div>
      </div>

      {/* Main Question */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer Guidelines */}
      {currentQuestion.expectedAnswerPoints && currentQuestion.expectedAnswerPoints.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Key Points to Cover
          </h3>
          <ul className="space-y-1 text-sm text-blue-800">
            {currentQuestion.expectedAnswerPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Follow-up Questions */}
      {currentQuestion.followUpQuestions && currentQuestion.followUpQuestions.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            🔍 Potential Follow-ups
          </h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {currentQuestion.followUpQuestions.map((followUp, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <span>{followUp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">
          📝 Tips
        </h3>
        <ul className="space-y-1 text-sm text-yellow-800">
          <li>• Take a moment to organize your thoughts before speaking</li>
          <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
          <li>• Be specific and provide concrete examples</li>
          <li>• Maintain eye contact with the camera</li>
        </ul>
      </div>
    </div>
  )
}

export default QuestionDisplay