import { useState } from "react";

export default function Modal({ form, setForm, onSave, onClose, isEdit }) {
  const [subtaskInput, setSubtaskInput] = useState("");
  const subtasks = form.subtasks || [];

  const addSubtask = () => {
    const title = subtaskInput.trim();
    if (!title) return;
    setForm((f) => ({
      ...f,
      subtasks: [...(f.subtasks || []), { id: crypto.randomUUID(), title, done: false }],
    }));
    setSubtaskInput("");
  };

  const removeSubtask = (id) => {
    setForm((f) => ({ ...f, subtasks: (f.subtasks || []).filter((s) => s.id !== id) }));
  };

  const toggleSubtaskDone = (id) => {
    setForm((f) => ({
      ...f,
      subtasks: (f.subtasks || []).map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    }));
  };

  const inputStyle = {
    width: "100%",
    background: "#0d0d14",
    border: "1px solid #2a2a3e",
    borderRadius: 10,
    padding: "10px 13px",
    fontSize: 13,
    color: "#e2e8f0",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "#4b5563",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 6,
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#111118",
          border: "1px solid #2a2a3e",
          borderRadius: 20,
          padding: "24px",
          width: "100%",
          maxWidth: 420,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: "modalIn 0.25s cubic-bezier(0.34,1.4,0.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 16, fontWeight: 700, color: "#e2e8f0",
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            {isEdit ? "✏️ Edit Task" : "✨ New Task"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent", border: "1px solid #2a2a3e",
              borderRadius: 8, width: 30, height: 30, color: "#4b5563",
              cursor: "pointer", fontSize: 16, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Title */}
        <label style={labelStyle}>Task Title</label>
        <input
          style={{ ...inputStyle, marginBottom: 14 }}
          placeholder="என்ன செய்ய வேண்டும்?"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && onSave()}
          onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
          onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
          autoFocus
        />

        {/* Description */}
        <label style={labelStyle}>
          Description{" "}
          <span style={{ color: "#374151", textTransform: "none", letterSpacing: 0 }}>
            (optional)
          </span>
        </label>
        <textarea
          style={{ ...inputStyle, resize: "none", marginBottom: 14 }}
          placeholder="கூடுதல் விவரங்கள்..."
          value={form.desc}
          onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
          onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
          onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
          rows={3}
        />

        {/* Type + Status */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          {[
            {
              label: "Task Type", key: "type",
              opts: [
                ["daily",   "📅 Daily"],
                ["weekly",  "📆 Weekly"],
                ["monthly", "🗓️ Monthly"],
              ],
            },
            {
              label: "Status", key: "status",
              opts: [
                ["pending",    "⏳ Pending"],
                ["inprogress", "⚡ In Progress"],
                ["done",       "✅ Done"],
              ],
            },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
              >
                {opts.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Due Date */}
        <label style={labelStyle}>
          Due Date{" "}
          <span style={{ color: "#374151", textTransform: "none", letterSpacing: 0 }}>
            (optional)
          </span>
        </label>
        <input
          type="date"
          style={{
            ...inputStyle,
            marginBottom: 22,
            colorScheme: "dark",
          }}
          value={form.dueDate || ""}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
          onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
          onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
        />

        {/* Subtasks */}
        <label style={labelStyle}>
          Subtasks{" "}
          <span style={{ color: "#374151", textTransform: "none", letterSpacing: 0 }}>
            (optional)
          </span>
        </label>

        {subtasks.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            {subtasks.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "#0d0d14", border: "1px solid #2a2a3e",
                  borderRadius: 8, padding: "7px 10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={s.done}
                  onChange={() => toggleSubtaskDone(s.id)}
                  style={{ cursor: "pointer", accentColor: "#1d4ed8" }}
                />
                <span
                  style={{
                    flex: 1, fontSize: 12.5,
                    color: s.done ? "#374151" : "#cbd5e1",
                    textDecoration: s.done ? "line-through" : "none",
                    wordBreak: "break-word",
                  }}
                >
                  {s.title}
                </span>
                <button
                  onClick={() => removeSubtask(s.id)}
                  title="Remove subtask"
                  style={{
                    background: "transparent", border: "none", color: "#4b5563",
                    cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 2,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
          <input
            style={inputStyle}
            placeholder="Add a subtask..."
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSubtask();
              }
            }}
            onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
          />
          <button
            onClick={addSubtask}
            style={{
              flexShrink: 0, background: "#1a1a2e", border: "1px solid #2a2a3e",
              borderRadius: 10, padding: "0 16px", fontSize: 13, fontWeight: 600,
              color: "#93c5fd", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Add
          </button>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex", gap: 10,
            position: "sticky", bottom: 0,
            background: "#111118",
            paddingTop: 6, paddingBottom: 4,
            marginTop: 4,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1, background: "transparent", border: "1px solid #2a2a3e",
              borderRadius: 10, padding: "10px", fontSize: 13,
              color: "#6b7280", cursor: "pointer", fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a2e")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{
              flex: 2, background: "#1d4ed8", border: "none",
              borderRadius: 10, padding: "10px", fontSize: 13,
              fontWeight: 600, color: "#fff", cursor: "pointer",
              fontFamily: "inherit", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
          >
            {isEdit ? "Update Task ✨" : "Add Task 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}