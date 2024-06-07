import React, { useState, useEffect, useRef } from 'react';
import bg from "../../../assets/whatappBackround1.webp";
import useGetUser from '../../../hook/useGetUser';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { sentImageUpload } from '../../../survices/firebase/uploadImage';
import { getChat, sendMessage } from '../../../api/user';
import backbround from "../../../assets/3156814.jpg";
import { Socket } from 'socket.io-client';

function ChatBody({ socket }: { socket: Socket }) {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const senter = useGetUser();
  const messageInput = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  async function fetchChat() {
    try {
      const userChat = await getChat(senter.id, id as string);
      setUser(userChat.user);
      setChat(userChat.chat);
      socket.emit('joinRoom', { senderId: senter.id, receiverId: id });
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchChat();
    }
  }, [id, senter.id]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  async function send() {
    try {
      if (!message.trim() && !file) return;

      const messages = message;
      let newMessage = {
        _id: new Date().getTime().toString(), // temporary id
        senderId: senter.id,
        receiverId: id,
        message: messages,
        media: '',
        createdAt: new Date().toISOString()
      };
      
      setMessage("")
      setImagePreview(null)
      if (file) {
        const imageUrl = await sentImageUpload(file);
        newMessage.media = imageUrl;
        socket.emit("sendData", { ...newMessage, media: imageUrl });
        await sendMessage(senter.id, id as string, messages, imageUrl);
      } else {
        socket.emit("sendData", { ...newMessage, media: "" });
        await sendMessage(senter.id, id as string, messages, '');
      }

      setMessage('');
      setFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  }

  function handleClosePreview() {
    setImagePreview(null);
  }

  useEffect(() => {
    socket.on("resiveData", (data) => {
      setChat((prevChat: any) => {
        // Check if the message is already in the chat
        const messageExists = prevChat.messages.some((msg: any) => msg._id === data._id);
        if (messageExists) {
          return prevChat;
        }
        return {
          ...prevChat,
          messages: [...prevChat.messages, data]
        };
      });
    });

    return () => {
      socket.off("resiveData");
    };
  }, [socket]);

  const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  return (
    <div className="w-2/3 flex flex-col text-gray-800 relative">
      {id ? (
        <>
          <div className="p-4 border-b bg-white flex justify-between items-center shadow-md z-10 relative">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img src={user?.profileImage} className="w-full h-full object-cover" alt="" />
              </div>
              <div>{user?.name}</div>
            </div>
          </div>
          <div className={`flex-1 overflow-y-auto p-4 transition-all flex-col-reverse duration-300 ${imagePreview ? 'backdrop-blur-md' : ''}`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundBlendMode: 'luminosity',
            }}
          >
            {chat && chat.messages && chat.messages.map((msg: any) => (
              <div
                key={msg._id}
                className={`mb-4 h-auto flex justify-${msg.senderId === senter.id ? 'end' : 'start'}`}
              >
                <div
                  className={`p-2 h-auto w-[50%] flex rounded-lg shadow ${msg.senderId === senter.id ? 'bg-[#DCF8C6]' : 'bg-white'
                    }`}
                >
                  {msg.media ? (
                    <div className="w-full h-[180px] flex flex-col">
                      <img src={msg.media} className='w-full h-[170px]' alt="" />
                      <div className='w-full flex justify-end mt-1 '>
                        <p className='text-[11px] w-[10%] text-[#878787 bg-fuchsia-600]'>{formatTime(msg.createdAt)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col">
                      <p className='break-words overflow-hidden w-full text-[14px] text-[#303030]'>
                        {msg.message}
                      </p>
                      <div className='w-full flex justify-end mt-1 '>
                        <p className='text-[11px] w-[10%] text-[#878787 bg-fuchsia-600]'>{formatTime(msg.createdAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {imagePreview && (
            <div className="absolute inset-0 flex justify-center items-center backdrop-blur-md bg-opacity-80 -z-1">
              <div className='w-[80%] relative h-[70%] flex justify-center items-center'>
                <img src={imagePreview} alt="Preview" className="w-full h-full relative rounded-lg shadow" />
                <CloseIcon
                  onClick={handleClosePreview}
                  fontSize='large'
                  className="absolute top-4 right-4 p-1 cursor-pointer text-gray-800"
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '50%' }}
                />
              </div>
            </div>
          )}
          <div className="p-3 bg-white border border-t border-gray-200 flex items-center space-x-2 shadow-2xl z-10 relative">
            <label htmlFor="fileInput" className="p-2 bg-gray-100 rounded cursor-pointer">
              📎
            </label>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              type="text"
              ref={messageInput}
              placeholder="Type a message"
              accept="image/*"
              className="w-full p-2 rounded bg-gray-100 text-gray-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && send()}
            />
            <button className="p-2 bg-blue-500 text-white rounded" onClick={send}>Send</button>
          </div>
        </>
      ) : (
        <div className='w-full h-screen object-contain flex justify-center items-center'>
          <div className='w-[80%] h-[80%]'>
            <img src={backbround} className='w-full h-full' alt="Background" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBody;
