const Exam = require('../models/Exam');
const User = require('../models/User');

// Get all exams created by this teacher
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ createdBy: req.user.id }).populate('assignedStudents', 'username');
    res.json(exams);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new exam
exports.createExam = async (req, res) => {
  try {
    const { title, subject, date, duration, description, assignedStudents } = req.body;
    const exam = new Exam({
      title,
      subject,
      date,
      duration,
      description,
      createdBy: req.user.id,
      assignedStudents
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an exam (only if created by this teacher)
exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an exam (only if created by this teacher)
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students assigned to this teacher's exams
exports.getAssignedStudents = async (req, res) => {
  try {
    const exams = await Exam.find({ createdBy: req.user.id }).populate('assignedStudents', 'username');
    const students = [];
    exams.forEach(exam => {
      exam.assignedStudents.forEach(student => {
        if (!students.find(s => s._id.equals(student._id))) {
          students.push(student);
        }
      });
    });
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get teacher profile info
exports.getProfile = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id).select('-password');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 