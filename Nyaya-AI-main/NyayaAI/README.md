# NyayaAI - Legal Help for Every Indian

A MERN stack application providing AI-powered legal assistance for Indian citizens.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- React Context (State Management)
- Axios

### Backend
- Node.js + Express
- TypeScript
- MongoDB with Mongoose

## Project Structure

```
NyayaAI/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API services (Axios)
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── ...
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration files
│   └── ...
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd NyayaAI
```

### 2. Install dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install:all
```

### 3. Configure Environment Variables

#### Client (.env)
```bash
cd client
cp .env.example .env
```

#### Server (.env)
```bash
cd server
cp .env.example .env
```

### 4. Start MongoDB

Make sure MongoDB is running locally:
```bash
mongod
```

Or if using MongoDB as a service:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 5. Run the Application

#### Development Mode (runs both client and server)
```bash
npm run dev
```

#### Run separately
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## API Endpoints

### Health & AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check endpoint |
| POST | /api/ai/chat | Send message to AI chatbot |
| GET | /api/ai/history/:sessionId | Get chat history for a session |
| GET | /api/ai/sessions/:userId | Get user's chat sessions |
| DELETE | /api/ai/session/:sessionId | Delete a chat session |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user (protected) |
| PUT | /api/auth/profile | Update user profile (protected) |
| PUT | /api/auth/password | Change password (protected) |

### Rights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/rights | Get all rights (with optional category filter) |
| GET | /api/rights/:id | Get single right by ID |
| GET | /api/rights/categories | Get all categories with counts |
| GET | /api/rights/category/:category | Get rights by category |

### Laws
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/laws | Get all laws (grouped by act) |
| GET | /api/laws/search?q= | Search laws by keyword |
| GET | /api/laws/:id | Get single law by ID |
| POST | /api/laws/explain | Get AI explanation for a law |

### Case Status
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/case-status | Get case status (mock data) |
| GET | /api/case-status/locations | Get states and districts list |
| GET | /api/case-status/courts | Get courts for a district |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/documents/types | Get all document types |
| POST | /api/documents/generate | Generate a legal document |
| GET | /api/documents/my-documents | Get user's documents (protected) |
| GET | /api/documents/:id | Get document by ID |

## Seed Database

To populate the database with sample data:

```bash
cd server

# Seed rights data
npm run seed

# Seed laws data
npm run seed:laws

# Seed all data
npm run seed:all
```

## Features

- 🤖 AI Legal Chatbot - ChatGPT-like interface for legal queries
- 📋 Case Status Tracker - Check court case status
- ⚖️ Know Your Rights - Learn about citizen rights across 5 categories
- 📚 Legal Library - Browse Indian laws with AI explanations
- 📄 Document Generator - Create Police Complaints, FIRs, RTI Applications, Consumer Complaints
- 🚨 Emergency Help - Emergency contacts, safety tips, FIR filing guide
- 🔐 User Authentication - Register/Login with JWT, role-based access (Citizen, Lawyer, Admin)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License
