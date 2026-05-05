import Card from "../common/Card";

export default function SearchFilterBar({
  searchText,
  onSearchTextChange,
  statusFilter,
  onStatusFilterChange,
  sortType,
  onSortTypeChange,
  resultCount,
}) {
  const inputStyle = {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    padding: "10px 10px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 13,
    background: "#ffffff",
    color: "#111827",
  };

  const handleClearConditions = () => {
    onSearchTextChange("");
    onStatusFilterChange("ALL");
    onSortTypeChange("latest");
  };

  return (
    <Card style={{ padding: 12 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) 170px 170px auto",
            gap: 8,
            alignItems: "center",
          }}
        >
          <input
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="検索（タスク名 / ラベル / 担当者 / 日付）"
            style={inputStyle}
          />

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            style={inputStyle}
          >
            <option value="ALL">全ステータス</option>
            <option value="TODO">未入力のみ</option>
            <option value="DOING">進行中のみ</option>
            <option value="DONE">完了のみ</option>
          </select>

          <select
            value={sortType}
            onChange={(e) => onSortTypeChange(e.target.value)}
            style={inputStyle}
          >
            <option value="latest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="deadlineAsc">期限が近い順</option>
            <option value="deadlineDesc">期限が遠い順</option>
            <option value="titleAsc">タイトル順</option>
          </select>

          <button
            type="button"
            onClick={handleClearConditions}
            style={{
              border: "1px solid #d1d5db",
              background: "#ffffff",
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              color: "#374151",
            }}
          >
            条件クリア
          </button>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280" }}>
          表示件数: {resultCount}件
        </div>
      </div>
    </Card>
  );
}