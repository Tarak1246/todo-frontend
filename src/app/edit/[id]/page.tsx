'use client';

import { useSearchParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

export default function EditTaskPage() {
  const searchParams = useSearchParams();

  // Retrieve task data from query parameters
  const id = searchParams.get('id') || '';
  const title = searchParams.get('title') || '';
  const color = searchParams.get('color') || '#000000'; // Default color
  const completed = searchParams.get('completed') === 'true';

  // Construct task object from query parameters
  const task = {
    id,
    title,
    color,
    completed,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Edit Task
      </h2>

      {/* Task Form */}
      <TaskForm type="edit" initialData={task} />
    </div>
  );
}
