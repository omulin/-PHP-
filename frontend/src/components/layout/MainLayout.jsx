export default function MainLayout({
  leftTop,
  centerTop,
  rightTop,
  toolbar,
  leftMiddle,
  centerMiddle,
  rightMiddle,
  bottom,
}) {
  const cellStyle = {
    minWidth: 0,
    width: "100%",
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1.05fr) minmax(0, 2fr) minmax(0, 1fr)",
          gap: 12,
          alignItems: "start",
          width: "100%",
        }}
      >
        <div style={cellStyle}>{leftTop}</div>
        <div style={cellStyle}>{centerTop}</div>
        <div style={cellStyle}>{rightTop}</div>
      </div>

      {toolbar && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.05fr) minmax(0, 2fr) minmax(0, 1fr)",
            gap: 12,
            alignItems: "start",
            width: "100%",
          }}
        >
          <div />
          <div style={{ ...cellStyle, gridColumn: "2 / 4" }}>{toolbar}</div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) minmax(0, 1.9fr) minmax(0, 2.2fr)",
          gap: 12,
          alignItems: "start",
          width: "100%",
        }}
      >
        <div style={cellStyle}>{leftMiddle}</div>
        <div style={cellStyle}>{centerMiddle}</div>
        <div style={cellStyle}>{rightMiddle}</div>
      </div>

      <div style={{ minWidth: 0, width: "100%" }}>{bottom}</div>
    </div>
  );
}