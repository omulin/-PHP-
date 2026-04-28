export default function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 17,
        fontWeight: 800,
        marginBottom: 10,
        color: "#111827",
        lineHeight: 1.25,
      }}
    >
      {children}
    </div>
  );
}