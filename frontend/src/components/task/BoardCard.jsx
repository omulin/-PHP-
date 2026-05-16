import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import TaskBox from "./TaskBox";
import { STATUS_LABELS } from "../../data/dummyTasks";

function getSafeTasks(tasks = []) {
  if (!Array.isArray(tasks)) return [];

  return tasks.filter((task) => task && typeof task === "object");
}

export default function BoardCard({
  tasks = [],
  onChangeStatus,
  onEditTask,
  onDeleteTask,
}) {
  const safeTasks = getSafeTasks(tasks);

  const todoTasks = safeTasks.filter((task) => task.status === "TODO");
  const doingTasks = safeTasks.filter((task) => task.status === "DOING");
  const doneTasks = safeTasks.filter((task) => task.status === "DONE");

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
    <Card>
      <SectionTitle>ボード</SectionTitle>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginBottom: 12,
        }}
      >
        絞り込み：自分担当のみ
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 10,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 13,
                marginBottom: 10,
                color: "#374151",
                flexShrink: 0,
              }}
            >
              {column.title}
            </div>

            <div
              style={{
                display: "grid",
                gap: 8,
                maxHeight: 360,
                overflowY: "auto",
                paddingRight: 4,
              }}
            >
              {column.list.length === 0 ? (
                <div
                  style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    padding: "8px 0",
                  }}
                >
                  タスクなし
                </div>
              ) : (
                column.list.map((task) => (
                  <TaskBox
                    key={task.id}
                    task={task}
                    onChangeStatus={onChangeStatus}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}