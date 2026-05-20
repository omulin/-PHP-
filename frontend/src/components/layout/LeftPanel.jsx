import Card from "../common/Card";

function MenuButton({ active = false, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        border: active ? "1px solid #2563eb" : "1px solid #e5e7eb",
        background: active ? "#eff6ff" : "#ffffff",
        color: active ? "#1d4ed8" : "#374151",
        borderRadius: 12,
        padding: "10px 12px",
        fontSize: 13,
        fontWeight: 800,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {children}
    </button>
  );
}

export default function LeftPanel({ activeTab = "tasks", onChangeTab }) {
  return (
    <Card>
      <div
        style={{
          fontSize: 17,
          fontWeight: 900,
          color: "#111827",
          marginBottom: 6,
        }}
      >
        支援管理システム
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginBottom: 14,
        }}
      >
        タスク・ユーザー管理
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <MenuButton
          active={activeTab === "tasks"}
          onClick={() => onChangeTab?.("tasks")}
        >
          タスク管理
        </MenuButton>

        <MenuButton
          active={activeTab === "users"}
          onClick={() => onChangeTab?.("users")}
        >
          利用者管理
        </MenuButton>
      </div>
    </Card>
  );
}