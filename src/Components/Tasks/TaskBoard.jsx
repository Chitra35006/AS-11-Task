import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@react-forked/dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
  
    // If dropped outside a droppable area, do nothing
    if (!destination) return;
  
    // If the task is dropped in the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);
  
    // Check if the category is actually changing
    if (movedTask.category !== destination.droppableId) {
      movedTask.category = destination.droppableId;
  
      try {
        await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, {
          category: movedTask.category,
        });
      } catch (error) {
        console.error("Failed to update task category:", error);
      }
    }
  
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
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
        await axios.delete(`http://localhost:5000/tasks/${id}`);
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
      await axios.put(`http://localhost:5000/tasks/${editTask._id}`, editTask);
      setTasks(tasks.map((task) => (task._id === editTask._id ? { ...editTask } : task)));
      setEditTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

    return (
        <div className="p-5 h-screen">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-5">Task Management</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category} type="TASK">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white shadow-lg p-5 w-80 rounded-lg min-h-[200px]">
                  <h2 className="text-xl font-semibold mb-3 text-center">{category}</h2>
                  {tasks.filter((task) => task.category === category).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-gray-200 p-3 mb-2 rounded-md flex justify-between items-center">
                          <div>
                            <h3 className="font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditClick(task)} className="text-blue-500"><FaEdit /></button>
                            <button onClick={() => deleteTask(task._id)} className="text-red-500"><FaTrash /></button>
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