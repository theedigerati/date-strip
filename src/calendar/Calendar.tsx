import React, { useEffect, useState, useRef, useCallback } from "react";
import { default as dayjs } from "dayjs";
import Caret from "./Caret";
import Day from "./Day";
import ContentBlur from "./ContentBlur";
import useDays from "../hooks/useDays";

const Calendar = () => {
  // console.log("rendered")
  const days = useDays();
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(dayjs());
  const [dayFormat, setDayFormat] = useState<string>("ddd");
  const [leftScroll, setLeftScroll] = useState<boolean>(false);
  const [rightScroll, setRightScroll] = useState<boolean>(false);
  const daysContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollEvent = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const daysContainer = event.currentTarget;
      if (daysContainer.scrollLeft < daysContainer.scrollWidth) {
        setRightScroll(true);
      }
      if (
        daysContainer.scrollLeft ===
        daysContainer.scrollWidth - daysContainer.clientWidth
      ) {
        setRightScroll(false);
      }

      if (daysContainer.scrollLeft > 0) {
        setLeftScroll(true);
      } else {
        setLeftScroll(false);
      }
    },
    []
  );

  const handleNavScroll = useCallback((position: "left" | "right") => {
    if (daysContainerRef.current != null) {
      const daysContainer = daysContainerRef.current;
      if (position === "right") {
        const scrollDiff =
          daysContainer.scrollWidth - daysContainer.clientWidth;
        daysContainer.scrollTo({ left: scrollDiff });
      } else {
        daysContainer.scrollTo({ left: 0 });
      }
    }
  }, []);

  useEffect(() => {
    if (daysContainerRef.current != null) {
      const daysContainer = daysContainerRef.current;
      if (daysContainer.scrollWidth > daysContainer.clientWidth) {
        setRightScroll(true);
      } else {
        setRightScroll(false);
      }

      if (dayjs().day() > 3) {
        daysContainer.scrollLeft = daysContainer.scrollWidth;
      }
    }
  }, [dayFormat]);

  const daysRow = days.map((day) => {
    return (
      <Day
        key={day.day()}
        weekDay={day.format(dayFormat)}
        weekDate={day.date()}
        isToday={day.date() === dayjs().date()}
        isSelected={day.date() === selectedDay.date()}
        onSelect={() => setSelectedDay(day)}
      />
    );
  });

  return (
    <div style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
      <Caret
        onClick={() => handleNavScroll("left")}
        position="left"
        disabled={!leftScroll}
      />

      <div>
        <div style={{ textAlign: "center" }}>
          <span>{selectedDay.format(dayFormat + " DD, ")}</span>
          <span style={{ color: "rgba(0,0,0, .5)" }}>
            {selectedDay.format("MMM YYYY")}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          {leftScroll && <ContentBlur position="left" />}

          <div
            ref={daysContainerRef}
            className="days-container"
            style={{
              marginTop: 20,
              display: "flex",
              gridGap: 13
            }}
            onScroll={handleScrollEvent}
          >
            {daysRow}
          </div>
          {rightScroll && <ContentBlur position="right" />}
        </div>

        <div style={{ padding: "5px 7px", marginTop: 15, textAlign: "right" }}>
          <span style={{ fontSize: "0.8rem", color: "rgba(0,0,0, .65" }}>
            day format :{" "}
          </span>
          <select
            style={{
              width: dayFormat === "dddd" ? 135 : 80,
              border: 0,
              backgroundColor: "transparent",
              fontSize: "0.8rem",
              padding: "5px 0",
              borderRadius: 3,
              textDecoration: "underline",
              cursor: "pointer",
              color: "rgb(0,0,0)"
            }}
            defaultValue="ddd"
            onChange={(event) => {
              setDayFormat(event.target.value);
            }}
          >
            <option value="dd">Su - Sa</option>
            <option value="ddd">Sun - Sat</option>
            <option value="dddd">Sunday - Saturday</option>
          </select>
        </div>
      </div>

      <Caret
        position="right"
        onClick={() => handleNavScroll("right")}
        disabled={!rightScroll}
      />
    </div>
  );
};

export default Calendar;
