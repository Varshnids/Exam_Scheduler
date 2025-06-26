const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGO_URI = 'mongodb+srv://varshnids22msc:Varshni2222@cluster0.xjdqezu.mongodb.net/Exam';
const JWT_SECRET = 'my_super_secret_jwt';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://exam-scheduler-ksr6.onrender.com', 'https://exam-scheduler-sigma.vercel.app'] }));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Make JWT_SECRET available to controllers
app.set('jwt-secret', JWT_SECRET);

app.use('/api/auth', (req, res, next) => {
  req.app = app;
  next();
}, require('./routes/auth.js'));

// Teacher routes
app.use('/api/teacher', require('./routes/teacher.js'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 