import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import FilterChip from "../common/FilterChip";
import {
  getHistoryTasks,
  getCompletedTodayCount,
  getCompletedThisMonthCount,
  formatDateRange,
} from "../../utils/taskHelpers";

function HistoryItem({ task }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 12,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 14,
              color: "#111827",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.title || "無題のタスク"}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#6b7280",
              marginTop: 4,
            }}
          >
            {task.label || "ラベルなし"}
          </div>
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 800,
            background: "#dcfce7",
            color: "#166534",
            flexShrink: 0,
          }}
        >
          完了
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gap: 4,
          fontSize: 12,
          color: "#6b7280",
        }}
      >
        <div>期間：{formatDateRange(task.startDate, task.endDate)}</div>
        <div>作成：{task.createdBy || "-"}</div>
        <div>担当：{task.assignee || "-"}</div>
        <div>完了日：{task.completedAt || "-"}</div>
      </div>
    </div>
  );
}

export default function HistoryCard({ tasks = [] }) {
  const historyTasks = getHistoryTasks(tasks);
  const todayCount = getCompletedTodayCount(tasks);
  const monthCount = getCompletedThisMonthCount(tasks);

  return (
    <Card>
      <SectionTitle>過去の記録</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <FilterChip active>全件 ({historyTasks.length})</FilterChip>
        <FilterChip>今日 ({todayCount})</FilterChip>
        <FilterChip>今月 ({monthCount})</FilterChip>
      </div>

      {historyTasks.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "#6b7280",
            padding: "10px 0",
          }}
        >
          完了済みのタスクはまだありません
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {historyTasks.map((task) => (
            <HistoryItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </Card>
  );
}