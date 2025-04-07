import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TypeScript interfaces to define our data structure
interface SentimentData {
  sentiment_distribution: {
    Positive?: number;
    Negative?: number;
    Mixed?: number;
    [key: string]: number | undefined;
  };
  overall_sentiment: {
    label: string;
    score: number;
  };
}

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
  outerRadius: number;
  isEmpty?: boolean;
}

const SentimentRadialChart: React.FC<{ data?: SentimentData }> = ({ data }) => {
  // Use provided data or fall back to default
  const sentimentData = data;

  // Define sentiment colors
  const sentimentColors: Record<string, string> = {
    Positive: "#4caf50",
    Negative: "#f44336",
    Mixed: "#ff9800",
  };

  // Define all expected sentiment categories
  const expectedCategories = ["Positive", "Negative", "Mixed"];

  // Transform the data for the RadialBarChart
  const chartData: ChartDataItem[] = expectedCategories.map(
    (category, index) => {
      const value = sentimentData?.sentiment_distribution[category];
      const isEmpty = value === undefined;

      return {
        name: category,
        value: isEmpty ? 1 : value!, // Use 1 as placeholder value for empty categories
        fill: isEmpty ? "#e0e0e0" : sentimentColors[category] || "#999999",
        outerRadius: 80 + index * 20,
        isEmpty, // Flag to identify placeholder entries
      };
    }
  );

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-1 text-center">
        Sentiment Distribution
      </h3>
      <p className="text-center mb-1">
        Overall Sentiment:{" "}
        <span className="font-bold">
          {sentimentData?.overall_sentiment.label}
        </span>
        <span className="ml-2">
          ({((sentimentData?.overall_sentiment.score ?? 0) * 100).toFixed(0)}%)
        </span>
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <RadialBarChart
          innerRadius="20%"
          outerRadius="90%"
          data={chartData}
          startAngle={180}
          endAngle={0}
          margin={{ top: 0, right: 30, bottom: 0, left: 0 }}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={5}
          />

       
          <Legend
            iconSize={10}
            layout="horizontal" // Changed from "vertical" to "horizontal"
            verticalAlign="bottom" // Changed from "middle" to "bottom"
            align="center" // Changed from "right" to "center"
            wrapperStyle={{ paddingTop: "20px" }} // Changed from paddingLeft to paddingTop
            formatter={(value, entry) => {
            //   const { isEmpty } = entry.payload  ;
              return (
                <span
                  style={{
                    color:  "#333",
                    fontStyle:  "normal",
                  }}
                >
                  {value} 
                </span>
              );
            }}
          />
             <Tooltip
            formatter={(value: number, name: string, props: any) => {
              const { isEmpty } = props.payload;
              return isEmpty
                ? [`No data available`, name]
                : [`${value} items`, name];
            }}
            labelFormatter={() => ""}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentRadialChart;
