export default function Login({ onLogin }) {
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div>
        <h2>ログイン</h2>

        <input placeholder="メール" /><br /><br />
        <input placeholder="パスワード" type="password" /><br /><br />

        <button onClick={onLogin}>ログイン</button>
      </div>
    </div>
  );
}