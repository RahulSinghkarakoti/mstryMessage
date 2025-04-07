import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export type RadialBarDataItem = {
  name: string;
  value: number;
  fill: string;
};


type RadialBarChartProps = {
  data: RadialBarDataItem[];
};

const RadialBarChartComponent: React.FC<RadialBarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={170} >
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius="40%"
          outerRadius="180%"
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background
            label={{ position: 'insideStart', fill: '#fff' }}
          />
          <Tooltip />
          <Legend
            iconType="circle"
            layout="horizontal"       // or "vertical"
            verticalAlign="bottom"   // or "top" or "middle"
            
            align="center"           // or "left"/"right"
            wrapperStyle={{ marginBottom:150 }}
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
