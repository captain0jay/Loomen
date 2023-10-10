import React, { useEffect , useState} from 'react'
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

export default function Agreement() {
    const [adds, setAdds] = useState([]);
  useEffect(()=>{
    const getdata= async function(){
      const github_id = localStorage.getItem("github_id")
      const headers = new Headers();
          headers.append("github_id", String(github_id));
      const response = await fetch("http://localhost:4000/getadds",{
      method:"GET",
      headers: headers,
      }).then((response)=>{
          console.log(response)
          return response.json();
      }).then((data)=>{
          console.log(data);
          return data;
      })
      setAdds(response)
    }
    getdata();
  },[])

  const setchat = async function(current_chat:any){
    localStorage.setItem("current_chat",current_chat)
  }
  return (
    <>
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Agreement">Agreement</TabsTrigger>
        <TabsTrigger value="Templates">Templates</TabsTrigger>
      </TabsList>
      <TabsContent value="Agreement">

      {adds.map(element => {//!this.state.loading && 
        return(
        <Card>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
            <CardTitle onClick={() => setchat(`${element.self}`)}>{element.name}</CardTitle>
            <CardDescription>
              {element.url}
            </CardDescription>
        </div>
        </CardHeader>
        </Card>)
      })}
      </TabsContent>
      <TabsContent value="Templates">
      <Card>
        <CardHeader className="grid grid-cols-[1fr_300px] items-start gap-4 space-y-0">
          <div className='mt-4'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
          </div>
          <div className="space-y-1">
            <CardTitle>Completed</CardTitle>
            <CardDescription>
              Beautifully designed components built with Radix UI and Tailwind
              CSS.
            </CardDescription>
        </div>
        </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}
