import React, { useEffect } from 'react';
import { todoApi } from '../api/todo.api';

export const Todo: React.FC = () => {
  useEffect(() => {
    (async () => {
      const allTodo = await todoApi.getAll();
      console.log({ allTodo });
      console.log(process.env.REACT_APP_API_BASE_URL);
    })();
  });

  return (
    <div>
      <ul></ul>
    </div>
  );
};
