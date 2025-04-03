"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { Question } from "@/models/Questions.model";
import { Badge } from "../ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { formatDateDifference } from "@/lib/formatDateDifference";
import Link from "next/link";

function Questions() {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log("submitting form");
      setIsSubmitting(true);
      console.log(data);
      const response = await axios.post("/api/add-question", {
        ...data,
      });
      console.log(response.data);
      if (response.data.success) {
        toast({
          title: "question added",
          variant: "default",
        });
        fetchQuestions()
        
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch  messages settings",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get("/api/get-questions");
      // console.log(response.data);
    //  const filterData : [Question]= response.data.questions.sort((a:Question, b:Question) => {
    //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    //   });
    const data=response.data.questions
    const filterData: Question[] = data.map((item: Question) => ({
      ...item,
      timeAgo: formatDateDifference(item.createdAt),
    }));

    filterData.sort((a: Question, b: Question) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });


      setQuestions(filterData || []);
      console.log(filterData)
      if (response.data.success) {
        toast({
          title: "Questions fetched",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch  messages settings",
        variant: "destructive",
      });
    }
  }, [isSubmitting]);

  const handleDelete=async(id:string)=>{
    try {
        console.log(id)
        const response=await axios.delete(`/api/delete-question/${id}`)
        console.log(response.data)
        if(response.data.success){
            toast({
            title: 'Question deleted',
            variant:'default'
            })
            setQuestions(questions.filter((item)=>item._id!==id))
        }
        else{
            toast({
            title: 'Error',
            description:response.data.message,
            variant:'destructive'
            })
        }
        }
    catch (error) {
        const axiosError=error as AxiosError<ApiResponse>
        toast({
            title: 'Error',
            description:axiosError.response?.data.message || "Failed to fetch  messages settings",
            variant:'destructive'
        })
    }
  }

  const formatDate = (dateString: Date) => {
  var options :any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return new Date("2025-04-01T18:51:55.870Z").toLocaleDateString("en-US", options)
  }


  useEffect(() => {
    console.log("fun called");
    fetchQuestions();
  }, [setIsSubmitting, fetchQuestions]);

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6   rounded w-full max-w-6xl">
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Question Here</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here."
                      id="question"
                      className="border border-slate-300 dark:border-[#6fdb67] " 
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
        </Form>{" "}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.length > 0 ? (
          questions.map((item: Question, index) => (
            <Card className="cursor-pointer dark:bg-slate-900" key={index}>
            <Link href={`dashboard/${item._id}`}  key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{item.question}</CardTitle>
                  <Badge
                    className={`${!item.isActive ? "bg-red-300" : "bg-green-400"}`}
                  >
                    {item.isActive ? "Active" : "InActive"}
                  </Badge>
                </div>
                <CardDescription>{formatDate(item.createdAt)}</CardDescription>
                <CardDescription>{item.timeAgo  }</CardDescription>
              </CardHeader>
            </Link>
              <CardFooter className="flex justify-between">

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                  <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      Question and remove all the feedback data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(item._id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No questions to display.</p>
        )}
      </div>
    </div>
  );
}

export default Questions;
