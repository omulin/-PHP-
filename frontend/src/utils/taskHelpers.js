function getSafeTasks(tasks = []) {
  if (!Array.isArray(tasks)) return [];

  return tasks.filter((task) => task && typeof task === "object");
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

export function getProgress(tasks = []) {
  const safeTasks = getSafeTasks(tasks);

  if (safeTasks.length === 0) return 0;

  const doneCount = safeTasks.filter((task) => task.status === "DONE").length;

  return Math.round((doneCount / safeTasks.length) * 100);
}

export function getStatusCounts(tasks = []) {
  const safeTasks = getSafeTasks(tasks);

  return {
    todo: safeTasks.filter((task) => task.status === "TODO").length,
    doing: safeTasks.filter((task) => task.status === "DOING").length,
    done: safeTasks.filter((task) => task.status === "DONE").length,
  };
}

export function getDoneTasks(tasks = []) {
  const safeTasks = getSafeTasks(tasks);

  return safeTasks.filter((task) => task.status === "DONE");
}

export function getTotalCount(tasks = []) {
  const safeTasks = getSafeTasks(tasks);

  return safeTasks.length;
}

export function getDueSoonCount(tasks = [], days = 3) {
  const safeTasks = getSafeTasks(tasks);
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

export function getTodayTasks(tasks = []) {
  const safeTasks = getSafeTasks(tasks);
  const today = getToday();

  return safeTasks
    .filter((task) => {
      const startDate = toLocalDate(task.startDate);
      const endDate = toLocalDate(task.endDate);

      if (!startDate || !endDate) return false;

      return startDate <= today && today <= endDate;
    })
    .sort((a, b) => {
      // 未完了を上に表示
      if (a.status === "DONE" && b.status !== "DONE") return 1;
      if (a.status !== "DONE" && b.status === "DONE") return -1;

      // 期限が近い順
      const aEnd = toLocalDate(a.endDate);
      const bEnd = toLocalDate(b.endDate);

      if (!aEnd || !bEnd) return 0;

      return aEnd - bEnd;
    });
}

export function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) return "-";
  if (!startDate) return endDate;
  if (!endDate) return startDate;

  return `${startDate} 〜 ${endDate}`;
}