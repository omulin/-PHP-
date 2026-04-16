import { tasks } from "../data/dummy";
import Board from "../components/Board";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>タスク管理</h1>
      <Board tasks={tasks} />
    </div>
  );
}