/* Entry point to backend API */

// Bring all dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Setup environment variables
dotenv.config({
  path: "./config/config.env",
});

// Bring in required files
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// All routes import
const usersRoute = require("./routes/v1/users");
const authRoute = require("./routes/v1/auth");
const profileRoute = require("./routes/v1/profile");
const postRoute = require("./routes/v1/posts");

// Connect to DB
connectDB();

// Init express
const app = express();

// BodyParser middleware
app.use(express.json());

// CORS
app.use(cors());

// Route Settings
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/users/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/posts", postRoute);

// ErrorHandler Middleware
app.use(errorHandler);

// Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
