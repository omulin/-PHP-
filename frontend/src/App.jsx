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
import Card from "./components/common/Card";
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
    isLoading,
    errorMessage,
    reloadTasks,
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

  const handleStatusChange = async (id, nextStatus) => {
    const result = await updateTaskStatus(id, nextStatus);

    if (!result.ok) {
      showToast(result.message || "ステータス更新に失敗しました。", "error");
      return result;
    }

    showToast("ステータスを更新しました", "success");
    return result;
  };

  const handleAddTask = async ({ title, label, startDate, endDate }) => {
    const result = await addTask({ title, label, startDate, endDate });

    if (!result.ok) {
      showToast(result.message || "入力内容を確認してください。", "error");
      return result;
    }

    showToast("タスクを追加しました", "add");
    return result;
  };

  const handleStartEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = async ({ id, title, label, startDate, endDate }) => {
    const result = await updateTask({ id, title, label, startDate, endDate });

    if (!result.ok) {
      showToast(result.message || "入力内容を確認してください。", "error");
      return result;
    }

    setEditingTask(null);
    showToast("タスクを更新しました", "update");
    return result;
  };

  const handleDeleteTask = async (id) => {
    const targetTask = tasks.find((task) => task.id === id);

    if (!targetTask) {
      showToast("削除対象のタスクが見つかりません。", "error");
      return { ok: false };
    }

    const ok = window.confirm(`「${targetTask.title}」を削除しますか？`);

    if (!ok) {
      return { ok: false, canceled: true };
    }

    const result = await deleteTask(id);

    if (!result.ok) {
      showToast(result.message || "タスク削除に失敗しました。", "error");
      return result;
    }

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }

    showToast("タスクを削除しました", "delete");
    return result;
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

  const hasNoTasks = !isLoading && !errorMessage && tasks.length === 0;
  const hasNoFilteredTasks =
    !isLoading && !errorMessage && tasks.length > 0 && visibleTasks.length === 0;

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
                : toast.type === "update"
                ? "#2563eb"
                : toast.type === "error"
                ? "#b91c1c"
                : "#111827",
          }}
        >
          {toast.message}
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {isLoading && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              タスクを読み込み中です...
            </div>
          </Card>
        )}

        {!isLoading && errorMessage && (
          <Card
            style={{
              padding: 14,
              border: "1px solid #fecaca",
              background: "#fef2f2",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#b91c1c",
                }}
              >
                {errorMessage}
              </div>

              <button
                type="button"
                onClick={reloadTasks}
                style={{
                  border: "1px solid #fecaca",
                  background: "#ffffff",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  color: "#b91c1c",
                }}
              >
                再読み込み
              </button>
            </div>
          </Card>
        )}

        {hasNoTasks && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              まだタスクがありません。上のフォームから追加してください。
            </div>
          </Card>
        )}

        {hasNoFilteredTasks && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              条件に一致するタスクがありません。検索条件を見直してください。
            </div>
          </Card>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
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
    </div>
  );
}