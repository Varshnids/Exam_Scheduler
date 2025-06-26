import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminExams() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', duration: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', date: '', duration: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/auth/exams')
      .then(res => {
        setExams(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch exams');
        setLoading(false);
      });
  }, []);

  // Add exam (local only for now)
  const handleAdd = (e) => {
    e.preventDefault();
    // TODO: Implement backend add
  };

  // Delete exam (local only for now)
  const handleDelete = (id) => {
    // TODO: Implement backend delete
  };

  // Start editing
  const handleEdit = (exam) => {
    setEditId(exam._id);
    setEditForm({ title: exam.title, date: exam.date, duration: exam.duration, description: exam.description || '' });
  };

  // Save edit (local only for now)
  const handleEditSave = (e) => {
    e.preventDefault();
    // TODO: Implement backend update
    setEditId(null);
    setEditForm({ title: '', date: '', duration: '', description: '' });
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', color: '#222' }}>
      <h2 style={{ color: '#222', fontWeight: 700 }}>Manage Exams</h2>
      {loading ? (
        <div style={{ color: '#8338EC', fontWeight: 600 }}>Loading exams...</div>
      ) : error ? (
        <div style={{ color: '#EF476F', fontWeight: 600 }}>{error}</div>
      ) : (
        <>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <input
              type="date"
              placeholder="Date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <input
              type="number"
              placeholder="Duration (min)"
              value={form.duration}
              onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <button type="submit" style={btnStyle} disabled> Add </button>
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #8338ec22', color: '#222' }}>
            <thead>
              <tr style={{ background: '#fce0c3' }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Duration (min)</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => (
                <tr key={exam._id} style={{ background: '#fafafa' }}>
                  <td style={tdStyle}>
                    {editId === exam._id ? (
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                        style={{ ...inputStyle, color: '#222', background: '#fff' }}
                      />
                    ) : (
                      <span style={{ color: '#222' }}>{exam.title}</span>
                    )}
                  </td>
                  <td style={tdStyle}>{new Date(exam.date).toLocaleDateString()}</td>
                  <td style={tdStyle}>{exam.duration}</td>
                  <td style={tdStyle}>{exam.description}</td>
                  <td style={tdStyle}>
                    {editId === exam._id ? (
                      <>
                        <button onClick={handleEditSave} style={btnStyle} disabled>Save</button>
                        <button onClick={() => setEditId(null)} style={{ ...btnStyle, background: '#6c757d' }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(exam)} style={btnStyle} disabled>Edit</button>
                        <button onClick={() => handleDelete(exam._id)} style={{ ...btnStyle, background: '#EF476F', color: '#fff' }} disabled>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  borderRadius: 8,
  border: '1px solid #333',
  fontSize: '1rem',
  minWidth: 100,
  color: '#222',
  background: '#fff',
};
const btnStyle = {
  background: '#8338EC',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.5rem 1.2rem',
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: 4,
  fontSize: '1rem',
  boxShadow: '0 1px 4px #0001',
  transition: 'background 0.2s, color 0.2s',
  opacity: 0.7,
};
const thStyle = { padding: '0.7rem', fontWeight: 700, fontSize: '1rem', background: '#fce0c3', color: '#222' };
const tdStyle = { padding: '0.7rem', textAlign: 'center', color: '#222' }; 