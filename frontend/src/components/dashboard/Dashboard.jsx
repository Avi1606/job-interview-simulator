import { useAuth } from '../../context/AuthContext'
import QuickStart from './QuickStart'
import Statistics from './Statistics'
import InterviewHistory from './InterviewHistory'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to practice your interview skills? Let's get started.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <QuickStart />
            <InterviewHistory />
          </div>

          {/* Right Column */}
          <div>
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard