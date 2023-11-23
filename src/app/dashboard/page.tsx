"use client"
import { useState } from 'react';

export default function Dashboard() {
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()
  const formattedNowMonth = `${nowYear}-${(nowMonth + 1).toString().padStart(2, '0')}`;
  //const formattedNowDate = `${nowYear}-${(nowMonth + 1).toString().padStart(2, '0')}-${nowDate.toString().padStart(2, '0')}`;

  // ステートとして選択した年と月を管理
  const [selectedYearMonth, setSelectedYearMonth] = useState(formattedNowMonth);

  // ステートとして開始時間、終了時間、休憩開始時間、休憩終了時間を管理
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(30);
  const [endHour, setEndHour] = useState(18);
  const [endMinute, setEndMinute] = useState(30);
  const [breakStartHour, setBreakStartHour] = useState(12);
  const [breakStartMinute, setBreakStartMinute] = useState(0);
  const [breakEndHour, setBreakEndHour] = useState(13);
  const [breakEndMinute, setBreakEndMinute] = useState(0);

  //開始時間、終了時間、休憩開始時間、休憩終了時間を定義
  const startTime = new Date(nowYear, nowMonth, nowDate, startHour, startMinute, 0)  //9:30
  const endTime =  new Date(nowYear, nowMonth, nowDate, endHour, endMinute, 0)  //18:30
  const leaveEarlyTime =  new Date(nowYear, nowMonth, nowDate, 16, 0, 0)  //16:00
  const breakStartTime = new Date(nowYear, nowMonth, nowDate, breakStartHour, breakStartMinute, 0) //12:00
  const breakEndTime = new Date(nowYear, nowMonth, nowDate, breakEndHour, breakEndMinute, 0) //13:00

  // ミリ秒をhh:mm形式に変換するヘルパー関数
  const convertMsToHHMM = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  // 時（hh）と分（mm）を取得し、文字列として整形するヘルパー関数
  const formatHHMM = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // カレンダーの日付と曜日を計算するヘルパー関数
  const getCalendarDates = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const dates = [];
    const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

    for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = dayLabels[date.getDay()];
      dates.push({ date: date.getDate(), dayOfWeek });
    }

    return dates;
  };

  // 選択した年と月に対応するカレンダーの日付と曜日を取得
  const calendarDates = getCalendarDates(
    parseInt(selectedYearMonth.split('-')[0]),
    parseInt(selectedYearMonth.split('-')[1]) - 1
  );

  const getStartTime01 = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return ",";
    } else {
      return formatHHMM(startTime) + ",";
    }
  };

  const getEndTime01 = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "";
    } else {
      return formatHHMM(breakStartTime);
    }
  };

  //この関数は未使用
  const getTotalTime01 = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "0:00";
    } else {
      return convertMsToHHMM(breakStartTime.getTime() - startTime.getTime());
    }
  };

  const newline = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "";
    } else {
      return <br />;
    }
  };

  const getStartTime02 = (date: number, dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "";
    } else {
      return `${date},${dayOfWeek},${formatHHMM(breakEndTime)},`;
    }
  };

  const getEndTime02 = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "";
    } else if(dayOfWeek === "月" || dayOfWeek === "水" || dayOfWeek === "金") {
      return formatHHMM(leaveEarlyTime);
    } else {
      return formatHHMM(endTime);
    }
  };

  //この関数は未使用
  const getTotalTime02 = (dayOfWeek: string) => {
    if (dayOfWeek === "土" || dayOfWeek === "日") {
      return "";
    } else if(dayOfWeek === "月" || dayOfWeek === "水" || dayOfWeek === "金") {
      return convertMsToHHMM(leaveEarlyTime.getTime() - breakEndTime.getTime());
    } else {
      return convertMsToHHMM(endTime.getTime() - breakEndTime.getTime());
    }
  };

  return (
    <div className="m-3">
      <div>Dashboard</div>
      {/* 対象年月を選択 */}
      <input type="month" value={selectedYearMonth} onChange={(e) => setSelectedYearMonth(e.target.value)} />

      <hr className="my-2" />

      <div>
        {/* 開始時間を入力 */}
        <label htmlFor="startTime">開始時間：</label>
        <input value={startHour} onChange={(e) => setStartHour(Number(e.target.value))} size={1}></input>      
        <input value={startMinute} onChange={(e) => setStartMinute(Number(e.target.value))} size={1}></input>      
      </div>
      <div>
        {/* 終了時間を入力 */}
        <label htmlFor="endTime">終了時間：</label>
        <input value={endHour} onChange={(e) => setEndHour(Number(e.target.value))} size={1}></input>      
        <input value={endMinute} onChange={(e) => setEndMinute(Number(e.target.value))} size={1}></input>      
      </div>
      <div>
        {/* 休憩開始時間を入力 */}
        <label htmlFor="breakStartTime">休憩開始時間：</label>
        <input value={breakStartHour} onChange={(e) => setBreakStartHour(Number(e.target.value))} size={1}></input>      
        <input value={breakStartMinute} onChange={(e) => setBreakStartMinute(Number(e.target.value))} size={1}></input>      
      </div>
      <div>
        {/* 休憩終了時間を入力 */}
        <label htmlFor="breakEndTime">休憩終了時間：</label>
        <input value={breakEndHour} onChange={(e) => setBreakEndHour(Number(e.target.value))} size={1}></input>      
        <input value={breakEndMinute} onChange={(e) => setBreakEndMinute(Number(e.target.value))} size={1}></input>      
      </div>
      
      <hr className="my-2" />
      
      <div>
        {calendarDates.map((item) => (
          <div key={item.date}>
            {item.date},
            {item.dayOfWeek},
            {getStartTime01(item.dayOfWeek)}
            {getEndTime01(item.dayOfWeek)}
            {newline(item.dayOfWeek)}
            {getStartTime02(item.date, item.dayOfWeek)}
            {getEndTime02(item.dayOfWeek)}
          </div>
        ))}
      </div>
    </div>
  );
}