import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import {
  getProgress,
  getStatusCounts,
  getTotalCount,
  getDueSoonCount,
  getCompletedTodayCount,
  getCompletedThisMonthCount,
} from "../../utils/taskHelpers";

function StatRow({ label, value, muted = false, borderTop = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        color: muted ? "#6b7280" : "#374151",
        paddingTop: borderTop ? 8 : 0,
        borderTop: borderTop ? "1px solid #e5e7eb" : "none",
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function RightPanel({ tasks = [] }) {
  const progress = getProgress(tasks);
  const counts = getStatusCounts(tasks);
  const totalCount = getTotalCount(tasks);
  const dueSoonCount = getDueSoonCount(tasks);
  const completedTodayCount = getCompletedTodayCount(tasks);
  const completedThisMonthCount = getCompletedThisMonthCount(tasks);

  return (
    <Card>
      <SectionTitle>ダッシュボード</SectionTitle>

      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#111827",
          marginBottom: 10,
          lineHeight: 1,
        }}
      >
        {progress}%
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginBottom: 8,
        }}
      >
        完了率
      </div>

      <div
        style={{
          width: "100%",
          height: 10,
          background: "#e5e7eb",
          borderRadius: 999,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2563eb",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <StatRow label="総タスク" value={totalCount} />
        <StatRow label="未入力" value={counts.todo} />
        <StatRow label="進行中" value={counts.doing} />
        <StatRow label="完了" value={counts.done} />
        <StatRow label="期限が近い" value={dueSoonCount} muted borderTop />
        <StatRow label="今日完了" value={completedTodayCount} muted />
        <StatRow label="今月完了" value={completedThisMonthCount} muted />
      </div>
    </Card>
  );
}