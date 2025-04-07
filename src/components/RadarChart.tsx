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

const renderInsideTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
  const RADIAN = Math.PI / 180;
  const radiusOffset = 20; // adjust how close to center you want
  const angle = -payload.coordinate * RADIAN;
  const newX = cx + (x - cx) * 0.6;
  const newY = cy + (y - cy) * 0.6;

  return (
    <text
      x={newX}
      y={newY}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#6b7280"
      fontSize={12}
    >
      {payload.value}
    </text>
  );
};

const EmotionRadar = ({ data }:EmotionRadarProps) => {
  return (
    <div className="w-full  ">
  {/* <h3 className="text-center text-sm font-semibold mb-2 text-gray-700">Emotion Intensity</h3> */}

  <ResponsiveContainer width="100%" height={250}>
    <RadarChart cx="50%" cy="50%" outerRadius={100} data={data}>
      <PolarGrid stroke="#e5e7eb" />
      {/* <PolarAngleAxis
        dataKey="emotion"
        tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 500 }}
      /> */}
      <PolarAngleAxis dataKey="emotion" tick={renderInsideTick} />
      <PolarRadiusAxis tick={false} axisLine={false} />

      <Tooltip />
      <Radar
        name="Emotion Intensity"
        dataKey="score"
        stroke="#6366f1"
        fill="#6366f1"
        fillOpacity={0.4}
        dot={{ r: 3, fill: "#6366f1" }}
      />
    </RadarChart>
  </ResponsiveContainer>
</div>

  );
};

export default EmotionRadar;
