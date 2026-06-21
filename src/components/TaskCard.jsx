import { TYPE_META, STATUS_META } from "../constants/meta";

export default function TaskCard({ task, onStatus, onEdit, onDelete }) {
  const type = TYPE_META[task.type];
  const status = STATUS_META[task.status];
  const statusOrder = ["pending", "inprogress", "done"];
  const isDone = task.status === "done";

  return (
    <div
      style={{
        background: "#111118",
        border: "1px solid #1e1e2e",
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
        e.currentTarget.style.borderColor = "#1e1e2e";
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