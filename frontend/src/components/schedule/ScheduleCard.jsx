import { useMemo, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";
import SmallTab from "../common/SmallTab";

function parseDate(dateString) {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}

function getWeekdayLabel(date) {
  const labels = ["日", "月", "火", "水", "木", "金", "土"];
  return labels[date.getDay()];
}

function formatDateRange(start, end) {
  return `${formatDate(start)} 〜 ${formatDate(end)}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function startOfWeek(date) {
  const target = new Date(date);
  const day = target.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  target.setDate(target.getDate() + diff);
  target.setHours(0, 0, 0, 0);
  return target;
}

function endOfWeek(date) {
  return addDays(startOfWeek(date), 13);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getTaskBar(taskStart, taskEnd, rangeStart, rangeEnd) {
  const msPerDay = 1000 * 60 * 60 * 24;

  const start = taskStart < rangeStart ? rangeStart : taskStart;
  const end = taskEnd > rangeEnd ? rangeEnd : taskEnd;

  if (end < rangeStart || start > rangeEnd) return null;

  const offsetDays = Math.floor((start - rangeStart) / msPerDay);
  const durationDays = Math.floor((end - start) / msPerDay) + 1;
  const totalDays = Math.floor((rangeEnd - rangeStart) / msPerDay) + 1;

  return {
    left: `${(offsetDays / totalDays) * 100}%`,
    width: `${(durationDays / totalDays) * 100}%`,
  };
}

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

export default function ScheduleCard({ tasks = [] }) {
  const [view, setView] = useState("gantt");
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const datedTasks = useMemo(() => {
    return tasks
      .map((task) => {
        const start = parseDate(task.startDate);
        const end = parseDate(task.endDate);

        if (!start || !end) return null;

        return {
          ...task,
          start,
          end,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.start - b.start);
  }, [tasks]);

  const ganttStart = addDays(startOfWeek(today), weekOffset * 7);
  const ganttEnd = endOfWeek(ganttStart);

  const ganttDays = useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => addDays(ganttStart, index));
  }, [ganttStart]);

  const visibleGanttTasks = datedTasks.filter(
    (task) => task.end >= ganttStart && task.start <= ganttEnd
  );

  const currentMonthDate = addMonths(startOfMonth(today), monthOffset);
  const monthStart = startOfMonth(currentMonthDate);
  const firstGridDate = addDays(monthStart, -(monthStart.getDay() || 7) + 1);

  const calendarDays = Array.from({ length: 35 }).map((_, index) =>
    addDays(firstGridDate, index)
  );

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
              {formatDateRange(ganttStart, ganttEnd)}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setWeekOffset((prev) => prev - 1)}
                style={primaryButtonStyle}
              >
                前週
              </button>
              <button
                type="button"
                onClick={() => setWeekOffset(0)}
                style={primaryButtonStyle}
              >
                基準週
              </button>
              <button
                type="button"
                onClick={() => setWeekOffset((prev) => prev + 1)}
                style={primaryButtonStyle}
              >
                次週
              </button>
            </div>
          </div>

          <SectionTitle>ガント（2週間）</SectionTitle>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              gap: 12,
              alignItems: "end",
              marginBottom: 10,
            }}
          >
            <div />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(14, 1fr)",
                gap: 0,
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                overflow: "hidden",
                background: "#ffffff",
              }}
            >
              {ganttDays.map((date, index) => (
                <div
                  key={date.toISOString()}
                  style={{
                    padding: "8px 4px",
                    textAlign: "center",
                    borderRight: index === 13 ? "none" : "1px solid #e5e7eb",
                    background: isSameDay(date, today) ? "#dbeafe" : "#f8fafc",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.2,
                    }}
                  >
                    {formatDate(date)}
                  </div>
                  <div
                    style={{
                      marginTop: 2,
                      fontSize: 10,
                      color: "#6b7280",
                      lineHeight: 1.2,
                    }}
                  >
                    {getWeekdayLabel(date)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {visibleGanttTasks.length === 0 ? (
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                color: "#6b7280",
                fontSize: 14,
              }}
            >
              この期間に表示できるタスクはありません
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {visibleGanttTasks.map((task) => {
                const bar = getTaskBar(task.start, task.end, ganttStart, ganttEnd);

                return (
                  <div
                    key={task.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#374151",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={task.title}
                    >
                      {task.title}
                    </div>

                    <div
                      style={{
                        position: "relative",
                        height: 36,
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        overflow: "hidden",
                        background:
                          "repeating-linear-gradient(to right, #f8fafc 0%, #f8fafc calc(100% / 14 - 1px), #e5e7eb calc(100% / 14 - 1px), #e5e7eb calc(100% / 14))",
                      }}
                    >
                      {bar && (
                        <div
                          style={{
                            position: "absolute",
                            left: bar.left,
                            width: bar.width,
                            top: 8,
                            height: 20,
                            background: "#2563eb",
                            borderRadius: 999,
                          }}
                          title={`${task.title} (${task.startDate} 〜 ${task.endDate})`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
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
            <SectionTitle>
              {currentMonthDate.getFullYear()}年 {currentMonthDate.getMonth() + 1}月
            </SectionTitle>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setMonthOffset((prev) => prev - 1)}
                style={primaryButtonStyle}
              >
                前月
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset(0)}
                style={primaryButtonStyle}
              >
                基準月
              </button>
              <button
                type="button"
                onClick={() => setMonthOffset((prev) => prev + 1)}
                style={primaryButtonStyle}
              >
                次月
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8,
            }}
          >
            {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
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

            {calendarDays.map((date) => {
              const dayTasks = datedTasks.filter((task) =>
                isSameDay(task.end, date)
              );

              const isCurrentMonth = date.getMonth() === currentMonthDate.getMonth();
              const isToday = isSameDay(date, today);

              return (
                <div
                  key={date.toISOString()}
                  style={{
                    minHeight: 84,
                    background: isToday
                      ? "#dbeafe"
                      : isCurrentMonth
                      ? "#f8fafc"
                      : "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: 8,
                    fontSize: 12,
                    color: "#374151",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 6,
                      color: isCurrentMonth ? "#111827" : "#9ca3af",
                    }}
                  >
                    {date.getDate()}
                  </div>

                  <div style={{ display: "grid", gap: 4 }}>
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        style={{
                          background: "#ffffff",
                          color: "#1d4ed8",
                          borderRadius: 8,
                          padding: "4px 6px",
                          fontSize: 11,
                          fontWeight: 700,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}

                    {dayTasks.length > 2 && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6b7280",
                          fontWeight: 700,
                        }}
                      >
                        +{dayTasks.length - 2}件
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}