const API_URL = 'http://localhost:3001';

export async function getCats() {
  const res = await fetch(`${API_URL}/cats`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createCat(payload) {
  const res = await fetch(`${API_URL}/cats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteCat(id) {
  const res = await fetch(`${API_URL}/cats/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}