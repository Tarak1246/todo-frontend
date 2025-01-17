"use client";
import { useState, useEffect } from "react";
import api from "../utils/api";

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => window.location.href = "/create"}
      >
        + Create Task
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Tasks ({tasks.length})</h2>
        <div className="mt-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex justify-between items-center p-4 mb-2 rounded bg-gray-800`}
                style={{ borderLeft: `8px solid ${task.color}` }}
              >
                <span
                  className={`${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      api
                        .put(`/tasks/${task.id}`, { completed: !task.completed })
                        .then(() =>
                          setTasks((prev) =>
                            prev.map((t) =>
                              t.id === task.id
                                ? { ...t, completed: !t.completed }
                                : t
                            )
                          )
                        )
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() =>
                      api.delete(`/tasks/${task.id}`).then(() =>
                        setTasks((prev) =>
                          prev.filter((t) => t.id !== task.id)
                        )
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks available. Create a new task!</p>
          )}
        </div>
      </div>
    </div>
  );
}
