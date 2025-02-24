import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "To-Do",
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const navigate = useNavigate();
    
      // Test toast on component mount
      useEffect(() => {
        toast.success("This is a test toast!");
      }, []);
    
      const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title.trim() || !task.description.trim()) {
          toast.error("Title and description cannot be empty.");
          return;
        }
    
        setIsSubmitting(true);
        try {
          const response = await axios.post("http://localhost:5000/tasks", task);
          onTaskAdded(response.data);
          setTask({ title: "", description: "", category: "To-Do" });
    
          toast.success("Task added successfully!");
    
          setTimeout(() => {
            navigate("/taskBoard"); // Redirect to task board
          }, 2000);
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Failed to add task. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
    return (
        <div className="mt-28 h-screen">
        <h2 className="text-orange-500 text-3xl font-bold text-center">Add Task</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            maxLength="50"
            placeholder="Task Title"
            aria-label="Task Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="200"
            placeholder="Task Description"
            aria-label="Task Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            aria-label="Task Category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-orange-500 to-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
  
        {/* Test navigation button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/taskBoard")}
          className="mt-4 w-full bg-slate-900 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-slate-900 to-red-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Go to Task Board
        </button>
      </form>
      </div>
    );
};

export default TaskForm;