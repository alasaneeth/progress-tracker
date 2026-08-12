import { TYPE_META, STATUS_META } from "../constants/meta";

function getDayCount(task) {
  if (task.type !== "daily" || !task.createdAt) return null;
  const created = new Date(task.createdAt);
  created.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today - created) / (1000 * 60 * 60 * 24)) + 1;
  return diffDays < 1 ? 1 : diffDays;
}

function getDueDateInfo(dueDate, isDone) {
  if (!dueDate || isDone) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0)  return { label: `Overdue by ${Math.abs(diffDays)}d`, color: "#f87171", bg: "#2d0f0f", border: "#5c1a1a", icon: "🚨" };
  if (diffDays === 0) return { label: "Due Today",                         color: "#fbbf24", bg: "#2d1f0a", border: "#5c3a10", icon: "⚠️" };
  if (diffDays === 1) return { label: "Due Tomorrow",                      color: "#fbbf24", bg: "#2d1f0a", border: "#5c3a10", icon: "📅" };
  return                     { label: `Due in ${diffDays}d`,               color: "#34d399", bg: "#0a2d1f", border: "#0f5c3a", icon: "📅" };
}

export default function TaskCard({ task, onStatus, onEdit, onDelete, onToggleSubtask }) {
  const type = TYPE_META[task.type];
  const status = STATUS_META[task.status];
  const statusOrder = ["pending", "inprogress", "done"];
  const isDone = task.status === "done";
  const dueDateInfo = getDueDateInfo(task.dueDate, isDone);
  const dayCount = getDayCount(task);
  const subtasks = task.subtasks || [];
  const subtaskDoneCount = subtasks.filter((s) => s.done).length;

  return (
    <div
      style={{
        background: "#111118",
        border: `1px solid ${dueDateInfo?.color === "#f87171" ? "#3d1515" : "#1e1e2e"}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
        animation: "cardIn 0.28s ease both",
        opacity: isDone ? 0.55 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "#2a2a3e";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = dueDateInfo?.color === "#f87171" ? "#3d1515" : "#1e1e2e";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${status.color}, transparent)`,
        }}
      />

      <div style={{ padding: "14px 16px" }}>
        {/* Row 1: badges + actions */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px",
                borderRadius: 100, background: type.bg, color: type.color,
                border: `1px solid ${type.border}`, letterSpacing: "0.03em",
              }}
            >
              {type.emoji} {type.label}
            </span>
            <span
              style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px",
                borderRadius: 100, background: status.bg, color: status.color,
                border: `1px solid ${status.border}`, letterSpacing: "0.03em",
              }}
            >
              {status.icon} {status.label}
            </span>

            {/* Day Count Badge (daily tasks only) */}
            {dayCount !== null && (
              <span
                style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px",
                  borderRadius: 100, background: "#161625",
                  color: "#60a5fa", border: "1px solid #1e3a5f",
                  letterSpacing: "0.03em",
                }}
              >
                🔥 Day {dayCount}
              </span>
            )}

            {/* Subtask Progress Badge */}
            {subtasks.length > 0 && (
              <span
                style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px",
                  borderRadius: 100, background: "#161625",
                  color: subtaskDoneCount === subtasks.length ? "#34d399" : "#94a3b8",
                  border: `1px solid ${subtaskDoneCount === subtasks.length ? "#0f5c3a" : "#2a2a3e"}`,
                  letterSpacing: "0.03em",
                }}
              >
                ☑️ {subtaskDoneCount}/{subtasks.length}
              </span>
            )}

            {/* Due Date Badge */}
            {dueDateInfo && (
              <span
                style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 10px",
                  borderRadius: 100, background: dueDateInfo.bg,
                  color: dueDateInfo.color, border: `1px solid ${dueDateInfo.border}`,
                  letterSpacing: "0.03em",
                }}
              >
                {dueDateInfo.icon} {dueDateInfo.label}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {[
              { icon: "✏️", title: "Edit",   onClick: () => onEdit(task),     danger: false },
              { icon: "🗑️", title: "Delete", onClick: () => onDelete(task.id), danger: true  },
            ].map((btn, i) => (
              <button
                key={i}
                title={btn.title}
                onClick={btn.onClick}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: "1px solid #2a2a3e", background: "transparent",
                  cursor: "pointer", fontSize: 13, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#6b7280", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = btn.danger ? "#2d0f0f" : "#1a1a2e";
                  e.currentTarget.style.borderColor = btn.danger ? "#5c1a1a" : "#3a3a5e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#2a2a3e";
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 14, fontWeight: 600, lineHeight: 1.45,
            marginBottom: task.desc ? 5 : 12,
            color: isDone ? "#374151" : "#e2e8f0",
            textDecoration: isDone ? "line-through" : "none",
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          {task.title}
        </h3>

        {/* Desc */}
        {task.desc && (
          <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, marginBottom: 12 }}>
            {task.desc}
          </p>
        )}

        {/* Subtasks checklist */}
        {subtasks.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {subtasks.map((s) => (
              <label
                key={s.id}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 7,
                  cursor: "pointer", userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!s.done}
                  onChange={() => onToggleSubtask && onToggleSubtask(task.id, s.id)}
                  style={{ marginTop: 2, cursor: "pointer", accentColor: "#1d4ed8", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: 12, lineHeight: 1.5,
                    color: s.done ? "#374151" : "#94a3b8",
                    textDecoration: s.done ? "line-through" : "none",
                  }}
                >
                  {s.title}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Status buttons */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statusOrder.map((s) => {
            const sm = STATUS_META[s];
            const isActive = task.status === s;
            return (
              <button
                key={s}
                onClick={() => onStatus(task.id, s)}
                style={{
                  fontSize: 11, padding: "4px 11px", borderRadius: 100,
                  border: `1px solid ${isActive ? sm.border : "#2a2a3e"}`,
                  background: isActive ? sm.bg : "transparent",
                  color: isActive ? sm.color : "#4b5563",
                  cursor: "pointer", transition: "all 0.15s",
                  fontWeight: isActive ? 600 : 400,
                  display: "flex", alignItems: "center", gap: 4,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#3a3a4e";
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#2a2a3e";
                    e.currentTarget.style.color = "#4b5563";
                  }
                }}
              >
                {sm.icon} {sm.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}