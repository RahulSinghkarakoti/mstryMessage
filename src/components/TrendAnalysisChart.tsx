import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface DataItem {
    date: string;
    positive: number;
    negative: number;
    _id: string;
  }

  interface FormattedDataItem extends Omit<DataItem, 'date'> {
    date: string;
  }

function TrendAnalysisChart({data}:any) {
    console.log(data)

    if(!data){
      return (
          <div>
              No data available
          </div>
      )
    }
    const formattedData: FormattedDataItem[] = data.map((item: DataItem): FormattedDataItem => {
        const dateObject: Date = new Date(item.date);
        const day: number = dateObject.getDate();
        const month: string = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject).toLowerCase();
        return {
          ...item,
          date: `${day} ${month}`
        };
      });


  return (
       <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={730} height={250} data={formattedData}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="date" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="negative" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="positive" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
      </ResponsiveContainer>
  )
}

export default TrendAnalysisChart
