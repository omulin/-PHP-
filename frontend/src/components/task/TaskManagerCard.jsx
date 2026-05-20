import { useEffect, useMemo, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

function getSafeUsers(users = []) {
  if (!Array.isArray(users)) return [];

  return users.filter((user) => user && typeof user === "object");
}

export default function TaskManagerCard({
  users = [],
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const safeUsers = useMemo(() => getSafeUsers(users), [users]);
  const defaultAssignee = safeUsers[0]?.name || "朝倉悠翔";

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [label, setLabel] = useState("");
  const [assignee, setAssignee] = useState(defaultAssignee);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStartDate(editingTask.startDate || "");
      setEndDate(editingTask.endDate || "");
      setLabel(editingTask.label || "");
      setAssignee(editingTask.assignee || defaultAssignee);
    } else {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setLabel("");
      setAssignee(defaultAssignee);
    }

    setFormError("");
  }, [editingTask, defaultAssignee]);

  const handleSubmit = async () => {
    const taskData = {
      title,
      label,
      startDate,
      endDate,
      assignee,
    };

    const result = editingTask
      ? await onUpdateTask({
          id: editingTask.id,
          ...taskData,
        })
      : await onAddTask(taskData);

    if (result && !result.ok) {
      if (!result.canceled) {
        setFormError(result.message || "入力内容を確認してください。");
      }
      return;
    }

    setFormError("");

    if (!editingTask) {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setLabel("");
      setAssignee(defaultAssignee);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setLabel("");
    setAssignee(defaultAssignee);
    setFormError("");
    onCancelEdit();
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "11px 10px",
    borderRadius: "var(--radius-sm, 10px)",
    border: "1px solid var(--color-border-strong, #d1d5db)",
    fontSize: 13,
    background: "var(--color-bg-card, #ffffff)",
    color: "var(--color-text-main, #111827)",
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

      <div
        style={{
          color: "var(--color-text-sub, #6b7280)",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
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
            borderRadius: "var(--radius-sm, 10px)",
            background: "var(--color-danger-soft, #fef2f2)",
            border: "1px solid var(--color-danger-border, #fecaca)",
            color: "var(--color-danger, #b91c1c)",
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
              color: "var(--color-text-sub, #6b7280)",
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
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
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

          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            style={inputStyle}
          >
            {safeUsers.length === 0 ? (
              <option value="朝倉悠翔">朝倉悠翔</option>
            ) : (
              safeUsers.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}（{user.roleLabel || "利用者"}）
                </option>
              ))
            )}
          </select>
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-sub, #6b7280)",
            marginTop: -2,
          }}
        >
          担当者：{assignee || "未選択"}
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
                border: "1px solid var(--color-border-strong, #d1d5db)",
                borderRadius: "var(--radius-sm, 10px)",
                padding: "11px 12px",
                background: "var(--color-bg-card, #ffffff)",
                color: "var(--color-text-soft, #374151)",
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
              borderRadius: "var(--radius-sm, 10px)",
              padding: "11px 12px",
              background: "var(--color-primary, #2563eb)",
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