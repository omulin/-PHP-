import { STATUS_COLORS, STATUS_LABELS } from "../../data/dummyTasks";

export default function TaskBox({
  task,
  onChangeStatus,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 10,
        borderLeft: `4px solid ${STATUS_COLORS[task.status]}`,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 16,
          color: "#111827",
          lineHeight: 1.35,
          wordBreak: "break-word",
        }}
      >
        {task.title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginTop: 4,
        }}
      >
        {task.label}
      </div>

      <select
        value={task.status}
        onChange={(e) => onChangeStatus(task.id, e.target.value)}
        style={{
          marginTop: 10,
          width: "100%",
          padding: "9px 10px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
          background: "#ffffff",
          fontSize: 13,
          boxSizing: "border-box",
        }}
      >
        <option value="TODO">{STATUS_LABELS.TODO}</option>
        <option value="DOING">{STATUS_LABELS.DOING}</option>
        <option value="DONE">{STATUS_LABELS.DONE}</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 8,
        }}
      >
        <button
          type="button"
          onClick={() => onEditTask(task)}
          style={{
            border: "1px solid #d1d5db",
            background: "#ffffff",
            borderRadius: 10,
            padding: "8px 10px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            color: "#374151",
          }}
        >
          編集
        </button>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          style={{
            border: "1px solid #fecaca",
            background: "#fef2f2",
            borderRadius: 10,
            padding: "8px 10px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            color: "#b91c1c",
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}