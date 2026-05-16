import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import FilterChip from "../common/FilterChip";
import { getTodayTasks, formatDateRange } from "../../utils/taskHelpers";

function StatusBadge({ status }) {
  const labelMap = {
    TODO: "未入力",
    DOING: "進行中",
    DONE: "完了",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 800,
        background:
          status === "DONE"
            ? "#dcfce7"
            : status === "DOING"
              ? "#dbeafe"
              : "#f3f4f6",
        color:
          status === "DONE"
            ? "#166534"
            : status === "DOING"
              ? "#1d4ed8"
              : "#374151",
        flexShrink: 0,
      }}
    >
      {labelMap[status] || "未入力"}
    </span>
  );
}

export default function TodayTasksCard({
  tasks = [],
  onChangeStatus,
  onEditTask,
  onDeleteTask,
}) {
  const todayTasks = getTodayTasks(tasks);
  const activeTasks = todayTasks.filter((task) => task.status !== "DONE");
  const doneTasks = todayTasks.filter((task) => task.status === "DONE");

  return (
    <Card>
      <SectionTitle>今日のタスク</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <FilterChip active>今日 ({todayTasks.length})</FilterChip>
        <FilterChip>未完了 ({activeTasks.length})</FilterChip>
        <FilterChip>完了 ({doneTasks.length})</FilterChip>
      </div>

      {todayTasks.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "#6b7280",
            padding: "10px 0",
          }}
        >
          今日の対象タスクはありません
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
          {todayTasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 12,
                background: task.status === "DONE" ? "#f9fafb" : "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 14,
                      color: "#111827",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title || "無題のタスク"}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b7280",
                      marginTop: 4,
                    }}
                  >
                    {task.label || "ラベルなし"}
                  </div>
                </div>

                <StatusBadge status={task.status} />
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginBottom: 10,
                }}
              >
                期間：{formatDateRange(task.startDate, task.endDate)}
              </div>

              <select
                value={task.status || "TODO"}
                onChange={(e) => onChangeStatus(task.id, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 9px",
                  borderRadius: 9,
                  border: "1px solid #d1d5db",
                  background: "#ffffff",
                  fontSize: 12,
                  boxSizing: "border-box",
                  marginBottom: 8,
                }}
              >
                <option value="TODO">未入力</option>
                <option value="DOING">進行中</option>
                <option value="DONE">完了</option>
              </select>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => onEditTask(task)}
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#ffffff",
                    borderRadius: 9,
                    padding: "8px 9px",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    color: "#374151",
                  }}
                >
                  編集
                </button>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  style={{
                    border: "1px solid #fecaca",
                    background: "#fef2f2",
                    borderRadius: 9,
                    padding: "8px 9px",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
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