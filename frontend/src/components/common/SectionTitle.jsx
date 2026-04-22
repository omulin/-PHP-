export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 14,
        color: "#111827",
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  );
}