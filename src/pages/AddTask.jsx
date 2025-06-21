import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function AddTask() {
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });//--***--//

  const handleSubmit = async (e) => {//--***--//
    e.preventDefault();
    await api.post('/task', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Add New Task</h1>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}