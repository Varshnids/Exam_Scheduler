import React from 'react';

export default function AdminSidebar({ section, setSection, onLogout }) {
  return (
    <nav style={{ width: 220, background: '#8338EC', color: '#fff', padding: '2rem 1rem', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: 32 }}>Admin Panel</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><button style={navBtnStyle(section === 'dashboard')} onClick={() => setSection('dashboard')}>Dashboard</button></li>
        <li><button style={navBtnStyle(section === 'students')} onClick={() => setSection('students')}>Manage Students</button></li>
        <li><button style={navBtnStyle(section === 'teachers')} onClick={() => setSection('teachers')}>Manage Teachers</button></li>
        <li><button style={navBtnStyle(section === 'exams')} onClick={() => setSection('exams')}>Manage Exams</button></li>
        <li><button style={navBtnStyle(section === 'reports')} onClick={() => setSection('reports')}>Reports</button></li>
        <li><button style={navBtnStyle(section === 'settings')} onClick={() => setSection('settings')}>Settings</button></li>
        <li><button onClick={onLogout} style={{ color: '#EF476F', marginTop: 32, background: 'none', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </nav>
  );
}

function navBtnStyle(active) {
  return {
    background: active ? '#fff' : 'none',
    color: active ? '#8338EC' : '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '0.7rem 1.2rem',
    margin: '0.2rem 0',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.2s, color 0.2s',
  };
} 