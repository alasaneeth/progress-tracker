# ⚡ TaskFlow

A bilingual (Tamil + English) personal task manager built with React. Organize daily, weekly, and monthly tasks with drag-and-drop reordering, search, due dates, and a satisfying celebration UX when tasks get done.

> உன் கனவை நினைவாக்கு • Make it happen

---

## ✨ Features

- **Task management** — create, edit, delete tasks with title, description, type, and status
- **Recurring task types** — Daily, Weekly, Monthly, each with automatic status reset when a new period begins
- **Drag-and-drop reordering** — reorder tasks via [@dnd-kit](https://dndkit.com/)
- **Search** — filter tasks instantly by title or description
- **Due dates** — optional due date per task with overdue / due-today / due-soon badges
- **Undo delete** — deleted tasks can be restored within a 5-second window
- **Celebration UX** — confetti animation + bilingual motivational popup on task completion
- **Type & status filters** — quickly narrow the task list
- **Persistent storage** — tasks are saved to `localStorage`, no backend required

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React (Vite) |
| Drag & Drop | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| Styling | Tailwind CSS + inline styles |
| Storage | Browser `localStorage` |
| Fonts | DM Serif Display, DM Sans, Syne, Space Mono |

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Root component — composition only
├── main.jsx                   # Entry point
├── index.css                  # Tailwind + global styles + keyframes
├── hooks/
│   └── useTasks.js            # All task state, CRUD, and business logic
├── constants/
│   └── meta.js                # Static config — types, statuses, motivational messages
├── utils/
│   └── resetHelpers.js        # Daily/weekly/monthly auto-reset logic
└── components/
    ├── Header.jsx              # App title + New Task button
    ├── StatCards.jsx           # Total / Pending / In Progress / Done counters
    ├── ProgressBar.jsx         # Overall completion progress
    ├── SearchBar.jsx           # Search input with clear button
    ├── FilterTabs.jsx          # Type and status filter pills
    ├── TaskList.jsx            # Drag-and-drop sortable task list
    ├── TaskCard.jsx            # Individual task card
    ├── SortableTaskCard.jsx    # Drag handle wrapper around TaskCard
    ├── Modal.jsx                # Add / Edit task form
    ├── Confetti.jsx             # Canvas confetti animation
    ├── MotivationPopup.jsx      # Celebration popup
    └── UndoToast.jsx            # Undo-delete toast notification
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

---

## 🌿 Git Workflow

This project follows a three-stage branching model:

```
feature/* or bugfix/* → develop → main
```

- **Feature/bugfix branches** — individual units of work, branched from `develop`
- **`develop`** — integration branch, all features merge here first
- **`main`** — production branch, deployed via Vercel

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new capability
fix(scope): correct a bug
refactor(scope): restructure code, no behavior change
chore(scope): tooling, cleanup, non-functional changes
release(vX.Y.Z): summary of what's shipping to main
```

---

## 🗺️ Roadmap

- [x] Drag-and-drop task reordering
- [x] Task ID collision fix (`crypto.randomUUID()`)
- [x] Component-level code split
- [x] Search tasks
- [x] Due dates with overdue indicators
- [x] Undo delete
- [ ] Board (Kanban) view — Pending / In Progress / Done columns with cross-column drag-to-update-status

---

## 📦 Data & Storage

All data is stored client-side in `localStorage` under the key `taskflow_v2`. No backend, no account, no sync across devices — your tasks live in your browser.

---

## 📄 License

Personal project — license to be decided.