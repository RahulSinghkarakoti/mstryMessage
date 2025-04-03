import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function LastSection() {
  return (
    <section  className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to get honest feedback?
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Start collecting anonymous feedback and visualizing insights
            today.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild className=" bg-[#6fdb67]" size="lg">
            <Link href="/sign-up">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/demo">Request Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default LastSection
