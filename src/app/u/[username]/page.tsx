"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messagesSchema } from "@/schemas/messageSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TypeOf, z } from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const page = () => {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [messages, setMessages] = useState([]);

  const form = useForm<z.infer<typeof messagesSchema>>({
    resolver: zodResolver(messagesSchema),
  });

  const onSubmit = async (data: z.infer<typeof messagesSchema>) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-messages", {
        ...data,
        username: params.username,
      });
      console.log(response.data);
      toast({
        title: "message send successfull",
        variant: "default",
      });
      form.reset({...form.getValues(),content:''})
      setIsSubmitting(false);
    } catch (error) {
      console.error("error in sending message ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const fetchMessages = async () => {
    setIsSuggesting(true);
    try {
      console.log("suggesting");
      const response = await axios.post("/api/suggest-messages");
      setMessages(response.data.text);
    } catch (error) {
      console.error("error in fetching Ai message ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSelectMessage=(message:string)=>{
    form.setValue('content',message)
  }

  useEffect(()=>{
    fetchMessages()
  },[])

  return (
    <div className="flex justify-center p-10 w-full ">
      <div className=" w-[80%]   space-y-8 ">
        <h1 className="text-6xl font-bold text-center">Public Profile Link</h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Send Anonymous Message to @{params.username}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                        id="content"
                        className="border border-slate-300 rounded-lg p-3 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center w-full">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-5 animate-spin m-2  " /> Sending
                    </>
                  ) : (
                    <>Send</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="space-y-3 ">
          <div className="flex justify-start w-full">
            <Button onClick={() => fetchMessages()} disabled={isSuggesting}>
              {isSuggesting ? (
                <>
                  <Loader2 className="w-4 h-5 animate-spin m-2  " /> Suggesting
                  Message
                </>
              ) : (
                <>Suggest Message</>
              )}
            </Button>
          </div>
          <p>Click on any message below to select it.</p>
          <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
              {messages?.map((message, index) => (
                <Button
                  key={index}
                  variant='outline'
                  onClick={() => handleSelectMessage(message)}
                  className="  hover:bg-slate-200 text-center p-2 border border-zinc-500 rounded-lg"
                >
                  {message}
                </Button>
              ))}
             
            </CardContent>
          </Card>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col items-center space-y-4">
          <p>Get Your Message Board</p>
          <Button>Create Your account</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
