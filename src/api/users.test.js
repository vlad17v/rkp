import { getUsers, deleteUser, getProfile, updateProfile } from './users';

const API_URL = 'http://localhost:3001';

beforeEach(() => { global.fetch = vi.fn(); });
afterEach(() => { vi.restoreAllMocks(); });

describe('getUsers', () => {
  it('делает GET запрос и возвращает список пользователей', async () => {
    const mockUsers = [{ id: 1, fullName: 'Admin', login: 'admin', role: 'admin' }];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockUsers });

    const result = await getUsers();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/users`);
    expect(result).toEqual(mockUsers);
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
    await expect(getUsers()).rejects.toThrow('HTTP 500');
  });
});

describe('deleteUser', () => {
  it('делает DELETE запрос на правильный URL', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await deleteUser(2);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/users/2`,
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404, json: async () => ({}) });
    await expect(deleteUser(999)).rejects.toThrow('HTTP 404');
  });
});

describe('getProfile', () => {
  it('делает GET запрос и возвращает профиль', async () => {
    const mockProfile = { fullName: 'Test User', login: 'test' };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProfile });

    const result = await getProfile();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/profile`);
    expect(result).toEqual(mockProfile);
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
    await expect(getProfile()).rejects.toThrow('HTTP 500');
  });
});

describe('updateProfile', () => {
  it('делает PUT с правильным телом', async () => {
    const payload = { fullName: 'New Name', login: 'newlogin' };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });

    const result = await updateProfile(payload);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/profile`,
      expect.objectContaining({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
    expect(result).toEqual(payload);
  });

  it('бросает ошибку при ok=false', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });
    await expect(updateProfile({})).rejects.toThrow('HTTP 500');
  });
});