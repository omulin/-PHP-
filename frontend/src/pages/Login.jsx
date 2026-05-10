import { useState } from "react";
import Card from "../components/common/Card";
import SectionTitle from "../components/common/SectionTitle";

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "var(--radius-sm, 10px)",
    border: "1px solid var(--color-border-strong, #d1d5db)",
    background: "var(--color-bg-card, #ffffff)",
    color: "var(--color-text-main, #111827)",
    fontSize: 14,
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--color-bg-page, #eef2f7)",
        padding: 16,
      }}
    >
      <Card style={{ width: "100%", maxWidth: 420, padding: 20 }}>
        <SectionTitle>ログイン</SectionTitle>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label
              htmlFor="login-user-id"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-soft, #374151)",
              }}
            >
              ユーザーID
            </label>
            <input
              id="login-user-id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ユーザーIDを入力"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label
              htmlFor="login-password"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-text-soft, #374151)",
              }}
            >
              パスワード
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              border: "none",
              borderRadius: "var(--radius-md, 12px)",
              padding: "13px 14px",
              background: "var(--color-primary, #2563eb)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            ログイン
          </button>
        </form>
      </Card>
    </div>
  );
}