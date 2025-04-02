
import robot from './assets/robot.webp'
import roboImg from './assets/roboImg.webp'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BiSolidSend } from "react-icons/bi";

const sendIcon = <BiSolidSend color='white' size={20} />
//curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" 
//API Key AIzaSyB5e-M-zkQUQblTxrqjFRHwtzYWnyGeyyw
/*
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }'*/

import './App.css'
import { useEffect, useState,useRef } from 'react'
const animatedRobotSrc = `${robot}?t=${Date.now()}`;

function App() {

  const[scaleUp,setScaleUp] = useState({
    scaling:false,
    positionX:100,
    positionY:100,
  
  })
  const[timerSet, setTimerset] = useState(false)
  const[timerSet1, setTimerset1] = useState(false)
  const[roboAppear,setRoboappear] = useState(false)
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const addMessage = () => {
    setMessages([...messages, { id: messages.length, text: "Hello, I am Matty!" }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scrolls down when messages update

  useEffect(()=>{
    setRoboappear(true)
    const timer =setTimeout(()=>{
      setScaleUp((prev)=>{
        return{
          ...prev,
          scaling:true,
          positionX:0,
          positionY:0
        }
      })
      //setRoboappear(false)     
    },3000)

    const timer_1 = setTimeout(()=>{
      setTimerset(true)
      setTimerset1(true)
    },500)

    const timer_2 = setTimeout(()=>{
      setTimerset(false)
          },2000)

    const timer_3 = setTimeout(()=>{
      setRoboappear(false)  
    },9000)
    

    return () => {
      clearTimeout(timer)
      clearTimeout(timer_1)
      clearTimeout(timer_2)
      clearTimeout(timer_3)
      //setTimerset(false)
    };

  },[])
  

  return (
    <>
    <div className='relative w-full h-[100vh] flex justify-center items-center'>
        <div className='relative lg:w-1/4 md:1/4 w-[90%] h-96 border border-stone-500 rounded-lg flex justify-center items-center'>
   

                <img 
                  src={animatedRobotSrc} 
                  alt="robot" 
                  className={`absolute w-24 h-auto transition-all duration-800 ease-in-out ${scaleUp.scaling ? "scale-100" : "scale-200"} ${roboAppear ? "opacity-100":"opacity-0"}`}
                  style={{ left: `${scaleUp.positionX}px`, top: `${scaleUp.positionY}px` }}
                />



            <div className={`absolute w-full h-auto`} style={{left: `${scaleUp.positionX+20}px`, top: `${scaleUp.positionY-80}px`}}>
            <div className={`relative w-24 max-w-24 h-auto bg-blue-500 text-white text-sm rounded-xl px-4 py-2 transition-all duration-700 ease-in-out
              ${timerSet ? "opacity-100":"opacity-0"}`}>
            <div className="absolute bottom-0 left-4 w-4 h-4 bg-blue-500 rotate-45 translate-y-1"></div>
            {timerSet1 && (
                <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Hello! I 'm Matty..")
                    .start();
                }}
                options={{
                  loop: false,
                  delay: 40, // Typing speed
                  cursor: '', // Hide cursor
                }}
              />
              )}

            </div>
            </div>

            <div className=' top-0 left-0 w-1/2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>

            <div className="w-full h-auto relative flex flex-col items-start gap-2 p-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-32 h-24 bg-blue-500 text-white p-2 rounded-lg"
                    >
                      {msg.text}
                    </motion.div>
                  ))}

                      <div ref={messagesEndRef} />

                      <div className='fixed w-full h-full h-min-12 mt-74'>
                        <textarea className='w-[80%] h-11 text-xl pt-2  pl-2 rounded-md bg-stone-800  resize-none overflow-y-auto text-white flex items-center'>


                        </textarea>

                      <button
                          onClick={addMessage}
                          className="absolute top-1 left-65 p-2 bg-green-500 text-white rounded"
                        >
                    {sendIcon}
                  </button> 
                  </div>
              </div>


              

            </div>



    </div>
</div>



    </>
  )
}

export default App
{/* { !roboAppear && (<div>
  <div className='w-32 h-12 bg-blue-500 rounded-lg m-2'>
    <img src={roboImg} alt='robo' className='w-10 h-10 rounded-full bg-black '/>
  </div>
</div>)} */}