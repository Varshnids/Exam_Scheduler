const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

// Get all students
router.get('/students', authController.getAllStudents);

// Get all teachers
router.get('/teachers', authController.getAllTeachers);

// Get all exams
router.get('/exams', authController.getAllExams);

module.exports = router; 