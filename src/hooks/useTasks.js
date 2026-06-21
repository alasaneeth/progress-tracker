import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { MOTIVATIONS } from "../constants/meta";
import { applyAutoResets } from "../utils/resetHelpers";

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("taskflow_v2") || "[]");
      return applyAutoResets(saved);
    } catch { return []; }
  });

  const [filterType,   setFilterType]   = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal,    setShowModal]    = useState(false);
  const [editId,       setEditId]       = useState(null);
  const [confetti,     setConfetti]     = useState(false);
  const [motivation,   setMotivation]   = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", type: "daily", status: "pending" });

  /* ── Persist to localStorage ── */
  useEffect(() => {
    localStorage.setItem("taskflow_v2", JSON.stringify(tasks));
  }, [tasks]);

  /* ── Auto reset on tab visible ── */
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setTasks((prev) => applyAutoResets([...prev]));
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  /* ── Celebrate ── */
  const celebrate = () => {
    const m = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
    setMotivation(m);
    setConfetti(true);
    setTimeout(() => { setConfetti(false); setMotivation(null); }, 4000);
  };

  /* ── Drag & Drop ── */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id);
      const newIndex = prev.findIndex((t) => t.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  /* ── Modal ── */
  const openAdd = () => {
    setForm({ title: "", desc: "", type: "daily", status: "pending" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (task) => {
    setForm({ title: task.title, desc: task.desc || "", type: task.type, status: task.status });
    setEditId(task.id);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  /* ── CRUD ── */
  const saveTask = () => {
    if (!form.title.trim()) return;
    if (editId) {
      const old = tasks.find((t) => t.id === editId);
      setTasks((p) => p.map((t) => t.id === editId ? { ...t, ...form } : t));
      if (old?.status !== "done" && form.status === "done") celebrate();
    } else {
      setTasks((p) => [{ id: crypto.randomUUID(), ...form, createdAt: new Date().toISOString() }, ...p]);
      if (form.status === "done") celebrate();
    }
    setShowModal(false);
  };

  const updateStatus = (id, status) => {
    const old = tasks.find((t) => t.id === id);
    setTasks((p) => p.map((t) => t.id === id ? { ...t, status } : t));
    if (old?.status !== "done" && status === "done") celebrate();
  };

  const deleteTask = (id) => setTasks((p) => p.filter((t) => t.id !== id));

  /* ── Derived stats ── */
  const filtered = tasks.filter((t) =>
    (filterType   === "all" || t.type   === filterType) &&
    (filterStatus === "all" || t.status === filterStatus)
  );

  const total      = tasks.length;
  const done       = tasks.filter((t) => t.status === "done").length;
  const inprogress = tasks.filter((t) => t.status === "inprogress").length;
  const pending    = tasks.filter((t) => t.status === "pending").length;

  return {
    /* state */
    filtered, total, done, inprogress, pending,
    confetti, motivation,
    showModal, form, setForm, editId,
    filterType, setFilterType,
    filterStatus, setFilterStatus,
    /* actions */
    openAdd, openEdit, closeModal,
    saveTask, updateStatus, deleteTask,
    handleDragEnd,
  };
}