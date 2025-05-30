import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const remaining = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          ✍️ My Beautiful To-Do List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-full transition-all"
          >
            Add Task
          </button>
        </div>

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

        <div className="mt-6 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow">
            {remaining} task{remaining !== 1 && "s"} remaining
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
