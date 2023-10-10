"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useState, useEffect } from "react";
import Clientchat from './(components)/Clientchat'
import Userchat from './(components)/Userchat'
import Chat from './(components)/Chat'
import Chatnew from './(components)/Chatnew'

export default function Home() {
  const [asstatus, setAsstatus] = useState("user");
  const [chat,setChat] = useState("default");
  useEffect(() => {
    const as: string | null = localStorage.getItem("as");
    if(as !== null){
      setAsstatus(as);
    }
    const current_chat: string | null = localStorage.getItem("current_chat");
    if(current_chat !== null){
    setChat(current_chat);
  console.log(chat)}
  })
  return (
    <>
    <div className='mt-2 ml-2 grid grid-cols-5 gap-4'>
      <div className='bg-black-300 col-span-2'>
        {asstatus === "client" ?
        <Clientchat/> :
        <Userchat/>
        }
      </div>
      <div className='col-span-3 flex flex-col h-screen'>
        {chat === "default"?
      <Card>
        <div className='flex flex-col h-[calc(95vh-4rem)] justify-center items-center'>
          No chat selected
        </div>
      </Card>:
      <Card>
        <div className='flex flex-col h-[calc(95vh-4rem)]'>
          <Chatnew/>
        </div>
      </Card>
      }
      </div>
    </div>
    </>
  )
}
