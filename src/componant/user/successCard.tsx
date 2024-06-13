import { useNavigate } from 'react-router-dom';

const SuccessCard = () => {
    const navigate = useNavigate()
  return (
    <div className="text-center py-10 bg-gray-100">
      <div className="inline-block bg-white p-12 rounded-lg shadow-md">
        <div className="rounded-full h-48 w-48 bg-gray-200 mx-auto">
          <span className="text-green-500 text-6xl">✓</span>
        </div>
        <h1 className="text-green-600 font-bold text-4xl mt-8 mb-2">Success</h1>
        <p className="text-gray-700 text-lg">We received your purchase request;<br/> we'll be in touch shortly!</p>
         <button className='w-[5rem] h-[2rem] bg-green-600' onClick={()=>navigate('/user/events')}>Go back</button>
      </div>
    </div>
  );
}

export default SuccessCard;
