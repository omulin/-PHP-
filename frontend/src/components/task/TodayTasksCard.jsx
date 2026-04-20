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
              background: "#f8fafc",
              borderRadius: 14,
              padding: 12,
              borderLeft: "6px solid #3b82f6",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 28,
                marginBottom: 10,
              }}
            >
              {task.title}
            </div>

            <select
              value={task.status}
              onChange={(e) => onChangeStatus(task.id, e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                fontSize: 15,
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