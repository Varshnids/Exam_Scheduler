import React from 'react';

export default function AdminOverviewCards({ students, teachers, exams }) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, flex: 1, boxShadow: '0 2px 8px #8338ec22' }}>
        <h3>Total Students</h3>
        <p style={{ fontSize: 32, fontWeight: 700 }}>{students}</p>
      </div>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, flex: 1, boxShadow: '0 2px 8px #8338ec22' }}>
        <h3>Total Teachers</h3>
        <p style={{ fontSize: 32, fontWeight: 700 }}>{teachers}</p>
      </div>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, flex: 1, boxShadow: '0 2px 8px #8338ec22' }}>
        <h3>Total Exams</h3>
        <p style={{ fontSize: 32, fontWeight: 700 }}>{exams}</p>
      </div>
    </div>
  );
} 