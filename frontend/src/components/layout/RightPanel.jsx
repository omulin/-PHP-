import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import { getProgress, getStatusCounts } from "../../utils/taskHelpers";

export default function RightPanel({ tasks }) {
  const progress = getProgress(tasks);
  const counts = getStatusCounts(tasks);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#374151",
          }}
        >
          <span>未入力</span>
          <strong>{counts.todo}</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#374151",
          }}
        >
          <span>進行中</span>
          <strong>{counts.doing}</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#374151",
          }}
        >
          <span>完了</span>
          <strong>{counts.done}</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#6b7280",
            paddingTop: 6,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <span>今日完了</span>
          <strong>0</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#6b7280",
          }}
        >
          <span>今月完了</span>
          <strong>1</strong>
        </div>
      </div>
    </Card>
  );
}