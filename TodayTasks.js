import React from 'react';

const TodayTasks = ({ tasks, onToggle }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Today's Tasks</h2>
        <div className="text-sm text-gray-600">
          {completedCount} of {tasks.length} completed
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks for today. Generate a plan!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex items-center p-3 rounded-lg border transition ${
                task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span
                className={`ml-3 flex-1 ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {task.subject} - {task.duration} min
              </span>
              {task.priority && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {task.priority}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayTasks;