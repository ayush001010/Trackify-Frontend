// Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskCard from '../components/TaskCard';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await api.get('/tasks', {
      headers: { Authorization: token },
    });
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
  };

  const handleTaskUpdate = (id, updatedTask) => {
    setTasks(prev => prev.map(task => (task._id === id ? updatedTask : task)));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">All Tasks</h1>
      <button onClick={() => navigate('/add')} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
      <div className="mt-4 space-y-4">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </div>
  );
}
