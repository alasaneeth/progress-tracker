import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import { MOTIVATIONS } from "./constants/meta";
import { applyAutoResets } from "./utils/resetHelpers";
import Confetti from "./components/Confetti";
import MotivationPopup from "./components/MotivationPopup";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import ProgressBar from "./components/ProgressBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

export default function App() {
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

  useEffect(() => {
    localStorage.setItem("taskflow_v2", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setTasks((prev) => applyAutoResets([...prev]));
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const celebrate = () => {
    const m = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
    setMotivation(m);
    setConfetti(true);
    setTimeout(() => { setConfetti(false); setMotivation(null); }, 4000);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id);
      const newIndex = prev.findIndex((t) => t.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const openAdd  = () => { setForm({ title: "", desc: "", type: "daily", status: "pending" }); setEditId(null); setShowModal(true); };
  const openEdit = (task) => { setForm({ title: task.title, desc: task.desc || "", type: task.type, status: task.status }); setEditId(task.id); setShowModal(true); };

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

  const filtered = tasks.filter((t) =>
    (filterType   === "all" || t.type   === filterType) &&
    (filterStatus === "all" || t.status === filterStatus)
  );

  const total      = tasks.length;
  const done       = tasks.filter((t) => t.status === "done").length;
  const inprogress = tasks.filter((t) => t.status === "inprogress").length;
  const pending    = tasks.filter((t) => t.status === "pending").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a10; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 4px; }
        select option { background: #111118; color: #e2e8f0; }
        @keyframes cardIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalIn { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:none; } }
        @keyframes popIn   { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        @keyframes shimmer { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      `}</style>

      <Confetti active={confetti} />
      <MotivationPopup data={motivation} />

      <div style={{ minHeight: "100vh", background: "#0a0a10", padding: "0 0 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 20px" }}>
          <Header onAdd={openAdd} />
          <StatCards total={total} pending={pending} inprogress={inprogress} done={done} />
          <ProgressBar total={total} done={done} />
          <FilterTabs
            filterType={filterType}   setFilterType={setFilterType}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <TaskList
              filtered={filtered}
              total={total}
              onDragEnd={handleDragEnd}
              onStatus={updateStatus}
              onEdit={openEdit}
              onDelete={deleteTask}
              onAdd={openAdd}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal form={form} setForm={setForm} onSave={saveTask} onClose={() => setShowModal(false)} isEdit={!!editId} />
      )}
    </>
  );
}