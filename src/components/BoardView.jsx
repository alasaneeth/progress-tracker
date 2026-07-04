import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import BoardColumn from "./BoardColumn";
import TaskCard from "./TaskCard";

const STATUSES = ["pending", "inprogress", "done"];

export default function BoardView({
  tasks,
  total,
  onDragEnd,
  onStatus,
  onEdit,
  onDelete,
  onAdd,
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
    onDragEnd(event);
  };

  const handleDragCancel = () => setActiveTask(null);

  if (total === 0) {
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
          No tasks yet
        </p>
        <p style={{ fontSize: 13, color: "#1f2937", marginBottom: 20 }}>
          Add your first task to get started! 🚀
        </p>
        <button
          onClick={onAdd}
          style={{
            background: "#1d4ed8", color: "#fff", border: "none",
            borderRadius: 12, padding: "10px 22px", fontSize: 13,
            fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
        >
          + Add First Task
        </button>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {/* 3 Columns */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {STATUSES.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onStatus={onStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Drag Overlay — card follows cursor */}
      <DragOverlay>
        {activeTask ? (
          <div style={{ opacity: 0.9, transform: "rotate(1.5deg)", pointerEvents: "none" }}>
            <TaskCard
              task={activeTask}
              onStatus={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}