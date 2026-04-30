import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import FilterChip from "../common/FilterChip";

export default function TodayTasksCard({
  tasks,
  onChangeStatus,
  onEditTask,
  onDeleteTask,
}) {
  const todayTasks = tasks.slice(0, 3);

  return (
    <Card style={{ minHeight: 360 }}>
      <SectionTitle>今日のタスク</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <FilterChip active>自分 (2)</FilterChip>
        <FilterChip active={false}>サブチーム (0)</FilterChip>
        <FilterChip active={false}>チーム (0)</FilterChip>
        <FilterChip active={false}>スタッフ以上 (2)</FilterChip>
      </div>

      <div style={{ maxHeight: 280, overflowY: "auto", paddingRight: 4 }}>
        {todayTasks.map((task) => (
          <div
            key={`today-${task.id}`}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 10,
              borderLeft: "4px solid #2563eb",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 16,
                lineHeight: 1.35,
                color: "#111827",
                marginBottom: 8,
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </div>

            <select
              value={task.status}
              onChange={(e) => onChangeStatus(task.id, e.target.value)}
              style={{
                width: "100%",
                padding: "8px 9px",
                borderRadius: 9,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                fontSize: 12,
                boxSizing: "border-box",
              }}
            >
              <option value="TODO">未入力</option>
              <option value="DOING">進行中</option>
              <option value="DONE">完了</option>
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
                  borderRadius: 9,
                  padding: "8px 9px",
                  fontWeight: 700,
                  fontSize: 12,
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
                  borderRadius: 9,
                  padding: "8px 9px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  color: "#b91c1c",
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}