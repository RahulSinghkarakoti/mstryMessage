/* eslint-disable */
'use client'
import {MessageCard} from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message, User } from "@/models/User.model";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/schemas/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ChartLine, Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = ({params}:any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question,setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const questionId=params.questionId as string
  const { toast } = useToast();



  const handleDeleteMessage = async(messageId:string) => {
    console.log(messages)
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();
  // console.log(session)

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const isQuestionActive=watch('isQuestionActive')

  const fetchAcceptMessages=useCallback(async()=>{

    setIsSwitchLoading(true)
    try {
      const response=await axios.get(`/api/accept-messages?questionId=${questionId}`)
      console.log(response.data)
      setValue('isQuestionActive',response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError= error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to fetch  messages settings",
        variant:'destructive'
      })
      
    }
    finally{
      setIsSwitchLoading(false)
    }
  },[setValue])

  const fetchMessages=useCallback(async(refresh:boolean =false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response=await axios.post('/api/get-messages',{
        questionId
      })
      setQuestion(response.data.message.question)
      setMessages(response.data.message.feedbacks || [])
      console.log(response.data.message.feedbacks)
      if(refresh)
      {
        toast({
          title: 'Refreshed  messages',
          description:  "showing latest messages",
        })
      }
    } catch (error) {
      const axiosError= error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to fetch   messages",
        variant:'destructive'
      })
    }
    finally{
      setIsLoading(false)
      }

  },[setIsLoading,setMessages])

  useEffect(()=>{
    if(!session || !session.user) return
    fetchAcceptMessages()
    fetchMessages()
  },[session,setValue,fetchAcceptMessages,fetchMessages,toast])

  //handle switch change
  const handleSwitchChange=async()=>{
    try {
     const response =  await axios.put<ApiResponse>('/api/accept-messages',{
        isQuestionActive:!isQuestionActive,
        questionId
      })
      setValue('isQuestionActive',!isQuestionActive)
      toast({
        title:response.data.message,
        variant:'default'
      })
    } catch (error) {
      const axiosError= error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to toggle switch",
        variant:'destructive'
      })
    }
  }

 
  if(!session || !session.user)
    return <div>
      <h1>Please login to view messages</h1>
    </div>
  // console.log(session)
  const {username}=session?.user as User
  const baseURL=`${window.location.protocol}//${window.location.host}`
  const profileURL=`${baseURL}/u/${username}/${questionId}`

  const copyToClipboard=()=>{
    navigator.clipboard.writeText(profileURL)
    toast({
      title: 'Copied to clipboard',
      variant: 'default'
    })
  }


  return  <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6  rounded w-full max-w-6xl">
  <h1 className="text-4xl font-bold mb-4 text-center italic ">"{question}"</h1>
  <Separator className="my-4" />
  <h3 className="text-4xl font-bold mb-4">User Dashboard</h3>

  <div className="mb-4">
    <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
    <div className="flex items-center">
      <input
        type="text"
        value={profileURL}
        disabled
        className="input input-bordered w-full p-2 mr-2"
      />
      <Button className="bg-[#6fdb67]" onClick={copyToClipboard}>Copy</Button>
    </div>
  </div>

  <div className="mb-4">
    <Switch
      {...register('isQuestionActive')}
      checked={isQuestionActive}
      onCheckedChange={handleSwitchChange}
      disabled={isSwitchLoading}
    />
    <span className="ml-2">
      Accept Messages: {isQuestionActive ? 'On' : 'Off'}
    </span>
  </div>
  <Separator />
<div className="flex justify-between items-center">

  <Button
    className="mt-4"
    variant="outline"
    onClick={(e) => {
      e.preventDefault();
      fetchMessages(true);
    }}
  >
    {isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      <RefreshCcw className="h-4 w-4" />
    )}
  </Button>
  <Link href={`/dashboard/${questionId}/analytics`}>
  <Button
    className="mt-4 flex justify-between items-center"
    variant="default" 
    >
    <ChartLine />
    <span className="ml-2">View Analytics</span>
  </Button>
    </Link>

    </div>
     
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {messages.length > 0 ? (
      messages.map((message, index) => (
        <MessageCard
          key={index}
          questionId={questionId}
          message={message}
          onMessageDelete={handleDeleteMessage}
        />
      ))
    ) : (
      <p>No messages to display.</p>
    )}
  </div>
  
</div>
};

export default Dashboard;
