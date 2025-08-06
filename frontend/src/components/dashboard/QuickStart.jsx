import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QuickStart = () => {
  const [selectedType, setSelectedType] = useState('technical')
  const [selectedDifficulty, setSelectedDifficulty] = useState('intermediate')
  const navigate = useNavigate()

  const interviewTypes = [
    { id: 'technical', label: 'Technical Interview', icon: '💻' },
    { id: 'behavioral', label: 'Behavioral Interview', icon: '🧠' },
    { id: 'hr', label: 'HR Interview', icon: '👥' },
    { id: 'case-study', label: 'Case Study', icon: '📊' }
  ]

  const difficulties = [
    { id: 'beginner', label: 'Beginner', description: 'Entry-level questions' },
    { id: 'intermediate', label: 'Intermediate', description: 'Mid-level questions' },
    { id: 'advanced', label: 'Advanced', description: 'Senior-level questions' }
  ]

  const handleStartInterview = () => {
    // Navigate to interview page with selected parameters
    navigate('/interview', {
      state: {
        type: selectedType,
        difficulty: selectedDifficulty
      }
    })
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Start Interview</h2>
      
      {/* Interview Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Interview Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {interviewTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                selectedType === type.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{type.icon}</span>
                <span className="font-medium text-sm">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Difficulty Level
        </label>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <label
              key={difficulty.id}
              className="flex items-center p-3 rounded-lg border cursor-pointer transition-colors hover:border-gray-300"
            >
              <input
                type="radio"
                name="difficulty"
                value={difficulty.id}
                checked={selectedDifficulty === difficulty.id}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="ml-3">
                <div className="font-medium text-sm text-gray-900">
                  {difficulty.label}
                </div>
                <div className="text-xs text-gray-500">
                  {difficulty.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStartInterview}
        className="w-full btn-primary"
      >
        Start Interview Practice
      </button>
    </div>
  )
}

export default QuickStart