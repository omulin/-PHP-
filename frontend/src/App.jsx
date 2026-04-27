import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { initialTasks } from "./data/dummyTasks";
import MainLayout from "./components/layout/MainLayout";
import LeftPanel from "./components/layout/LeftPanel";
import RightPanel from "./components/layout/RightPanel";
import TaskManagerCard from "./components/task/TaskManagerCard";
import TodayTasksCard from "./components/task/TodayTasksCard";
import BoardCard from "./components/task/BoardCard";
import HistoryCard from "./components/task/HistoryCard";
import ScheduleCard from "./components/schedule/ScheduleCard";

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

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "default") => {
    setToast({ message, type });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("保存データの書き込みに失敗しました:", error);
    }
  }, [tasks]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

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

    showToast("ステータスを更新しました", "success");
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

    showToast("タスクを追加しました", "add");
  };

  const handleStartEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
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

    setEditingTask(null);
    showToast("タスクを更新しました", "update");
  };

  const handleDeleteTask = (id) => {
    const targetTask = tasks.find((task) => task.id === id);

    if (!targetTask) return;

    const ok = window.confirm(`「${targetTask.title}」を削除しますか？`);

    if (!ok) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }

    showToast("タスクを削除しました", "delete");
  };

  const keyword = searchText.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    if (!keyword) return true;

    return [
      task.title,
      task.label,
      task.assignee,
      task.createdBy,
      task.status,
      task.startDate,
      task.endDate,
      task.completedAt,
    ].some((value) =>
      String(value || "").toLowerCase().includes(keyword)
    );
  });

  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: 18,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
      }}
    >
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            padding: "12px 16px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(0, 0={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            padding: "12, 0, 0.18)",
            color: "#ffffff",
            background:
              toast.type === "add"
                ? "#2563eb"
                : toast.type === "delete"
                ? "#dc2626"
                : toast.type === "success"
                ? "#16a34a"
                : "#111827",
          }}
        >
          {toast.message}
        </div>
      )}

      <MainLayout
        leftTop={<LeftPanel />}
        centerTop={
          <TaskManagerCard
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
            searchText={searchText}
            onSearchTextChange={setSearchText}
            resultCount={filteredTasks.length}
          />
        }
        rightTop={<RightPanel tasks={tasks} />}
        leftMiddle={
          <TodayTasksCard
            tasks={filteredTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        }
        centerMiddle={
          <BoardCard
            tasks={filteredTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        }
        rightMiddle={<ScheduleCard />}
        bottom={<HistoryCard tasks={filteredTasks} />}
      />
    </div>
  );
}