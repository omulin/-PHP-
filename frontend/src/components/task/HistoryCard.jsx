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
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <select
          style={{
            minWidth: 200,
            padding: "9px 10px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            fontSize: 13,
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

      <div style={{ display: "grid", gap: 8 }}>
        {historyTasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "12px 14px",
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
                  fontSize: 15,
                  color: "#111827",
                  lineHeight: 1.35,
                  marginBottom: 4,
                }}
              >
                {task.title}
              </div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                  lineHeight: 1.6,
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