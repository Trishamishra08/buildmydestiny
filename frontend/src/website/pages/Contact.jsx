import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import ScrollFillHeading from '../components/ScrollFillHeading';
import { useWebsiteContent } from '../cms';

const Contact = () => {
  const { content } = useWebsiteContent();
  const { brand, contact, heroImages } = content;
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    type: contact.options?.[0] || 'Customer Support',
    message: '',
  });
  const [status, setStatus] = useState('');

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('Please fill in all fields.');
      return;
    }
    try {
      const key = 'bmd_contact_enquiries';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      /* ignore */
    }
    setStatus('Thanks. Our team will get back to you shortly.');
    setForm({ name: '', mobile: '', email: '', type: contact.options?.[0] || 'Customer Support', message: '' });
  };

  const fieldClass =
    'w-full h-12 px-4 bg-white border border-black/15 text-black text-sm outline-none focus:border-[#FFB400]';

  return (
    <div className="bg-[#f6f6f4]">
      <PageHero eyebrow="Contact Us" title={contact.title} subtitle={contact.intro} image={heroImages?.background} />
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
        <div>
          <ScrollFillHeading as="h2" theme="light" className="text-2xl mb-5">Contact Options</ScrollFillHeading>
          <div className="flex flex-wrap gap-2 mb-8">
            {(contact.options || []).map((opt) => (
              <span key={opt} className="px-3 py-1.5 border border-[#FFB400] text-[#FFB400] text-xs font-bold uppercase tracking-wider">
                {opt}
              </span>
            ))}
          </div>
          <ul className="space-y-4 text-black/80">
            <li className="flex items-center gap-3"><FiPhone className="text-[#FFB400]" /> {brand.phone}</li>
            <li className="flex items-center gap-3"><FiMail className="text-[#FFB400]" /> {brand.email}</li>
            <li className="flex items-center gap-3"><FiMapPin className="text-[#FFB400]" /> {brand.location}</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={onChange} placeholder="Name" className={fieldClass} />
            <input name="mobile" value={form.mobile} onChange={onChange} placeholder="Mobile Number" className={fieldClass} />
          </div>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" className={fieldClass} />
          <select name="type" value={form.type} onChange={onChange} className={fieldClass}>
            {(contact.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Message"
            rows={5}
            className="w-full px-4 py-3 bg-white border border-black/15 text-black text-sm outline-none focus:border-[#FFB400]"
          />
          <button type="submit" className="h-11 px-8 bg-[#FFB400] text-black text-[12px] font-extrabold uppercase tracking-[0.16em]">
            Submit
          </button>
          {status && <p className="text-[#FFB400] text-sm">{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default Contact;
