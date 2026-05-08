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

function validateTaskInput({ title, label, startDate, endDate }) {
  const trimmedTitle = String(title || "").trim();
  const trimmedLabel = String(label || "").trim();

  if (!trimmedTitle) {
    return {
      ok: false,
      message: "タスク名を入力してください。",
    };
  }

  if (startDate && endDate && startDate > endDate) {
    return {
      ok: false,
      message: "開始日は終了日より前の日付にしてください。",
    };
  }

  return {
    ok: true,
    data: {
      title: trimmedTitle,
      label: trimmedLabel || "ラベルなし",
      startDate: startDate || "2025-04-02",
      endDate: endDate || "2025-04-05",
    },
  };
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

    return { ok: true };
  };

  const handleAddTask = ({ title, label, startDate, endDate }) => {
    const result = validateTaskInput({ title, label, startDate, endDate });

    if (!result.ok) {
      return result;
    }

    const taskData = result.data;

    setTasks((prev) => [
      {
        id: Date.now(),
        title: taskData.title,
        label: taskData.label,
        status: "TODO",
        startDate: taskData.startDate,
        endDate: taskData.endDate,
        createdBy: "朝倉悠翔",
        assignee: "朝倉悠翔",
        completedAt: null,
      },
      ...prev,
    ]);

    return { ok: true };
  };

  const handleUpdateTask = ({ id, title, label, startDate, endDate }) => {
    const result = validateTaskInput({ title, label, startDate, endDate });

    if (!result.ok) {
      return result;
    }

    const taskData = result.data;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title: taskData.title,
              label: taskData.label,
              startDate: taskData.startDate,
              endDate: taskData.endDate,
            }
          : task
      )
    );

    return { ok: true };
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    return { ok: true };
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