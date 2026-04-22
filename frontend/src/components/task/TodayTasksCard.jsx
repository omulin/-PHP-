import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import FilterChip from "../common/FilterChip";

export default function TodayTasksCard({ tasks, onChangeStatus }) {
  const todayTasks = tasks.slice(0, 3);

  return (
    <Card style={{ minHeight: 470 }}>
      <SectionTitle>今日のタスク</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <FilterChip active>自分 (2)</FilterChip>
        <FilterChip active={false}>サブチーム (0)</FilterChip>
        <FilterChip active={false}>チーム (0)</FilterChip>
        <FilterChip active={false}>スタッフ以上 (2)</FilterChip>
      </div>

      <div style={{ maxHeight: 330, overflowY: "auto", paddingRight: 4 }}>
        {todayTasks.map((task) => (
          <div
            key={`today-${task.id}`}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 12,
              borderLeft: "4px solid #2563eb",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 18,
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
                padding: "9px 10px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                fontSize: 13,
                boxSizing: "border-box",
              }}
            >
              <option value="TODO">未入力</option>
              <option value="DOING">進行中</option>
              <option value="DONE">完了</option>
            </select>
          </div>
        ))}
      </div>
    </Card>
  );
}