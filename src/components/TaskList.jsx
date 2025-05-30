import React from "react";

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-colors p-4 rounded-xl shadow"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="h-5 w-5 text-blue-600"
            />
            <span
              className={`text-lg ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
