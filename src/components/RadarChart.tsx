'use client';

import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer
} from 'recharts';

type EmotionData = {
  emotion: string;
  score: number;
};

type EmotionRadarProps = {
  data: EmotionData[];
};

const EmotionRadar = ({ data }:EmotionRadarProps) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="80%" height="100%">
      <RadarChart outerRadius={90} width={400} height={400} data={data} margin={{right:0, left:0}}>
        <PolarGrid />
        <PolarAngleAxis dataKey="emotion" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Tooltip />
        <Radar
          name="Emotion Intensity"
          dataKey="score"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionRadar;
