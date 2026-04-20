import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function LeftPanel() {
  return (
    <Card>
      <SectionTitle>支援管理システム</SectionTitle>

      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <SmallTab active={false}>利用者</SmallTab>
        <SmallTab active>管理者</SmallTab>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <SmallTab active>タスク管理</SmallTab>
        <SmallTab active={false}>利用者管理</SmallTab>
      </div>

      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        朝倉悠翔
      </div>

      <div style={{ fontSize: 18, color: "#374151", marginBottom: 10 }}>
        yuto330309@gmail.com
      </div>

      <div
        style={{
          display: "inline-block",
          background: "#dbeafe",
          color: "#1d4ed8",
          padding: "6px 12px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 18,
        }}
      >
        権限 : STAFF
      </div>

      <button
        style={{
          width: "100%",
          border: "none",
          borderRadius: 12,
          padding: "18px 16px",
          background: "#4f8fe7",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ログアウト
      </button>
    </Card>
  );
}