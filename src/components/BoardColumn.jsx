import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";
import { STATUS_META } from "../constants/meta";

export default function BoardColumn({ status, tasks, onStatus, onEdit, onDelete }) {
  const meta = STATUS_META[status];
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        background: "#0d0d14",
        border: `1px solid ${isOver ? meta.border : "#1e1e2e"}`,
        borderRadius: 16,
        padding: 12,
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      {/* Column Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 6px 12px",
          borderBottom: "1px solid #1e1e2e",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 15 }}>{meta.icon}</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: meta.color,
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          {meta.label}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 600,
            color: "#4b5563",
            background: "#111118",
            border: "1px solid #2a2a3e",
            borderRadius: 100,
            padding: "2px 9px",
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 80,
          background: isOver ? meta.bg : "transparent",
          borderRadius: 10,
          transition: "background 0.15s",
          padding: isOver ? 4 : 0,
        }}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div
              style={{
                fontSize: 11,
                color: "#374151",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              No tasks
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                onStatus={onStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}