import { useEffect, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const ROLE_OPTIONS = [
  { value: "USER", label: "利用者" },
  { value: "STAFF", label: "所員" },
  { value: "MANAGER", label: "所長" },
  { value: "ADMIN", label: "管理者" },
];

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 11px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  fontSize: 13,
  background: "#ffffff",
  color: "#111827",
};

const buttonStyle = {
  border: "1px solid #d1d5db",
  background: "#ffffff",
  borderRadius: 9,
  padding: "8px 10px",
  fontWeight: 800,
  fontSize: 12,
  cursor: "pointer",
  color: "#374151",
};

function RoleBadge({ roleLabel }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 800,
        background: "#eff6ff",
        color: "#1d4ed8",
        flexShrink: 0,
      }}
    >
      {roleLabel || "利用者"}
    </span>
  );
}

export default function UserManagerCard({
  users = [],
  isLoading = false,
  errorMessage = "",
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) {
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || "");
      setEmail(editingUser.email || "");
      setRole(editingUser.role || "USER");
    } else {
      setName("");
      setEmail("");
      setRole("USER");
    }

    setFormError("");
  }, [editingUser]);

  const handleSubmit = async () => {
    const userData = {
      name,
      email,
      role,
    };

    const result = editingUser
      ? await onUpdateUser(editingUser.id, userData)
      : await onAddUser(userData);

    if (!result?.ok) {
      setFormError(result?.message || "入力内容を確認してください。");
      return;
    }

    setFormError("");

    if (editingUser) {
      setEditingUser(null);
      return;
    }

    setName("");
    setEmail("");
    setRole("USER");
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormError("");
  };

  const handleDelete = async (user) => {
    const ok = window.confirm(`「${user.name}」を削除しますか？`);

    if (!ok) return;

    const result = await onDeleteUser(user.id);

    if (!result?.ok) {
      setFormError(result?.message || "ユーザー削除に失敗しました。");
    }

    if (editingUser && editingUser.id === user.id) {
      setEditingUser(null);
    }
  };

  return (
    <Card>
      <SectionTitle>ユーザー管理</SectionTitle>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginBottom: 12,
        }}
      >
        簡易ユーザー登録：名前・メール・役割を管理します
      </div>

      {(formError || errorMessage) && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {formError || errorMessage}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.5fr) 150px auto",
          gap: 8,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          style={inputStyle}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          style={inputStyle}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          {editingUser && (
            <button type="button" onClick={handleCancelEdit} style={buttonStyle}>
              取消
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            style={{
              ...buttonStyle,
              border: "1px solid #2563eb",
              background: "#2563eb",
              color: "#ffffff",
            }}
          >
            {editingUser ? "更新" : "追加"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          ユーザーを読み込み中です...
        </div>
      ) : users.length === 0 ? (
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          ユーザーはまだ登録されていません
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 10,
            maxHeight: 360,
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                background: "#ffffff",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 10,
                alignItems: "center",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <strong
                    style={{
                      fontSize: 14,
                      color: "#111827",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name || "無名ユーザー"}
                  </strong>

                  <RoleBadge roleLabel={user.roleLabel} />
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email || "-"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setEditingUser(user)}
                  style={buttonStyle}
                >
                  編集
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(user)}
                  style={{
                    ...buttonStyle,
                    border: "1px solid #fecaca",
                    background: "#fef2f2",
                    color: "#b91c1c",
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}