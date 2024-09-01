'use client'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import {  useForm } from 'react-hook-form'
import React from 'react'
import { z } from 'zod'
import { verifySchema } from '@/schemas/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { FormField,FormItem,FormLabel,FormControl,FormMessage,Form } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'





const VerifyAccount = () => {
    const route=useRouter()
    const params=useParams<{username:string}>()
    const {toast}=useToast()

    const form = useForm<z.infer<typeof verifySchema>>({ // <z.infer<typeof signUpSchema>> is optional to have
        resolver: zodResolver(verifySchema),
      });


      const onSubmit=async(data:z.infer<typeof verifySchema>)=>{
        try {
          console.log(params.username,data.code)
          const response=  await axios.post('/api/verify-code',{username:params.username,code:data.code})
          console.log(response)
          toast({
            description: response?.data.message,
            title: 'success',
          })
          route.replace('/sign-in')
        } catch (error) {
            console.error("error in sign-up user ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
              title: "Sign-Up failed",
              description: axiosError.response?.data.message,
              variant: "destructive",
            });
        }

      }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-4   space-y-2 bg-white rounded-lg shadow-md">
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your account
          </h1>
          <p className="mb-4">Enter the verification code  send to your email address</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field}  className='outline-none '/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
         
      </div>
    </div>
  )
}

export default VerifyAccount
