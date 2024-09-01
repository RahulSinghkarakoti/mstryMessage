"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosAdapter, AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const page = () => {

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
        route.replace('/dashboard')
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
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-4   space-y-2 bg-white rounded-lg shadow-md">
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
          </form>
        </Form>
        
      </div>
    </div>
  );
};

export default page;
