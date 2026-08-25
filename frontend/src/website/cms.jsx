import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { buildDefaultContent } from './data/content';
import api from '../utils/api';

export const CMS_KEY = 'bmd_website_cms_v4';
export const CMS_EVENT = 'bmd-cms-updated';

const SETTING_KEYS = [
  'taxRate',
  'deliveryCharge',
  'freeDeliveryThreshold',
  'estDeliveryDays',
  'shippingPartner',
  'trackingUrl',
  'supportContact',
  'isCodEnabled',
  'codCharge',
];

const deepMerge = (base, extra) => {
  if (!extra || typeof extra !== 'object' || Array.isArray(extra)) return extra ?? base;
  const out = { ...base };
  Object.keys(extra).forEach((key) => {
    const next = extra[key];
    const prev = base?.[key];
    if (Array.isArray(next)) out[key] = next;
    else if (next && typeof next === 'object' && prev && typeof prev === 'object' && !Array.isArray(prev)) {
      out[key] = deepMerge(prev, next);
    } else if (next !== undefined) {
      out[key] = next;
    }
  });
  return out;
};

export const loadWebsiteContent = () => {
  const defaults = buildDefaultContent();
  try {
    const raw = localStorage.getItem(CMS_KEY);
    if (!raw) return defaults;
    return deepMerge(defaults, JSON.parse(raw));
  } catch {
    return defaults;
  }
};

export const persistWebsiteContent = (content) => {
  localStorage.setItem(CMS_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event(CMS_EVENT));
};

const parsePolicyContent = (raw) => {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

export const fetchRemoteWebsiteContent = async () => {
  try {
    const res = await api.get('/settings');
    const remote = res.data?.data?.settings?.websiteContent;
    if (remote && typeof remote === 'object') return remote;
  } catch {
    /* try policy store next */
  }
  try {
    const res = await api.get('/policies/website');
    return parsePolicyContent(res.data?.data?.content);
  } catch {
    return null;
  }
};

export const persistRemoteWebsiteContent = async (content) => {
  try {
    const res = await api.get('/settings');
    const current = res.data?.data?.settings || {};
    const payload = {};
    SETTING_KEYS.forEach((key) => {
      if (current[key] !== undefined) payload[key] = current[key];
    });
    payload.websiteContent = content;
    await api.patch('/settings/update', payload);
    return true;
  } catch {
    /* fall through */
  }
  try {
    await api.put('/policies/website', { content: JSON.stringify(content) });
    return true;
  } catch {
    return false;
  }
};

const WebsiteContentContext = createContext(null);

export const WebsiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => loadWebsiteContent());

  const apply = useCallback((next) => {
    const merged = deepMerge(buildDefaultContent(), next);
    persistWebsiteContent(merged);
    setContent(merged);
    return merged;
  }, []);

  const refresh = useCallback(() => setContent(loadWebsiteContent()), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchRemoteWebsiteContent();
      if (cancelled || !remote) return;
      const merged = deepMerge(buildDefaultContent(), remote);
      persistWebsiteContent(merged);
      setContent(merged);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CMS_KEY) refresh();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(CMS_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CMS_EVENT, refresh);
    };
  }, [refresh]);

  const save = useCallback(
    async (next) => {
      const merged = apply(next);
      const remote = await persistRemoteWebsiteContent(merged);
      return remote;
    },
    [apply]
  );

  const reset = useCallback(async () => {
    const defaults = buildDefaultContent();
    persistWebsiteContent(defaults);
    setContent(defaults);
    const remote = await persistRemoteWebsiteContent(defaults);
    return remote;
  }, []);

  const value = useMemo(() => ({ content, save, reset, refresh }), [content, save, reset, refresh]);

  return <WebsiteContentContext.Provider value={value}>{children}</WebsiteContentContext.Provider>;
};

export const useWebsiteContent = () => {
  const ctx = useContext(WebsiteContentContext);
  if (!ctx) {
    return {
      content: buildDefaultContent(),
      save: async () => false,
      reset: async () => false,
      refresh: () => {},
    };
  }
  return ctx;
};
