import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminOverviewCards from './AdminOverviewCards';
import AdminStudents from './AdminStudents';
import AdminTeachers from './AdminTeachers';
import AdminExams from './AdminExams';

export default function AdminDashboard({ onLogout }) {
  const [section, setSection] = useState('dashboard');
  // Placeholder data for overview cards
  const overview = { students: 42, teachers: 7, exams: 12 };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      minWidth: '100vw',
      width: '100vw',
      height: '100vh',
      fontFamily: 'Poppins, sans-serif',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 0
    }}>
      <div style={{ height: '100vh', position: 'sticky', left: 0, top: 0, zIndex: 1 }}>
        <AdminSidebar section={section} setSection={setSection} onLogout={onLogout} />
      </div>
      <main style={{
        flex: 1,
        padding: '2.5vw 2vw',
        background: '#f8fafc',
        minHeight: '100vh',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        {section === 'dashboard' && <AdminOverviewCards {...overview} />}
        {section === 'students' && <AdminStudents />}
        {section === 'teachers' && <AdminTeachers />}
        {section === 'exams' && <AdminExams />}
        {section === 'reports' && <div>Reports (Coming soon)</div>}
        {section === 'settings' && <div>Settings (Coming soon)</div>}
      </main>
    </div>
  );
} 