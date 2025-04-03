import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Image2 from "@/Images/Data_analysis.svg"; 


function DemoSection() {
  return (
    <section
          id="demo"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    See FeedbackViz in Action
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our interactive dashboard makes it easy to spot trends,
                    identify issues, and track improvements over time.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary text-[#6fdb67]" />
                    <span>Real-time data updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary  text-[#6fdb67]" />
                    <span>Multiple visualization options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary  text-[#6fdb67]" />
                    <span>Export reports in multiple formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary  text-[#6fdb67]" />
                    <span>Share insights with your team</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={Image2}
                    alt="Dashboard demo"
                    fill
                    className="object-contain "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

  )
}

export default DemoSection
