// DotPlotChart.tsx

import React from 'react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface FeedbackScoreData {
  average_clarity_score: number;
  average_confidence_score: number;
  low_clarity_examples: string[]; // unused but typed
}

interface DotPlotChartProps {
  data: FeedbackScoreData;
}

const ClarityConfidenceDotPlot: React.FC<DotPlotChartProps> = ({ data }) => {
  console.log(data.average_clarity_score)
  const chartData = [
    { metric: 'Clarity', value: data.average_clarity_score },
    { metric: 'Confidence', value: data.average_confidence_score }
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid />
        <XAxis dataKey="metric" type="category" />
        <YAxis domain={[0, 2]} dataKey="value"  />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Scores" data={chartData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ClarityConfidenceDotPlot;
