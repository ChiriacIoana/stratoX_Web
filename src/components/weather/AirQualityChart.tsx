"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fakeWeatherData } from "../../lib/fakeData";

export default function AirQualityChart() {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl shadow w-full h-80">
      <h2 className="mb-4 text-white">Air Quality</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={fakeWeatherData}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="air" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}