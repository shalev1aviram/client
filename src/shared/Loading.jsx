import React from 'react'

const Loading = ({ on }) => {
    if (on) return (
        <div className="bg-gray-200 select-none opacity-80 z-15 h-screen absolute top-0 w-full flex items-center">
            <div class="flex flex-row gap-2 ml-[25%]">
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default Loading