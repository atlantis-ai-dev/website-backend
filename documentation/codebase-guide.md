# FRED Backend Developer Guide

## Introduction

Atlantis AI Backend for User Sign Up and Login

## Project Structure

The codebase follows a modular architecture with clear separation of concerns:

```
fred-backend/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware functions
├── queries/         # SQL queries
├── routes/          # API route definitions
├── utils/           # Utility functions
├── test/            # Test files
├── documentation/   # Project documentation
├── index.js        # Main application entry
└── package.json     # Project dependencies
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Database Hosting** Supabase
- **Authentication**: JWT with bcrypt
- **Testing**: Mocha & Chai
- **Logging**: Pino

## Key Components

### 1. Server Setup (index.js)
The main application file sets up:
- Express application
- CORS configuration
- Rate limiting
- Route registration

### 2. Routes
Routes are organized by feature:
- `/api/auth` - Authentication operations
- `/api/users` - User management

### 3. Middleware
Custom middleware for:
- Request logging
- Authentication
- Input validation
- Error handling

### 4. Environment Configuration
The project uses `.env` for environment variables:
- Database credentials
- Service configurations
- Cross-origin settings

## Development Guidelines

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `env.example` to `.env` and configure variables
4. Start development server:
   ```
   npm run dev
   ```

### Adding New Features

1. **Planning**
   - Identify the feature scope
   - Determine affected components
   - Plan database changes if needed

2. **Implementation Steps**
   - Create/modify database models if required
   - Add new routes in `/routes`
   - Implement controllers in `/controllers`
   - Write SQL queries in `/queries` if needed

3. **Testing**
   - Add unit tests in `/test`
   - Test API endpoints using Postman/cURL
   - Run test suite:
     ```
     npm test
     ```

### Code Style Guidelines

- Use async/await for asynchronous operations
- Follow RESTful API conventions
- Implement proper error handling
- Add logging for important operations
- Document new endpoints and functions
- Use input validation for all endpoints

### Adding New Endpoints

When adding a new endpoint to the API, follow these steps:

1. **Define the Route**
   ```javascript
   // In /routes/user.routes.js
   const express = require('express');
   const router = express.Router();
   const { getAllUser, getUser } = require("../controllers/user.controller");
   
   router.get("/", getAllUser);
   
   module.exports = router;
   ```

2. **Create Input Validation**
   ```javascript
   // In /middleware/validators/user.validator.js
   const { check, validationResult } = require('express-validator');
   const { createResponse } = require('../../utils/responseHandler');
   
   exports.validateFeature = [
     body('name').notEmpty().trim().withMessage('Name is required'),
     body('description').optional().trim(),
     // Add other validation rules
   ];
   ```

3. **Implement Controller**
   ```javascript
   // In /controllers/user.controller.js
   const db = require("../config/database");
   const bcrypt = require("bcrypt");
   const userQueries = require("../queries/user.queries");
   const logger = require("../logger");
   
   const getAllUser = async (req, res) => {
    try {
      const sql = userQueries.selectAllUsers;
      const result = await db.query(sql);

      logger.info("All users fetched successfully");
      return res.status(200).json({
        status: "success",
        users: result.rows.map(user => ({
          id: user.id,
          username: user.username,
          fullName: `${user.first_name} ${user.last_name}`,
          email: user.email,
          createdAt: user.created_at,
          lastModifiedAt: user.last_modified_at
        }))
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ status: "failed", message: "Error fetching users" });
    }
   };

   module.exports = {getAllUser};

   ```

5. **Define SQL Queries**
   ```javascript
   // In /queries/user.queries.js
    const userQueries = { selectAllUsers: `
      SELECT id, email, username, password, created_at, last_modified_at, first_name, last_name 
      FROM users
    `}
      
  module.exports = userQueries;
   ```

6. **Register Route in index.js**
   ```javascript
   // In index.js
   const userRoutes = require("./routes/user.routes");
   app.use("/api/users", userRoutes);
   ```

7. **Add Tests**
   ```javascript
   // In /test/feature.test.js
   const chai = require('chai');
   const chaiHttp = require('chai-http');
   const app = require('../index');
   
   chai.use(chaiHttp);
   const expect = chai.expect;
   
   describe('User API', () => {
     it('should get all users', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.users).to.be.an('array');
          done();
        });
    })});
   ```

8. **Document the Endpoint**
   Add the endpoint documentation including:
   - HTTP Method and Path
   - Request Parameters
   - Request Body Schema
   - Response Format
   - Example Request/Response
   - Possible Error Codes

Remember to:
- Follow consistent error handling patterns
- Add appropriate logging
- Include input validation
- Handle database transactions properly
- Write comprehensive tests
- Update API documentation

### API Response Format

```javascript
// Success Response
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### Security Best Practices

1. Always validate user input
2. Use parameterized queries
3. Implement rate limiting
4. Secure sensitive routes with authentication
5. Never expose sensitive data in responses
6. Use environment variables for secrets


## Troubleshooting

Common issues and solutions:
1. **Database Connection Issues**
   - Check database credentials
   - Verify network connectivity
   - Ensure proper database permissions

2. **API Errors**
   - Check request format
   - Verify authentication tokens
   - Review server logs

3. **Performance Issues**
   - Monitor query performance
   - Check rate limiting settings
   - Review resource usage

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Supabase PostgreSQL Documentation](https://supabase.com/features/postgres-database)

Remember to update this documentation when making significant changes to the codebase structure or adding new features. 