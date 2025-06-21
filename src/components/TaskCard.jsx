import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TaskCard({ task, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCompletion = async () => {
    setIsUpdating(true);
    const token = localStorage.getItem("token");

    try {
      const res = await api.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: token } }
      );
      onUpdate(task._id, res.data.data); // ✅ Update UI immediately
    } catch (err) {
      console.error("Failed to toggle task:", err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
          disabled={isUpdating} // Prevent rapid clicks
          className="w-4 h-4"
        />
        <div>
          <h2 className={`text-lg font-bold ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h2>
          <p className={`text-gray-700 ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.description}
          </p>
        </div>
      </div>

      <div className="space-x-2">
        <button onClick={() => navigate(`/edit/${task._id}`)} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
