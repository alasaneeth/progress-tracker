import useTasks from "./hooks/useTasks";
import Confetti from "./components/Confetti";
import MotivationPopup from "./components/MotivationPopup";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import ProgressBar from "./components/ProgressBar";
import FilterTabs from "./components/FilterTabs";
import SearchBar from "./components/SearchBar";
import BoardView from "./components/BoardView";
import Modal from "./components/Modal";
import UndoToast from "./components/UndoToast";

export default function App() {
  const {
    tasks, filtered, total, done, inprogress, pending,
    confetti, motivation,
    showModal, form, setForm, editId,
    filterType,   setFilterType,
    filterStatus, setFilterStatus,
    searchQuery,  setSearchQuery,
    pendingDelete,
    openAdd, openEdit, closeModal,
    saveTask, updateStatus, deleteTask, undoDelete,
    handleDragEnd,
  } = useTasks();

  return (
    <>
      <Confetti active={confetti} />
      <MotivationPopup data={motivation} />

      <div style={{ minHeight: "100vh", background: "#0a0a10", padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
          <Header onAdd={openAdd} />
          <StatCards total={total} pending={pending} inprogress={inprogress} done={done} />
          <ProgressBar total={total} done={done} />
          <FilterTabs
            filterType={filterType}     setFilterType={setFilterType}
            filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          />
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <BoardView
            tasks={filtered}
            total={total}
            onDragEnd={handleDragEnd}
            onStatus={updateStatus}
            onEdit={openEdit}
            onDelete={deleteTask}
            onAdd={openAdd}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          form={form} setForm={setForm}
          onSave={saveTask} onClose={closeModal}
          isEdit={!!editId}
        />
      )}

      <UndoToast data={pendingDelete?.task} onUndo={undoDelete} />
    </>
  );
}