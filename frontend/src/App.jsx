import { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import { initialTasks } from "./data/dummyTasks";
import MainLayout from "./components/layout/MainLayout";
import LeftPanel from "./components/layout/LeftPanel";
import RightPanel from "./components/layout/RightPanel";
import Card from "./components/common/Card";
import SmallTab from "./components/common/SmallTab";
import TaskManagerCard from "./components/task/TaskManagerCard";
import SearchFilterBar from "./components/task/SearchFilterBar";
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

function getDateValue(dateString) {
  if (!dateString) return 0;

  const time = new Date(dateString).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [tasks, setTasks] = useState(() => loadTasksFromStorage());
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeView, setActiveView] = useState("board");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortType, setSortType] = useState("latest");
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
            nextStatus === "DONE" ? task.completedAt || formatNow() : null,
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

    setIsFormOpen(false);
    showToast("タスクを追加しました", "add");
  };

  const handleStartEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setIsFormOpen(false);
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
    setIsFormOpen(false);
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
      setIsFormOpen(false);
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

  const currentView = useMemo(() => {
    switch (activeView) {
      case "today":
        return (
          <TodayTasksCard
            tasks={visibleTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        );
      case "schedule":
        return <ScheduleCard tasks={visibleTasks} />;
      case "history":
        return <HistoryCard tasks={visibleTasks} />;
      case "board":
      default:
        return (
          <BoardCard
            tasks={visibleTasks}
            onChangeStatus={handleStatusChange}
            onEditTask={handleStartEdit}
            onDeleteTask={handleDeleteTask}
          />
        );
    }
  }, [activeView, visibleTasks]);

  const handleToggleForm = () => {
    if (editingTask) {
      setEditingTask(null);
      setIsFormOpen(false);
      return;
    }

    setIsFormOpen((prev) => !prev);
  };

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
        left={<LeftPanel />}
        top={
          <div style={{ display: "grid", gap: 12 }}>
            <SearchFilterBar
              searchText={searchText}
              onSearchTextChange={setSearchText}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortType={sortType}
              onSortTypeChange={setSortType}
              resultCount={visibleTasks.length}
            />

            <Card style={{ padding: 12 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <SmallTab
                      active={activeView === "today"}
                      onClick={() => setActiveView("today")}
                    >
                      今日
                    </SmallTab>
                    <SmallTab
                      active={activeView === "board"}
                      onClick={() => setActiveView("board")}
                    >
                      ボード
                    </SmallTab>
                    <SmallTab
                      active={activeView === "schedule"}
                      onClick={() => setActiveView("schedule")}
                    >
                      スケジュール
                    </SmallTab>
                    <SmallTab
                      active={activeView === "history"}
                      onClick={() => setActiveView("history")}
                    >
                      履歴
                    </SmallTab>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleForm}
                    style={{
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 12px",
                      background: editingTask ? "#f59e0b" : "#2563eb",
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {editingTask
                      ? "編集を閉じる"
                      : isFormOpen
                      ? "フォームを閉じる"
                      : "新規タスク"}
                  </button>
                </div>

                {editingTask && (
                  <div
                    style={{
                      display: "inline-block",
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "6px 10px",
                      borderRadius: 999,
                      fontWeight: 700,
                      fontSize: 12,
                      justifySelf: "start",
                    }}
                  >
                    編集中: {editingTask.title}
                  </div>
                )}
              </div>
            </Card>

            {(isFormOpen || editingTask) && (
              <TaskManagerCard
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            )}
          </div>
        }
        center={currentView}
        right={<RightPanel tasks={tasks} />}
      />
    </div>
  );
}