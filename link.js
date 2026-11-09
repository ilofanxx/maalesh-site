// Reads and answers a shared link through the public functions only. The key here is the publishable one.
const API = 'https://qmkdmjxctneymofwrthe.supabase.co/rest/v1/rpc/';
const KEY = 'sb_publishable_ZvDVw700l9waYN06IHkNQg_WnnDVVpw';
const token = decodeURIComponent(location.hash.slice(1));
const $ = (s) => document.querySelector(s);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const nameBox = $('#who');
try { nameBox.value = localStorage.getItem('maalesh-name') || ''; } catch {}
const myName = () => { const n = nameBox.value.trim(); try { localStorage.setItem('maalesh-name', n); } catch {} return n; };
const say = (t) => { $('#msg').textContent = t; };

async function call(fn, body) {
  if (token === 'demo') return DEMO[fn](body);
  const r = await fetch(API + fn, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(r.status);
  return r.json();
}
