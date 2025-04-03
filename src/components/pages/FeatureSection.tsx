"use client";
import { BarChart2, Shield, TrendingUp } from "lucide-react"; // Assuming you have an icon for messages
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FeatureSection() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything you need for honest feedback
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to collect, analyze,
              and act on anonymous feedback.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-3">
          

          <Card className="shadow-lg shadow-[#6fdb67]">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>100% Anonymous</CardTitle>
              <CardDescription>
              Our platform ensures complete anonymity for all feedback
              providers, encouraging honest and candid responses.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg shadow-[#6fdb67]">
            <CardHeader>
              <BarChart2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Powerful Visualizations</CardTitle>
              <CardDescription>
                Transform raw feedback into beautiful, insightful charts and
                graphs that reveal patterns and trends.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-lg shadow-[#6fdb67]">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Actionable Insights</CardTitle>
              <CardDescription>
                Our AI-powered analysis helps you identify key themes and
                prioritize actions based on feedback.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
