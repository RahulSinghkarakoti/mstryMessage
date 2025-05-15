"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RadarChart, ResponsiveContainer } from "recharts";
import Speedometer from "../Speedometer";
import ClarityConfidenceDotPlot from "../ClarityConfidenceDotPlot";
import { FeedbackAnalysisDocument } from "@/models/FeedbackAnalysis..model";
import TrendAnalysisChart from "../TrendAnalysisChart";
import RadialBarChartComponent from "../RadialBarChart";
import EmotionRadar from "../RadarChart";
import KeyTopicsChart from "../KeyBarChart";


const AnalyticalDashboard = () => {
  const params = useParams();
  const questionId = params.questionId as string;

  type RadialBarDataItem = {
    name: string;
    value: number;
    fill: string;
  };
  type BarDataItem = {
    topic: string;
    mentions: number;
  };
  const sentimentColors: Record<string, string> = {
    Positive: '#00C49F',
    Negative: '#FF4C4C',
    Mixed: '#8884d8',    // fallback color for "Mixed"
    Aggregate: '#FFBB28'   // just in case Neutral appears later
  };

  

  const [analysis, setAnalysis] = useState<FeedbackAnalysisDocument>();
  const[data, setData] = useState<RadialBarDataItem[]>([]);
  const[BarDataItem, setBarDataItem] = useState<BarDataItem[]>([]);
  const[emotionData, setEmotionData] = useState(null);
  const[loading, setLoading] = useState(true);

  const fetchAnalysisData = async () => {
    try {
      const response = await axios.post("/api/fetch-analysis", {
        questionId,
      });
      // console.log(response.data.data);
      setAnalysis(response.data.data);

      //code by vijay pro
      const rawDistribution = response.data.data.sentiment_distribution

      const mixedData = response.data.data.overall_sentiment
      console.log(mixedData)
      console.log(rawDistribution)
      const normalizedSentiment: Record<'Positive' | 'Negative' | 'Aggregate' |'Mixed', number> = {
        Negative: rawDistribution?.Negative || 0,
        Positive: rawDistribution?.Positive || 0,
        Mixed:rawDistribution?.Mixed || 0,
        Aggregate:mixedData?.score || 0,
        
      };
      // console.log(response.data.data)
      const chartData: RadialBarDataItem[] = Object.entries(normalizedSentiment).map(
        ([key, value]) => ({
          name: key,
          value,
          fill: sentimentColors[key] || '#cccccc' // default color if undefined
        })
      );

      const BarData:BarDataItem[] = response.data.data.key_topics_entities.map((item:BarDataItem) => ({
        topic: item.topic,
        mentions: item.mentions
      }));

      const EmotionData = response.data.data.emotion_intensity;
      console.log(EmotionData)

      setBarDataItem(BarData);
      setEmotionData(EmotionData);
      setData(chartData)

    } catch (error) {
      console.error("Error fetching analysis data", error);
      // console.log("Error fetching analysis data",error.response)
    }
    finally{
      setLoading(false);
    }
  };
  const scoreData = {
    average_clarity_score: 0.95,
    average_confidence_score: 0.97,
    low_clarity_examples: [],
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12  gap-2">
        {/* EmotionRadar */}
        <div className="md:col-span-3    bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <div className="flex justify-between items-center ">
            <h2 className="text-lg font-semibold text-gray-800">
             Emotion
            </h2>
             
          </div>
          {
              loading ? (
                <span>Loading.....</span>
              ):(emotionData? (<EmotionRadar data={emotionData}/>):
              <p>No data to show</p>)
            }
        </div>

        {/*  Horizontal Bar Chart */}
        <div className="md:col-span-6     bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800  ">
            Key Topics
          </h2>
          <div className=" bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
          {
              loading ? (
                <span>Loading.....</span>
              ):(BarDataItem? (<KeyTopicsChart data={BarDataItem}/>):
              <p>No data to show</p>)
            }
          </div>
        </div>

        {/* Radar Chart */}
        <div className="md:col-span-3    bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 ">
            Sentiment
          </h2>
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
          {
              loading ? (
                <span>Loading.....</span>
              ):(data ? (<RadialBarChartComponent data={data}/>):

              <p>No data to show</p>)
            }
          </div>
        </div>

        {/* Box Plot */}
        <div className="md:col-span-4    bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Confidence & Clarity Metrics
          </h2>
          {/* <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Box Plot]
          </div> */}
          <ClarityConfidenceDotPlot data={scoreData} />
        </div>

        {/* Area Chart */}
        <div className="md:col-span-8    bg-white rounded-xl shadow-sm p-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Trend Analysis
          </h2>
          {/* <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Area Chart]
          </div> */}
          <TrendAnalysisChart data={analysis?.trend_over_time} />
        </div>
        {/* Action Cards */}
        {/* <div className="md:col-span-4 grid grid-cols-2 gap-4">
          {[
            {
              icon: "📊",
              title: "Export Data",
              desc: "Download dataset",
              color: "border-blue-500",
            },
            {
              icon: "🔄",
              title: "Refresh",
              desc: "Update all charts",
              color: "border-green-500",
            },
            {
              icon: "🔔",
              title: "Alerts",
              desc: "Configure notifications",
              color: "border-red-500",
            },
            {
              icon: "❓",
              title: "Help",
              desc: "Get assistance",
              color: "border-purple-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center border-t-4 ${card.color}`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3 className="font-medium text-gray-800">{card.title}</h3>
              <p className="text-xs text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AnalyticalDashboard;
