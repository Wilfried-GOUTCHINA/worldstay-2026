'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

export default function ApartmentDetail() {
  const { id }   = useParams();
  const router   = useRouter();
  const [apt, setApt]           = useState<Apartment | null>(null);
  const [loading, setLoading]   = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [checkin, setCheckin]   = useState('2026-06-11');
  const [checkout, setCheckout] = useState('2026-06-18');

  useEffect(() => {
    fetch(`${API_URL}/api/apartments/${id}`)
      .then(r => r.json())
      .then(d => { setApt(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  function getNights() {
    const d1 = new Date(checkin);
    const d2 = new Date(checkout);
    return Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86400000));
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, color: '#5f6b7a' }}>
      Chargement...
    </div>
  );

  if (!apt) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 18, color: '#c0392b' }}>
      Appartement non trouvé.
    </div>
  );

  const nights   = getNights();
  const subtotal = apt.price * nights;
  const fee      = Math.round(subtotal * 0.10);
  const tax      = Math.round(subtotal * 0.08);
  const total    = subtotal + fee + tax;

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f0f4f8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ background: '#154360', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 60, gap: 32 }}>
          <div onClick={() => router.push('/')} style={{ fontSize: 22, fontWeight: 800, color: '#fff', cursor: 'pointer' }}>
            World<span style={{ color: '#f39c12' }}>Stay</span>
            <sup style={{ background: '#f39c12', color: '#fff', fontSize: 9, padding: '2px 5px', borderRadius: 4, marginLeft: 4 }}>⚽ 2026</sup>
          </div>
          <button onClick={() => router.push('/')}
            style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>
            ← Retour aux résultats
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 24px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: '#5f6b7a', marginBottom: 16 }}>
          <span onClick={() => router.push('/')} style={{ color: '#1a5276', cursor: 'pointer' }}>Accueil</span>
          {' › '}{apt.city}{' › '}{apt.title}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1c1c1e', marginBottom: 6 }}>{apt.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ background: '#1a5276', color: '#fff', fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: '6px 6px 6px 0' }}>{apt.rating}</span>
              <span style={{ fontSize: 13, color: '#5f6b7a' }}>📍 {apt.city}</span>
              <span style={{ fontSize: 13, color: apt.available ? '#1e8449' : '#c0392b', fontWeight: 600 }}>
                {apt.available ? '✓ Disponible' : '✗ Complet'}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1c1c1e' }}>${apt.price}</div>
            <div style={{ fontSize: 12, color: '#5f6b7a' }}>par nuit · taxes incluses</div>
          </div>
        </div>

        {/* Hero image */}
        <div style={{ background: '#d6e8f7', borderRadius: 14, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100, marginBottom: 24, border: '1px solid #dde3ea' }}>
          {apt.emoji}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            {/* Features */}
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde3ea', padding: 20, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,.06)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1c1c1e', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #dde3ea' }}>Équipements</h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {apt.feats.map(f => (
                  <span key={f} style={{ background: '#d6e8f7', color: '#1a5276', fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 6 }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde3ea', padding: 20, marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,.06)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1c1c1e', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid #dde3ea' }}>À propos</h2>
              <p style={{ fontSize: 14, color: '#5f6b7a', lineHeight: 1.7 }}>
                Cet appartement exceptionnel est idéalement situé pour profiter de la <strong>Coupe du Monde 2026</strong> à {apt.city}.
                Profitez d&apos;un hébergement confortable avec tous les équipements nécessaires pour un séjour inoubliable.
                À proximité des transports en commun et des principales attractions de la ville.
              </p>
            </div>

            {/* Politique */}
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde3ea', padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,.06)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1c1c1e', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid #dde3ea' }}>Politique d&apos;annulation</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '✓', text: 'Annulation gratuite jusqu\'à 7 jours avant', color: '#1e8449' },
                  { icon: '✓', text: 'Paiement sécurisé', color: '#1e8449' },
                  { icon: '✓', text: 'Confirmation immédiate', color: '#1e8449' },
                ].map(p => (
                  <div key={p.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1c1c1e' }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>{p.icon}</span> {p.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Booking box */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #dde3ea', padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,.1)', position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1c1c1e', marginBottom: 4 }}>${apt.price} <span style={{ fontSize: 13, fontWeight: 400, color: '#5f6b7a' }}>/ nuit</span></div>
            <div style={{ fontSize: 12, color: '#5f6b7a', marginBottom: 16 }}>Taxes et frais inclus</div>

            <div style={{ border: '1.5px solid #dde3ea', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #dde3ea' }}>
                <div style={{ padding: '10px 12px', borderRight: '1px solid #dde3ea' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#5f6b7a', marginBottom: 3 }}>Arrivée</div>
                  <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#1c1c1e', width: '100%', background: 'transparent', fontFamily: 'inherit' }} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#5f6b7a', marginBottom: 3 }}>Départ</div>
                  <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#1c1c1e', width: '100%', background: 'transparent', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#5f6b7a', marginBottom: 3 }}>Voyageurs</div>
                <select style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#1c1c1e', width: '100%', background: 'transparent', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <option>1 voyageur</option>
                  <option selected>2 voyageurs</option>
                  <option>3 voyageurs</option>
                  <option>4 voyageurs</option>
                </select>
              </div>
            </div>

            {/* Price breakdown */}
            <div style={{ marginBottom: 16 }}>
              {[
                { l: `$${apt.price} x ${nights} nuit${nights > 1 ? 's' : ''}`, v: `$${subtotal}` },
                { l: 'Frais de service (10%)', v: `$${fee}` },
                { l: 'Taxes locales (8%)', v: `$${tax}` },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#1c1c1e', padding: '5px 0' }}>
                  <span>{r.l}</span><span>{r.v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, borderTop: '1px solid #dde3ea', marginTop: 8, paddingTop: 10 }}>
                <span>Total</span><span>${total}</span>
              </div>
            </div>

            {confirmed ? (
              <div style={{ background: '#eafaf1', border: '1.5px solid #1e8449', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>✅</div>
                <h3 style={{ color: '#1e8449', fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Réservation confirmée !</h3>
                <p style={{ fontSize: 12, color: '#5f6b7a' }}>Bonne Coupe du Monde 2026 ⚽</p>
              </div>
            ) : (
              <button onClick={() => setConfirmed(true)} disabled={!apt.available}
                style={{ display: 'block', width: '100%', background: apt.available ? '#1a5276' : '#c5ccd4', color: '#fff', border: 'none', borderRadius: 8, padding: 14, fontSize: 15, fontWeight: 800, cursor: apt.available ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                {apt.available ? 'Réserver maintenant' : 'Complet'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
