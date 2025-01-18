'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Task } from '@/types/task';
import TaskCard from '@/components/TaskCard';
import apiService from '@/utils/api';
import { HiOutlineClipboard } from 'react-icons/hi';
import { TbSquareRoundedPlus } from 'react-icons/tb';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getTasks();
      setTasks(response?.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to load tasks once
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle toggling task completion
  const handleToggle = useCallback(
    async (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      try {
        await apiService.updateTask(id, { completed: !task.completed });
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      } catch (error) {
        console.error('Failed to toggle task:', error);
      }
    },
    [tasks]
  );

  // Handle deleting a task with confirmation
  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm('Are you sure you want to delete this task?')) return;

      try {
        await apiService.deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    []
  );

  // Calculate completed tasks count using useMemo
  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Create Task Button */}
      <Link
        href="/create"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-white font-bold text-sm mb-6"
        style={{
          backgroundColor: '#1E6F9F',
        }}
      >
        Create Task
        <TbSquareRoundedPlus size={20} />
      </Link>

      {/* Task Summary */}
      <div className="flex justify-between mb-6 text-sm">
        <div className="text-blue-400">Tasks: {tasks.length}</div>
        <div className="text-purple-400">
          Completed: {completedCount} of {tasks.length}
        </div>
      </div>

      {/* Task List or Empty State */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-800 border-t-2 border-gray-600 rounded-lg">
          <HiOutlineClipboard size={56} className="text-gray-500 mb-4" />
          <div className="text-gray-400 mb-2">
            You don't have any tasks registered yet.
          </div>
          <div className="text-gray-600">
            Create tasks and organize your to-do items.
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
