import React from 'react'
import Suggestion from '../Components/Suggestion'
import ChatSection from '../Components/Chat_section'

function page() {
  return (
    <div className='flex h-[100vh] w-[100%] flex-row bg-gradient-to-r from-[#00011E] to-[#014754]'>
    <Suggestion />
    <ChatSection />
  </div>
  )
}

export default page