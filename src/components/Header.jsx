export default function Header({ onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: "#f1f5f9",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          ⚡ TaskFlow
        </h1>
        <p style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>
          உன் கனவை நினைவாக்கு • Make it happen
        </p>
      </div>

      <button
        onClick={onAdd}
        style={{
          background: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "inherit",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#2563eb";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#1d4ed8";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Task
      </button>
    </div>
  );
}