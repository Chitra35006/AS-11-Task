import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@react-forked/dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useTheme from '../../Hooks/useTheme';
const TaskBoard = () => {
    const {theme} = useTheme();
    const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios
      .get("https://as-11-to-do-task-server.vercel.app/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
  
    setTasks((prevTasks) => {
      // 1️⃣ Copy the tasks to avoid direct mutation
      const updatedTasks = [...prevTasks];
  
      // 2️⃣ Find the moved task using its ID
      const movedTaskIndex = updatedTasks.findIndex(task => task._id === draggableId);
      if (movedTaskIndex === -1) return prevTasks; // Exit if task not found
  
      const [movedTask] = updatedTasks.splice(movedTaskIndex, 1); // Remove task
      movedTask.category = destination.droppableId; // Update category
  
      // 3️⃣ Insert the task at the correct index in the new category
      updatedTasks.splice(destination.index, 0, movedTask);
  
      return [...updatedTasks]; // Force state update
    });
  
    // 4️⃣ Update the backend
    try {
      await axios.put(`https://as-11-to-do-task-server.vercel.app/tasks/${draggableId}`, {
        category: destination.droppableId,
      });
    } catch (error) {
      console.error("Failed to update task category:", error);
    }
  };
  
  
  
  
  const deleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://as-11-to-do-task-server.vercel.app/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const handleEditClick = (task) => {
    setEditTask({ ...task });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://as-11-to-do-task-server.vercel.app/tasks/${editTask._id}`, editTask);
      setTasks(tasks.map((task) => (task._id === editTask._id ? { ...editTask } : task)));
      setEditTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

    return (
        <div className={`p-5 h-screen ${theme==="dark"?"bg-slate-900":"bg-orange-50"}`}>
      <h1 className={`text-3xl font-bold ${theme === "dark"?"text-red-500":"text-orange-600"} text-center mb-5`}>Task Management</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category} type="TASK">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`shadow-lg p-5 w-80 rounded-lg min-h-[200px] ${theme ==="dark"?"bg-black":"bg-white "}`}>
                  <h2 className={`text-xl font-semibold mb-3 text-center ${theme === "dark"?"text-red-500":""}`}>{category}</h2>
                  {tasks.filter((task) => task.category === category).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${theme ==="dark"?"bg-gradient-to-r from-slate-900 to-red-500":"bg-gray-100"} border border-gray-300 rounded-bl-[40px] p-4 mb-2 rounded-md flex justify-between items-center`}>
                          <div>
                            <h3 className={`font-bold ${theme === "dark"?"text-slate-200":""}`}>{task.title}</h3>
                            <p className={`${theme === "dark"?"text-slate-300":""}`}>{task.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditClick(task)} className="text-slate-900"><FaEdit /></button>
                            <button onClick={() => deleteTask(task._id)} className={`${theme ==="dark"?"text-red-800":"text-red-500"}`}><FaTrash /></button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Edit Task</h2>
            <form onSubmit={handleUpdateTask}>
              <input type="text" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} className="border p-2 w-full mb-2" placeholder="Title" />
              <input type="text" value={editTask.description} onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} className="border p-2 w-full mb-2" placeholder="Description" />
              <select value={editTask.category} onChange={(e) => setEditTask({ ...editTask, category: e.target.value })} className="border p-2 w-full mb-2">
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button onClick={() => setEditTask(null)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    );
};

export default TaskBoard;