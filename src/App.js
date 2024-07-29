import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask ? { ...task, text: editText } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>To-Do List</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="add-task">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <>
                <input 
                  type="text" 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span 
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;