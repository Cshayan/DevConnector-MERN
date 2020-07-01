/* Entry point to backend API */

// Bring all dependencies
const express = require("express");
const dotenv = require("dotenv");

// Setup environment variables
dotenv.config({
    path: "./config/config.env"
});

// Bring in required files
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// All routes import 
const usersRoute = require('./routes/v1/users');
const authRoute = require('./routes/v1/auth');
const profileRoute = require('./routes/v1/profile');

// Connect to DB
connectDB();

// Init express
const app = express();

// BodyParser middleware
app.use(express.json());

// Route Settings
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/users/auth', authRoute);
app.use('/api/v1/profile', profileRoute);

// ErrorHandler Middleware
app.use(errorHandler);

// Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});