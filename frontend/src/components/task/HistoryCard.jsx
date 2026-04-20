import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import FilterChip from "../common/FilterChip";
import { getDoneTasks, formatDateRange } from "../../utils/taskHelpers";

export default function HistoryCard({ tasks }) {
  const historyTasks = getDoneTasks(tasks);

  return (
    <Card>
      <SectionTitle>過去の記録</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <select
          style={{
            minWidth: 220,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            fontSize: 15,
          }}
        >
          <option>全員</option>
          <option>朝倉悠翔</option>
        </select>

        <FilterChip active>全件 (2)</FilterChip>
        <FilterChip active={false}>今日 (0)</FilterChip>
        <FilterChip active={false}>今週 (2)</FilterChip>
        <FilterChip active={false}>今月 (1)</FilterChip>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {historyTasks.map((task) => (
          <div
            key={`history-${task.id}`}
            style={{
              background: "#f1f5f9",
              borderRadius: 14,
              padding: 16,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 28 }}>{task.title}</div>
                <div
                  style={{
                    background: "#d1fae5",
                    color: "#047857",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  完了
                </div>
              </div>

              <div style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7 }}>
  期間: {formatDateRange(task.startDate, task.endDate)}<br />
  作成: {task.createdBy}<br />
  担当: {task.assignee}<br />
  完了: {task.assignee}
</div>
            </div>

            <div style={{ color: "#6b7280", fontSize: 16, fontWeight: 700 }}>
              {task.completedAt || "-"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}