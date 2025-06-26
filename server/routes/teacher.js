const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateJWT, requireRole } = require('../middleware/auth');

// All routes require JWT and teacher role
router.use(authenticateJWT, requireRole('teacher'));

router.get('/exams', teacherController.getExams);
router.post('/exams', teacherController.createExam);
router.put('/exams/:id', teacherController.updateExam);
router.delete('/exams/:id', teacherController.deleteExam);
router.get('/students', teacherController.getAssignedStudents);
router.get('/profile', teacherController.getProfile);

module.exports = router; 