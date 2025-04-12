import { TestDayTimePicker } from "../../components/TestDayTimePicker/TestDayTimePicker";

const TEST_DATA = [
  {
    day: "mon",
    startTime: "19:30",
    endTime: "19:30",
  },
  {
    day: "sat",
    startTime: "19:30",
    endTime: "20:31",
  },
  {
    day: "sun",
    startTime: "19:30",
    endTime: "20:31",
  },
];

export const Test = () => {
  return (
    <TestDayTimePicker
      value={TEST_DATA}
      onChange={(dayList) => console.log(dayList)}
    />
  );
};
