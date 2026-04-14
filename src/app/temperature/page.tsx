"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import Navbar from "@/src/components/common/Navbar";
import Sidebar from "@/src/components/common/Sidebar";
import { useWeatherData } from "@/src/hooks/useWeatherData";

Chart.register(...registerables);

export default function TemperaturePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const data = useWeatherData();

  useEffect(() => {
    if (!canvasRef.current || data.length == 0) return;

    const canvas = canvasRef.current;
    // this drwas my chart as flat graphics
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const lastData = data.slice(-24);

    const labels = lastData.map((item) =>
      new Date(item.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );

    const temps = lastData.map((item) => item.temperature);

    const CURRENT_IDX = temps.length;
    const AVG = temps.reduce((sum, val) => sum + val, 0) / temps.length;

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight || 400);
    grad.addColorStop(0, "rgba(251,146,60,0.22)");
    grad.addColorStop(0.6, "rgba(251,146,60,0.05)");
    grad.addColorStop(1, "rgba(251,146,60,0)");

    const pointColors = temps.map((_, i) =>
      i === CURRENT_IDX ? "#fff" : "transparent",
    );
    const pointBorderColors = temps.map((_, i) =>
      i === CURRENT_IDX ? "#fb923c" : "transparent",
    );
    const pointRadii = temps.map((_, i) => (i === CURRENT_IDX ? 5 : 0));
    const pointHoverRadii = temps.map((_, i) => (i === CURRENT_IDX ? 7 : 5));

    chartRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: temps,
            borderColor: "#964706",
            borderWidth: 2.5,
            backgroundColor: grad,
            fill: true,
            tension: 0.45,
            pointRadius: pointRadii,
            pointHoverRadius: pointHoverRadii,
            pointBackgroundColor: pointColors,
            pointBorderColor: pointBorderColors,
            pointBorderWidth: 2,
          },
          {
            data: temps.map(() => AVG),
            borderColor: "rgba(150, 71, 6, 0.18)",
            borderWidth: 1,
            borderDash: [4, 4],
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) =>
                item.datasetIndex === 0
                  ? `${Math.round(item.parsed.y ?? 0)}°C`
                  : "",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "rgba(255,255,255,0.4)" },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,0.4)",
              callback: (v) => v + "°",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  const latest = data[data.length - 1];
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 h-screen">
        <Navbar />
        <div className="flex-1 bg-[#111317] p-4 sm:p-6 lg:p-7 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-[18px] h-full">
         
            <div className="bg-[#13151a] border border-white/[0.06] rounded-[20px] p-[24px] flex flex-col justify-between w-full max-w-none lg:max-w-[400px] mx-0">
              <div>
                <p className="text-[11px] font-medium text-white/30 uppercase tracking-[1px] mb-[18px]">
                  Current temperature
                </p>
                <div className="flex items-start leading-none">
                  <span className="text-[96px] font-bold tracking-[-5px] text-white leading-none">
                    {latest?.temperature?.toFixed(1) ?? "--"}
                  </span>
                  <span className="text-[32px] font-light text-white/40 mt-[14px] ml-[2px]">
                    °C
                  </span>
                </div>
                <p className="text-[13px] text-white/35 mt-3 tracking-[0.2px]">
                  Rainy storm clouds
                </p>
              </div>

              <div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex flex-col">
                  {[
                    {
                      label: "Highest today",
                      value: data.length
                        ? Math.max(...data.map((d) => d.temperature)).toFixed(
                            1,
                          ) + "°C"
                        : "--",
                      color: "#964706",
                    },
                    {
                      label: "Lowest today",
                      value: data.length
                        ? Math.min(...data.map((d) => d.temperature)).toFixed(
                            1,
                          ) + "°C"
                        : "--",
                      color: "#005f52",
                    },
                    {
                      label: "Average",
                      value: data.length
                        ? (
                            data.reduce((sum, d) => sum + d.temperature, 0) /
                            data.length
                          ).toFixed(1) + "°C"
                        : "--",
                      color: "#036bda",
                    },
                  ].map((item) => (
                    <div key={item.label} className="py-3">
                      <p className="text-[11px] text-white/40 uppercase tracking-[0.5px]">
                        {item.label}
                      </p>
                      <p
                        className="text-[18px] font-semibold text-white mt-1"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          


            <div className="bg-[#13151a] border border-white/[0.06] rounded-[20px] p-[24px] flex flex-col w-full max-w-[900px] mx-auto lg:mx-0">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[13px] font-medium text-white/65">
                  Today's temperature curve
                </span>
                <span className="text-[11px] text-white/25">
                  April 13, 2026 · hourly
                </span>
              </div>
              <div className="flex-1 relative min-h-0">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="Hourly temperature curve for today, rising from 19°C at midnight to a peak of 33°C in the afternoon then cooling to 25°C"
                >
                  Hourly temperature: 19°C at midnight, rising to 33°C at 1pm,
                  then cooling to 25°C by midnight.
                </canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
