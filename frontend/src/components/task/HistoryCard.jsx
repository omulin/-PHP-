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
          marginBottom: 16,
        }}
      >
        <select
          style={{
            minWidth: 220,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            fontSize: 14,
          }}
        >
          <option>全員</option>
          <option>朝倉悠翔</option>
        </select>

        <FilterChip active>全件 ({historyTasks.length})</FilterChip>
        <FilterChip>今日 (0)</FilterChip>
        <FilterChip>今週 ({historyTasks.length})</FilterChip>
        <FilterChip>今月 ({historyTasks.length})</FilterChip>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {historyTasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: "14px 16px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: "#111827",
                  lineHeight: 1.35,
                  marginBottom: 6,
                }}
              >
                {task.title}
              </div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  lineHeight: 1.65,
                }}
              >
                期間: {formatDateRange(task.startDate, task.endDate)}
                <br />
                作成: {task.createdBy}
                <br />
                担当: {task.assignee}
                <br />
                完了: {task.assignee}
              </div>
            </div>

            <div
              style={{
                color: "#6b7280",
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: "nowrap",
                alignSelf: "start",
                paddingTop: 2,
              }}
            >
              {task.completedAt || "-"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}