"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import copy from "../assets/Copy.png"
import like from "../assets/Dislike.png"
import editicon from "../assets/edit.png"
import history from "../assets/history.png"
import send from "../assets/send.png"
import { editPrompt, fetchLatestPromptsWithMessages, fetchMessagesByPromptId } from '../utils/api';


function Chats(props: any) {

    let message = props.message; 
    let Delete = props.delete; 

    interface Message {
        message_id: number;
        message_content: string;
        created_at: string; // You can also use Date if you parse it
    }

    

    const [chats, setChats] = useState<any[]>([]);
    const [edited, setEdited] = useState<string>("");
    const [editStates, setEditStates] = useState<boolean[]>([]);
    const [editedValues, setEditedValues] = useState<string[]>([]);
    const [editedHistory, setEditedHistory] = useState<boolean[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);

    let LastIndex = currentPage * rowsPerPage;
    let FirstIndex = LastIndex - rowsPerPage;

    // Pagination 
    let pages = [];
    let TP = messages.length;
    let TPP = 1;
    
        for( let i=1; i<= Math.ceil(TP/TPP); i++) {
            pages.push(i);
        }
    
    ////

    const loadLatestPromptsWithMessages = async () => {
        try {
            const data = await fetchLatestPromptsWithMessages();
            setChats(data);
        } catch (error) {
            console.error('Error fetching latest prompts with messages:', error);
        }
    };

    const loadMessages = async (promptId : number) => {
        try {
            const data = await fetchMessagesByPromptId(promptId);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching latest prompts with messages:', error);
        }  
    }  


    useEffect(() => {

        loadLatestPromptsWithMessages();
    }, [message, Delete]);

    useEffect(() => {
        setEditStates(Array(chats.length).fill(false));
        setEditedHistory(Array(messages.length).fill(false));
        setEditedValues(Array(chats.length).fill(''));
    }, [chats]);

    const handleEditClick = (index: number) => {

        const updatedEditStates = [...editStates];
        updatedEditStates[index] = !updatedEditStates[index]; // Toggle the edit state
        setEditStates(updatedEditStates);
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedEditedValues = [...editedValues];
        updatedEditedValues[index] = value; // Update the value for the specific index
        setEditedValues(updatedEditedValues);
        setEdited(value);
        console.log("edited", edited);
    };

    const handleshowhistory = (index: number) => {
        const updateShowHistory = [...editedHistory]
        updateShowHistory[index] = !updateShowHistory[index];
        setEditedHistory(updateShowHistory);
    }

    
    
    const editProp = async (id: any) => {
        try {
            await editPrompt(id, edited);
            // Optionally, you can refresh the prompts list or show a success message
        } catch (error) {
            console.error('Error updating prompt:', error);
        }
        loadLatestPromptsWithMessages();
    }


   
    
    return (
    <div className='flex flex-col  w-full'>
    { chats.sort((a,b) => a.promptid - b.promptid)
        .map((c, ind) =>  (
       
        <div key={ind} className='flex flex-col  w-full'>
            <div className='flex justify-end  mb-[16px] mr-[20px]  w-full'>
                <div className='flex mr-[10px] h-max min-w-min max-w-[60vh] rounded-full text-[#fff] py-[5px] px-[12px]  '>
                    <div className='text-center flex flex-col'>
                    {editStates[ind] ? 
                                    <input
                                        type="text"
                                        placeholder="New response..."
                                        value={editedValues[ind] ? editedValues[ind] : c.message_content ? c.message_content : c.promptcontent}
                                        onChange={(e) => handleInputChange(ind, e.target.value)}
                                        className="outline-none bg-[#0F0F0F] w-full h-full p-[5px] border-none text-[#fff]"
                                    />
                                    : <p className='bg-[#010101] mr-[10px] h-max min-w-min max-w-[60vh] rounded-full text-[#fff] py-[5px] px-[12px]'>{c.message_content ? c.message_content : c.promptcontent}</p>}
                                    { editedHistory[ind] ?  
                                    <div className=''>
                                        {messages
                                        .slice(FirstIndex, LastIndex)
                                        .map((m , ind) => (
                                            <p key={ind} className='bg-[#010101] mt-[10px] cursor-pointer mr-[10px] h-max min-w-min max-w-[60vh] rounded-full text-[#fff] py-[5px] px-[12px]'>{m.message_content}</p>
                                        ))}
                                        {pages.map((val, index) => (
                                            <button onClick={() => setCurrentPage(val)} className='p-[5px] justify-center border-[1px] mr-[5px] mt-[5px]'  key={index}>{val}</button>
                                        ))}
                                        </div>
                                    : <></>}
                                <div className='flex flex-row gap-6'>
                                <Image
                                    src={editicon}
                                    width={20}
                                    height={50}
                                    alt='edit-icon'
                                    className='cursor-pointer mt-[5px]'
                                    onClick={() =>  handleEditClick(ind)}
                                />
                                <Image
                                    src={history}
                                    width={20}
                                    height={50}
                                    alt='edit-icon'
                                    className='cursor-pointer mt-[5px]'
                                    onClick={() => {loadMessages(c.promptid); handleshowhistory(ind)}}
                                />
                                <Image
                                    src={send}
                                    width={20}
                                    height={50}
                                    alt='edit-icon'
                                    className='cursor-pointer mt-[5px]'
                                    onClick={() => {handleEditClick(ind); editProp(c.promptid);}}
                                />
                                </div>           
                    </div>
                </div>
                <div className='rounded-full h-[32px] w-[32px] bg-[#fff]'></div>
            </div>
            <div 
            style={{background:'linear-gradient(90deg, rgba(1, 1, 1, 0.53) 0%, rgba(41.44, 36.95, 36.95, 0.53) 100%, rgba(103, 103, 103, 0.53) 100%)',
            boxShadow: '0px 0px 16.5px -8px rgba(0,0,0,0.25)',}}
            className='flex flex-col rounded-xl min-w-min max-w-[60vh] px-[15px] py-[12px] justify-start mb-[16px] mr-[20px]  w-full'>
                <div className='flex items-center flex-row'>
                <div className='rounded-full mr-[6px] h-[32px] w-[32px] bg-[#fff]'></div>
                <div className='flex  rounded-full text-[#fff] py-[5px] px-[12px] '>
                    <div className='text-center'><p>Sorry we are currently working on it</p></div>
                </div>
                </div>
                <div className='flex mt-[6px] flex-row justify-between'>
                    <Image src={like} className='pl-[50px] cursor-pointer h-[20px] ' alt='no-img' />
                    <Image src={copy} className=' h-[15px] cursor-pointer ' alt='no-img' />
                </div>
            </div>
        </div>
    ))}
    </div>
    

  )
}

export default Chats