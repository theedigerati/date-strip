interface Props {
  key: number;
  weekDay: string;
  weekDate: number;
  isToday: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Day({
  weekDay,
  weekDate,
  isToday = false,
  isSelected,
  onSelect
}: Props) {
  const todayClass = isToday ? "is-today" : "";
  const selectedClass = isSelected ? "is-selected" : "";

  return (
    <div
      onClick={() => onSelect()}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <span
        style={{
          textTransform: "uppercase",
          fontSize: "0.65rem",
          marginBottom: 7,
          color: "rgba(0,0,0, .8)"
        }}
      >
        {weekDay}
      </span>
      <div
        className={["day", todayClass, selectedClass].join(" ")}
        style={{
          width: 33,
          height: 33,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            isToday && isSelected
              ? "rgb(0,105,255)"
              : isSelected
              ? "rgba(0, 105, 255, 0.15) "
              : "transparent",
          borderRadius: 25,
          marginTop: 3,
          position: "relative"
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            color:
              isToday && isSelected
                ? "#fff"
                : isToday || isSelected
                ? "rgb(0,105,255)"
                : "rgba(0, 0, 0, .4)",
            fontWeight: isSelected ? "bold" : "normal"
          }}
        >
          {weekDate}
        </span>
        {isToday && !isSelected && (
          <div style={{position: "absolute",
          bottom: -1,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          }}>
            <span
            style={{
              height: 4,
              width: 4,
              borderRadius: 3,
              backgroundColor: "rgb(0,105,255)"
            }}
          ></span>
          </div>
        )}
      </div>
    </div>
  );
}
