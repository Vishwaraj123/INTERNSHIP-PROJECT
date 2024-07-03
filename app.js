/**
 * Project Description:
 * 
 * This project is a web application built using the Express.js framework.
 * It is designed to provide a platform for students to apply for internships and for 
 * managers to view and approve student applications. The application also includes 
 * administrative functionality for super admins and admins to manage users and 
 * perform other administrative tasks.
 *
 * The application uses the MVC architectural pattern and follows RESTful principles.
 * It includes routes for authentication, student management, manager management, 
 * and super admin management. The application also includes middlewares for 
 * authentication and authorization.
 *
 * The application uses MongoDB as its database and Mongoose as its Object-Data 
 * Mapping library. It also uses the multer library for file uploads and the body-parser 
 * library for parsing request bodies.
 *
 * The application has the following routes:
 * - GET / - serves the index page
 * - GET /register.html - serves the registration page
 * - GET /login.html - serves the login page
 * - POST /login - handles student and manager login
 * - POST /register - handles student registration
 * - GET /students - serves a list of students
 * - GET /students/:id - serves a specific student
 * - POST /students - creates a new student
 * - PUT /students/:id - updates a specific student
 * - DELETE /students/:id - deletes a specific student
 * - GET /manager - serves a list of managers
 * - GET /manager/:id - serves a specific manager
 * - POST /manager - creates a new manager
 * - PUT /manager/:id - updates a specific manager
 * - DELETE /manager/:id - deletes a specific manager
 * - GET /superadmin - serves a list of super admins
 * - GET /superadmin/:id - serves a specific super admin
 * - POST /superadmin - creates a new super admin
 * - PUT /superadmin/:id - updates a specific super admin
 * - DELETE /superadmin/:id - deletes a specific super admin
 * 
 * The application also has the following middleware:
 * - authenticate - checks if the user is authenticated
 * - authorize - checks if the user has the correct role
 * - checkRole - checks if the user has the correct role
 * 
 * The application uses the following libraries:
 * - express - web framework
 * - mongoose - Object-Data Mapping library
 * - body-parser - request body parsing
 * - multer - file uploads
 * - bcrypt - password hashing
 * - jsonwebtoken - JSON Web Token creation and parsing
 * - express-session - session management
 * - connect-mongo - session storage in MongoDB
 * - ejs - view engine
 * - path - file paths
 * - mongoose-schema-json-validator - JSON schema validation for Mongoose schemas
 * - validator.js - data validation
 * - config - application configuration
 * 
 * The application has the following models:
 * - Student - represents a student
 * - Manager - represents a manager
 * - Admin - represents an admin
 * - SuperAdmin - represents a super admin
 * 
 * The application has the following controllers:
 * - loginController - handles student and manager login
 * - studentController - handles student management
 * - managerController - handles manager management
 * - superAdminController - handles super admin management
 * 
 * The application has the following routes:
 * - authRoutes - handles authentication routes
 * - studentRoutes - handles student management routes
 * - managerRoutes - handles manager management routes
 * - superAdminRoutes - handles super admin management routes
 */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const managerRoutes = require("./routes/managerRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const {login} = require('./controller/loginController')
const session = require('express-session');
const { secretKey } = require("./config/config");


app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
// Set up mongoose connection
mongoose.connect("mongodb://localhost:27017/INTERNSHIP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

// Set up view engine
app.set("view engine", "ejs");

app.post('/login' , login);
// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads")); // To serve the uploaded files

// Set up routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/manager", managerRoutes);
app.use("/superadmin", superAdminRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
