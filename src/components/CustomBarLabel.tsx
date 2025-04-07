const CustomBarLabel = ({ x, y, width, height, payload }: any) => {
  if (!payload || !payload.name) return null;
  return (
    <g>
    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(-180, ${x + width / 2}, ${y + height / 2})`}
      fill="white"
      fontSize={10}
    >
      {payload.name}
    </text>
  </g>
  );
};

export default CustomBarLabel;