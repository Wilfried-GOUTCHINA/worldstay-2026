'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000';

interface Apartment {
  id: number;
  title: string;
  city: string;
  country: string;
  emoji: string;
  price: number;
  rating: number;
  available: boolean;
  feats: string[];
}

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading]       = useState(true);
  const [country, setCountry]       = useState('all');
  const [onlyAvail, setOnlyAvail]   = useState(true);
  const [selected, setSelected]     = useState<Apartment | null>(null);
  const [confirmed, setConfirmed]   = useState(false);

  useEffect(() => { fetchApts(); }, [country]);

  async function fetchApts() {
    setLoading(true);
    try {
      const url = country === 'all'
        ? `${API_URL}/api/apartments`
        : `${API_URL}/api/apartments/country/${country}`;
      const res  = await fetch(url);
      const data = await res.json();
      setApartments(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const filtered = onlyAvail ? apartments.filter(a => a.available) : apartments;

  function openModal(apt: Apartment) {
    setSelected(apt);
    setConfirmed(false);
  }

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f0f4f8', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <header style={{ background: '#154360', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 60, gap: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>
            World<span style={{ color: '#f39c12' }}>Stay</span>
            <sup style={{ background: '#f39c12', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 4, marginLeft: 4 }}>⚽ 2026</sup>
          </div>
          <nav style={{ display: 'flex', gap: 4 }}>
            {['Hébergements','Vols','Voitures'].map(n => (
              <a key={n} style={{ color: 'rgba(255,255,255,.8)', fontSize: 13, padding: '6px 12px', borderRadius: 20, textDecoration: 'none', cursor: 'pointer' }}>{n}</a>
            ))}
            <a style={{ background: 'rgba(243,156,18,.2)', color: '#f39c12', border: '1px solid rgba(243,156,18,.4)', fontSize: 13, padding: '6px 12px', borderRadius: 20, textDecoration: 'none' }}>
              Offres Mondial ⚽
            </a>
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.5)', color: '#fff', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Se connecter</button>
            <button style={{ background: '#f39c12', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>S&apos;inscrire</button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(160deg,#154360 0%,#1a5276 60%,#1a6691 100%)', padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(243,156,18,.2)', border: '1px solid rgba(243,156,18,.4)', color: '#f39c12', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, marginBottom: 14 }}>
            ⚽ FIFA World Cup 2026 · 11 Juin – 19 Juillet
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 10 }}>
            Trouvez votre appart<br />
            pour le <span style={{ color: '#f39c12' }}>Mondial 2026</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15, marginBottom: 28 }}>
            16 villes hôtes · <strong style={{ color: '#fff' }}>USA · Canada · Mexique</strong>
          </p>

          {/* Search bar */}
          <div style={{ background: '#fff', border: '2px solid #f39c12', borderRadius: 10, display: 'flex', alignItems: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.18)', overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #dde3ea' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#5f6b7a', marginBottom: 3 }}>Destination</div>
              <select style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#1c1c1e', width: '100%', background: 'transparent', cursor: 'pointer' }}>
                <option>Toutes les villes hôtes</option>
                {['New York / New Jersey','Los Angeles','Dallas','Miami','Atlanta','San Francisco','Seattle','Houston','Kansas City','Philadelphia','Boston','Toronto','Vancouver','Mexico City','Guadalajara','Monterrey'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #dde3ea' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#5f6b7a', marginBottom: 3 }}>Arrivée</div>
              <input type="date" defaultValue="2026-06-11" style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#1c1c1e', background: 'transparent', width: '100%' }} />
            </div>
            <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid #dde3ea' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: '#5f6b7a', marginBottom: 3 }}>Départ</div>
              <input type="date" defaultValue="2026-06-18" style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#1c1c1e', background: 'transparent', width: '100%' }} />
            </div>
            <button style={{ background: '#1a5276', color: '#fff', border: 'none', padding: '0 28px', height: 64, fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Rechercher
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '12px 20px', width: 'fit-content', gap: 0 }}>
            {[
              { n: filtered.length, l: 'Disponibles' },
              { n: 16, l: 'Villes hôtes' },
              { n: 3,  l: 'Pays' },
              { n: 104,l: 'Matchs' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 20px' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '.4px' }}>{s.l}</div>
                </div>
                {i < 3 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,.25)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px' }}>

        {/* Country filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { k: 'all', label: '🌎 Tous les pays' },
            { k: 'us',  label: '🇺🇸 États-Unis' },
            { k: 'ca',  label: '🇨🇦 Canada' },
            { k: 'mx',  label: '🇲🇽 Mexique' },
          ].map(c => (
            <button key={c.k} onClick={() => setCountry(c.k)}
              style={{ background: country === c.k ? '#1a5276' : '#fff', border: `1.5px solid ${country === c.k ? '#1a5276' : '#dde3ea'}`, color: country === c.k ? '#fff' : '#5f6b7a', borderRadius: 24, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}>
              {c.label}
            </button>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: '#1c1c1e', cursor: 'pointer' }}>
            <input type="checkbox" checked={onlyAvail} onChange={e => setOnlyAvail(e.target.checked)} style={{ accentColor: '#1a5276', width: 15, height: 15 }} />
            Disponibles seulement
          </label>
        </div>

        {/* Results header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1c1e' }}>
              {loading ? 'Chargement...' : `${filtered.length} propriété${filtered.length > 1 ? 's' : ''} trouvée${filtered.length > 1 ? 's' : ''}`}
            </h2>
            <p style={{ fontSize: 12, color: '#5f6b7a', marginTop: 2 }}>Coupe du Monde 2026 · Taxes et frais inclus</p>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#5f6b7a', fontSize: 16 }}>Chargement des appartements...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {filtered.map(apt => (
              <div key={apt.id}
                style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde3ea', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.08)', transition: 'all .2s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.13)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 10px rgba(0,0,0,.08)'; }}
              >
                {/* Image */}
                <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, background: '#f0f4f8', position: 'relative' }}>
                  {apt.emoji}
                  <span style={{ position: 'absolute', top: 10, left: 10, background: apt.available ? '#1e8449' : '#c0392b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                    {apt.available ? 'Disponible' : 'Complet'}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a5276', lineHeight: 1.3 }}>{apt.title}</div>
                    <div style={{ background: '#1a5276', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 7px', borderRadius: '6px 6px 6px 0', flexShrink: 0 }}>{apt.rating}</div>
                  </div>
                  <div style={{ fontSize: 11, color: '#5f6b7a', marginBottom: 8 }}>📍 {apt.city}</div>

                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                    {apt.feats.map(f => (
                      <span key={f} style={{ background: '#d6e8f7', color: '#1a5276', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4 }}>{f}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #dde3ea', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: apt.available ? '#1e8449' : '#c0392b' }}>
                      {apt.available ? '✓ Disponible' : '✗ Complet'}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#1c1c1e' }}>${apt.price}</div>
                      <div style={{ fontSize: 10, color: '#5f6b7a' }}>par nuit</div>
                    </div>
                  </div>

                  <button onClick={() => openModal(apt)} disabled={!apt.available}
                    style={{ display: 'block', width: '100%', background: apt.available ? '#1a5276' : '#c5ccd4', color: '#fff', border: 'none', borderRadius: 6, padding: 9, marginTop: 10, fontSize: 12, fontWeight: 700, cursor: apt.available ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                    {apt.available ? 'Voir disponibilités' : 'Complet'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      {selected && (
        <div onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,40,.55)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 14, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
            <div style={{ background: '#154360', padding: '18px 20px', borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Finaliser la réservation</h2>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', marginTop: 3 }}>{selected.city}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: '50%', fontSize: 15, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0f4f8', borderRadius: 8, padding: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 30 }}>{selected.emoji}</span>
                <div>
                  <strong style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{selected.title}</strong>
                  <span style={{ fontSize: 12, color: '#5f6b7a' }}>📍 {selected.city} · ${selected.price}/nuit</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  { label: 'Prénom', placeholder: 'Jean', type: 'text' },
                  { label: 'Nom', placeholder: 'Dupont', type: 'text' },
                  { label: 'Email', placeholder: 'jean@exemple.com', type: 'email' },
                  { label: 'Arrivée', placeholder: '', type: 'date' },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#5f6b7a', marginBottom: 4 }}>{f.label}</div>
                    <input type={f.type} placeholder={f.placeholder}
                      style={{ border: '1.5px solid #dde3ea', borderRadius: 6, padding: '9px 11px', fontSize: 13, color: '#1c1c1e', width: '100%', outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                ))}
              </div>

              <div style={{ background: '#f0f4f8', border: '1px solid #dde3ea', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                {[
                  { label: `$${selected.price} x 7 nuits`, val: `$${selected.price * 7}` },
                  { label: 'Frais de service (10%)', val: `$${Math.round(selected.price * 7 * 0.1)}` },
                  { label: 'Taxes (8%)', val: `$${Math.round(selected.price * 7 * 0.08)}` },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                    <span>{r.label}</span><span>{r.val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, borderTop: '1px solid #dde3ea', marginTop: 8, paddingTop: 10 }}>
                  <span>Total</span>
                  <span>${Math.round(selected.price * 7 * 1.18)}</span>
                </div>
              </div>

              {confirmed ? (
                <div style={{ background: '#eafaf1', border: '1.5px solid #1e8449', borderRadius: 8, padding: 18, textAlign: 'center' }}>
                  <div style={{ width: 40, height: 40, background: '#1e8449', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, margin: '0 auto 10px' }}>✓</div>
                  <h3 style={{ color: '#1e8449', fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Réservation confirmée !</h3>
                  <p style={{ fontSize: 12, color: '#5f6b7a' }}>Bonne Coupe du Monde 2026 ⚽</p>
                </div>
              ) : (
                <button onClick={() => setConfirmed(true)}
                  style={{ display: 'block', width: '100%', background: '#1a5276', color: '#fff', border: 'none', borderRadius: 8, padding: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Confirmer et payer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
