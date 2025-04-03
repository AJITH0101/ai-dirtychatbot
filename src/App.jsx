import axios from 'axios'
import robot from './assets/robot.webp'
import roboImg from './assets/roboImg.webp'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BiSolidSend } from "react-icons/bi";


const sendIcon = <BiSolidSend color='white' size={18} />
              
const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


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
  const[switchText, setSwitchText] = useState([true])
  const messagesEndRef = useRef(null);
  const roboStyle = "w-40 h-auto bg-blue-500 text-white p-2 rounded-lg ml-2"
  const userStyle = "w-40 h-auto bg-white text-stone-700 p-2 rounded-lg ml-2"
  const roboPic = <img src={roboImg} alt='robo' className='w-8 h-8 mt-1 rounded-full bg-stone-300'/>
  const userPic = <div className='text-white mt-2 ml-8'>You:</div>
  const trainAI = `
  Your name is Matty.
  This chat is about Aayush Moisturiser, a completely ayurvedic product.
  The company's contact is +91 9988776655.
  If someone asks something else, say "I don't have much idea about that."
  Regardless of the input, always reply with "Hello! How can I help you?.
`;




  const fetchData = async(askAI)=>{
 

    try {
      const response = await axios.post(url,
      {
       contents: [{ parts: [{ text: askAI }] }] 
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
  
    //console.log("AI Response",response.data.candidates[0].content.parts[0].text);
    const aiResponse = response.data.candidates[0].content.parts[0].text
    addMessage(aiResponse)
    
      
    } catch (error) {
      console.log(error);
      
      
    }
   
  }

  const addMessage = (roboText) => {

    
    setMessages(
      [...messages, 
        { 
          id: messages.length, 
          text: roboText,
      
        }]);
        
        setSwitchText((prev)=>(
          [...prev,
            false
          ]
        ))
console.log(messages.text);


  };

  

  const userMessage = (textData)=>{
   // console.log(textData);
    
    
    setMessages(
      [...messages, 
        { 
          id: messages.length, 
          text: textData,
         
        }]);
        setSwitchText((prev)=>(
          [...prev,
            true
          ]
        ))
       setTextData("")
       fetchData(textData)
       console.log(messages);
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

      fetchData(trainAI)
      //addMessage("Hello! Ajith")
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



            <div className={`absolute w-full h-80`} style={{left: `${scaleUp.positionX+20}px`, top: `${scaleUp.positionY-80}px`}}>
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

            <div className=' w-full h-96'>

                <div className="w-full h-80 relative flex flex-col items-start gap-2 p-4  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
            
                  {messages.map((msg) => (
                    <div key={msg.id} className='flex flex-row'><div>{switchText[msg.id] ? roboPic : userPic}</div>
                    <motion.div
                      
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={switchText[msg.id]  ? roboStyle : userStyle}
                    >
                      {msg.text}
                    </motion.div></div> ))}
                 

                       <div ref={messagesEndRef} />                 
                  </div>
                  
     
              <div className='fixed'>
             
               { triggerTextBox && (<div className='relative w-full h-14'>
                <textarea 
                    className="w-[90%] h-10 ml-2 mt-2 bg-stone-800 resize-none overflow-y-auto text-white p-2 leading-normal"
                    placeholder="Type here..." value={textData} onChange={(e)=>setTextData(e.target.value)}
                  ></textarea>
                  <div className='absolute top-4 left-58' onClick={() => {
                          if (textData.trim() !== "") {
                            userMessage(textData);
                          }
                        }}>{sendIcon}</div>                   

                  </div>)}
                  </div>

              

            </div> 



    </div>
</div>



    </>
  )
}

export default App
