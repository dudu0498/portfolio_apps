import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Edit3, Save, X } from 'lucide-react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setIsAdding(true);
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTimeout(() => {
        setTodos([newTodo, ...todos]);
        setInputValue('');
        setIsAdding(false);
      }, 300);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12 animate-pulse">
              <Check size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
            NEXUS TODO
          </h1>
          <p className="text-gray-300 text-lg">Quantum Task Management System</p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-6 mb-6 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter quantum task..."
                className="w-full px-4 py-4 bg-gray-900/70 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pl-12 text-white placeholder-gray-400"
              />
              <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={addTodo}
              disabled={isAdding}
              className={`bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25 ${
                isAdding ? 'animate-pulse' : ''
              }`}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus size={20} />
                  ADD
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div className="text-sm text-gray-300">
            <span className="font-bold text-cyan-400">{activeCount}</span> ACTIVE • 
            <span className="font-bold text-purple-400"> {completedCount}</span> COMPLETED
          </div>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-full border border-red-500/30 transition-all duration-300 hover:scale-105"
            >
              CLEAR COMPLETED
            </button>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl border border-gray-700/50 p-8 text-center shadow-2xl shadow-purple-500/10">
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-2xl mx-auto flex items-center justify-center animate-spin">
                  <Check size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">NO QUANTUM TASKS</h3>
              <p className="text-gray-500">Initialize your first task to begin</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-4 shadow-lg shadow-purple-500/5 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-purple-500/10 ${
                  todo.completed ? 'opacity-60' : ''
                }`}
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                      todo.completed
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg shadow-green-500/25'
                        : 'border-gray-500 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25'
                    }`}
                  >
                    {todo.completed && <Check size={18} />}
                  </button>

                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        className="flex-1 px-4 py-2 bg-gray-900/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl transition-colors shadow-lg shadow-green-500/25 hover:scale-105"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-xl transition-colors hover:scale-105"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p
                          className={`${
                            todo.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-100'
                          } font-medium`}
                        >
                          {todo.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="text-gray-400 hover:text-cyan-400 p-2 rounded-xl hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-gray-400 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm relative z-10">
          <div className="inline-flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            QUANTUM STORAGE ACTIVE
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}