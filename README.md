# Job Interview Simulator

A comprehensive full-stack application for practicing job interviews with AI-powered feedback, video recording, and performance analytics.

## 🚀 Features

### 🎯 Core Features
- **AI-Powered Interview Practice** - Realistic interview simulation with intelligent questions
- **Video Recording & Playback** - Record your responses and review them later
- **Real-time Feedback** - Get instant feedback on your performance
- **Question Bank Management** - Extensive database of interview questions across categories
- **Progress Tracking** - Monitor your improvement over time
- **Multiple Interview Types** - Technical, Behavioral, HR, and Situational interviews

### 🔧 Technical Features
- **Modern React Frontend** - Built with React 18, Vite, and Tailwind CSS
- **Robust Spring Boot Backend** - RESTful API with Spring Boot 3 and MongoDB
- **JWT Authentication** - Secure user authentication and authorization
- **WebRTC Integration** - Real-time video and audio recording
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Docker Support** - Easy deployment with Docker containers

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **WebRTC API** - Media recording and streaming

### Backend
- **Spring Boot 3** - Java framework with embedded server
- **Spring Security** - Authentication and authorization
- **MongoDB** - NoSQL database for flexible data storage
- **JWT** - JSON Web Tokens for secure authentication
- **Maven** - Dependency management and build tool
- **Spring Data MongoDB** - Database access layer

### DevOps & Tools
- **Docker** - Containerization for easy deployment
- **GitHub Actions** - CI/CD pipeline
- **Maven** - Build automation and dependency management
- **NPM** - Package management for frontend

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Java** 17+
- **MongoDB** 6+
- **Git**
- **Docker** (optional, for containerized deployment)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Avi1606/job-interview-simulator.git
cd job-interview-simulator
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 3. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API will be available at `http://localhost:8080`

### 4. Database Setup
Make sure MongoDB is running locally on port 27017, or update the connection string in `backend/src/main/resources/application.yml`.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8080/api
```

Update `backend/src/main/resources/application.yml` with your configurations:
```yaml
spring:
  data:
    mongodb:
      host: localhost
      port: 27017
      database: interview_simulator
  security:
    jwt:
      secret: your-secret-key
      expiration: 86400000
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Verify JWT token

### Interview Endpoints
- `POST /api/interviews/start` - Start new interview session
- `GET /api/interviews/{id}` - Get interview details
- `PUT /api/interviews/{id}/pause` - Pause interview
- `PUT /api/interviews/{id}/resume` - Resume interview
- `POST /api/interviews/{id}/complete` - Complete interview

### Question Management
- `GET /api/questions` - Get questions with filters
- `GET /api/questions/random` - Get random question set
- `GET /api/questions/categories` - Get question categories

## 🎮 Usage Guide

### Starting Your First Interview
1. **Register/Login** - Create an account or sign in
2. **Choose Interview Type** - Select from Technical, Behavioral, HR, or Situational
3. **Set Difficulty** - Choose Beginner, Intermediate, or Advanced
4. **Start Practicing** - Begin your interview session with video recording
5. **Review Performance** - Analyze your responses and get feedback

### Dashboard Features
- **Quick Start** - Rapidly begin a new interview session
- **Interview History** - View past interview sessions
- **Statistics** - Track your progress and performance metrics
- **Achievements** - Unlock achievements as you practice more

## 🚀 Deployment

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Deployment
1. Build the frontend: `cd frontend && npm run build`
2. Build the backend: `cd backend && mvn clean package`
3. Deploy the built artifacts to your server
4. Configure environment variables for production

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
mvn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Avi1606**
- GitHub: [@Avi1606](https://github.com/Avi1606)

## 🙏 Acknowledgments

- Spring Boot community for excellent documentation
- React team for the amazing frontend library
- MongoDB for flexible data storage
- Tailwind CSS for beautiful styling utilities

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Issues](https://github.com/Avi1606/job-interview-simulator/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

---

⭐ **Star this repository** if you find it helpful!