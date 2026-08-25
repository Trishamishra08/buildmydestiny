import React, { useEffect, useMemo, useState } from 'react';
import { FiSave, FiRefreshCw, FiPlus, FiTrash2, FiGlobe, FiInbox, FiUpload } from 'react-icons/fi';
import { useWebsiteContent } from '../../website/cms';
import { uploadImageFiles } from '../../utils/uploadImages';

const TABS = [
  'Brand',
  'Home',
  'About',
  'How it works',
  'Products',
  'Dealers',
  'Contact',
  'FAQ',
  'Inbox',
];

const Field = ({ label, value, onChange, textarea, rows = 3 }) => (
  <label className="block space-y-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</span>
    {textarea ? (
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#FFB400]"
      />
    ) : (
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#FFB400]"
      />
    )}
  </label>
);

const ImageField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const [url] = await uploadImageFiles([file]);
      if (url) onChange(url);
    } catch (err) {
      alert(err.parsedMessage || err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</span>
      {value ? (
        <img src={value} alt="" className="w-full h-28 object-cover border border-gray-100 bg-gray-50" />
      ) : (
        <div className="w-full h-28 border border-dashed border-gray-300 text-gray-400 text-xs flex items-center justify-center">
          No image
        </div>
      )}
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL"
        className="w-full bg-white border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#FFB400]"
      />
      <label className="inline-flex items-center gap-2 h-9 px-3 bg-black text-[#FFB400] text-[10px] font-bold uppercase tracking-widest cursor-pointer">
        <FiUpload />
        {uploading ? 'Uploading…' : 'Upload image'}
        <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
      </label>
    </div>
  );
};

