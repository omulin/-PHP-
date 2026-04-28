import { useEffect, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function TaskManagerCard({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStartDate(editingTask.startDate || "");
      setEndDate(editingTask.endDate || "");
      setLabel(editingTask.label || "");
    } else {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setLabel("");
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      label: label.trim() || "ラベルなし",
      startDate: startDate || "2025-04-02",
      endDate: endDate || "2025-04-05",
    };

    if (editingTask) {
      onUpdateTask({
        id: editingTask.id,
        ...taskData,
      });
    } else {
      onAddTask(taskData);
      setTitle("");
      setStartDate("");
      setEndDate("");
      setLabel("");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setLabel("");
    onCancelEdit();
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "11px 10px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 13,
    background: "#ffffff",
    color: "#111827",
  };

  return (
    <Card style={{ padding: 12 }}>
      <SectionTitle>タスク管理</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <SmallTab active={!editingTask}>追加</SmallTab>
        <SmallTab active={!!editingTask}>編集</SmallTab>
      </div>

      <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 13 }}>
        {editingTask ? "選択中のタスクを編集しています" : "新しいタスクを追加します"}
      </div>

      <div
        style={{
          display: "inline-block",
          background: editingTask ? "#fef3c7" : "#fee2e2",
          color: editingTask ? "#92400e" : "#b91c1c",
          padding: "6px 10px",
          borderRadius: 999,
          fontWeight: 700,
          marginBottom: 12,
          fontSize: 12,
        }}
      >
        {editingTask ? "編集中" : "入力モード"}
      </div>

      <div
        style={{
          display: "grid",
          gap: 10,
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
            gridTemplateColumns: "minmax(0, 1fr) 24px minmax(0, 1fr)",
            gap: 8,
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
              fontSize: 12,
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

        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="ラベル"
          style={inputStyle}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: editingTask ? "1fr 1fr" : "1fr",
            gap: 8,
          }}
        >
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: 10,
                padding: "11px 12px",
                background: "#ffffff",
                color: "#374151",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              キャンセル
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 10,
              padding: "11px 12px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {editingTask ? "更新" : "追加"}
          </button>
        </div>
      </div>
    </Card>
  );
}