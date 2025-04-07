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

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const inside = height > 20;
  return (
    <text
      x={x + width / 2}
      y={inside ? y + height - 5 : y - 5}
      fill={inside ? "#fff" : "#333"}
      textAnchor="middle"
      fontSize={12}
    >
      {value}
    </text>
  );
};

const KeyTopicsChart = ({
  data,
}: {
  data: { topic: string; mentions: number }[];
}) => {
  return (
    <div className="w-full text-sm">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
        >
           <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" tick={false} axisLine={false} />
          <YAxis allowDecimals={false}  domain={[0, 20]}  />
          <Tooltip />
          <Bar dataKey="mentions" fill="#8884d8">
            
             <LabelList dataKey="topic" position="top"   fill="black"  />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeyTopicsChart;
