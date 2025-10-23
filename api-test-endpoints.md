// Test API endpoints với database schema
// Chạy các test này trong Postman hoặc curl

// 1. Test Login API
// POST https://localhost:7217/api/Auth/login
// Body (JSON):
{
  "username": "your_username",
  "password": "your_password"
}

// Expected Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 8,
    "username": "tranandanglinh100720041000",
    "email": "LinhTDHE186757@fpt.edu.vn",
    "fullName": "linhtrandang",
    "role": "User"
  }
}

// 2. Test User API với token
// GET https://localhost:7217/api/User
// Headers:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Expected Response:
{
  "userId": 8,
  "fullName": "linhtrandang",
  "email": "LinhTDHE186757@fpt.edu.vn",
  "createdAt": "2025-10-15T06:37:35.233",
  "updatedAt": "2025-10-15T06:37:35.233"
}

// 3. Test các API khác có thể có
// GET https://localhost:7217/api/User/{userId}/cvs
// GET https://localhost:7217/api/User/{userId}/applications
// GET https://localhost:7217/api/Jobs
// GET https://localhost:7217/api/Companies

// Debug steps:
// 1. Kiểm tra database connection
// 2. Kiểm tra JWT token generation
// 3. Kiểm tra API authentication
// 4. Kiểm tra CORS settings
// 5. Kiểm tra HTTPS certificate
