function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getWeekKey() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`;
}

function getMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function shouldReset(type) {
  const stored = localStorage.getItem(`taskflow_reset_${type}`);
  const current =
    type === "daily"
      ? getTodayKey()
      : type === "weekly"
      ? getWeekKey()
      : getMonthKey();
  return stored !== current;
}

function markReset(type) {
  const current =
    type === "daily"
      ? getTodayKey()
      : type === "weekly"
      ? getWeekKey()
      : getMonthKey();
  localStorage.setItem(`taskflow_reset_${type}`, current);
}

export function applyAutoResets(tasks) {
  const types = ["daily", "weekly", "monthly"];
  const toReset = types.filter(shouldReset);
  if (toReset.length === 0) return tasks;
  toReset.forEach(markReset);
  return tasks.map((t) =>
    toReset.includes(t.type) && t.status === "done"
      ? { ...t, status: "pending" }
      : t
  );
}