export default function TaskCard({ task }) {
  return (
    <div style={{
      background: "#fff",
      padding: 10,
      borderRadius: 8,
      marginBottom: 8
    }}>
      <div>{task.title}</div>
      <div style={{ fontSize: 12 }}>{task.status}</div>
    </div>
  );
}