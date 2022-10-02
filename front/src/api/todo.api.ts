import { api } from '.';

const ENDPOINT = '/todo';

export const todoApi = {
  getAll: async () => {
    const result = await api.get(ENDPOINT);
    return result;
  },
  get: async (id: string) => {
    const result = await api.get(`${ENDPOINT}/${id}`);
    return result;
  },
};
