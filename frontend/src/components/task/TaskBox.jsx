import { STATUS_COLORS, STATUS_LABELS } from "../../data/dummyTasks";

export default function TaskBox({ task, onChangeStatus }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 14,
        padding: 12,
        borderLeft: `6px solid ${STATUS_COLORS[task.status]}`,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 24,
          color: "#111827",
        }}
      >
        {task.title}
      </div>

      <div
        style={{
          fontSize: 14,
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
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #d1d5db",
          background: "#ffffff",
          fontSize: 15,
        }}
      >
        <option value="TODO">{STATUS_LABELS.TODO}</option>
        <option value="DOING">{STATUS_LABELS.DOING}</option>
        <option value="DONE">{STATUS_LABELS.DONE}</option>
      </select>
    </div>
  );
}