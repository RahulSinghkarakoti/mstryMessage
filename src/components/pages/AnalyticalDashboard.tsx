"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import Speedometer from "../Speedometer";
import ClarityConfidenceDotPlot from "../ClarityConfidenceDotPlot";
import { FeedbackAnalysisDocument } from "@/models/FeedbackAnalysis..model";
import TrendAnalysisChart from "../TrendAnalysisChart";
const AnalyticalDashboard = () => {
  const params = useParams();
  const questionId = params.questionId as string;
  const [analysis, setAnalysis] = useState<FeedbackAnalysisDocument>();

  const fetchAnalysisData = async () => {
    try {
      const response = await axios.post("/api/fetch-analysis", {
        questionId,
      });
      console.log(response.data.data);
      setAnalysis(response.data.data);
    } catch (error) {
      console.error("Error fetching analysis data", error);
      // console.log("Error fetching analysis data",error.response)
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Speedometer */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Performance Meter
            </h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Select metric</option>
            </select>
          </div>
          <Speedometer
            data={{
              sentiment_distribution: {
                Positive: 4,
                // Negative: 2,
                // Mixed: 3,
              },
              overall_sentiment: {
                label: "Mixed",
                score: 0.63,
              },
            }}
          />
        </div>

        {/* Radar Chart */}
        <div className="md:col-span-4 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Skills Assessment
          </h2>
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Radar/Spider Chart]
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="md:col-span-5 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quarterly Results
          </h2>
          <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Horizontal Bar Graph]
          </div>
        </div>

        {/* Box Plot */}
        <div className="md:col-span-4 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Confidence & Clarity Metrics
          </h2>
          {/* <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            [Box Plot]
          </div> */}
          <ClarityConfidenceDotPlot data={scoreData} />
        </div>

        {/* Area Chart */}
        <div className="md:col-span-8 bg-white rounded-xl shadow-sm p-4 flex flex-col">
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
