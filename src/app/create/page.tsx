"use client";

import { useState } from "react";
import api from "../../utils/api";

const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"];

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(colors[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/tasks", { title, color });
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-md max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-white mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 text-white"
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Color</label>
        <div className="flex gap-2">
          {colors.map((clr) => (
            <button
              key={clr}
              type="button"
              className={`w-8 h-8 rounded-full ${
                clr === color ? "ring-4 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: clr }}
              onClick={() => setColor(clr)}
            />
          ))}
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-500 p-2 rounded-md text-white">
        Add Task
      </button>
    </form>
  );
}
