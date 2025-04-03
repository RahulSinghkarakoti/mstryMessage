"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight
} from "lucide-react"; // Assuming you have an icon for messages
import Image1 from "@/Images/Hero_section1.svg";


function HeroSection() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-12">
          <div className="container px-4 md:px-6 ">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Collect Anonymous Feedback. Visualize Insights.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform anonymous feedback into actionable insights with
                    powerful visualization tools. Make better decisions with
                    honest input from your team and customers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-[#6fdb67] ">
                    <Link href="/sign-up">
                      Start Collecting Feedback
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="#demo">See Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={Image1}
                    alt="Dashboard visualization"
                    // fill
                    width={600}
                    height={400}
                    // className="object-contain rounded-lg border shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HeroSection
