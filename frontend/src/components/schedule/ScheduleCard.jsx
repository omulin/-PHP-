import { useMemo, useState } from "react";
import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

const STATUS_LABELS = {
  TODO: "未入力",
  DOING: "進行中",
  DONE: "完了",
};

function getSafeTasks(tasks = []) {
  if (!Array.isArray(tasks)) return [];

  return tasks.filter((task) => task && typeof task === "object");
}

function toLocalDate(dateString) {
  if (!dateString) return null;

  const [year, month, day] = String(dateString).split("-").map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  return date;
}

function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

function getWeekStart(date) {
  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  const day = base.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  base.setDate(base.getDate() + diff);

  return base;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  next.setHours(0, 0, 0, 0);

  return next;
}

function getDaysFrom(startDate, count) {
  return Array.from({ length: count }, (_, index) => addDays(startDate, index));
}

function formatShortDate(date) {
  if (!date) return "-";

  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDayLabel(date) {
  const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

  return `${date.getMonth() + 1}/${date.getDate()} (${weekLabels[date.getDay()]})`;
}

function formatDateRange(startDate, endDate) {
  if (!startDate && !endDate) return "-";
  if (!startDate) return endDate;
  if (!endDate) return startDate;

  return `${startDate} 〜 ${endDate}`;
}

function getTaskDateInfo(task) {
  const start = toLocalDate(task.startDate);
  const end = toLocalDate(task.endDate);

  if (!start || !end) return null;

  return {
    start,
    end,
  };
}

function isTaskInRange(task, rangeStart, rangeEnd) {
  const dateInfo = getTaskDateInfo(task);

  if (!dateInfo) return false;

  return dateInfo.start <= rangeEnd && dateInfo.end >= rangeStart;
}

function getOffsetDays(baseDate, targetDate) {
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round((targetDate - baseDate) / oneDay);
}

function StatusBadge({ status }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 800,
        background:
          status === "DONE"
            ? "#dcfce7"
            : status === "DOING"
              ? "#dbeafe"
              : "#f3f4f6",
        color:
          status === "DONE"
            ? "#166534"
            : status === "DOING"
              ? "#1d4ed8"
              : "#374151",
        flexShrink: 0,
      }}
    >
      {STATUS_LABELS[status] || "未入力"}
    </span>
  );
}

