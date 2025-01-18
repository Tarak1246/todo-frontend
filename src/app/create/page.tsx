import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
        Create a New Task
      </h2>

      {/* Task Form */}
      <TaskForm type="create" />
    </div>
  );
}
