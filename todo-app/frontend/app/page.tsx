'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  description: string;
  remindTime?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [modalState, setModalState] = useState<'create' | 'update' | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoToBeUpdated, setTodoToBeUpdated] = useState<Todo | null>(null);

  const handleModalClose = () => {
    setModalState(null);
    setTodoToBeUpdated(null);
  };

  const handleTodoDelete = async (todo: Todo) => {
    try {
      await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSubmitBtnClick = async () => {
    try {
      const titleInput = document.getElementById('title') as HTMLInputElement;
      const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
      const scheduledTimeInput = document.getElementById('scheduledTime') as HTMLInputElement;

      const title = titleInput.value;
      const description = descriptionInput.value;
      const remindTime = scheduledTimeInput.value
        ? new Date(scheduledTimeInput.value).toISOString()
        : null;

      if (modalState === 'create') {
        await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            remindTime,
          }),
        });
      } else if (modalState === 'update') {
        await fetch(`/api/todos/${todoToBeUpdated?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            remindTime,
          }),
        });
      }
      handleModalClose();
      fetchTodos();
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  const handleTodoUpdate = (todo: Todo) => {
    // TODO: need to convert the fields to use react state instead of direct DOM manipulation
    
    setModalState('update');
    setTodoToBeUpdated(todo);

    const titleInput = document.getElementById('title') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const scheduledTimeInput = document.getElementById('scheduledTime') as HTMLInputElement;

    titleInput.value = todo.title ?? '';
    descriptionInput.value = todo.description ?? '';
    scheduledTimeInput.value = todo.remindTime ?? '';
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const onTodoCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;
    const todoToBeUpdated = todos[index];

    try {
      await fetch(`/api/todos/${todoToBeUpdated.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: isChecked,
        }),
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Todo List App</h1>
          <button
            type="button"
            onClick={() => setModalState('create')}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            + New Todo
          </button>
        </div>

        {/* Modal Popup - Create/Edit Todo */}
        {modalState && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {modalState === 'create' ? 'Create New Todo' : 'Update Todo'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleModalClose()}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter todo title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter todo description (optional)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="scheduledTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Scheduled Time (Reminder)
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduledTime"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleModalClose()}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    onClick={handleSubmitBtnClick}
                  >
                    {modalState === 'create' ? 'Create Todo' : 'Update Todo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {/* Sample Todo Item 1 - Active */}
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className="p-4 border rounded-lg shadow-sm transition-all bg-white border-gray-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    onChange={(event) => onTodoCheckboxChange(event, index)}
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg text-gray-900${
                        todo.isCompleted ? ' line-through text-gray-500' : ''
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm text-gray-600${
                        todo.isCompleted ? ' line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.description}
                    </p>
                    {todo.remindTime && (
                      <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{todo.remindTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    onClick={() => handleTodoUpdate(todo)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    onClick={() => handleTodoDelete(todo)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
