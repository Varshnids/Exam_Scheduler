import React from 'react';

const upcomingExams = [
  { id: 1, name: 'Math Final', subject: 'Mathematics', date: '2024-06-10', start: '10:00', end: '12:00', duration: '2h' },
  { id: 2, name: 'Physics Quiz', subject: 'Physics', date: '2024-06-12', start: '09:00', end: '10:00', duration: '1h' },
];

const colors = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#8338EC'];

export default function StudentHome({ onLogout }) {
  const [selectedExam, setSelectedExam] = React.useState(null);
  const [showProfile, setShowProfile] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordMsg, setPasswordMsg] = React.useState('');
  const username = 'student123'; // Placeholder username

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Simulate password update
    setPasswordMsg('Password updated successfully!');
    setPassword('');
    setTimeout(() => setPasswordMsg(''), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%)', fontFamily: 'Poppins, sans-serif', padding: 0, display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'linear-gradient(90deg, #8338EC 0%, #FF006E 100%)', color: '#fff', padding: '2rem 2rem 1.5rem 2rem', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, boxShadow: '0 4px 16px rgba(131,56,236,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: '2.5rem', letterSpacing: 1 }}>🎓 Student Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: '#fff', color: '#118AB2', border: 'none', borderRadius: 20, padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onClick={() => setShowProfile(true)}>Profile</button>
            <button style={{ background: '#fff', color: '#8338EC', border: 'none', borderRadius: 20, padding: '0.7rem 2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} onClick={onLogout}>Logout</button>
          </div>
        </div>
        <p style={{ marginTop: 12, fontSize: '1.2rem', opacity: 0.9 }}>Welcome back! Here are your upcoming exams.</p>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', width: '100%', padding: '2rem 3vw 2rem 3vw', boxSizing: 'border-box' }}>
        <section style={{ width: '100%' }}>
          <h2 style={{ color: '#8338EC', fontWeight: 700, marginBottom: 24 }}>Upcoming Exams</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', width: '100%', justifyContent: 'stretch' }}>
            {upcomingExams.map((exam, idx) => (
              <div key={exam.id} style={{ background: colors[idx % colors.length], color: '#222', borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '1.5rem 2rem', minWidth: 260, flex: 1, position: 'relative', transition: 'transform 0.2s', cursor: 'pointer', maxWidth: 400 }} onClick={() => setSelectedExam(exam)}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.3rem' }}>{exam.name}</h3>
                <p style={{ margin: '0.5rem 0 0.2rem 0', fontWeight: 500 }}>{exam.subject}</p>
                <p style={{ margin: 0, fontSize: '1rem' }}><b>Date:</b> {exam.date}</p>
                <p style={{ margin: 0, fontSize: '1rem' }}><b>Time:</b> {exam.start} - {exam.end}</p>
                <span style={{ position: 'absolute', top: 18, right: 24, background: '#fff', color: colors[idx % colors.length], borderRadius: 12, padding: '0.2rem 0.8rem', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>{exam.duration}</span>
                <button style={{ marginTop: 18, background: '#8338EC', color: '#fff', border: 'none', borderRadius: 16, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} onClick={e => { e.stopPropagation(); setSelectedExam(exam); }}>View Instructions</button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ margin: '3rem 0 2rem 0', width: '100%' }}>
          <h2 style={{ color: '#06D6A0', fontWeight: 700, marginBottom: 16 }}>Calendar View</h2>
          <div style={{ background: 'linear-gradient(90deg, #FFD166 0%, #06D6A0 100%)', borderRadius: 20, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', width: '100%' }}>
            <span style={{ color: '#222', fontWeight: 600, fontSize: '1.2rem', opacity: 0.8 }}><em>📅 Calendar coming soon...</em></span>
          </div>
        </section>

        {selectedExam && (
          <section style={{ marginTop: '2rem', background: '#fff', padding: '2rem', borderRadius: 24, boxShadow: '0 4px 24px rgba(131,56,236,0.10)', position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: 24, boxShadow: '0 4px 24px rgba(131,56,236,0.10)', minWidth: 320, maxWidth: 420 }}>
              <h3 style={{ color: '#EF476F', fontWeight: 700, marginBottom: 8 }}>Exam Instructions: {selectedExam.name}</h3>
              <p><strong>Subject:</strong> {selectedExam.subject}</p>
              <p><strong>Date:</strong> {selectedExam.date}</p>
              <p><strong>Time:</strong> {selectedExam.start} - {selectedExam.end}</p>
              <p><strong>Duration:</strong> {selectedExam.duration}</p>
              <p style={{ marginTop: 16, color: '#555' }}>Please arrive 15 minutes early and bring your ID card. No electronic devices allowed. Good luck!</p>
              <button onClick={() => setSelectedExam(null)} style={{ marginTop: '1.5rem', background: '#EF476F', color: '#fff', border: 'none', borderRadius: 16, padding: '0.6rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(239,71,111,0.10)' }}>Close</button>
            </div>
          </section>
        )}

        {showProfile && (
          <section style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: 24, boxShadow: '0 4px 24px rgba(131,56,236,0.10)', minWidth: 320, maxWidth: 420 }}>
              <h3 style={{ color: '#118AB2', fontWeight: 700, marginBottom: 8 }}>Profile</h3>
              <p><strong>Username:</strong> {username}</p>
              <form onSubmit={handlePasswordUpdate} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontWeight: 500 }}>
                  New Password:
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginLeft: 8, padding: '0.4rem', borderRadius: 8, border: '1px solid #ccc', width: '100%' }} required />
                </label>
                <button type="submit" style={{ background: '#06D6A0', color: '#fff', border: 'none', borderRadius: 12, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginTop: 8 }}>Update Password</button>
                {passwordMsg && <span style={{ color: '#06D6A0', fontWeight: 600 }}>{passwordMsg}</span>}
              </form>
              <button onClick={() => setShowProfile(false)} style={{ marginTop: '1.5rem', background: '#118AB2', color: '#fff', border: 'none', borderRadius: 16, padding: '0.6rem 1.5rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Close</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
} 