const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getApartments(country = '', city = '') {
  let url = `${API_URL}/api/apartments`;
  if (country) url = `${API_URL}/api/apartments/country/${country}`;
  if (city)    url = `${API_URL}/api/apartments/city/${city}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

export async function getApartmentById(id) {
  const res = await fetch(`${API_URL}/api/apartments/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Appartement non trouvé');
  return res.json();
}
