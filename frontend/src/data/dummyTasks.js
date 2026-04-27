export const STATUS_LABELS = {
  TODO: "未入力",
  DOING: "進行中",
  DONE: "完了",
};

export const STATUS_COLORS = {
  TODO: "#6366f1",
  DOING: "#2563eb",
  DONE: "#16a34a",
};

export const initialTasks = [
  {
    id: 1234645,
    title: "1234645",
    label: "1234",
    status: "TODO",
    startDate: "2025-03-30",
    endDate: "2025-04-11",
    createdBy: "朝倉悠翔",
    assignee: "朝倉悠翔",
    completedAt: null,
  },
  {
    id: 123456,
    title: "123456",
    label: "1234",
    status: "DOING",
    startDate: "2025-03-29",
    endDate: "2025-04-03",
    createdBy: "朝倉悠翔",
    assignee: "朝倉悠翔",
    completedAt: null,
  },
  {
    id: 112233,
    title: "112233",
    label: "1234",
    status: "DONE",
    startDate: "2025-03-28",
    endDate: "2025-04-01",
    createdBy: "朝倉悠翔",
    assignee: "朝倉悠翔",
    completedAt: "2025-04-01 21:03",
  },
];