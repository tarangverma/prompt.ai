"use client"
import React, { useState ,useEffect } from 'react'

import heading from "../assets/Prompt.AI.png"
import boy from "../assets/boy.png"
import group from "../assets/Group.png"
import Image from 'next/image'

let listSuggestion = [
  "Can you suggest beginner-friendly exercises for home workouts?" ,
  "What are some effective stress-relief techniques?",
  "How can I improve my sleep quality?",
  "What are some healthy meal ideas for busy weekdays?",
  "What are the benefits of regular physical activity?",
]


function Suggestion() {

  const [sender, setSender] = useState("user");
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);

  

  const postMessage = {
    sender: sender,
    message: message,
  };


  const sendMessage = async () => {
    
  };

 
  useEffect(() => {
    if(message != "") {
      sendMessage();
    }
  }, [clicked])

    

  return (
    <div
    
    className='flex h-[100%] flex-col overflow-hidden pl-[20px] py-[20px] w-[400px]'>
        <div><Image src={heading} alt='no-img' className='h-[50px] w-[250px] mb-[10px]' /></div>
        <p className='text-white font-semibold text-[14px] pl-[8px]'>Popular Searches</p>
        <div
         style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.25) 100%)',
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
          borderRadius: '12px',
          backdropFilter: "blur(50px)",
          "WebkitBackdropFilter": "blur(50px)",
        }}
        className='w-[100%] flex justify-center items-center flex-col p-[12px] my-[16px]' >
          <Image src={boy} alt='no' className='max-h-[150px] max-w-[150px]' />
          <p className='text-white text-center text-[10px] px-[24px] pb-[6px] '>Discover new insights or ask our AI a question to populate popular searches!</p>
        </div>
        <p className='text-white font-semibold text-[14px] pl-[8px]'>Quick Suggestion</p>
        <div
         style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.25) 100%)',
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
          borderRadius: '12px',
          backdropFilter: "blur(50px)",
          "WebkitBackdropFilter": "blur(50px)",
        }}
        className='flex grow w-[100%] p-[12px] overflow-y-auto no-scrollbar  flex-col my-[16px] '>
          
            {listSuggestion.map((list, ind) => (
                  <div key={ind} style={{borderRadius: '8px', }} className=' mb-[12px] p-[12px] bg-[#232D3F] w-[100%]'>
                    <p onClick={() => {setMessage(list); setClicked(true)}}  
                    className='text-white cursor-pointer text-[12px]'>{list}</p>
                  </div> 
            ))

            }
          

        </div>
        <div
         style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(153, 153, 153, 0.25) 100%)',
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.08)",
          borderRadius: '12px',
          backdropFilter: "blur(50px)",
          "WebkitBackdropFilter": "blur(50px)",
        }}
        className='h-[70px] flex items-center justify-between px-[16px] py-[12px] flex-row w-[100%]'>
          <div className='flex flex-row items-center'>
            <div className='h-[42px] w-[42px] rounded-full bg-[#fff]'></div>
            <p className='text-white font-semibold text-[16px] pl-[12px]'>Tarang</p>
          </div>
          <div> 
            <Image src={group} alt='no'/>
          </div>
        </div>
    </div>
  )
}

export default Suggestion






