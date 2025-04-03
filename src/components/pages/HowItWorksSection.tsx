import React from 'react'

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Getting started with FeedbackViz is simple and
            straightforward.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-[#6fdb67] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            1
          </div>
          <h3 className="text-xl font-bold">Create Feedback Forms</h3>
          <p className="text-muted-foreground">
            Design custom feedback forms with our easy-to-use builder. Add
            questions, rating scales, and open-ended responses.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className=" bg-[#6fdb67] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            2
          </div>
          <h3 className="text-xl font-bold">
            Collect Anonymous Responses
          </h3>
          <p className="text-muted-foreground">
            Share your form via link or QR code. Our system ensures
            complete anonymity for all respondents.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-[#6fdb67] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            3
          </div>
          <h3 className="text-xl font-bold">Visualize & Take Action</h3>
          <p className="text-muted-foreground">
            Access your dashboard to see beautiful visualizations of the
            feedback data and identify actionable insights.
          </p>
        </div>
      </div>
    </div>
  </section>

  )
}

export default HowItWorksSection
