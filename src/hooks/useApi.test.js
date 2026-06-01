import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useApi', () => {
  it('сразу после монтирования loading=true, data=[]', async () => {
    fetch.mockReturnValueOnce(new Promise(() => {}));

    const { result } = renderHook(() => useApi('/cats'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('возвращает данные после успешного запроса', async () => {
    const mockData = [{ id: 1, title: 'Барсик' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApi('/cats'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/cats');
  });

  it('при сетевой ошибке выставляет error', async () => {
    fetch.mockRejectedValueOnce(new Error('network down'));

    const { result } = renderHook(() => useApi('/cats'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeTruthy();
  });

  it('при HTTP-ошибке (ok=false) тоже выставляет error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useApi('/cats'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});