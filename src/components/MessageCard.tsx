"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { Button } from "./ui/button";
import { Message } from "@/models/User.model";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { any, string } from "zod";
import { useSession } from "next-auth/react";


type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();
   const { data: session } = useSession();
    const userId= session?.user._id 

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.post<ApiResponse>(
        `/api/delete-message?id=${message._id}`,{userId}
      );
      toast({
        title: response.data.message,
      });
      onMessageDelete(message._id as string);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const formateTime=()=>{
    const date = new Date(message.createdAt);
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const day=date.getDate();
    const month=date.getMonth()+1;
    const year=date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day}-${monthNames[month]}-${year} ${formattedHours}:${formattedMinutes} ${ampm}`

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{message.content}</CardTitle>


<div className="flex items-center justify-between">

        <CardDescription>{formateTime()}</CardDescription>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"} className="w-20 h-10 ">
            Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
</div>
      </CardHeader> 
    </Card>
  );
}

