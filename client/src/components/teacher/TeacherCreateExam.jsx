import React, { useState } from 'react';
import axios from 'axios';

export default function TeacherCreateExam() {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '',
    assignedStudents: []
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Placeholder student options
  const studentOptions = [
    { _id: '1', username: 'student1' },
    { _id: '2', username: 'student2' }
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleMultiSelect = e => {
    const options = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm(f => ({ ...f, assignedStudents: options }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');
    // Calculate duration if start/end time provided
    let duration = form.duration;
    if (form.startTime && form.endTime) {
      const start = new Date(`1970-01-01T${form.startTime}:00`);
      const end = new Date(`1970-01-01T${form.endTime}:00`);
      duration = (end - start) / 60000;
    }
    try {
      await axios.post('http://localhost:5000/api/teacher/exams', {
        title: form.title,
        subject: form.subject,
        date: form.date,
        duration: duration,
        description: '',
        assignedStudents: form.assignedStudents
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Exam created successfully!');
      setForm({ title: '', subject: '', date: '', startTime: '', endTime: '', duration: '', assignedStudents: [] });
    } catch (err) {
      setError('Failed to create exam');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', color: '#222' }}>
      <h2 style={{ color: '#222', fontWeight: 700 }}>Create Exam</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="text" name="title" placeholder="Exam Title" value={form.title} onChange={handleChange} style={inputStyle} required />
        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} style={inputStyle} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} required />
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} style={inputStyle} />
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} style={inputStyle} />
        </div>
        <input type="number" name="duration" placeholder="Duration (min)" value={form.duration} onChange={handleChange} style={inputStyle} />
        <select multiple value={form.assignedStudents} onChange={handleMultiSelect} style={{ ...inputStyle, height: 80 }}>
          {studentOptions.map(s => (
            <option key={s._id} value={s._id}>{s.username}</option>
          ))}
        </select>
        <button type="submit" style={btnStyle}>Create Exam</button>
      </form>
      {message && <div style={{ color: '#3A86FF', marginTop: 12 }}>{message}</div>}
      {error && <div style={{ color: '#EF476F', marginTop: 12 }}>{error}</div>}
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #333',
  fontSize: '1rem',
  color: '#222',
  background: '#fff',
};
const btnStyle = {
  background: '#3A86FF',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.5rem 1.2rem',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: 8,
}; 