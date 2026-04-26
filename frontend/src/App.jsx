import { useState } from "react";
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

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleStatusChange = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: nextStatus,
              completedAt:
                nextStatus === "DONE"
                  ? task.completedAt || "2025-04-01 21:03"
                  : null,
            }
          : task
      )
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
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
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