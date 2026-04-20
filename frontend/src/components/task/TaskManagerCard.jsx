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

  return (
    <Card>
      <SectionTitle>タスク管理</SectionTitle>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <SmallTab active>追加</SmallTab>
        <SmallTab active={false}>管理</SmallTab>
      </div>

      <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 16 }}>
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
          fontSize: 14,
        }}
      >
        管理モード
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスク名"
          style={{
            width: "100%",
            padding: "16px 14px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            fontSize: 16,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 30px 1fr",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              fontSize: 16,
            }}
          />
          <div style={{ textAlign: "center", fontWeight: 700 }}>〜</div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              fontSize: 16,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="ラベル"
            style={{
              width: "100%",
              padding: "16px 14px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              fontSize: 16,
            }}
          />

          <button
            style={{
              border: "1px solid #d1d5db",
              background: "#ffffff",
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            候補
          </button>

          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              background: "#4f8fe7",
              border: "1px solid #94a3b8",
            }}
          />
        </div>

        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 12,
            padding: "16px 14px",
            background: "#4f8fe7",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          追加
        </button>
      </div>
    </Card>
  );
}