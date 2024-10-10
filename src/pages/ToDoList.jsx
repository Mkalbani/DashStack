import React, { useState } from "react";
import { Star, X, Check, Trash } from "lucide-react";

const TodoItem = ({ task, onToggle, onStar, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
        task.completed ? "bg-blue-500" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center flex-grow">
        <div
          className={`w-5 h-5 mr-3 rounded-sm border ${
            task.completed ? "bg-white" : "border-gray-600"
          } flex items-center justify-center cursor-pointer`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed && <Check size={16} className="text-blue-500" />}
        </div>
        <span
          className={`flex-grow ${
            task.completed ? "text-white" : "text-gray-300"
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center">
        <Star
          size={20}
          className={`mr-2 cursor-pointer ${
            task.starred ? "text-yellow-400 fill-current" : "text-gray-500"
          }`}
          onClick={() => onStar(task.id)}
        />
        {task.completed ? (
          <Trash
            size={20}
            className="text-white cursor-pointer"
            onClick={() => onDelete(task.id)}
          />
        ) : (
          <X
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => onDelete(task.id)}
          />
        )}
      </div>
    </div>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Meeting with CEO", completed: false, starred: false },
    {
      id: 2,
      text: "Pick up kids from school",
      completed: false,
      starred: true,
    },
    { id: 3, text: "Shopping with Brother", completed: false, starred: false },
    { id: 4, text: "Review with HR", completed: true, starred: false },
    { id: 5, text: "Going to Dia's School", completed: false, starred: false },
    { id: 6, text: "Check design files", completed: false, starred: true },
    { id: 7, text: "Update File", completed: false, starred: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false); 

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleStar = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, starred: !task.starred } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, starred: false },
      ]);
      setNewTask("");
      setShowInput(false); // Hide the input after adding the task
    }
  };

  const handleToggleInput = () => {
    setShowInput((prev) => !prev); // Toggle input visibility
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            {showInput ? "Add New To-Do" : "To-Do List"}
          </h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleToggleInput}
          >
            {showInput ? "Cancel" : "Add New Task"}
          </button>
        </div>
        {showInput && (
          <div className="mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
              className="w-full p-3 rounded-lg bg-gray-800 text-white"
            />
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleAddTask}
            >
              {showInput && "Save"}
            </button>
          </div>
        )}
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onStar={handleStar}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
