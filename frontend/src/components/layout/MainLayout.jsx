export default function MainLayout({
  leftTop,
  centerTop,
  rightTop,
  leftMiddle,
  centerMiddle,
  rightMiddle,
  bottom,
}) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 2fr 1fr",
          gap: 16,
        }}
      >
        {leftTop}
        {centerTop}
        {rightTop}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.9fr 2.2fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {leftMiddle}
        {centerMiddle}
        {rightMiddle}
      </div>

      {bottom}
    </div>
  );
}