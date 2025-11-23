'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

export default function TodoListClient() {
    const t = useTranslations('Tools.todo-list.ui');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('asset-tools-todos');
        if (savedTodos) {
            try {
                setTodos(JSON.parse(savedTodos));
            } catch (e) {
                console.error('Failed to parse todos', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever todos change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('asset-tools-todos', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = () => {
        if (!inputValue.trim()) return;

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: inputValue.trim(),
            completed: false,
            createdAt: Date.now(),
        };

        setTodos([newTodo, ...todos]);
        setInputValue('');
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;

    if (!isLoaded) {
        return null; // Avoid hydration mismatch
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card className="p-6">
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t('inputPlaceholder')}
                    />
                    <Button
                        onClick={addTodo}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={!inputValue.trim()}
                    >
                        {t('add')}
                    </Button>
                </div>

                <div className="space-y-4">
                    {filteredTodos.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            {t('noTasks')}
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {filteredTodos.map(todo => (
                                <li
                                    key={todo.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${todo.completed
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-gray-400 hover:border-blue-500'
                                                }`}
                                        >
                                            {todo.completed && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <span
                                            className={`truncate ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                                        >
                                            {todo.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div>{t('itemsLeft', { count: activeCount })}</div>

                    <div className="flex gap-2">
                        {(['all', 'active', 'completed'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-full transition-colors ${filter === f
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'hover:bg-gray-100'
                                    }`}
                            >
                                {t(f)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={clearCompleted}
                        className="hover:text-red-600 hover:underline"
                    >
                        {t('clearCompleted')}
                    </button>
                </div>
            </Card>

            <div className="text-center text-sm text-gray-500">
                {t('processingNote')}
            </div>
        </div>
    );
}
