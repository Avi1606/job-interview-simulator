# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "user": {
    "id": "64a1b2c3d4e5f6789012345",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "stats": {
      "totalInterviews": 0,
      "averageScore": 0.0,
      "totalHours": 0.0
    }
  }
}
```

#### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "user": {
    "id": "64a1b2c3d4e5f6789012345",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "stats": {
      "totalInterviews": 5,
      "averageScore": 8.2,
      "totalHours": 3.5
    }
  }
}
```

#### GET /auth/verify
Verify JWT token and get user information.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "64a1b2c3d4e5f6789012345",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "stats": {
      "totalInterviews": 5,
      "averageScore": 8.2,
      "totalHours": 3.5
    }
  }
}
```

### Interview Management

#### POST /interviews/start
Start a new interview session.

**Request Body:**
```json
{
  "type": "TECHNICAL",
  "difficulty": "INTERMEDIATE",
  "jobRole": "Software Engineer",
  "company": "Tech Corp"
}
```

**Response:**
```json
{
  "id": "64a1b2c3d4e5f6789012346",
  "title": "Technical Interview - Software Engineer",
  "type": "TECHNICAL",
  "difficulty": "INTERMEDIATE",
  "status": "IN_PROGRESS",
  "questions": [
    {
      "id": "64a1b2c3d4e5f6789012347",
      "question": "Explain the difference between Array and LinkedList",
      "category": "TECHNICAL",
      "difficulty": "INTERMEDIATE",
      "timeLimit": 300
    }
  ],
  "startTime": "2024-01-15T10:30:00Z"
}
```

#### GET /interviews/{id}
Get interview session details.

**Response:**
```json
{
  "id": "64a1b2c3d4e5f6789012346",
  "title": "Technical Interview - Software Engineer",
  "type": "TECHNICAL",
  "difficulty": "INTERMEDIATE",
  "status": "COMPLETED",
  "duration": 1800,
  "questions": [...],
  "recordings": {
    "videoUrl": "https://storage.example.com/videos/session_id.mp4",
    "audioUrl": "https://storage.example.com/audio/session_id.wav"
  },
  "startTime": "2024-01-15T10:30:00Z",
  "endTime": "2024-01-15T11:00:00Z"
}
```

#### PUT /interviews/{id}/pause
Pause an active interview session.

**Response:**
```json
{
  "message": "Interview paused successfully",
  "status": "PAUSED"
}
```

#### PUT /interviews/{id}/resume
Resume a paused interview session.

**Response:**
```json
{
  "message": "Interview resumed successfully",
  "status": "IN_PROGRESS"
}
```

#### POST /interviews/{id}/complete
Complete an interview session.

**Request Body:**
```json
{
  "responses": [
    {
      "questionId": "64a1b2c3d4e5f6789012347",
      "response": "Arrays store elements in contiguous memory...",
      "timeSpent": 180,
      "confidence": 0.8
    }
  ],
  "duration": 1800
}
```

**Response:**
```json
{
  "message": "Interview completed successfully",
  "sessionId": "64a1b2c3d4e5f6789012346",
  "finalScore": 8.5,
  "summary": {
    "totalQuestions": 5,
    "answeredQuestions": 5,
    "averageConfidence": 0.75,
    "totalTime": 1800
  }
}
```

#### GET /interviews/history
Get user's interview history.

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `type` (optional): Filter by interview type
- `status` (optional): Filter by status

**Response:**
```json
{
  "content": [
    {
      "id": "64a1b2c3d4e5f6789012346",
      "title": "Technical Interview - Software Engineer",
      "type": "TECHNICAL",
      "difficulty": "INTERMEDIATE",
      "status": "COMPLETED",
      "duration": 1800,
      "score": 8.5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalElements": 15,
  "totalPages": 2,
  "number": 0,
  "size": 10
}
```

### Question Management

#### GET /questions
Get questions with optional filters.

**Query Parameters:**
- `category` (optional): TECHNICAL, BEHAVIORAL, HR, SITUATIONAL
- `difficulty` (optional): BEGINNER, INTERMEDIATE, ADVANCED
- `jobRole` (optional): Filter by job role
- `tags` (optional): Comma-separated list of tags

**Response:**
```json
[
  {
    "id": "64a1b2c3d4e5f6789012347",
    "category": "TECHNICAL",
    "difficulty": "INTERMEDIATE",
    "question": "Explain the difference between Array and LinkedList",
    "expectedAnswerPoints": [
      "Memory allocation differences",
      "Time complexity for operations",
      "Use cases and scenarios"
    ],
    "followUpQuestions": [
      "When would you use one over the other?",
      "What are the time complexities?"
    ],
    "timeLimit": 300,
    "tags": ["data-structures", "arrays", "linked-lists"]
  }
]
```

#### GET /questions/random
Get a random set of questions for interview.

**Query Parameters:**
- `count` (optional): Number of questions (default: 5)
- `category` (optional): Filter by category
- `difficulty` (optional): Filter by difficulty

**Response:**
```json
{
  "questions": [
    {
      "id": "64a1b2c3d4e5f6789012347",
      "category": "TECHNICAL",
      "difficulty": "INTERMEDIATE",
      "question": "Explain the difference between Array and LinkedList",
      "timeLimit": 300
    }
  ],
  "totalCount": 5
}
```

#### GET /questions/categories
Get all available question categories.

**Response:**
```json
{
  "categories": [
    {
      "name": "TECHNICAL",
      "subcategories": ["DATA_STRUCTURES", "ALGORITHMS", "SYSTEM_DESIGN"],
      "count": 150
    },
    {
      "name": "BEHAVIORAL",
      "subcategories": ["TEAMWORK", "LEADERSHIP", "PROBLEM_SOLVING"],
      "count": 100
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

#### 400 Bad Request
```json
{
  "message": "Invalid request parameters",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

#### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Rate Limiting

API requests are rate limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated requests

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

## Webhooks

Configure webhooks to receive notifications about interview completions and user registrations.

### Interview Completion Webhook
```json
{
  "event": "interview.completed",
  "data": {
    "sessionId": "64a1b2c3d4e5f6789012346",
    "userId": "64a1b2c3d4e5f6789012345",
    "score": 8.5,
    "duration": 1800,
    "completedAt": "2024-01-15T11:00:00Z"
  }
}
```