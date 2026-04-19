export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}