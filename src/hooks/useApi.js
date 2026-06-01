import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001';

export function useApi(endpoint) {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [endpoint]);

  return { data, setData, loading, error, refetch: loadData };
}