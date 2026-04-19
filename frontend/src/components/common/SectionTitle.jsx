export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 28,
        fontWeight: 800,
        marginBottom: 16,
        color: "#111827",
      }}
    >
      {children}
    </div>
  );
}