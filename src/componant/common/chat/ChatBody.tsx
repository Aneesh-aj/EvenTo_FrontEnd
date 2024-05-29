import React, { useState, useEffect } from 'react';
import bg from "../../../assets/whatappBackround1.webp";
import image from "../../../assets/FE.jpg";
import useGetUser from '../../../hook/useGetUser';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { sentImageUpload } from '../../../survices/firebase/uploadImage';
import { getChat, sendMessage } from '../../../api/user';

const messages = [
  { id: 1, text: 'practice more aggregate workouts with multiple stages' },
  { id: 2, text: '[0,0,0] -> reduce' },
  // Add more messages here
];

function ChatBody() {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState([])
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const senter = useGetUser();
  const { id } = useParams();


  useEffect(() => {
    async function fetchChat() {
      const userChat = await getChat(senter.id, id as string)
      console.log(" userchat -------------------------", userChat.chat)
      setChat(userChat.chat[0].messages)
    }
    fetchChat()
  }, [])

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

      console.log("Message:", message);
      if (file) {
        console.log("File:", file);
        const imageUrl = await sentImageUpload(file)
        const sented = await sendMessage(senter.id, id as string, message, imageUrl)
      } else {
        const sented = await sendMessage(senter.id, id as string, message, '')

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



  return (
    <div className="w-2/3 flex flex-col text-gray-800 relative">
      <div className="p-4 border-b bg-white flex justify-between items-center shadow-md z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" alt="" />
          </div>
          <div>Vishal</div>
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${imagePreview ? 'backdrop-blur-md' : ''}`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundBlendMode: 'luminosity',
        }}
      >
        {chat && chat.map((msg: any) => (
          msg.senterId === id ?
            (
              <div className="mb-4 flex justify-start">
                <div className="bg-white p-2 w-[50%] rounded-lg shadow">{msg.message}</div>
              </div>
            ) :
            (
              <div className="mb-4 flex justify-end">
                <div className="bg-white p-2 w-[50%] rounded-lg shadow">{msg.message}</div>
              </div>
            )
        ))}
      </div>
      {imagePreview && (
        <div className="absolute inset-0 flex  justify-center items-center backdrop-blur-md bg-opacity-80 -z-1">
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
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 rounded bg-gray-100 text-gray-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && send()}
        />
        <button className="p-2 bg-blue-500 text-white rounded" onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default ChatBody;
