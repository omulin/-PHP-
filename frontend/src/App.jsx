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
import UserManagerCard from "./components/user/UserManagerCard";
import Card from "./components/common/Card";
import useTasks from "./hooks/useTasks";
import useUsers from "./hooks/useUsers";

function getDateValue(dateString) {
  if (!dateString) return 0;

  const time = new Date(dateString).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getSafeTasks(tasks = []) {
  if (!Array.isArray(tasks)) return [];

  return tasks.filter((task) => task && typeof task === "object");
}

function getSafeUsers(users = []) {
  if (!Array.isArray(users)) return [];

  return users.filter((user) => user && typeof user === "object");
}

function UserSummaryCard({ users = [], isLoading = false }) {
  const safeUsers = getSafeUsers(users);

  const counts = safeUsers.reduce(
    (acc, user) => {
      const role = user.role || "USER";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    {
      USER: 0,
      STAFF: 0,
      MANAGER: 0,
      ADMIN: 0,
    }
  );

  return (
    <Card>
      <div
        style={{
          fontSize: 15,
          fontWeight: 900,
          color: "#111827",
          marginBottom: 12,
        }}
      >
        ユーザー概要
      </div>

      {isLoading ? (
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          ユーザーを読み込み中です...
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>総ユーザー</span>
            <strong>{safeUsers.length}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>利用者</span>
            <strong>{counts.USER || 0}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>所員</span>
            <strong>{counts.STAFF || 0}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>所長</span>
            <strong>{counts.MANAGER || 0}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>管理者</span>
            <strong>{counts.ADMIN || 0}</strong>
          </div>
        </div>
      )}
    </Card>
  );
}

function UserInfoCard() {
  return (
    <Card>
      <div
        style={{
          fontSize: 15,
          fontWeight: 900,
          color: "#111827",
          marginBottom: 10,
        }}
      >
        ユーザー管理について
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#6b7280",
          lineHeight: 1.7,
        }}
      >
        ここでは簡易ユーザー登録を行います。名前・メールアドレス・役割を登録し、
        タスク作成時の担当者選択に使えるようにします。
      </div>
    </Card>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
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

  const userActions = useUsers();

  const { users, isUsersLoading, userErrorMessage, reloadUsers } = userActions;

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

  const handleChangeTab = (tab) => {
    setActiveTab(tab);

    if (tab !== "tasks") {
      setEditingTask(null);
    }
  };

  const handleStatusChange = async (id, nextStatus) => {
    const result = await updateTaskStatus(id, nextStatus);

    if (!result.ok) {
      showToast(result.message || "ステータス更新に失敗しました。", "error");
      return result;
    }

    showToast("ステータスを更新しました", "success");
    return result;
  };

  const handleAddTask = async ({
    title,
    label,
    startDate,
    endDate,
    assignee,
  }) => {
    const result = await addTask({
      title,
      label,
      startDate,
      endDate,
      assignee,
    });

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

  const handleUpdateTask = async ({
    id,
    title,
    label,
    startDate,
    endDate,
    assignee,
  }) => {
    const result = await updateTask({
      id,
      title,
      label,
      startDate,
      endDate,
      assignee,
    });

    if (!result.ok) {
      showToast(result.message || "入力内容を確認してください。", "error");
      return result;
    }

    setEditingTask(null);
    showToast("タスクを更新しました", "update");
    return result;
  };

  const handleDeleteTask = async (id) => {
    const targetTask = getSafeTasks(tasks).find(
      (task) => String(task.id) === String(id)
    );

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

    if (editingTask && String(editingTask.id) === String(id)) {
      setEditingTask(null);
    }

    showToast("タスクを削除しました", "delete");
    return result;
  };

  const handleAddUser = async (userData) => {
    const result = await userActions.handleAddUser(userData);

    if (!result.ok) {
      showToast(result.message || "ユーザー追加に失敗しました。", "error");
      return result;
    }

    showToast("ユーザーを追加しました", "add");
    return result;
  };

  const handleUpdateUser = async (id, userData) => {
    const result = await userActions.handleUpdateUser(id, userData);

    if (!result.ok) {
      showToast(result.message || "ユーザー更新に失敗しました。", "error");
      return result;
    }

    showToast("ユーザーを更新しました", "update");
    return result;
  };

  const handleDeleteUser = async (id) => {
    const result = await userActions.handleDeleteUser(id);

    if (!result.ok) {
      showToast(result.message || "ユーザー削除に失敗しました。", "error");
      return result;
    }

    showToast("ユーザーを削除しました", "delete");
    return result;
  };

  const visibleTasks = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    const safeTasks = getSafeTasks(tasks);

    const filtered = safeTasks.filter((task) => {
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
        sorted.sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
        break;
      case "deadlineAsc":
        sorted.sort((a, b) => getDateValue(a.endDate) - getDateValue(b.endDate));
        break;
      case "deadlineDesc":
        sorted.sort((a, b) => getDateValue(b.endDate) - getDateValue(a.endDate));
        break;
      case "titleAsc":
        sorted.sort((a, b) =>
          String(a.title || "").localeCompare(String(b.title || ""), "ja")
        );
        break;
      case "latest":
      default:
        sorted.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
        break;
    }

    return sorted;
  }, [tasks, searchText, statusFilter, sortType]);

  const safeTasks = getSafeTasks(tasks);

  const hasNoTasks = !isLoading && !errorMessage && safeTasks.length === 0;

  const hasNoFilteredTasks =
    !isLoading &&
    !errorMessage &&
    safeTasks.length > 0 &&
    visibleTasks.length === 0;

  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

  const taskLayout = {
    centerTop: (
      <TaskManagerCard
        users={users}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />
    ),
    rightTop: <RightPanel tasks={safeTasks} />,
    toolbar: (
      <SearchFilterBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortType={sortType}
        onSortTypeChange={setSortType}
        resultCount={visibleTasks.length}
      />
    ),
    leftMiddle: (
      <TodayTasksCard
        tasks={visibleTasks}
        onChangeStatus={handleStatusChange}
        onEditTask={handleStartEdit}
        onDeleteTask={handleDeleteTask}
      />
    ),
    centerMiddle: (
      <BoardCard
        tasks={visibleTasks}
        onChangeStatus={handleStatusChange}
        onEditTask={handleStartEdit}
        onDeleteTask={handleDeleteTask}
      />
    ),
    rightMiddle: <ScheduleCard tasks={visibleTasks} />,
    bottom: <HistoryCard tasks={visibleTasks} />,
  };

  const userLayout = {
    centerTop: (
      <UserManagerCard
        users={users}
        isLoading={isUsersLoading}
        errorMessage={userErrorMessage}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    ),
    rightTop: <UserSummaryCard users={users} isLoading={isUsersLoading} />,
    toolbar: <UserInfoCard />,
    leftMiddle: null,
    centerMiddle: null,
    rightMiddle: null,
    bottom: null,
  };

  const currentLayout = activeTab === "users" ? userLayout : taskLayout;

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
        {activeTab === "tasks" && isLoading && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              タスクを読み込み中です...
            </div>
          </Card>
        )}

        {activeTab === "tasks" && !isLoading && errorMessage && (
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

        {activeTab === "users" && !isUsersLoading && userErrorMessage && (
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
                {userErrorMessage}
              </div>

              <button
                type="button"
                onClick={reloadUsers}
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
                ユーザー再読み込み
              </button>
            </div>
          </Card>
        )}

        {activeTab === "tasks" && hasNoTasks && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              まだタスクがありません。上のフォームから追加してください。
            </div>
          </Card>
        )}

        {activeTab === "tasks" && hasNoFilteredTasks && (
          <Card style={{ padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>
              条件に一致するタスクがありません。検索条件を見直してください。
            </div>
          </Card>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <MainLayout
          leftTop={
            <LeftPanel activeTab={activeTab} onChangeTab={handleChangeTab} />
          }
          centerTop={currentLayout.centerTop}
          rightTop={currentLayout.rightTop}
          toolbar={currentLayout.toolbar}
          leftMiddle={currentLayout.leftMiddle}
          centerMiddle={currentLayout.centerMiddle}
          rightMiddle={currentLayout.rightMiddle}
          bottom={currentLayout.bottom}
        />
      </div>
    </div>
  );
}