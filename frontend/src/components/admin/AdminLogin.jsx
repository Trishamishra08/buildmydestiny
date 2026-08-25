import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { registerFCMToken } from '../../services/pushNotificationService';

import api from '../../utils/api';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser, setIsAuthenticated } = useShop();

  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email) newErrors.email = 'Enter admin email';
    if (!form.password) newErrors.password = 'Enter password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/users/login', {
        email: form.email,
        password: form.password
      });

      if (res.data.success && res.data.data.role === 'admin') {
        const token = res.data.data.token;
        const data = { name: res.data.data.name, email: res.data.data.email, role: 'admin' };

        localStorage.setItem('admin_token', token);
        registerFCMToken(true).catch(console.error);
        setUser(data);
        setIsAuthenticated(true);

        navigate('/admin');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || error.message || 'Failed to authenticate' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-montserrat relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-2 bmd-hazard" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, #ffb400 0 12px, #111 12px 24px)'
      }} />
      <div className="absolute inset-x-0 bottom-0 h-2" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, #ffb400 0 12px, #111 12px 24px)'
      }} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#FFB400] flex items-center justify-center mb-6 p-3">
          <svg viewBox="0 0 52 52" className="w-full h-full">
            <rect x="4" y="20" width="12" height="28" fill="#111111" />
            <rect x="20" y="6" width="12" height="42" fill="#111111" />
            <rect x="36" y="26" width="12" height="22" fill="#FFFFFF" />
          </svg>
        </div>
        <h2 className="text-center text-3xl uppercase text-white tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Build My Destiny
        </h2>
        <p className="mt-2 text-center text-xs text-[#FFB400] uppercase tracking-[0.25em] font-semibold">
          Construction Admin Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-[#1a1a1a] py-10 px-6 sm:px-10 border border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-center">
                <p className="text-xs text-red-400 font-bold uppercase tracking-widest">{errors.submit}</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="text-[#FFB400]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.email ? 'border-red-400' : 'border-white/15'} focus:border-[#FFB400] pl-11 pr-4 py-3.5 text-sm text-white outline-none`}
                  placeholder="admin@buildmydestiny.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-[10px] text-red-400 font-bold">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="text-[#FFB400]" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-black border ${errors.password ? 'border-red-400' : 'border-white/15'} focus:border-[#FFB400] pl-11 pr-4 py-3.5 text-sm text-white outline-none`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-[10px] text-red-400 font-bold">{errors.password}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 text-xs font-bold uppercase tracking-[0.15em] text-black bg-[#FFB400] hover:bg-[#ffc433] disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
                {!loading && <FiArrowRight size={14} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
