import { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import LeftPanel from "./components/layout/LeftPanel";
import RightPanel from "./components/layout/RightPanel";
import TaskManagerCard from "./components/task/TaskManagerCard";
import SearchFilterBar from "./components/task/SearchFilterBar";
import TodayTasksCard from "./components/task/TodayTasksCard";
import BoardCard from "./components/task/BoardCard";
import HistoryCard from "./components/task/HistoryCard";
import ScheduleCard from "./components/schedule/ScheduleCard";
import useTasks from "./hooks/useTasks";

function getDateValue(dateString) {
  if (!dateString) return 0;

  const time = new Date(dateString).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortType, setSortType] = useState("latest");
  const [toast, setToast] = useState(null);

  const {
    tasks,
    handleStatusChange: updateTaskStatus,
    handleAddTask: addTask,
    handleUpdateTask: updateTask,
    handleDeleteTask: deleteTask,
  } = useTasks();

  const showToast = (message, type = "default") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleStatusChange = (id, nextStatus) => {
    updateTaskStatus(id, nextStatus);
    showToast("ステータスを更新しました", "success");
  };

  const handleAddTask = ({ title, label, startDate, endDate }) => {
    addTask({ title, label, startDate, endDate });
    showToast("タスクを追加しました", "add");
  };

  const handleStartEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = ({ id, title, label, startDate, endDate }) => {
    updateTask({ id, title, label, startDate, endDate });
    setEditingTask(null);
    showToast("タスクを更新しました", "update");
  };

  const handleDeleteTask = (id) => {
    const targetTask = tasks.find((task) => task.id === id);

    if (!targetTask) return;

    const ok = window.confirm(`「${targetTask.title}」を削除しますか？`);

    if (!ok) return;

    deleteTask(id);

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }

    showToast("タスクを削除しました", "delete");
  };

  const visibleTasks = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      const matchesKeyword =
        !keyword ||
        [
          task.title,
          task.label,
          task.assignee,
          task.createdBy,
          task.status,
          task.startDate,
          task.endDate,
          task.completedAt,
        ].some((value) => String(value || "").toLowerCase().includes(keyword));

      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;

      return matchesKeyword && matchesStatus;
    });

    const sorted = [...filtered];

    switch (sortType) {
      case "oldest":
        sorted.sort((a, b) => a.id - b.id);
        break;
      case "deadlineAsc":
        sorted.sort((a, b) => getDateValue(a.endDate) - getDateValue(b.endDate));
        break;
      case "deadlineDesc":
        sorted.sort((a, b) => getDateValue(b.endDate) - getDateValue(a.endDate));
        break;
      case "titleAsc":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "ja"));
        break;
      case "latest":
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }

    return sorted;
  }, [tasks, searchText, statusFilter, sortType]);

  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: 12,
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
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
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
          />
        }
        rightTop={<RightPanel tasks={tasks} />}
        toolbar={
          <SearchFilterBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortType={sortType}
            onSortTypeChange={setSortType}
            resultCount={visibleTasks.length}
          />
        }
        leftMiddle={
          <TodayTasksCard
            tasks={visibleTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        }
        centerMiddle={
          <BoardCard
            tasks={visibleTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        }
        rightMiddle={<ScheduleCard tasks={visibleTasks} />}
        bottom={<HistoryCard tasks={visibleTasks} />}
      />
    </div>
  );
}