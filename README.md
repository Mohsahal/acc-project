# Accounting Project - Full Stack Application

A comprehensive accounting management system built with React, TypeScript, Node.js, and MongoDB.

## 🏗️ Project Structure

```
acc-project/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── lib/            # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Backend Node.js Application
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads directory
│   ├── package.json
│   └── server.js
└── README.md
```

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Built with Shadcn/ui components and Tailwind CSS
- **Authentication**: JWT-based authentication with protected routes
- **State Management**: React Context for global state
- **API Integration**: Axios-based service layer
- **File Upload**: Drag & drop file upload functionality
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript implementation

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT token-based authentication
- **File Upload**: Multer middleware for file handling
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Express-validator for input validation
- **Error Handling**: Global error handling middleware

### Core Modules
- **User Management**: Admin, Client, Staff roles
- **Client Management**: Complete client profile management
- **Invoice Management**: Single and multiple invoice creation
- **Staff Management**: Staff profiles and salary management
- **Document Management**: File upload and storage
- **Dashboard**: Analytics and statistics

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router DOM
- Axios
- React Hook Form
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- Express Validator
- Bcryptjs
- Helmet
- CORS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd acc-project/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `config.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/acc_project
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=24h
   BCRYPT_ROUNDS=12
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd acc-project/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice
- `PATCH /api/invoices/:id/process` - Process invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Staff
- `GET /api/staff` - Get all staff members

## 🎯 Key Features Implementation

### Authentication Flow
1. User logs in with email/password
2. Server validates credentials and returns JWT token
3. Token is stored in localStorage
4. Protected routes check for valid token
5. Automatic token refresh and logout on expiration

### File Upload System
1. Drag & drop or click to select files
2. Files are uploaded to server using Multer
3. Files are organized in uploads directory by type
4. File metadata stored in database
5. Secure file serving with proper headers

### Dashboard Analytics
1. Real-time data fetching from API
2. Statistics cards with dynamic data
3. Invoice status tracking
4. Client and staff counts
5. Financial summaries

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing protection
- **Helmet Security**: Security headers with Helmet
- **File Upload Security**: File type and size validation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

### Version 2.2
- Complete refactor with TypeScript
- New API service layer
- Improved authentication system
- Better error handling
- Enhanced UI/UX
- File upload improvements
- Security enhancements

---

**Built with ❤️ using modern web technologies** 