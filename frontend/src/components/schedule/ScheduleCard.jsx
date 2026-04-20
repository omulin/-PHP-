import { useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

export default function ScheduleCard() {
  const [view, setView] = useState("gantt");

  return (
    <Card style={{ minHeight: 470 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
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
              display: "grid",
              gridTemplateColumns: "140px 1fr 80px 80px",
              gap: 10,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 26 }}>3/29 〜 4/11</div>
            <button
              style={{
                border: "none",
                borderRadius: 12,
                background: "#4f8fe7",
                color: "#fff",
                padding: "14px 16px",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              前週
            </button>
            <button
              style={{
                border: "none",
                borderRadius: 12,
                background: "#4f8fe7",
                color: "#fff",
                padding: "14px 16px",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              今週
            </button>
            <button
              style={{
                border: "none",
                borderRadius: 12,
                background: "#4f8fe7",
                color: "#fff",
                padding: "14px 16px",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              次週
            </button>
          </div>

          <SectionTitle>ガント（2週間）</SectionTitle>

          <div style={{ display: "grid", gap: 14 }}>
            {["123456", "112233", "112233"].map((name, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 18 }}>{name}</div>
                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background:
                      index === 2
                        ? "linear-gradient(90deg, #4f8fe7 0%, #4f8fe7 45%, transparent 45%)"
                        : "linear-gradient(90deg, transparent 10%, #4f8fe7 10%)",
                  }}
                />
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
                  borderRadius: 10,
                  padding: 8,
                  fontSize: 14,
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