function ToolbarButton({ active = false, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? "1px solid #2563eb" : "1px solid #d1d5db",
        background: active ? "#eff6ff" : "#ffffff",
        color: active ? "#1d4ed8" : "#374151",
        borderRadius: 999,
        padding: "7px 10px",
        fontSize: 12,
        fontWeight: 800,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function GanttRow({ task, timelineStart, timelineEnd, totalDays }) {
  const dateInfo = getTaskDateInfo(task);

  if (!dateInfo) {
    return (
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 13,
            color: "#111827",
          }}
        >
          {task.title || "無題のタスク"}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#ef4444",
            marginTop: 4,
          }}
        >
          日付が未設定です
        </div>
      </div>
    );
  }

  const clampedStart = dateInfo.start < timelineStart ? timelineStart : dateInfo.start;
  const clampedEnd = dateInfo.end > timelineEnd ? timelineEnd : dateInfo.end;

  const startOffset = Math.max(0, getOffsetDays(timelineStart, clampedStart));
  const endOffset = Math.min(
    totalDays - 1,
    getOffsetDays(timelineStart, clampedEnd)
  );

  const length = Math.max(1, endOffset - startOffset + 1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px minmax(0, 1fr)",
        gap: 10,
        alignItems: "center",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 10,
        background: "#ffffff",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            minWidth: 0,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 13,
              color: "#111827",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {task.title || "無題のタスク"}
          </div>
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#6b7280",
            marginBottom: 5,
          }}
        >
          {formatDateRange(task.startDate, task.endDate)}
        </div>

        <StatusBadge status={task.status} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalDays}, minmax(18px, 1fr))`,
          gap: 2,
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <div
          style={{
            gridColumn: `${startOffset + 1} / span ${length}`,
            height: 18,
            borderRadius: 999,
            background:
              task.status === "DONE"
                ? "#22c55e"
                : task.status === "DOING"
                  ? "#3b82f6"
                  : "#9ca3af",
          }}
          title={`${task.title}：${formatDateRange(task.startDate, task.endDate)}`}
        />
      </div>
    </div>
  );
}

function CalendarDay({ date, tasks }) {
  const today = getToday();
  const isToday = date.getTime() === today.getTime();

  const dayTasks = tasks.filter((task) => {
    const dateInfo = getTaskDateInfo(task);

    if (!dateInfo) return false;

    return dateInfo.start <= date && date <= dateInfo.end;
  });

  return (
    <div
      style={{
        border: isToday ? "2px solid #2563eb" : "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 10,
        background: isToday ? "#eff6ff" : "#ffffff",
        minHeight: 130,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          fontSize: 13,
          color: isToday ? "#1d4ed8" : "#111827",
          marginBottom: 8,
        }}
      >
        {formatDayLabel(date)}
      </div>

      {dayTasks.length === 0 ? (
        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
          }}
        >
          予定なし
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 6,
            maxHeight: 120,
            overflowY: "auto",
            paddingRight: 3,
          }}
        >
          {dayTasks.map((task) => (
            <div
              key={task.id}
              style={{
                borderRadius: 8,
                padding: "6px 7px",
                background:
                  task.status === "DONE"
                    ? "#dcfce7"
                    : task.status === "DOING"
                      ? "#dbeafe"
                      : "#f3f4f6",
                fontSize: 11,
                fontWeight: 800,
                color:
                  task.status === "DONE"
                    ? "#166534"
                    : task.status === "DOING"
                      ? "#1d4ed8"
                      : "#374151",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={task.title}
            >
              {task.title || "無題"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ScheduleCard({ tasks = [] }) {
  const [viewMode, setViewMode] = useState("gantt");
  const [weekStart, setWeekStart] = useState(() => getWeekStart(getToday()));

  const safeTasks = useMemo(() => getSafeTasks(tasks), [tasks]);

  const timelineDays = useMemo(() => getDaysFrom(weekStart, 14), [weekStart]);
  const calendarDays = useMemo(() => getDaysFrom(weekStart, 7), [weekStart]);

  const timelineStart = timelineDays[0];
  const timelineEnd = timelineDays[timelineDays.length - 1];
  const calendarEnd = calendarDays[calendarDays.length - 1];

  const visibleTasks = useMemo(() => {
    const rangeEnd = viewMode === "gantt" ? timelineEnd : calendarEnd;

    return safeTasks
      .filter((task) => task.startDate && task.endDate)
      .filter((task) => isTaskInRange(task, weekStart, rangeEnd))
      .sort((a, b) => {
        const aStart = toLocalDate(a.startDate);
        const bStart = toLocalDate(b.startDate);

        if (!aStart || !bStart) return 0;

        return aStart - bStart;
      });
  }, [safeTasks, weekStart, timelineEnd, calendarEnd, viewMode]);

  const handlePrevWeek = () => {
    setWeekStart((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart((prev) => addDays(prev, 7));
  };

  const handleCurrentWeek = () => {
    setWeekStart(getWeekStart(getToday()));
  };

  return (
    <Card>
      <SectionTitle>スケジュール</SectionTitle>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <ToolbarButton
          active={viewMode === "gantt"}
          onClick={() => setViewMode("gantt")}
        >
          ガント
        </ToolbarButton>

        <ToolbarButton
          active={viewMode === "calendar"}
          onClick={() => setViewMode("calendar")}
        >
          7日カレンダー
        </ToolbarButton>

        <div
          style={{
            width: 1,
            height: 24,
            background: "#e5e7eb",
            margin: "0 2px",
          }}
        />

        <ToolbarButton onClick={handlePrevWeek}>前週</ToolbarButton>
        <ToolbarButton onClick={handleCurrentWeek}>現在</ToolbarButton>
        <ToolbarButton onClick={handleNextWeek}>次週</ToolbarButton>

        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#6b7280",
            marginLeft: 2,
          }}
        >
          {formatShortDate(weekStart)} 〜{" "}
          {formatShortDate(viewMode === "gantt" ? timelineEnd : calendarEnd)}
          ・対象 {visibleTasks.length}件
        </div>
      </div>

      {visibleTasks.length === 0 ? (
        <div
          style={{
            fontSize: 13,
            color: "#6b7280",
            padding: "10px 0",
          }}
        >
          この期間に表示できるタスクはありません
        </div>
      ) : viewMode === "gantt" ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "160px minmax(0, 1fr)",
              gap: 10,
              alignItems: "center",
              marginBottom: 8,
              padding: "0 10px",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#6b7280",
              }}
            >
              タスク
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${timelineDays.length}, minmax(18px, 1fr))`,
                gap: 2,
                minWidth: 0,
              }}
            >
              {timelineDays.map((day) => (
                <div
                  key={day.toISOString()}
                  style={{
                    fontSize: 10,
                    color: "#6b7280",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatShortDate(day)}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 8,
              maxHeight: 380,
              overflowY: "auto",
              paddingRight: 4,
            }}
          >
            {visibleTasks.map((task) => (
              <GanttRow
                key={task.id}
                task={task}
                timelineStart={timelineStart}
                timelineEnd={timelineEnd}
                totalDays={timelineDays.length}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(140px, 1fr))",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {calendarDays.map((day) => (
            <CalendarDay key={day.toISOString()} date={day} tasks={visibleTasks} />
          ))}
        </div>
      )}
    </Card>
  );
}