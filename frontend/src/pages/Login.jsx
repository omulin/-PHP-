export default function Login({ onLogin }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef2f7",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: 360,
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>
          ログイン
        </div>

        <input
          placeholder="メール"
          style={{
            width: "100%",
            padding: "14px 12px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            fontSize: 16,
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="パスワード"
          style={{
            width: "100%",
            padding: "14px 12px",
            borderRadius: 12,
            border: "1px solid #d1d5db",
            fontSize: 16,
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={onLogin}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 12,
            padding: "14px 12px",
            background: "#4f8fe7",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  );
}