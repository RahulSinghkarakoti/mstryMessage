"use client";
 
import {
  Card,
  CardContent, 
} from "@/components/ui/card"; 
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
 

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Teams Worldwide
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See what our customers are saying about FeedbackViz.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
<Card className="p-4 shadow-lg shadow-[#6fdb67]">
  <CardContent className="pt-6">
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Sarah Johnson</p>
        <p className="text-sm text-muted-foreground">HR Director, TechCorp</p>
        <p className="mt-2 text-sm text-gray-600">
        &quot;FeedbackViz transformed our employee feedback process. We now get honest insights that have helped us
          improve our workplace culture dramatically.&quot;
        </p>
      </div>
    </div>
  </CardContent>
</Card>
<Card className="p-4 shadow-lg shadow-[#6fdb67]">

  <CardContent className="pt-6">
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Michael Chen</p>
        <p className="text-sm text-muted-foreground">Product Manager, InnovateCo</p>
        <p className="mt-2 text-sm text-gray-600">
        &quot;The visualization tools are incredible. We can immediately see patterns in customer feedback that would
          have taken weeks to identify manually.&quot;
        </p>
      </div>
    </div>
  </CardContent>
</Card>
</div>
    </div>
  </section>

  )
}

export default TestimonialsSection
