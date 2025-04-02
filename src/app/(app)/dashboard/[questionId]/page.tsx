/* eslint-disable */

"use client";

import Dashboard from '@/components/pages/Dashboard'
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
    const params = useParams();
  
  return (
     <Dashboard params={params}/>
  )
}

export default page
