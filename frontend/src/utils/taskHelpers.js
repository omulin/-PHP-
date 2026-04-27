export function getProgress(tasks = []) {
  if (!tasks.length) return 0;

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  return Math.round((doneCount / tasks.length) * 100);
}

export function getStatusCounts(tasks = []) {
  return {
    todo: tasks.filter((task) => task.status === "TODO").length,
    doing: tasks.filter((task) => task.status === "DOING").length,
    done: tasks.filter((task) => task.status === "DONE").length,
  };
}

export function getDoneTasks(tasks = []) {
  return tasks.filter((task) => task.status === "DONE");
}

export function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) return "-";
  if (!startDate) return endDate;
  if (!endDate) return startDate;

  return `${startDate} 〜 ${endDate}`;
}