const AdminWebsite = () => {
  const { content, save, reset } = useWebsiteContent();
  const [draft, setDraft] = useState(content);
  const [tab, setTab] = useState('Home');
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(content)));
  }, [content]);

  useEffect(() => {
    try {
      setEnquiries(JSON.parse(localStorage.getItem('bmd_contact_enquiries') || '[]').reverse());
      setEmails(JSON.parse(localStorage.getItem('bmd_notify_emails') || '[]'));
    } catch {
      setEnquiries([]);
      setEmails([]);
    }
  }, [tab]);

  const patch = (path, value) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i += 1) {
        if (!cur[keys[i]] || typeof cur[keys[i]] !== 'object') cur[keys[i]] = {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const remote = await save(draft);
      setSaved(
        remote
          ? 'Published. Home, About and the rest of the public site now use this content.'
          : 'Saved on this browser. Server sync failed — stay logged in as admin and try again.'
      );
    } catch (err) {
      setSaved(err.parsedMessage || err.message || 'Could not publish website content.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(''), 4500);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all website copy and images to the original defaults?')) return;
    setSaving(true);
    try {
      await reset();
      setSaved('Restored default website content.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(''), 3500);
    }
  };

  const pairList = useMemo(() => {
    if (tab === 'Home') return draft.benefits || [];
    if (tab === 'About') return draft.promises || [];
    if (tab === 'How it works') return draft.howSteps || [];
    if (tab === 'Products') return draft.projects || [];
    if (tab === 'Dealers') return draft.dealers?.benefits || [];
    return [];
  }, [tab, draft]);

  const setPairList = (list) => {
    if (tab === 'Home') patch('benefits', list);
    if (tab === 'About') patch('promises', list);
    if (tab === 'How it works') patch('howSteps', list);
    if (tab === 'Products') patch('projects', list);
    if (tab === 'Dealers') patch('dealers.benefits', list);
  };

  const collage = draft.heroImages?.collage || [];

  return (
    <div className="max-w-6xl mx-auto pb-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFB400] mb-1">Construction CMS</p>
          <h1 className="text-2xl md:text-3xl font-oswald uppercase text-black">Website Content</h1>
          <p className="text-gray-500 text-sm mt-1">
            This is the live public site. Change the home banner, About copy, products, dealers and contact here, then Save & Publish.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} disabled={saving} className="h-10 px-4 border border-gray-300 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            <FiRefreshCw /> Reset
          </button>
          <button onClick={handleSave} disabled={saving} className="h-10 px-5 bg-[#FFB400] text-black text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            <FiSave /> {saving ? 'Publishing…' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-4 px-4 py-3 bg-[#FFB400]/15 border border-[#FFB400] text-sm font-medium">{saved}</div>
      )}

      <div className="flex flex-wrap gap-1 mb-5 border-b border-gray-200 pb-2">
        {TABS.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-3 py-2 text-[11px] font-bold uppercase tracking-widest ${
              tab === item ? 'bg-black text-[#FFB400]' : 'text-gray-500 hover:text-black'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === 'Brand' && (
        <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
          <Field label="Brand name" value={draft.brand?.name} onChange={(v) => patch('brand.name', v)} />
          <Field label="Tagline" value={draft.brand?.tagline} onChange={(v) => patch('brand.tagline', v)} />
          <Field label="Slogan" value={draft.brand?.slogan} onChange={(v) => patch('brand.slogan', v)} />
          <Field label="Phone" value={draft.brand?.phone} onChange={(v) => patch('brand.phone', v)} />
          <Field label="Email" value={draft.brand?.email} onChange={(v) => patch('brand.email', v)} />
          <Field label="Website" value={draft.brand?.web} onChange={(v) => patch('brand.web', v)} />
          <Field label="Location" value={draft.brand?.location} onChange={(v) => patch('brand.location', v)} />
          <a href="/" target="_blank" rel="noreferrer" className="md:col-span-2 text-[12px] font-bold uppercase tracking-widest text-[#111] flex items-center gap-2">
            <FiGlobe /> Open public website
          </a>
        </div>
      )}

      {tab === 'Home' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <Field label="Eyebrow" value={draft.home?.eyebrow} onChange={(v) => patch('home.eyebrow', v)} />
            <Field label="Line 1" value={draft.home?.title?.[0]} onChange={(v) => patch('home.title', [v, draft.home?.title?.[1] || '', draft.home?.title?.[2] || ''])} />
            <Field label="Line 2" value={draft.home?.title?.[1]} onChange={(v) => patch('home.title', [draft.home?.title?.[0] || '', v, draft.home?.title?.[2] || ''])} />
            <Field label="Line 3" value={draft.home?.title?.[2]} onChange={(v) => patch('home.title', [draft.home?.title?.[0] || '', draft.home?.title?.[1] || '', v])} />
            <div className="md:col-span-2">
              <Field label="Banner description" value={draft.home?.description} onChange={(v) => patch('home.description', v)} textarea />
            </div>
            <Field label="Coming soon" value={draft.home?.comingSoon} onChange={(v) => patch('home.comingSoon', v)} />
            <Field label="Stay tuned" value={draft.home?.stayTuned} onChange={(v) => patch('home.stayTuned', v)} />
            <Field label="Headline" value={draft.home?.headline} onChange={(v) => patch('home.headline', v)} />
            <Field label="Closing line" value={draft.home?.closing} onChange={(v) => patch('home.closing', v)} />
            <div className="md:col-span-2">
              <Field label="Intro" value={draft.home?.intro} onChange={(v) => patch('home.intro', v)} textarea />
            </div>
            <Field label="Primary CTA" value={draft.home?.primaryCta} onChange={(v) => patch('home.primaryCta', v)} />
            <Field label="Notify eyebrow" value={draft.notify?.eyebrow} onChange={(v) => patch('notify.eyebrow', v)} />
            <Field label="Notify title before" value={draft.notify?.titleBefore} onChange={(v) => patch('notify.titleBefore', v)} />
            <Field label="Notify accent word" value={draft.notify?.titleAccent} onChange={(v) => patch('notify.titleAccent', v)} />
            <Field label="Notify title after" value={draft.notify?.titleAfter} onChange={(v) => patch('notify.titleAfter', v)} />
            <div className="md:col-span-2">
              <Field label="Notify subtitle" value={draft.notify?.subtitle} onChange={(v) => patch('notify.subtitle', v)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <div className="md:col-span-2">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Home banner images</h3>
              <p className="text-xs text-gray-500 mb-3">Upload a new photo or paste a URL. This is the large background on the home page.</p>
            </div>
            <ImageField label="Banner background" value={draft.heroImages?.background} onChange={(v) => patch('heroImages.background', v)} />
            <ImageField label="Circle photo" value={draft.heroImages?.circle} onChange={(v) => patch('heroImages.circle', v)} />
            {[0, 1, 2, 3].map((idx) => (
              <ImageField
                key={idx}
                label={`Floating photo ${idx + 1}`}
                value={collage[idx]?.src}
                onChange={(v) => {
                  const next = [...collage];
                  next[idx] = { src: v, alt: next[idx]?.alt || `Banner photo ${idx + 1}` };
                  patch('heroImages.collage', next);
                }}
              />
            ))}
          </div>
          <div className="bg-white border border-gray-100 p-5">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Feature cards</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {(draft.features || []).map((item, idx) => (
                <div key={idx} className="border border-gray-100 p-3 space-y-2">
                  <Field label="Title" value={item.title} onChange={(v) => {
                    const list = [...draft.features];
                    list[idx] = { ...list[idx], title: v };
                    patch('features', list);
                  }} />
                  <Field label="Text" value={item.text} onChange={(v) => {
                    const list = [...draft.features];
                    list[idx] = { ...list[idx], text: v };
                    patch('features', list);
                  }} textarea rows={2} />
                </div>
              ))}
            </div>
          </div>
          <PairEditor title="Customer benefits" items={pairList} onChange={setPairList} />
        </div>
      )}

      {tab === 'About' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <Field label="About title" value={draft.about?.title} onChange={(v) => patch('about.title', v)} />
            <Field label="Focus line" value={draft.why?.focus} onChange={(v) => patch('why.focus', v)} />
            <Field label="Vision" value={draft.about?.vision} onChange={(v) => patch('about.vision', v)} textarea />
            <Field label="Mission" value={draft.about?.mission} onChange={(v) => patch('about.mission', v)} textarea />
            <ImageField label="About page photo" value={draft.about?.image} onChange={(v) => patch('about.image', v)} />
            <ImageField label="About banner background" value={draft.heroImages?.background} onChange={(v) => patch('heroImages.background', v)} />
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">About paragraphs</p>
                <button
                  type="button"
                  onClick={() => patch('about.paragraphs', [...(draft.about?.paragraphs || []), 'New paragraph'])}
                  className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  <FiPlus /> Add paragraph
                </button>
              </div>
              {(draft.about?.paragraphs || []).map((p, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Field
                      label={`Paragraph ${idx + 1}`}
                      value={p}
                      textarea
                      onChange={(v) => {
                        const list = [...(draft.about?.paragraphs || [])];
                        list[idx] = v;
                        patch('about.paragraphs', list);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => patch('about.paragraphs', (draft.about?.paragraphs || []).filter((_, i) => i !== idx))}
                    className="mt-6 text-red-600"
                    aria-label="Remove paragraph"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <PairEditor title="Customer promise" items={pairList} onChange={setPairList} />
        </div>
      )}

      {tab === 'How it works' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <Field label="Mantra" value={draft.howMantra} onChange={(v) => patch('howMantra', v)} />
            <Field label="Section title" value={draft.why?.title} onChange={(v) => patch('why.title', v)} />
            <Field label="Paragraph 1" value={draft.why?.p1} onChange={(v) => patch('why.p1', v)} textarea />
            <Field label="Paragraph 2" value={draft.why?.p2} onChange={(v) => patch('why.p2', v)} textarea />
          </div>
          <PairEditor title="Steps" items={pairList} onChange={setPairList} extraKey="n" extraLabel="Number" />
        </div>
      )}

      {tab === 'Products' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <Field label="Title" value={draft.materials?.title} onChange={(v) => patch('materials.title', v)} />
            <Field label="Note" value={draft.materials?.note} onChange={(v) => patch('materials.note', v)} />
            <div className="md:col-span-2">
              <Field label="Intro" value={draft.materials?.intro} onChange={(v) => patch('materials.intro', v)} textarea />
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-widest">Material categories</h3>
              <button
                type="button"
                onClick={() => patch('materials.categories', [...(draft.materials?.categories || []), { name: 'New category', image: '/website/material-cement.jpg' }])}
                className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 text-black"
              >
                <FiPlus /> Add
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {(draft.materials?.categories || []).map((cat, idx) => (
                <div key={idx} className="border border-gray-100 p-3 space-y-2">
                  <Field label="Name" value={cat.name} onChange={(v) => {
                    const list = [...draft.materials.categories];
                    list[idx] = { ...list[idx], name: v };
                    patch('materials.categories', list);
                  }} />
                  <ImageField label="Image" value={cat.image} onChange={(v) => {
                    const list = [...draft.materials.categories];
                    list[idx] = { ...list[idx], image: v };
                    patch('materials.categories', list);
                  }} />
                  <button
                    type="button"
                    onClick={() => patch('materials.categories', draft.materials.categories.filter((_, i) => i !== idx))}
                    className="text-red-600 text-[11px] font-bold uppercase flex items-center gap-1"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <PairEditor title="Project types" items={pairList} onChange={setPairList} />
        </div>
      )}

      {tab === 'Dealers' && (
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
            <Field label="Title" value={draft.dealers?.title} onChange={(v) => patch('dealers.title', v)} />
            <Field label="CTA" value={draft.dealers?.cta} onChange={(v) => patch('dealers.cta', v)} />
            <div className="md:col-span-2">
              <Field label="Intro" value={draft.dealers?.intro} onChange={(v) => patch('dealers.intro', v)} textarea />
            </div>
            <ImageField label="Dealers page photo" value={draft.dealers?.image} onChange={(v) => patch('dealers.image', v)} />
          </div>
          <PairEditor title="Dealer benefits" items={pairList} onChange={setPairList} />
        </div>
      )}

      {tab === 'Contact' && (
        <div className="grid md:grid-cols-2 gap-4 bg-white border border-gray-100 p-5">
          <Field label="Contact title" value={draft.contact?.title} onChange={(v) => patch('contact.title', v)} />
          <Field label="Contact intro" value={draft.contact?.intro} onChange={(v) => patch('contact.intro', v)} textarea />
          <div className="md:col-span-2">
            <Field
              label="Contact options (comma separated)"
              value={(draft.contact?.options || []).join(', ')}
              onChange={(v) => patch('contact.options', v.split(',').map((item) => item.trim()).filter(Boolean))}
            />
          </div>
          <Field label="Phone" value={draft.brand?.phone} onChange={(v) => patch('brand.phone', v)} />
          <Field label="Email" value={draft.brand?.email} onChange={(v) => patch('brand.email', v)} />
          <Field label="Location" value={draft.brand?.location} onChange={(v) => patch('brand.location', v)} />
        </div>
      )}

      {tab === 'FAQ' && (
        <div className="bg-white border border-gray-100 p-5 space-y-4">
          <Field label="FAQ page title" value={draft.faqPage?.title} onChange={(v) => patch('faqPage.title', v)} />
          <Field label="FAQ subtitle" value={draft.faqPage?.subtitle} onChange={(v) => patch('faqPage.subtitle', v)} />
          <Field label="Privacy paragraph 1" value={draft.privacy?.p1} onChange={(v) => patch('privacy.p1', v)} textarea />
          <Field label="Privacy paragraph 2" value={draft.privacy?.p2} onChange={(v) => patch('privacy.p2', v)} textarea />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => patch('faqs', [...(draft.faqs || []), { q: 'New question?', a: 'Add the answer here.' }])}
              className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1"
            >
              <FiPlus /> Add FAQ
            </button>
          </div>
          {(draft.faqs || []).map((item, idx) => (
            <div key={idx} className="border border-gray-100 p-3 space-y-2">
              <Field label="Question" value={item.q} onChange={(v) => {
                const list = [...draft.faqs];
                list[idx] = { ...list[idx], q: v };
                patch('faqs', list);
              }} />
              <Field label="Answer" value={item.a} onChange={(v) => {
                const list = [...draft.faqs];
                list[idx] = { ...list[idx], a: v };
                patch('faqs', list);
              }} textarea />
              <button
                type="button"
                onClick={() => patch('faqs', draft.faqs.filter((_, i) => i !== idx))}
                className="text-red-600 text-[11px] font-bold uppercase flex items-center gap-1"
              >
                <FiTrash2 /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Inbox' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-100 p-5">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><FiInbox /> Contact enquiries</h3>
            {enquiries.length === 0 ? (
              <p className="text-sm text-gray-500">No enquiries yet.</p>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {enquiries.map((item, idx) => (
                  <article key={idx} className="border border-gray-100 p-3 text-sm">
                    <p className="font-bold">{item.name} · {item.type}</p>
                    <p className="text-gray-500 text-xs">{item.email} · {item.mobile}</p>
                    <p className="mt-2 text-gray-700">{item.message}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white border border-gray-100 p-5">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Launch notify emails</h3>
            {emails.length === 0 ? (
              <p className="text-sm text-gray-500">No subscribers yet.</p>
            ) : (
              <ul className="text-sm space-y-1">
                {emails.map((email) => <li key={email}>{email}</li>)}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PairEditor = ({ title, items, onChange, extraKey, extraLabel }) => (
  <div className="bg-white border border-gray-100 p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
      <button
        type="button"
        onClick={() => onChange([...(items || []), extraKey ? { n: String((items?.length || 0) + 1).padStart(2, '0'), title: 'New step', text: '' } : { title: 'New item', text: '' }])}
        className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1"
      >
        <FiPlus /> Add
      </button>
    </div>
    <div className="grid md:grid-cols-2 gap-3">
      {(items || []).map((item, idx) => (
        <div key={idx} className="border border-gray-100 p-3 space-y-2">
          {extraKey && (
            <Field
              label={extraLabel}
              value={item[extraKey]}
              onChange={(v) => {
                const list = [...items];
                list[idx] = { ...list[idx], [extraKey]: v };
                onChange(list);
              }}
            />
          )}
          <Field
            label="Title"
            value={item.title}
            onChange={(v) => {
              const list = [...items];
              list[idx] = { ...list[idx], title: v };
              onChange(list);
            }}
          />
          <Field
            label="Text"
            value={item.text}
            textarea
            rows={2}
            onChange={(v) => {
              const list = [...items];
              list[idx] = { ...list[idx], text: v };
              onChange(list);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="text-red-600 text-[11px] font-bold uppercase flex items-center gap-1"
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default AdminWebsite;
