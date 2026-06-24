export default function SearchBar({ query, setQuery }) {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: 12,
      }}
    >
      {/* Search Icon */}
      <span
        style={{
          position: "absolute",
          left: 13,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 14,
          pointerEvents: "none",
        }}
      >
        🔍
      </span>

      {/* Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          background: "#111118",
          border: "1px solid #2a2a3e",
          borderRadius: 12,
          padding: "10px 40px 10px 38px",
          fontSize: 13,
          color: "#e2e8f0",
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#60a5fa")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={() => setQuery("")}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: "#4b5563",
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
            padding: 2,
          }}
          title="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}