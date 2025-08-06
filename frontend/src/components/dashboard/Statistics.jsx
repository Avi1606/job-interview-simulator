import { useAuth } from '../../context/AuthContext'

const Statistics = () => {
  const { user } = useAuth()

  // Mock data - in real app this would come from API
  const stats = {
    totalInterviews: user?.stats?.totalInterviews || 0,
    averageScore: user?.stats?.averageScore || 0,
    totalHours: user?.stats?.totalHours || 0,
    improvementRate: 85
  }

  const achievements = [
    { icon: '🎯', title: 'First Interview', completed: stats.totalInterviews > 0 },
    { icon: '🔥', title: '10 Interviews', completed: stats.totalInterviews >= 10 },
    { icon: '⭐', title: 'High Scorer', completed: stats.averageScore >= 8 },
    { icon: '⏰', title: '10+ Hours', completed: stats.totalHours >= 10 }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Interviews</span>
            <span className="text-2xl font-bold text-primary-600">{stats.totalInterviews}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Average Score</span>
            <span className="text-2xl font-bold text-green-600">{stats.averageScore.toFixed(1)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Practice Hours</span>
            <span className="text-2xl font-bold text-blue-600">{stats.totalHours}h</span>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Improvement</span>
              <span className="text-sm font-medium text-green-600">+{stats.improvementRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.improvementRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center transition-all ${
                achievement.completed
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className={`text-xs font-medium ${
                achievement.completed ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        
        {stats.totalInterviews > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completed Technical Interview</span>
              <span className="text-gray-400">2h ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Started Behavioral Practice</span>
              <span className="text-gray-400">1d ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Reviewed Interview Recording</span>
              <span className="text-gray-400">2d ago</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No recent activity</p>
            <p className="text-gray-400 text-xs mt-1">Start your first interview to see activity here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics