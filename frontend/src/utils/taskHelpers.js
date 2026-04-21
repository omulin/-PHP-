export function getStatusCounts(tasks) {
  return {
    todo: tasks.filter((t) => t.status === "TODO").length,
    doing: tasks.filter((t) => t.status === "DOING").length,
    done: tasks.filter((t) => t.status === "DONE").length,
  };
}

export function getProgress(tasks) {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === "DONE").length;
  return Math.round((done / tasks.length) * 100);
}

export function getDoneTasks(tasks) {
  return tasks.filter((t) => t.status === "DONE");
}

export function formatDateRange(start, end) {
  if (!start || !end) return "-";
  return `${start}〜${end}`;
}