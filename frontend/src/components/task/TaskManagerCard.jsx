import { useEffect, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function TaskManagerCard({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
  searchText,
  onSearchTextChange,
  resultCount,
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
        <SmallTab active={!editingTask}>追加</SmallTab>
        <SmallTab active={!!editingTask}>編集</SmallTab>
      </div>

      <div style={{ color: "#6b7280", marginBottom: 8, fontSize: 14 }}>
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
          marginBottom: 14,
          fontSize: 13,
        }}
      >
        {editingTask ? "編集中" : "管理モード"}
      </div>

      <div
        style={{
          display: "grid",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <input
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="検索（タスク名 / ラベル / 担当者 / 日付）"
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            検索結果: {resultCount}件
          </div>

          {searchText && (
            <button
              type="button"
              onClick={() => onSearchTextChange("")}
              style={{
                border: "1px solid #d1d5db",
                background: "#ffffff",
                borderRadius: 10,
                padding: "8px 12px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                color: "#374151",
              }}
            >
              検索クリア
            </button>
          )}
        </div>
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: editingTask ? "1fr 1fr" : "1fr",
            gap: 10,
          }}
        >
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                border: "1px solid #d1d5db",
                borderRadius: 12,
                padding: "14px 14px",
                background: "#ffffff",
                color: "#374151",
                fontWeight: 800,
                fontSize: 16,
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
            {editingTask ? "更新" : "追加"}
          </button>
        </div>
      </div>
    </Card>
  );
}