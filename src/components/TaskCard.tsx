'use client';

import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { HiOutlineTrash } from 'react-icons/hi';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const router = useRouter();

  const handleEditClick = () => {
    // Navigate to edit page with task data in query parameters
    router.push(
      `/edit/${task.id}?id=${task.id}&title=${encodeURIComponent(
        task.title
      )}&color=${encodeURIComponent(task.color)}&completed=${task.completed}`
    );
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${
        task.completed
          ? 'bg-gray-800 line-through text-gray-500'
          : 'bg-gray-900 text-white'
      }`}
    >
      {/* Checkbox (Toggle Completion) */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 mr-4 transition-opacity ${
          task.completed ? 'opacity-70' : 'hover:opacity-80'
        }`}
        style={{
          backgroundColor: task.completed ? task.color : 'transparent',
          borderColor: task.color,
        }}
        aria-label="Toggle Task Completion"
      ></button>

      {/* Task Title */}
      <span
        className="flex-1 hover:underline cursor-pointer"
        onClick={handleEditClick}
        role="button"
        aria-label={`Edit task: ${task.title}`}
      >
        {task.title}
      </span>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-300"
        aria-label={`Delete task: ${task.title}`}
      >
        <HiOutlineTrash size={24} />
      </button>
    </div>
  );
}
