"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './(components)/Navbar'
import { Sidebar } from '@/components/ui/sidebar'
import { Separator } from "@/components/ui/separator"
const inter = Inter({ subsets: ['latin'] })
import { useState, useEffect } from "react";
import { Sidebaruser } from './(components)/sidebaruser'
import Landing from './(components)/Landing'
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
  const [Tokent, setToken] = useState<string>('');
  const [Logindo, setLogindo] = useState<string>('');
  useEffect(() => {
    const as: string | null = localStorage.getItem("as");
    const access_tokenn: string | null = localStorage.getItem("access_tokenn");
    const login: string | null = localStorage.getItem("login");
    if(as !== null){
      setAsstatus(as);
    }
    if(access_tokenn!==null){
      setToken(access_tokenn)
    }else{
      setToken("null")
    }

    if(login != null)[
      setLogindo(login)
    ]
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {Tokent!=="null" || Logindo==="allow"?
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-3">
            <div className="hidden lg:block">{asstatus === "client" ? <Sidebar/> : <Sidebaruser/>}</div>
            <div className='col-span-4'>{children}</div>
        </div>:
        <Landing/>
        }
        <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="YOUR_APP_KEY"></script>
      </body>
    </html>
  )
}
