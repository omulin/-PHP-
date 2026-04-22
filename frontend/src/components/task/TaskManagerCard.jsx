import { useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function TaskManagerCard({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [label, setLabel] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAddTask({
      title,
      label: label || "ラベルなし",
      startDate: startDate || "2025-04-02",
      endDate: endDate || "2025-04-05",
    });

    setTitle("");
    setStartDate("");
    setEndDate("");
    setLabel("");
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "14px 12px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 14,
    background: "#ffffff",
    color: "#111827",
  };

  return (
    <Card>
      <SectionTitle>タスク管理</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <SmallTab active>追加</SmallTab>
        <SmallTab active={false}>管理</SmallTab>
      </div>

      <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 14 }}>
        全体タスク表示
      </div>

      <div
        style={{
          display: "inline-block",
          background: "#fee2e2",
          color: "#b91c1c",
          padding: "6px 10px",
          borderRadius: 999,
          fontWeight: 700,
          marginBottom: 14,
          fontSize: 13,
        }}
      >
        管理モード
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          minWidth: 0,
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスク名"
          style={inputStyle}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 30px minmax(0, 1fr)",
            gap: 10,
            alignItems: "center",
            width: "100%",
            minWidth: 0,
          }}
        >
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={inputStyle}
          />

          <div
            style={{
              textAlign: "center",
              fontWeight: 700,
              color: "#6b7280",
            }}
          >
            〜
          </div>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto auto",
            gap: 10,
            alignItems: "center",
            width: "100%",
            minWidth: 0,
          }}
        >
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="ラベル"
            style={inputStyle}
          />

          <button
            type="button"
            style={{
              border: "1px solid #d1d5db",
              background: "#ffffff",
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            候補
          </button>

          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "#2563eb",
              border: "1px solid #94a3b8",
              flexShrink: 0,
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            border: "none",
            borderRadius: 12,
            padding: "14px 14px",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          追加
        </button>
      </div>
    </Card>
  );
}