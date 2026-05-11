export function getProgress(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) return 0;

  const doneCount = tasks.filter((task) => task.status === "DONE").length;

  return Math.round((doneCount / tasks.length) * 100);
}

export function getStatusCounts(tasks = []) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return {
    todo: safeTasks.filter((task) => task.status === "TODO").length,
    doing: safeTasks.filter((task) => task.status === "DOING").length,
    done: safeTasks.filter((task) => task.status === "DONE").length,
  };
}

export function getDoneTasks(tasks = []) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return safeTasks.filter((task) => task.status === "DONE");
}

export function getTotalCount(tasks = []) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return safeTasks.length;
}

function toLocalDate(dateString) {
  if (!dateString) return null;

  const [year, month, day] = String(dateString).split("-").map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date;
}

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

export function getDueSoonCount(tasks = [], days = 3) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const today = getToday();

  const limitDate = new Date(today);
  limitDate.setDate(today.getDate() + days);
  limitDate.setHours(23, 59, 59, 999);

  return safeTasks.filter((task) => {
    if (task.status === "DONE") return false;

    const endDate = toLocalDate(task.endDate);
    if (!endDate) return false;

    return endDate >= today && endDate <= limitDate;
  }).length;
}

export function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) return "-";
  if (!startDate) return endDate;
  if (!endDate) return startDate;

  return `${startDate} 〜 ${endDate}`;
}