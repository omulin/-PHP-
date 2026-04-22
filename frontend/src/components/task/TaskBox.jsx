import { STATUS_COLORS, STATUS_LABELS } from "../../data/dummyTasks";

export default function TaskBox({ task, onChangeStatus }) {
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
    </div>
  );
}