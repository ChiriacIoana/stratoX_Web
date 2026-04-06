type Props = {
  title: string;
  value: number;
  unit: string;
};

export default function StatCard({ title, value, unit }: Props) {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl shadow w-full">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-3xl font-bold">
        {value} {unit}
      </h2>
    </div>
  );
}