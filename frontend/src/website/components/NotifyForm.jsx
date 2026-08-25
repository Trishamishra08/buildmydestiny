import React, { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';

const NotifyForm = ({ stacked = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const key = 'bmd_notify_emails';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      if (!existing.includes(value.toLowerCase())) {
        existing.push(value.toLowerCase());
        localStorage.setItem(key, JSON.stringify(existing));
      }
    } catch {
      /* ignore quota */
    }

    setStatus('success');
    setMessage('You’re on the list. We’ll notify you when we go live.');
    setEmail('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`relative w-full ${stacked ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row gap-3'}`}
    >
      <label className="flex-1 relative">
        <span className="sr-only">Email address</span>
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="Enter your email address"
          className="w-full h-14 pl-12 pr-4 bg-white border border-[#d8d8d8] text-sm text-black outline-none focus:border-[#FFB400]"
        />
      </label>
      <button
        type="submit"
        className="h-14 px-8 bg-[#FFB400] text-black font-extrabold uppercase tracking-[0.16em] text-sm hover:bg-[#ffc433] transition-colors shrink-0"
      >
        Notify Me
      </button>
      {status !== 'idle' && (
        <p className={`sm:absolute sm:left-0 sm:-bottom-8 text-sm ${status === 'success' ? 'text-green-700' : 'text-red-600'} flex items-center gap-1.5`}>
          {status === 'success' && <FiCheck />}
          {message}
        </p>
      )}
    </form>
  );
};

export default NotifyForm;
