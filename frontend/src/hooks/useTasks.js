import { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/tasks";

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
      startDate: startDate || "2026-05-09",
      endDate: endDate || "2026-05-12",
    },
  };
}

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const result = await fetchTasks();

      if (result.ok) {
        setTasks(Array.isArray(result.data) ? result.data : []);
      } else {
        console.error(result.message || "タスク一覧の取得に失敗しました。");
      }

      setIsLoading(false);
    };

    load();
  }, []);

  const handleStatusChange = async (id, nextStatus) => {
    const result = await updateTaskApi(id, { status: nextStatus });

    if (!result.ok) {
      return result;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? result.data : task))
    );

    return { ok: true, data: result.data };
  };

  const handleAddTask = async ({ title, label, startDate, endDate }) => {
    const validation = validateTaskInput({ title, label, startDate, endDate });

    if (!validation.ok) {
      return validation;
    }

    const result = await createTask({
      title: validation.data.title,
      label: validation.data.label,
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
      status: "TODO",
      createdBy: "朝倉悠翔",
      assignee: "朝倉悠翔",
    });

    if (!result.ok) {
      return result;
    }

    setTasks((prev) => [result.data, ...prev]);

    return { ok: true, data: result.data };
  };

  const handleUpdateTask = async ({ id, title, label, startDate, endDate }) => {
    const validation = validateTaskInput({ title, label, startDate, endDate });

    if (!validation.ok) {
      return validation;
    }

    const result = await updateTaskApi(id, {
      title: validation.data.title,
      label: validation.data.label,
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
    });

    if (!result.ok) {
      return result;
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? result.data : task))
    );

    return { ok: true, data: result.data };
  };

  const handleDeleteTask = async (id) => {
    const result = await deleteTaskApi(id);

    if (!result.ok) {
      return result;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));

    return { ok: true };
  };

  return {
    tasks,
    setTasks,
    isLoading,
    handleStatusChange,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
}