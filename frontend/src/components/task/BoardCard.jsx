import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import TaskBox from "./TaskBox";
import { STATUS_LABELS } from "../../data/dummyTasks";

export default function BoardCard({ tasks, onChangeStatus }) {
  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const doingTasks = tasks.filter((t) => t.status === "DOING");
  const doneTasks = tasks.filter((t) => t.status === "DONE");

  const columns = [
    {
      key: "TODO",
      title: `${STATUS_LABELS.TODO} (${todoTasks.length})`,
      list: todoTasks,
    },
    {
      key: "DOING",
      title: `${STATUS_LABELS.DOING} (${doingTasks.length})`,
      list: doingTasks,
    },
    {
      key: "DONE",
      title: `${STATUS_LABELS.DONE} (${doneTasks.length})`,
      list: doneTasks,
    },
  ];

  return (
    <Card style={{ minHeight: 470 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <SectionTitle>ボード</SectionTitle>

        <button
          style={{
            border: "1px solid #d1d5db",
            background: "#ffffff",
            borderRadius: 10,
            padding: "10px 14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          絞り込み
        </button>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 15,
          color: "#374151",
          marginBottom: 14,
        }}
      >
        <input type="checkbox" />
        自分担当のみ
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          alignItems: "start",
          minHeight: 330,
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            style={{
              background: "#eef2f7",
              borderRadius: 14,
              padding: 12,
              minHeight: 300,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              {column.title}
            </div>

            {column.list.map((task) => (
              <TaskBox
                key={task.id}
                task={task}
                onChangeStatus={onChangeStatus}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}