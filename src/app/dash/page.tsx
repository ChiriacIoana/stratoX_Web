/**  ce vreau sa fie aici
current weather
charts
predictions overview
device status ?
last data received: time
**/

"use client";
import Sidebar from "../../components/common/Sidebar";
import StatCard from "../../components/common/StatCard";

import TemperatureChart from "../../components/weather/TemperatureChart";
import HumidityChart from "../../components/weather/HumidityChart";
import AirQualityChart from "../../components/weather/AirQualityChart";
import Navbar from "@/src/components/common/Navbar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full bg-zinc-800 min-h-screen text-white">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard title="Temperature" value={24} unit="°C" />
            <StatCard title="Humidity" value={60} unit="%" />
            <StatCard title="Air Quality" value={110} unit="AQI" />
            <StatCard title="Pressure" value={1012} unit="hPa" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <TemperatureChart />
            <HumidityChart />
            <AirQualityChart />
          </div>
        </div>
      </div>
    </div>
  );
}
