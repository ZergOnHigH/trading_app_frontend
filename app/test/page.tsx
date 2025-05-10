"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function TestPage() {
    

  console.log("Testowa strona!")  

  const showDate = () => {
        const date = new Date()
        console.log(date.toLocaleString())
  }

  return (
    <div>
        <h1>Strona testowa!</h1>
        <Button onClick={showDate}>Pokaż datę</Button>
        <Link href="/">Strona główna</Link>
    </div>
  )
}

export default TestPage
