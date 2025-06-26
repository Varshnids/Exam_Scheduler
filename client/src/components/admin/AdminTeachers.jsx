import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', teacherId: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', password: '', teacherId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('https://exam-scheduler-ksr6.onrender.com/api/auth/teachers')
      .then(res => {
        setTeachers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch teachers');
        setLoading(false);
      });
  }, []);

  // Add teacher (local only for now)
  const handleAdd = (e) => {
    e.preventDefault();
    // TODO: Implement backend add
  };

  // Delete teacher (local only for now)
  const handleDelete = (id) => {
    // TODO: Implement backend delete
  };

  // Start editing
  const handleEdit = (teacher) => {
    setEditId(teacher._id);
    setEditForm({ username: teacher.username, password: '', teacherId: teacher.teacherId || '' });
  };

  // Save edit (local only for now)
  const handleEditSave = (e) => {
    e.preventDefault();
    // TODO: Implement backend update
    setEditId(null);
    setEditForm({ username: '', password: '', teacherId: '' });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', color: '#222' }}>
      <h2 style={{ color: '#222', fontWeight: 700 }}>Manage Teachers</h2>
      {loading ? (
        <div style={{ color: '#8338EC', fontWeight: 600 }}>Loading teachers...</div>
      ) : error ? (
        <div style={{ color: '#EF476F', fontWeight: 600 }}>{error}</div>
      ) : (
        <>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <input
              type="text"
              placeholder="Teacher ID"
              value={form.teacherId}
              onChange={e => setForm(f => ({ ...f, teacherId: e.target.value }))}
              style={{ ...inputStyle, color: '#222', background: '#fff' }}
            />
            <button type="submit" style={btnStyle} disabled> Add </button>
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #8338ec22', color: '#222' }}>
            <thead>
              <tr style={{ background: '#c3e0fc' }}>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} style={{ background: '#fafafa' }}>
                  <td style={tdStyle}>
                    {editId === teacher._id ? (
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
                        style={{ ...inputStyle, color: '#222', background: '#fff' }}
                      />
                    ) : (
                      <span style={{ color: '#222' }}>{teacher.username}</span>
                    )}
                  </td>
                  <td style={tdStyle}>{teacher.role}</td>
                  <td style={tdStyle}>
                    {editId === teacher._id ? (
                      <>
                        <button onClick={handleEditSave} style={btnStyle} disabled>Save</button>
                        <button onClick={() => setEditId(null)} style={{ ...btnStyle, background: '#6c757d' }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(teacher)} style={btnStyle} disabled>Edit</button>
                        <button onClick={() => handleDelete(teacher._id)} style={{ ...btnStyle, background: '#EF476F', color: '#fff' }} disabled>Delete</button>
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
const thStyle = { padding: '0.7rem', fontWeight: 700, fontSize: '1rem', background: '#c3e0fc', color: '#222' };
const tdStyle = { padding: '0.7rem', textAlign: 'center', color: '#222' }; 