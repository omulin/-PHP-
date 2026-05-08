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
  const [formError, setFormError] = useState("");

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

    setFormError("");
  }, [editingTask]);

  const handleSubmit = () => {
    const taskData = {
      title,
      label,
      startDate,
      endDate,
    };

    const result = editingTask
      ? onUpdateTask({
          id: editingTask.id,
          ...taskData,
        })
      : onAddTask(taskData);

    if (result && !result.ok) {
      setFormError(result.message || "入力内容を確認してください。");
      return;
    }

    setFormError("");

    if (!editingTask) {
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
    setFormError("");
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
    <Card style={{ padding: 14 }}>
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
        {editingTask ? "選択中のタスクを編集しています" : "全体タスク表示"}
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
        {editingTask ? "編集中" : "管理モード"}
      </div>

      {formError && (
        <div
          style={{
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: 10,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {formError}
        </div>
      )}

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto auto",
            gap: 8,
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
              padding: "10px 10px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            候補
          </button>

          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "#2563eb",
              border: "1px solid #94a3b8",
              flexShrink: 0,
            }}
          />
        </div>

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