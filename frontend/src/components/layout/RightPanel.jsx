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
          fontSize: 38,
          fontWeight: 900,
          color: "#111827",
          marginBottom: 10,
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
            background: "#4f8fe7",
          }}
        />
      </div>

      <div style={{ fontSize: 17, lineHeight: 1.8 }}>
        <div>未入力 {counts.todo}</div>
        <div>進行中 {counts.doing}</div>
        <div>完了 {counts.done}</div>
        <div>今日完了 0</div>
        <div>今月完了 1</div>
      </div>
    </Card>
  );
}