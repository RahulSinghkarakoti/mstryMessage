"use client"; 
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
} from "lucide-react"; // Assuming you have an icon for messages
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 


function PricingSection() {
  return (
     <section
              id="pricing"
              className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
            >
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Simple, Transparent Pricing
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Choose the plan that&apos;s right for your team.
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <div className="text-3xl font-bold">
                        $29
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Up to 3 feedback forms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>100 responses per month</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Basic visualizations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Email support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Get Started</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                        Most Popular
                      </div>
                      <CardTitle>Professional</CardTitle>
                      <div className="text-3xl font-bold">
                        $79
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Unlimited feedback forms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>500 responses per month</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Advanced visualizations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>AI-powered insights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Get Started</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <div className="text-3xl font-bold">Custom</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Unlimited everything</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Custom integrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Advanced security features</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>Dedicated account manager</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary  text-[#6fdb67]" />
                          <span>24/7 premium support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Sales</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </section>
    
  )
}

export default PricingSection
