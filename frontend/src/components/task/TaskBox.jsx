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
        background: "var(--color-bg-card, #ffffff)",
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: "var(--radius-md, 12px)",
        padding: 10,
        borderLeft: `4px solid ${STATUS_COLORS[task.status]}`,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 16,
          color: "var(--color-text-main, #111827)",
          lineHeight: 1.35,
          wordBreak: "break-word",
        }}
      >
        {task.title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "var(--color-text-sub, #6b7280)",
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
          borderRadius: "var(--radius-sm, 10px)",
          border: "1px solid var(--color-border-strong, #d1d5db)",
          background: "var(--color-bg-card, #ffffff)",
          fontSize: 13,
          boxSizing: "border-box",
          color: "var(--color-text-main, #111827)",
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
            border: "1px solid var(--color-border-strong, #d1d5db)",
            background: "var(--color-bg-card, #ffffff)",
            borderRadius: "var(--radius-sm, 10px)",
            padding: "8px 10px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            color: "var(--color-text-soft, #374151)",
          }}
        >
          編集
        </button>

        <button
          type="button"
          onClick={() => onDeleteTask(task.id)}
          style={{
            border: "1px solid var(--color-danger-border, #fecaca)",
            background: "var(--color-danger-soft, #fef2f2)",
            borderRadius: "var(--radius-sm, 10px)",
            padding: "8px 10px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            color: "var(--color-danger, #b91c1c)",
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}