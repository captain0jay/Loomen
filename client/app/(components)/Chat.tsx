"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { io, Socket } from "socket.io-client";

export default function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState("default");
  const [roomid, setRoom] = useState("default");
  
  // useRef to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // Connect to the Socket.IO server
    let room_id;
    const clientstatus = localStorage.getItem("as");
    if (clientstatus === "user") {
      room_id = localStorage.getItem("client_id");
    } else {
      room_id = localStorage.getItem("github_id");
    }
    const socketInstance = io("http://localhost:8000/");
    if (room_id !== null) {
      console.log(room_id);
      setRoom(room_id);
      localStorage.setItem("roomid", room_id);
    }

    socketInstance.emit('join room', room_id);
    
    // Set up a listener for incoming messages
    socketInstance.on('chat message', (message: string) => {
      if (isMounted.current) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    
    // Store the socket
    setSocket(socketInstance);

    return () => {
      // Disconnect the socket and set isMounted to false when the component unmounts
      socketInstance.disconnect();
      isMounted.current = false;
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', { room: { roomid }, message });
      setMessage('');
    }
  };

  return (
    <>
      <div className='static'>
        <div className='mt-4 ml-2 mb-2'>{chat}</div>
        <Separator />
        <ul>
          <li>test</li>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <div className='grid grid-cols-10 gap-2 absolute bottom-0 mb-8'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here."
            className='col-span-9' id="message" />
          <Button className='col-span-1 mt-4' onClick={sendMessage}>send</Button>
        </div>
      </div>
    </>
  )
}
