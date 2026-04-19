import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "ログイン作る", status: "TODO" },
    { id: 2, title: "UI整える", status: "DOING" },
  ]);

  const addTask = () => {
    const title = prompt("タスク名を入力");
    if (!title) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title, status: "TODO" }
    ]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>タスク一覧</h1>

      <button onClick={addTask}>
        ＋ タスク追加
      </button>

      {tasks.length === 0 && <p>タスクがありません</p>}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}