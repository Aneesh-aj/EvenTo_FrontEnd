// src/components/ChatList.js

import React from 'react';
import bg from "../../../assets/FE.jpg";

const conversations = [
  { id: 1, name: 'Vishal', lastMessage: 'Null vs undefined, Starvation, ...' },
  { id: 2, name: 'Brocamp Kozhikode', lastMessage: 'BCK112' },
  // Add more conversations here
];

function ChatList() {
  return (
    <div className="w-1/3 bg-white h-screen text-gray-800 shadow-xl border ">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-gray-100 text-gray-800"
        />
      </div>
      <div className="overflow-y-auto h-auto">
        {conversations.map(convo => (
          <div key={convo.id} className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img src={bg} alt="" className='w-full h-full object-cover' />
              </div>
              <div>
                <div className="font-bold">{convo.name}</div>
                <div className="text-gray-500 text-sm truncate">{convo.lastMessage}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
