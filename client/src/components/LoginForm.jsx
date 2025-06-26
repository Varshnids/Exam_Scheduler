import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const roles = ['Student', 'Teacher', 'Admin'];

export default function LoginForm({ onLogin }) {
  const [role, setRole] = useState('Student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focus, setFocus] = useState({ role: false, username: false, password: false });
  const [btnHover, setBtnHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!username || !password) {
      setError('Please enter username and password.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin({ ...res.data, username });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  // Responsive styles
  const fontFamily = 'Poppins, Arial, sans-serif';
  const inputBase = {
    padding: '1rem',
    borderRadius: 14,
    border: '1.5px solid #ccc',
    width: '100%',
    fontSize: '1.1rem',
    marginBottom: 16,
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s',
    background: '#fff',
    color: '#222',
    fontFamily,
    boxSizing: 'border-box',
    fontWeight: 500,
    '::placeholder': { color: '#888' },
  };
  const inputFocus = {
    border: '1.5px solid #8338EC',
    boxShadow: '0 0 0 2px #e0c3fc',
    background: '#fff',
    color: '#222',
  };
  const selectBase = {
    ...inputBase,
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    cursor: 'pointer',
    color: '#222',
    background: '#fff',
  };
  const selectFocus = {
    border: '1.5px solid #06D6A0',
    boxShadow: '0 0 0 2px #b8ffe0',
    background: '#fff',
    color: '#222',
  };
  const buttonBase = {
    background: 'linear-gradient(90deg, #8338EC 0%, #FF006E 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    padding: '1.1rem 0',
    fontWeight: 700,
    fontSize: '1.15rem',
    cursor: 'pointer',
    width: '100%',
    marginTop: 8,
    boxShadow: '0 2px 8px rgba(131,56,236,0.10)',
    transition: 'background 0.2s, transform 0.15s',
    letterSpacing: 1,
    fontFamily,
  };
  const buttonHover = {
    background: 'linear-gradient(90deg, #6f2dbd 0%, #d72660 100%)',
    transform: 'translateY(-2px) scale(1.03)',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
        .login-input::placeholder { color: #888 !important; opacity: 1; }
      `}</style>
      <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0c3fc 0%, #f8fafc 100%)', padding: 0, margin: 0, fontFamily }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: 28, boxShadow: '0 4px 32px rgba(131,56,236,0.13)', width: '100%', maxWidth: 430, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center', boxSizing: 'border-box', fontFamily }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
            <FaUserCircle size={62} color="#8338EC" style={{ marginBottom: 8 }} />
            <h2 style={{ color: '#8338EC', fontWeight: 700, margin: 0, fontSize: '2.2rem', textAlign: 'center', letterSpacing: 1, fontFamily }}>Login</h2>
            <span style={{ color: '#444', fontSize: '1.08rem', marginTop: 2, fontWeight: 500, fontFamily }}>Exam Scheduler</span>
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: 700, display: 'block', marginBottom: 7, fontSize: '1.08rem', color: '#222', fontFamily }}>Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={focus.role ? { ...selectBase, ...selectFocus } : selectBase}
              onFocus={() => setFocus(f => ({ ...f, role: true }))}
              onBlur={() => setFocus(f => ({ ...f, role: false }))}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: 700, display: 'block', marginBottom: 7, fontSize: '1.08rem', color: '#222', fontFamily }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="login-input"
              style={focus.username ? { ...inputBase, ...inputFocus } : inputBase}
              onFocus={() => setFocus(f => ({ ...f, username: true }))}
              onBlur={() => setFocus(f => ({ ...f, username: false }))}
              autoComplete="username"
            />
          </div>
          <div style={{ width: '100%' }}>
            <label style={{ fontWeight: 700, display: 'block', marginBottom: 7, fontSize: '1.08rem', color: '#222', fontFamily }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="login-input"
              style={focus.password ? { ...inputBase, ...inputFocus } : inputBase}
              onFocus={() => setFocus(f => ({ ...f, password: true }))}
              onBlur={() => setFocus(f => ({ ...f, password: false }))}
              autoComplete="current-password"
            />
          </div>
          {error && <span style={{ color: '#EF476F', fontWeight: 700, marginBottom: 8, fontFamily }}>{error}</span>}
          <button
            type="submit"
            style={btnHover ? { ...buttonBase, ...buttonHover } : buttonBase}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
} 