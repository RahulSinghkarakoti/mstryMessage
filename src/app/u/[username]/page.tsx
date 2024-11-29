/* eslint-disable */
"use client";
import SendMsg from "@/components/pages/SendMsg";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  
  return (
   <SendMsg params={params} />
  );
};

export default page;
