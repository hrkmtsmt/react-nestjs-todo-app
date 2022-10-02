import { api } from '.';

const ENDPOINT = '/todo';

export type Todo = {
  id: string;
  title: string;
  body: string;
  isCompleted: boolean;
  createdAt: string;
};

export type TodoPostRequest = {
  title: string;
  body: string;
  isCompleted: false;
};

export type TodoPatchRequest = {
  title: string;
  body: string;
  isCompleted: boolean;
};

export const todoApi = {
  getAll: async () => {
    const result = await api.get<Array<Todo>>(ENDPOINT);
    return result;
  },
  get: async (id: string) => {
    const result = await api.get(`${ENDPOINT}/${id}`);
    return result;
  },
  post: async (requestBody: TodoPostRequest) => {
    await api.post(ENDPOINT, requestBody);
  },
  patch: async (id: string, requestBody: TodoPatchRequest) => {
    await api.patch(`${ENDPOINT}/${id}`, requestBody);
  },
  delete: async (id: string) => {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
