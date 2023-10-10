"use client"
import React , { useEffect, useState } from 'react'
import { Drawer } from 'vaul';
import { Sidebar } from '@/components/ui/sidebar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"

export default function Popup() {
    const [url, setUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description,setDescription] = useState<string>('');
   
    const sendURL = async function(){
        const github_id = localStorage.getItem("github_id")
        const headers = new Headers();
        headers.append("name", String(name));
        headers.append("url", String(url));
        headers.append("github_id", String(github_id));
        await fetch("http://localhost:4000/add",{
        method:"GET",
        headers: headers,
        }).then((response)=>{
            console.log(response)
            return response.json();
        }).then((data)=>{
            console.log(data);
            return data;
        })
    }
    

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild className='ml-[42%] inline-block'>
      <Button>Add</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="">
              <ScrollArea className="h-60 rounded-md border">
                <Card className='p-4'>
                <CardTitle>Upload file</CardTitle>
                <CardDescription>If you havent uploaded your agreement file yet click here to add it to your dropbox
                    account.
                </CardDescription>
                <CardTitle>Choose file</CardTitle>
                <CardDescription>Already uploaded your agreement file? copy share URL and paste here
                </CardDescription>
                </Card>
                <div className='grid grid-cols-16 gap-2 absolute bottom-0 mb-8'>
                <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL goes here."
                    className='col-span-5' id="url" />

                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name goes here."
                    className='col-span-5' id="name" />

               <Textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='col-span-5' id="description" placeholder="Type your message here." />
                    <Button onClick={sendURL} className='col-span-1 mt-4'>Done</Button>
                </div>

              </ScrollArea>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}