import { useEffect, useState } from "react";
import { initialTasks } from "../data/dummyTasks";

const STORAGE_KEY = "task-manager-tasks";

function loadTasksFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return initialTasks;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : initialTasks;
  } catch (error) {
    console.error("保存データの読み込みに失敗しました:", error);
    return initialTasks;
  }
}

function formatNow() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("保存データの書き込みに失敗しました:", error);
    }
  }, [tasks]);

  const handleStatusChange = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          status: nextStatus,
          completedAt:
            nextStatus === "DONE"
              ? task.completedAt || formatNow()
              : null,
        };
      })
    );
  };

  const handleAddTask = ({ title, label, startDate, endDate }) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        title,
        label,
        status: "TODO",
        startDate,
        endDate,
        createdBy: "朝倉悠翔",
        assignee: "朝倉悠翔",
        completedAt: null,
      },
      ...prev,
    ]);
  };

  const handleUpdateTask = ({ id, title, label, startDate, endDate }) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              label,
              startDate,
              endDate,
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    setTasks,
    handleStatusChange,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
}