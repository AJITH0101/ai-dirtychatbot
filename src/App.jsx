
import robot from './assets/robot.webp'
import roboImg from './assets/roboImg.webp'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BiSolidSend } from "react-icons/bi";

const sendIcon = <BiSolidSend color='white' size={18} />


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
  const[textData,setTextData] = useState("")
  const[triggerTextBox, setTriggerTextBox] = useState(false)
  const[switchText, setSwitchText] = useState()
  const messagesEndRef = useRef(null);
  const roboStyle = "w-40 h-auto bg-blue-500 text-white p-2 rounded-lg ml-2"
  const userStyle = "w-40 h-auto bg-white text-stone-700 p-2 rounded-lg ml-2"
  const roboPic = <img src={roboImg} alt='robo' className='w-8 h-8 mt-1 rounded-full bg-stone-300'/>
  const userPic = <div className='text-white mt-2 ml-10'>You:</div>

  const addMessage = (roboText) => {
    setMessages(
      [...messages, 
        { 
          id: messages.length, 
          text: roboText,
      
        }]);
        setSwitchText(true)
  };

  

  const userMessage = ()=>{
    setMessages(
      [...messages, 
        { 
          id: messages.length, 
          text: textData,
         
        }]);
       setSwitchText(false)
  }

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
      setTriggerTextBox(true)
      addMessage("Hello! Ajith")
    },4000)
    

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
    <div className='relative w-full h-[100vh]  flex justify-center items-center'>
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

            <div className=' w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>

                <div className="w-full h-80 relative flex flex-col items-start gap-2 p-4 ">
            
                  {messages.map((msg) => (
                    <div key={msg.id} className='flex flex-row'><div>{switchText ? roboPic : userPic}</div>
                    <motion.div
                      
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={switchText ? roboStyle : userStyle}
                    >
                      {msg.text}
                    </motion.div></div> ))}
                 

                      {/* <div ref={messagesEndRef} /> */}                   
                  </div>
                  
     
              
             
               { triggerTextBox && (<div className='relative w-full h-14'>
                <textarea 
                    className="w-[80%] h-10 ml-2 mt-2 bg-stone-800 resize-none overflow-y-auto text-white p-2 leading-normal"
                    placeholder="Type here..." value={textData} onChange={(e)=>setTextData(e.target.value)}
                  ></textarea>
                  <div className='absolute top-4 left-62' onClick={userMessage}>{sendIcon}</div>
                   

                  </div>)}

              

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
</div>)} 
//curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" 
//API Key AIzaSyB5e-M-zkQUQblTxrqjFRHwtzYWnyGeyyw

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }'



*/}