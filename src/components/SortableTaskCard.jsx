import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

export default function SortableTaskCard(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Drag handle — only this area is draggable */}
      <div
        {...listeners}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 16px 2px",
          cursor: isDragging ? "grabbing" : "grab",
          color: "#2a2a3e",
          fontSize: 13,
          userSelect: "none",
          letterSpacing: 2,
        }}
        title="Drag to reorder"
      >
        ⠿⠿
      </div>
      <TaskCard {...props} />
    </div>
  );
}