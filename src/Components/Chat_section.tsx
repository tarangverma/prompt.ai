"use client"

import React, { useEffect, useState } from "react";
import Image from 'next/image'
import chat from "../assets/chat.png";
import trash from "../assets/trash.png";
import send from "../assets/send.png";
import Chats from "./Chats";
import { createPrompt, deleteMesseges } from '../utils/api';

function ChatSection() {
  const [message, setMessage] = useState("");
  const [Delete, setDelete] = useState(false);

  

  const sendMessage = async () => {
    // const date = new Date();
    try {
      await createPrompt(message);
      setMessage('');
      // Optionally refresh the prompts list
  } catch (error) {
      console.error('Error creating prompt:', error);
  }
  }

  let list = [ 
    "Would like to get more information on it",
    "get the implementation steps for better understanding"
]
  
  
  const deleteChat = async () => {
    try {
      await deleteMesseges();
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
  }
  




  return (
        <div className="h-[100%] w-[100%] p-[20px]">
      <div
        style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.25) 100% )',
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
          borderRadius: 32,
          backdropFilter: "blur(50px)",
          "WebkitBackdropFilter": "blur(50px)",
        }}
        className="flex overflow-hidden  p-[20px] flex-col h-[100%] w-[100%]"
      >
         
          <div className="flex justify-end">
            <Image onClick={() => { setDelete(true); deleteChat()}} className="cursor-pointer" src={trash} alt="no" />
          </div>
          <div className="flex relative flex-col overflow-y-auto   no-scrollbar grow mb-[20px]  mt-[20px]">
            <Chats message={message} delete={Delete} />
          </div>

          {
            Delete ? <div 
            style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.25) 100% )',
            boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
            borderRadius: 32,
            backdropFilter: "blur(50px)",
            "WebkitBackdropFilter": "blur(50px)",
          }} className="w-[340px] items-center mx-[30%] my-[25%] absolute flex flex-col justify-center h-[100px]"
            >
              All Chats deleted successfully
              <button className="bg-sky-500 mt-[10px] px-[10px] py-[5px] rounded-xl" onClick={() => {setDelete(false);}}>Close</button>
            </div> : <></>
          }

          <div  className="flex flex-row justify-center gap-10 mb-[10px]">
            {list.map((l, index) => (
              <div key={index} className='flex  rounded-full text-[#fff] cursor-pointer py-[10px] bg-[#000000] px-[12px] '>
                <div className='text-center'><p onClick={() => {  setMessage(l) }}>{l}</p></div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex bg-[#0F0F0F] items-center rounded-xl  py-[16px] px-[20px]  flex-row justify-between">
              <input
                type="text"
                placeholder="Ask GPT... "
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className=" outline-none bg-[#0F0F0F] w-full border-none text-[#fff]"
              ></input>
              <div>
                  <Image alt="no-img" src={send} onClick={() => sendMessage()}
                  className="h-[20px] cursor-pointer w-[25px]"/>
                  
                
              </div>
            </div>
          </div>
        </div>
        </div>
     
  );
}

export default ChatSection;

