'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';
import apiService from '@/utils/api';
import { TbSquareRoundedPlus } from 'react-icons/tb';
import { TiTickOutline } from 'react-icons/ti';

const colors = [
  '#EF4444', // red
  '#F59E0B', // orange
  '#FACC15', // yellow
  '#22C55E', // green
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#A855F7', // purple
  '#EC4899', // pink
  '#92400E', // brown
];

interface TaskFormProps {
  type: 'create' | 'edit';
  initialData?: {
    id: string;
    title: string;
    color: string;
  };
}

export default function TaskForm({ type, initialData }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [color, setColor] = useState(initialData?.color ?? colors[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (type === 'create') {
        response = await apiService.createTask({ title: title.trim(), color });
      } else if (initialData?.id) {
        response = await apiService.updateTask(initialData.id, { title: title.trim(), color });
      }

      if (response?.statusCode === 400) {
        alert(response.message);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 pt-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="text-blue-400 hover:text-blue-300 transition mb-4 flex items-center gap-2"
      >
        <HiArrowLeft size={24} />
        Back
      </button>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
        {/* Title Input */}
        <div>
          <label className="block text-sm text-blue-400 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Brush your teeth"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm text-blue-400 mb-2">Color</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full transition-all ${
                  color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-950' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Add Task / Save Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#1E6F9F',
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-bold text-sm transition ${
            title.trim() ? 'bg-[#1E6F9F] hover:bg-[#145D8A]' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {loading ? (
            'Saving...'
          ) : title.trim() ? (
            <>
              Save
              <TiTickOutline size={20} />
            </>
          ) : (
            <>
              Add Task
              <TbSquareRoundedPlus size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
