import { useState } from "react";

const getColor = (status) => {
  if (status === "TODO") return "gray";
  if (status === "DOING") return "orange";
  if (status === "WAIT") return "blue";
  return "black";
};

export default function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);

  const next = () => {
    if (status === "TODO") setStatus("DOING");
    else if (status === "DOING") setStatus("WAIT");
    else setStatus("TODO");
  };

  return (
    <div
      onClick={next}
      style={{
        border: "1px solid #ccc",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        background: "white",
        cursor: "pointer"
      }}
    >
      <h3>{task.title}</h3>
      <p style={{ color: getColor(status) }}>
        状態: {status}
      </p>
    </div>
  );
}