type Props = {
  data: any[];
  valueKey: "temperature" | "humidity" | "air_quality";
  unit: string;
  color: string;
  title: string;
};

function getAirQualityInfo(value: number) {
  if (value < 400) return { label: "Good", color: "#34d399" };
  if (value < 800) return { label: "Moderate", color: "#fbbf24" };
  return { label: "Poor", color: "#f87171" };
}

export default function MetricStatsCard({
  data,
  valueKey,
  unit,
  color,
  title,
}: Props) {
  const latest = data[data.length - 1];
  const value = latest?.[valueKey];

  // ✅ safer filtering
  const values = data
    .map((d) => d[valueKey])
    .filter((v) => v !== null && v !== undefined);

  // ✅ correct function usage
  const airInfo =
    valueKey === "air_quality" && value != null
      ? getAirQualityInfo(value)
      : null;

  const high = values.length ? Math.max(...values) : null;
  const low = values.length ? Math.min(...values) : null;
  const avg = values.length
    ? values.reduce((sum, v) => sum + v, 0) / values.length
    : null;

  return (
    <div className="bg-[#13151a] border border-white/[0.06] rounded-[20px] p-[24px] flex flex-col justify-between w-full max-w-none lg:max-w-[400px]">

      {/* ✅ Air quality label with color */}
      {airInfo && (
        <p
          className="text-[13px] font-medium mt-2"
          style={{ color: airInfo.color }}
        >
          {airInfo.label}
        </p>
      )}

      <div>
        <p className="text-[11px] font-medium text-white/30 uppercase tracking-[1px] mb-[18px]">
          Current {title.toLowerCase()}
        </p>

        <div className="flex items-start leading-none">
          <span className="text-[96px] font-bold tracking-[-5px] text-white leading-none">
            {value?.toFixed?.(1) ?? "--"}
          </span>

          <span className="text-[32px] font-light text-white/40 mt-[14px] ml-2">
            {unit}
          </span>
        </div>

        <p className="text-[13px] text-white/35 mt-3 tracking-[0.2px]">
          Live sensor data
        </p>
      </div>

      <div>
        <div className="h-px bg-white/[0.06]" />

        <div className="flex flex-col">
          {[
            {
              label: "Highest today",
              value: high ? `${high.toFixed(1)}${unit}` : "--",
              color,
            },
            {
              label: "Lowest today",
              value: low ? `${low.toFixed(1)}${unit}` : "--",
              color: "#2dd4bf",
            },
            {
              label: "Average",
              value: avg ? `${avg.toFixed(1)}${unit}` : "--",
              color: "#7eb8f7",
            },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={`flex items-center justify-between py-[14px] ${
                i < arr.length - 1 ? "border-b border-white/[0.05]" : ""
              }`}
            >
              <div className="flex items-center gap-[10px]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span className="text-[12px] text-white/[0.38]">
                  {item.label}
                </span>
              </div>

              <span
                className="text-[18px] font-semibold tracking-[-0.5px]"
                style={{ color: item.color }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}