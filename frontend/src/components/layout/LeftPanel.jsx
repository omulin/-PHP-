import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function LeftPanel() {
  return (
    <Card style={{ padding: 14 }}>
      <SectionTitle>支援管理システム</SectionTitle>

      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <SmallTab active={false}>利用者</SmallTab>
        <SmallTab active>管理者</SmallTab>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <SmallTab active>タスク管理</SmallTab>
        <SmallTab active={false}>利用者管理</SmallTab>
      </div>

      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
        朝倉悠翔
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
        yuto330309@gmail.com
      </div>

      <div
        style={{
          display: "inline-block",
          background: "#dbeafe",
          color: "#1d4ed8",
          padding: "6px 10px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 12,
          marginBottom: 16,
        }}
      >
        権限 : STAFF
      </div>

      <button
        style={{
          width: "100%",
          border: "none",
          borderRadius: 12,
          padding: "13px 14px",
          background: "#2563eb",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        ログアウト
      </button>
    </Card>
  );
}