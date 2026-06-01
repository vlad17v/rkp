import { getCats, createCat, deleteCat } from './cats';

const API_URL = 'http://localhost:3001';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getCats', () => {
  it('делает GET запрос на правильный URL и возвращает массив котов', async () => {
    const mockCats = [{ id: 1, title: 'Барсик' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCats,
    });

    const result = await getCats();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/cats`);
    expect(result).toEqual(mockCats);
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });

    await expect(getCats()).rejects.toThrow('HTTP 500');
  });
});

describe('createCat', () => {
  it('делает POST с правильным телом и возвращает созданного кота', async () => {
    const newCat = { header: 'Вася', subhead: 'Кот', title: 'Вася', subtitle: 'Cats', text: 'Хороший' };
    const created = { id: 42, ...newCat };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => created,
    });

    const result = await createCat(newCat);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/cats`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      })
    );
    expect(result).toEqual(created);
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 400, json: async () => ({}) });

    await expect(createCat({})).rejects.toThrow('HTTP 400');
  });
});

describe('deleteCat', () => {
  it('делает DELETE запрос на правильный URL', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await deleteCat(1);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/cats/1`,
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404, json: async () => ({}) });

    await expect(deleteCat(999)).rejects.toThrow('HTTP 404');
  });
});