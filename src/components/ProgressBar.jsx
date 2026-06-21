export default function ProgressBar({ total, done }) {
  if (total === 0) return null;

  const progress = Math.round((done / total) * 100);

  return (
    <div
      style={{
        background: "#111118",
        border: "1px solid #1e1e2e",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 12, color: "#4b5563" }}>Overall Progress</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24" }}>
          {progress}%
        </span>
      </div>

      <div
        style={{
          height: 6,
          background: "#1e1e2e",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
            borderRadius: 6,
            transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
    </div>
  );
}