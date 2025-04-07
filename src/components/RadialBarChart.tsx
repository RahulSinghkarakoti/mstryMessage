import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export type Sentiment = "Positive" | "Neutral" | "Negative";

export type RadialBarDataItem = {
  name: string;
  value: number;
  fill: string;
};

type RadialBarChartProps = {
  data: RadialBarDataItem[];
};

const getSentimentFromScore = (score: number) => {
  if (score >= 0.75) return "Positive";
  if (score >= 0.5) return "Neutral";
  if (score >= 0.25) return "Mixed";
  return "Negative";
};

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case "positive":
      return "😊";
    case "neutral":
      return "😐";
    case "mixed":
      return "🤔";
    case "negative":
      return "😠";
    default:
      return "❓";
  }
};

const RadialBarChartComponent: React.FC<RadialBarChartProps> = ({ data }) => {
  console.log(data);
  const chartData = data.filter((item) => item.name !== "Aggregate");
  const aggregateItem = data.find((item) => item.name === "Aggregate");
  const sentiment = aggregateItem
    ? getSentimentFromScore(aggregateItem.value)
    : "Unknown";
  const emoji = getSentimentEmoji(sentiment);

  return (
    <div className="w-full h-64 flex   gap-3 relative ">
      <div className="text-center  absolute top-9 left-2">
        <div className="text-4xl">{emoji}</div>
        <div className="text-sm mt-1">Aggregate</div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius="40%"
          outerRadius="180%"
          startAngle={180}
          endAngle={0}
          data={chartData}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background
            label={{ position: "insideStart", fill: "#fff" }}
          />
          <Tooltip />
          <Legend
            iconType="circle"
            layout="horizontal" // or "vertical"
            verticalAlign="bottom" // or "top" or "middle"
            align="center" // or "left"/"right"
            wrapperStyle={{ marginBottom: 160 }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialBarChartComponent;

// const colors = {
//     Positive: '#00C49F',
//     Neutral: '#FFBB28',
//     Negative: '#FF4C4C',
//   } as const;

//   type Sentiment = keyof typeof colors; // 'Positive' | 'Neutral' | 'Negative'

//   const sentiment_distribution: Record<Sentiment, number> = {
//     Positive: 5,
//     Neutral: 3,
//     Negative: 3,
//   };

//   const data = (Object.entries(sentiment_distribution) as [Sentiment, number][]).map(([key, value]) => ({
//     name: key,
//     value,
//     fill: colors[key], // ✅ Now it's safe!
//   }));
