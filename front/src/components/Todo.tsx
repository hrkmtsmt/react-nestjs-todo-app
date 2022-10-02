import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todo.api';
import type { Todo } from '../api/todo.api';

export const TodoApp: React.FC = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState<Array<Todo> | Error>([
    {
      id: '',
      title: '',
      body: '',
      isCompleted: false,
      createdAt: '',
    },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const onChangeNewTodoTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  }, []);

  const onClickAddTodo = useCallback(async () => {
    await todoApi.post({ title: newTodoTitle, body: 'a', isCompleted: false });
    navigate(0);
  }, [navigate, newTodoTitle]);

  const onChangeCompleted = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (todo instanceof Error) return;
      const newTodo = todo.map(item => {
        if (item.id === e.target.value) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      });
      setTodo(newTodo);
      const checkedTodo = newTodo.find(item => {
        return e.target.value === item.id;
      });
      if (!checkedTodo) return;
      const requestBody = {
        title: checkedTodo.title,
        body: checkedTodo.body,
        isCompleted: checkedTodo.isCompleted,
      };
      await todoApi.patch(checkedTodo.id, requestBody);
      navigate(0);
    },
    [todo, navigate]
  );

  const onClickDeleteTodo = useCallback(
    async (id: string) => {
      await todoApi.delete(id);
      navigate(0);
    },
    [navigate]
  );

  useEffect(() => {
    (async () => {
      const todoGetResponse = await todoApi.getAll();
      if (todoGetResponse instanceof Array<Todo>) {
        const allTodo = todoGetResponse.sort((a, b) => {
          return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
        });
        setTodo(allTodo);
      }
    })();
  }, []);

  if (todo instanceof Error) return <React.Fragment />;

  return (
    <div>
      <div>
        <input type='text' onChange={onChangeNewTodoTitle} />
        <button onClick={onClickAddTodo}>Add Todo</button>
      </div>
      <h2>Task</h2>
      <ul>
        {todo
          .filter(item => !item.isCompleted)
          .map(item => {
            return (
              <li key={item.id}>
                <input value={item.id} type='checkbox' checked={item.isCompleted} onChange={onChangeCompleted} />
                <div>{item.title}</div>
                <div>{item.createdAt}</div>
                <button onClick={() => onClickDeleteTodo(item.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
      <h2>Completed Task</h2>
      <ul>
        {todo
          .filter(item => item.isCompleted)
          .map(item => {
            return (
              <li key={item.id}>
                <input value={item.id} type='checkbox' checked={item.isCompleted} onChange={onChangeCompleted} />
                <div>{item.title}</div>
                <div>{item.createdAt}</div>
                <button onClick={() => onClickDeleteTodo(item.id)}>Delete</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
