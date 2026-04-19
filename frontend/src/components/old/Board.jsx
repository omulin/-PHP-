import TaskCard from "./TaskCard";

export default function Board({ tasks }) {
  const statuses = ["TODO", "DOING", "DONE"];

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {statuses.map((status) => (
        <div key={status} style={{ flex: 1 }}>
          <h3>{status}</h3>
          {tasks
            .filter((t) => t.status === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
}