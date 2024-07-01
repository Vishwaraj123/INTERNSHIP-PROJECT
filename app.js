const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const managerRoutes = require("./routes/managerRoutes");
const session = require('express-session');

// Set up mongoose connection
mongoose.connect("mongodb://localhost:27017/INTERNSHIP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(session({
//   secret: '1234',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     maxAge: 3600000
//   }))

// Set up view engine
app.set("view engine", "ejs");

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

// Start server
app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});
