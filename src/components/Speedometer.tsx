import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// TypeScript interfaces to define our data structure
interface SentimentData {
  sentiment_distribution: {
    Positive: number;
    Negative: number;
    Mixed: number;
    [key: string]: number; // Allow for additional sentiment categories
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
}

const SentimentRadialChart: React.FC<{ data?: SentimentData }> = ({ data }) => {
  // Default data if none provided
  const defaultData: SentimentData = {
    sentiment_distribution: {
      Positive: 4,
      Negative: 2,
      Mixed: 3
    },
    overall_sentiment: {
      label: 'Mixed',
      score: 0.63
    }
  };

  // Use provided data or fall back to default
  const sentimentData = data || defaultData;

  // Define sentiment colors
  const sentimentColors: Record<string, string> = {
    Positive: '#4caf50',
    Negative: '#f44336',
    Mixed: '#ff9800'
  };

  // Transform the data for the RadialBarChart
  const chartData: ChartDataItem[] = Object.entries(sentimentData.sentiment_distribution).map(
    ([name, value], index) => ({
      name,
      value,
      fill: sentimentColors[name] || `#${Math.floor(Math.random()*16777215).toString(16)}`,
      outerRadius: 80 + index * 20
    })
  );

  return (
    <div className="w-full">
     
      
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
            label={{ position: 'insideStart', fill: '#fff', fontWeight: 'bold' }}
          />
         
          <Tooltip 
            formatter={(value: number, name: string) => [`${value} items`, name]}
            labelFormatter={() => ''}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentRadialChart;