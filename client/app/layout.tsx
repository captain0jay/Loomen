"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './(components)/Navbar'
import { Sidebar } from '@/components/ui/sidebar'
import Popup from './(components)/Popup'
import { Separator } from "@/components/ui/separator"
const inter = Inter({ subsets: ['latin'] })
import { useState, useEffect } from "react";
import { Sidebaruser } from './(components)/sidebaruser'
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [asstatus, setAsstatus] = useState("user");
  useEffect(() => {
    const as: string | null = localStorage.getItem("as");
    if(as !== null){
      setAsstatus(as);
    }
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="grid grid-cols-5 gap-3">
            <div className="hidden lg:block">{asstatus === "client" ? <Sidebar/> : <Sidebaruser/>}</div>
            <div className='col-span-4'>{children}</div>
        </div>
        <Separator className="my-0.5 mt-[83%]" />
        <div className='block lg:hidden'>
          <Popup/>
        </div>
        <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="YOUR_APP_KEY"></script>
      </body>
    </html>
  )
}
