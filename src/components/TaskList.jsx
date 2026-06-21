import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";

export default function TaskList({
  filtered,
  total,
  onDragEnd,
  onStatus,
  onEdit,
  onDelete,
  onAdd,
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  if (filtered.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: "shimmer 2s infinite" }}>
          📋
        </div>
        <p
          style={{
            fontSize: 16, fontWeight: 600, color: "#374151",
            marginBottom: 6, fontFamily: "'DM Serif Display', serif",
          }}
        >
          No tasks found
        </p>
        <p style={{ fontSize: 13, color: "#1f2937" }}>
          {total === 0
            ? "Add your first task to get started! 🚀"
            : "No tasks match the selected filters."}
        </p>
        {total === 0 && (
          <button
            onClick={onAdd}
            style={{
              marginTop: 20, background: "#1d4ed8", color: "#fff",
              border: "none", borderRadius: 12, padding: "10px 22px",
              fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
          >
            + Add First Task
          </button>
        )}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={filtered.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {filtered.map((task) => (
          <SortableTaskCard
            key={task.id}
            task={task}
            onStatus={onStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}