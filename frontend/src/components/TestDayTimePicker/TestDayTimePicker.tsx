import { ChangeEvent, useEffect, useState } from "react";
import styles from "./test.module.css";

interface DayData {
  day: string;
  startTime: string;
  endTime: string;
}
const WEEKEND_DAYS = ["sat", "sun"];
const WEEK_DAYS = ["mon", "tue", "wed", "thu", "fri"];

/**
 *
 * @description Used to create work time schedule for location, accepts onChange, and value prop for setting data
 *
 * **/

export const TestDayTimePicker = ({
  onChange,
  value,
}: {
  onChange?: (dayList: DayData[]) => void;
  value?: DayData[];
}) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [dayList, setDayList] = useState<DayData[]>(value ? value : []);

  function createDayArray(dayArray: string[]) {
    return dayArray.map((el) => {
      return {
        day: el,
        startTime,
        endTime,
      };
    });
  }

  function createDayList(day: string) {
    let createdItem;
    switch (day) {
      case "weekends": {
        createdItem = createDayArray(WEEKEND_DAYS);
        break;
      }
      case "weekdays": {
        createdItem = createDayArray(WEEK_DAYS);
        break;
      }
      default: {
        const newEntry = {
          day: day,
          startTime: startTime,
          endTime: endTime,
        };
        createdItem = [newEntry];
      }
    }

    // prije ovoga
    setDayList((prev) => {
      return [...prev, ...createdItem];
    });
  }

  function removeFromTheList(dayData: DayData) {
    setDayList((prev) => {
      return prev.filter((el) => el.day !== dayData.day);
    });
  }

  function isDayDisabled(day: string | string[]): boolean {
    if (Array.isArray(day)) {
      return day.some((d) => dayList.some((day) => day.day === d));
    }
    return dayList.some((el) => el.day === day);
  }

  const addToList = () => {
    createDayList(day);

    setDay("");
    setStartTime("");
    setEndTime("");
  };

  useEffect(() => {
    onChange?.(dayList);
  }, [dayList, onChange]);

  return (
    <div>
      <div>
        {/*Input area  */}
        <div className={styles.inputArea}>
          <select
            value={day}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setDay(e.target.value);
            }}
          >
            <option value="">Please select day</option>
            <option disabled={isDayDisabled("mon")} value="mon">
              Mon
            </option>
            <option disabled={isDayDisabled("tue")} value="tue">
              Tue
            </option>
            <option disabled={isDayDisabled("wed")} value="wed">
              Wed
            </option>
            <option disabled={isDayDisabled("thu")} value="thu">
              Thu
            </option>
            <option disabled={isDayDisabled("fri")} value="fri">
              Fri
            </option>
            <option disabled={isDayDisabled("sat")} value="sat">
              Sat
            </option>
            <option disabled={isDayDisabled("sun")} value="sun">
              Sun
            </option>
            <option value="weekends" disabled={isDayDisabled(WEEKEND_DAYS)}>
              Weekends
            </option>
            <option disabled={isDayDisabled(WEEK_DAYS)} value="weekdays">
              Weekdays
            </option>
          </select>

          {/* Time pickers */}
          <div>
            <input
              value={startTime}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setStartTime(e.target.value);
              }}
              type="time"
            />
            <input
              value={endTime}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEndTime(e.target.value);
              }}
              type="time"
            />
          </div>
          <button onClick={addToList}>➕</button>
        </div>

        {/* Display entryes area */}

        <ul>
          {dayList.map((el, idx) => {
            return (
              <li key={idx} className={styles.listItem}>
                <p>{el.day}</p>
                <p>{el.startTime}</p>
                <p>{el.endTime}</p>
                <button onClick={() => removeFromTheList(el)}>❌</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
