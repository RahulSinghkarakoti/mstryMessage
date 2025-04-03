"use client";
import React, {  useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";  
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Icon from "@/Images/icons8-google.svg";
import { Separator } from "../ui/separator";


const SignIn = () => {

  const { toast } = useToast(); //for popup message
  const route = useRouter();
  const [isSubmitting,setIsSubmitting]=useState(false)

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    // <z.infer<typeof signUpSchema>> is optional to have
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  try {
    setIsSubmitting(true)
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });
      if(result?.error)
      {
        toast({
            title: "Login failed",
            description: 'incorrect username or password',
            variant:'destructive'
        })
      }
     if(result?.url){
        route.replace('/')
     }
  } catch (error) {
      console.error(error)
      toast({
        title: "unexpected error occure",
        description: '',
        variant:'destructive'
    })
    
  }
  finally{
    setIsSubmitting(false)
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
      <div className="w-full max-w-md py-6 px-4   space-y-2   dark:bg-[#020817b1]  shadow-lg shadow-[#6fdb67]  rounded-xl ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-sm outline-none"
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input placeholder=" Enter Email " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder=" Enter Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"   disabled={isSubmitting}>
              {
                isSubmitting ?"Signing-In" :"Sign-In" }
            </Button>
            <div className="flex justify-center items-center gap-3 px-4">
                  <Separator className="bg-zinc-500 h-1 rounded-full w-1/2" />
                  <p>or</p>
                  <Separator className="bg-zinc-500 h-1 rounded-full w-1/2" />
                </div>
          </form>
        </Form>
        <Button
          onClick={() => signIn("google",{ callbackUrl: "/" })}
          className=" w-full     focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
          variant="outline"
        >
            <Image
                    src={Icon}
                    alt="Dashboard visualization"
                    // fill
                    width={20}
                    height={20}
                    // className="object-contain rounded-lg border shadow-lg"
                    priority
                  />
          Sign In with Google<div></div>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
