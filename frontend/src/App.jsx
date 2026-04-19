import { useState } from "react";
import BoardCard from "./components/task/BoardCard";
import { initialTasks } from "./data/dummyTasks";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = (id, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: nextStatus } : task
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f7",
        padding: 18,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <BoardCard tasks={tasks} onChangeStatus={handleStatusChange} />
    </div>
  );
}