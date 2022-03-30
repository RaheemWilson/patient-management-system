/* eslint-disable no-unused-vars */
// Module Imports
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

// Route Imports
const  authRoutes = require('./api/routes/auth.routes.js')
const  patientRoutes = require('./api/routes/patient.routes.js')
const  doctorRoutes = require('./api/routes/doctor.routes.js')
const  userRoutes = require('./api/routes/user.routes.js')

const app = express();

// Initialize Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Declare constants
const MONGODB_URI = process.env.NODE_ENV === "test" ? 'mongodb://localhost:27017/pmsapp-test' : process.env.MONGODB_URI;


// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfuly connected to MongoDB"))
  .catch((error) => console.log("Unable to connect to mongodb"));

// Register Routes
app.use("/auth", authRoutes)
app.use("/patient", patientRoutes)
app.use("/doctors", doctorRoutes)
app.use("/user", userRoutes)

module.exports = app