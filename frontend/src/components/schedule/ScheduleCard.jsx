import { useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function ScheduleCard() {
  const [view, setView] = useState("gantt");

  const primaryButtonStyle = {
    border: "none",
    borderRadius: 10,
    background: "#2563eb",
    color: "#fff",
    padding: "10px 12px",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    minWidth: 72,
  };

  return (
    <Card style={{ minHeight: 470 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <SmallTab active={view === "gantt"} onClick={() => setView("gantt")}>
          ガント
        </SmallTab>
        <SmallTab active={view === "calendar"} onClick={() => setView("calendar")}>
          カレンダー
        </SmallTab>
      </div>

      {view === "gantt" ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 18,
                color: "#111827",
                whiteSpace: "nowrap",
              }}
            >
              3/29 〜 4/11
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={primaryButtonStyle}>前週</button>
              <button style={primaryButtonStyle}>今週</button>
              <button style={primaryButtonStyle}>次週</button>
            </div>
          </div>

          <SectionTitle>ガント（2週間）</SectionTitle>

          <div style={{ display: "grid", gap: 12 }}>
            {["123456", "112233", "112233"].map((name, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "88px 1fr",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  {name}
                </div>

                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: "#e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: index === 0 ? "88%" : index === 1 ? "70%" : "45%",
                      background: "#2563eb",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionTitle>カレンダー（月表示）</SectionTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8,
            }}
          >
            {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontWeight: 800,
                  padding: 8,
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                {day}
              </div>
            ))}

            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                style={{
                  minHeight: 72,
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: 8,
                  fontSize: 13,
                  color: "#374151",
                }}
              >
                {i + 1 <= 30 ? i + 1 : ""}
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}