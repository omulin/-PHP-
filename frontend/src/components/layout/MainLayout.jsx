export default function MainLayout({ left, top, center, right }) {
  const columnStyle = {
    minWidth: 0,
    display: "grid",
    gap: 12,
    alignItems: "start",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px minmax(0, 1fr) 280px",
        gap: 12,
        width: "100%",
        alignItems: "start",
      }}
    >
      <div style={columnStyle}>{left}</div>
      <div style={columnStyle}>
        {top}
        {center}
      </div>
      <div style={columnStyle}>{right}</div>
    </div>
  );
}