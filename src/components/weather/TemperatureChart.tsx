"use client";

import BaseChart from "../common/BaseChart";
import { useWeatherData } from "../../hooks/useWeatherData";

export default function TemperatureChart() {
  const data = useWeatherData();
  return (
    <BaseChart
      title="Temperature"
      data={data}
      dataKey="temperature"
      color="#964706"
      badgeLabel="24 hr"
    />
  );
}