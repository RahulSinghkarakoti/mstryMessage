import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import CustomBarLabel from "./CustomBarLabel";

const KeyTopicsChart = ({
  data,
}: {
  data: { topic: string; mentions: number }[];
}) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}  margin={{ top: 0, right: 20, left: 20, bottom: 150 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="topic"
            tick={{ angle: -90, textAnchor: "end" } as any}
            interval={0}
          />
          {/* Hide axis labels since they're inside bars */}
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="mentions"
            fill="#8884d8"
            label={<CustomBarLabel />} // 👈 Here!
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeyTopicsChart;
