import {z} from 'zod'

export const messagesSchema=z.object({
     content:z
     .string()
     .min(10,{message:"content must be atleast 10 charecters"})
     .max(300,{message:"content must not be more then 300 charecters"})
})
