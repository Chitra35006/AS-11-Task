import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useTheme from '../../Hooks/useTheme';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const {theme} = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
    return (
        <div className="p-6 ml-60 mr-20 h-screen">
        <h2 className={`text-3xl font-bold mb-4 ${theme === "dark"?"text-red-700":"text-orange-600"}`}>Task List</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full ${theme==="dark"?"bg-black":"bg-white"} border border-gray-200 rounded-lg shadow-sm`}>
              <thead className="bg-gray-50">
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme==="dark"?"text-red-500":"text-gray-500"} uppercase tracking-wider`}>
                    Title
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme==="dark"?"text-red-500":"text-gray-500"} uppercase tracking-wider`}>
                    Description
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${theme==="dark"?"text-red-500":"text-gray-500"} uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          task.category === "To-Do"
                            ? "bg-blue-100 text-blue-800"
                            : task.category === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
};

export default TaskList;