"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type Props = {
  data: any[];
  valueKey: "temperature" | "humidity" | "air_quality";
  color: string;
  unit: string;
};

export default function MetricChart({ data, valueKey, color, unit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    chartRef.current?.destroy();

    const lastData = data.slice(-24);

    const labels = lastData.map((item) =>
      new Date(item.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const values = lastData.map((item) => item[valueKey]);

    const CURRENT_IDX = values.length - 1;

    const avg =
      values.reduce((sum, v) => sum + v, 0) / values.length;

    
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height || 400);
    grad.addColorStop(0, `${color}40`);
    grad.addColorStop(0.6, `${color}10`);
    grad.addColorStop(1, `${color}00`);

    
    const pointRadius = values.map((_, i) =>
      i === CURRENT_IDX ? 5 : 0
    );

    const pointHoverRadius = values.map((_, i) =>
      i === CURRENT_IDX ? 7 : 4
    );

    const pointBg = values.map((_, i) =>
      i === CURRENT_IDX ? "#fff" : "transparent"
    );

    const pointBorder = values.map((_, i) =>
      i === CURRENT_IDX ? color : "transparent"
    );

    chartRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: values,
            borderColor: color,
            borderWidth: 2.5,
            backgroundColor: grad,
            fill: true,
            tension: 0.45,
            pointRadius,
            pointHoverRadius,
            pointBackgroundColor: pointBg,
            pointBorderColor: pointBorder,
            pointBorderWidth: 2,
          },
          {
            data: values.map(() => avg),
            borderColor: `${color}33`,
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1c24",
            borderColor: `${color}55`,
            borderWidth: 1,
            titleColor: "rgba(255,255,255,0.4)",
            bodyColor: "#fff",
            padding: 10,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) =>
                `${Math.round(item.parsed.y ?? 0)}${unit}`,
              afterLabel: (item) =>
                item.dataIndex === CURRENT_IDX ? "now" : "",
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255,255,255,0.04)",
            },
            border: { display: false },
            ticks: {
              color: "rgba(255,255,255,0.3)",
              font: { size: 10 },
              maxTicksLimit: 10,
            },
          },
          y: {
            position: "right",
            grid: {
              color: "rgba(255,255,255,0.04)",
            },
            border: { display: false },
            ticks: {
              color: "rgba(255,255,255,0.3)",
              callback: (v) => v + unit,
              font: { size: 10 },
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data, valueKey, color, unit]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}