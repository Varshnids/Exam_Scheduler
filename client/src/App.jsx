import React, { useState } from 'react';
import StudentHome from './components/StudentHome';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (!user) {
    return (
      <>
        {showSignup ? (
          <>
            <SignupForm />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span>Already have an account?{' '}
                <button style={{ color: '#8338EC', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }} onClick={() => setShowSignup(false)}>Login</button>
              </span>
            </div>
          </>
        ) : (
          <>
            <LoginForm onLogin={setUser} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <span>New user?{' '}
                <button style={{ color: '#06D6A0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }} onClick={() => setShowSignup(true)}>Sign Up</button>
              </span>
            </div>
          </>
        )}
      </>
    );
  }

  // Show Student dashboard if role is student
  if (user.role === 'student') {
    return <StudentHome onLogout={handleLogout} />;
  }

  // Show Admin dashboard if role is admin
  if (user.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Show Teacher dashboard if role is teacher
  if (user.role === 'teacher') {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  return <div style={{ padding: 40, textAlign: 'center' }}>Dashboard for {user.role} coming soon!</div>;
}

export default App;
