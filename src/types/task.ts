// src/types/task.ts
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    color: string;
    createdAt: Date;
    updatedAt: Date;
  }