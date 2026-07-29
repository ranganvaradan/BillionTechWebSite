import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSeo } from '@/data/seo';

const SITE_ORIGIN = 'https://billiontech.ai';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sets document title + description + Open Graph for the active route. */
export function PageMeta() {
  const { pathname } = useLocation();
  const seo = resolveSeo(pathname);
  const url = `${SITE_ORIGIN}${seo.path === '/' ? '' : seo.path}`;

  useEffect(() => {
    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', 'BillionTech');
    upsertMeta('property', 'og:image', `${SITE_ORIGIN}/brand/BillionTech_Logo_Final.png`);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertLink('canonical', url);
  }, [seo.title, seo.description, seo.path, url]);

  return null;
}
