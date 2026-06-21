export default function MotivationPopup({ data }) {
  if (!data) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #111118, #1a1a28)",
          border: "1px solid #fbbf24",
          borderRadius: 20,
          padding: "28px 44px",
          textAlign: "center",
          boxShadow:
            "0 0 60px rgba(251,191,36,0.25), 0 24px 60px rgba(0,0,0,0.6)",
          animation: "popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards",
          maxWidth: 340,
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎊</div>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: "#fbbf24",
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {data.title}
        </h2>
        <p style={{ color: "#64748b", fontSize: 13 }}>{data.sub}</p>
      </div>
    </div>
  );
}