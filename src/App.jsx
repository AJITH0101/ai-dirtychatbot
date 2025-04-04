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
const history = []
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
  const[switchText, setSwitchText] = useState([])
  const today = new Date().toISOString().split("T")[0];
  const[aiTraining,setAiTraining] = useState( `
 
 
`)


const [chatHistory, setChatHistory] = useState([]);
const [userInput, setUserInput] = useState('');

  const messagesEndRef = useRef(null);
  const roboStyle = "w-40 h-auto bg-blue-500 text-white p-2 rounded-lg ml-2"
  const userStyle = "w-40 h-auto bg-white text-stone-700 p-2 rounded-lg ml-2"
  const roboPic = <img src={roboImg} alt='robo' className='w-8 h-8 mt-1 rounded-full bg-stone-300'/>
  const userPic = <div className='text-white mt-2 ml-8'>You:</div>
  const trainAI = `
  start with Hi, I m Kundiyamma
`;
const hasFetched = useRef(false);
  useEffect(()=>{
   // 

    const initialFetch = async () => {
      if (hasFetched.current) return;
     hasFetched.current = true;

      const systemPrompt = {
        role: "user",
        parts: [
          {
            text: "Hello"
          }
        ]
      };
    
     ///const updatedHistory = [systemPrompt, ...chatHistory];
     setChatHistory((prev)=>([...prev,systemPrompt]))
     const updatedHistory = [systemPrompt,...chatHistory]

    
      try {
        const response = await axios.post(
          url,
          {
            contents: updatedHistory          ////////////////////////////////////////////
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
    
        const aiResponse =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text
            ?.replace(/\*/g, "")
            ?.trim() || "No response";
    
        // Add AI response to UI
        addMessage(aiResponse);
    
        // Update chat history
        // const newModelMessage = {
        //   role: "model",
        //   parts: [{ text: aiResponse }]
        // };
        //setChatHistory(prev => [...prev, updatedHistory]);
      } catch (error) {
        console.log("Gemini Error:", error);
      }
    };
    
    initialFetch();
    
  },[])


  const fetchData = async(askAI,setRole)=>{

    const newUserMessage = { role: setRole, parts: [{ text: askAI }] };
    const updatedHistory = [...chatHistory, newUserMessage];

    setChatHistory(updatedHistory);
 

    try {
      const response = await axios.post(url,
      {
        contents: updatedHistory,
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
  
    //console.log("AI Response",response.data.candidates[0].content.parts[0].text);
   const aiResponse = response.data.candidates[0].content.parts[0].text.replace(/\*/g, '').trim();
    //const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*/g, '').trim() || 'No response';

//console.log(aiResponse);

   addMessage(aiResponse)

    const newModelMessage = {
      role: 'model',
      parts: [{ text: replyText }],
    };
    setChatHistory((prev) => [...prev, newModelMessage]);
      
    } catch (error) {
      console.log(error);      
      
    }

    console.log(chatHistory);   
   
  }


  const addMessage = (roboText) => {

    setMessages((prevMessages) => [
      ...prevMessages, 
      { id: prevMessages.length, text: roboText }
    ]);
        
        setSwitchText((prev)=>(
          [...prev,
            true
          ]
        ))


        const systemPrompt = {
          role: "model",
          parts: [
            {
              text: roboText
            }
          ]
        };
      
      // const updatedHistory = [systemPrompt, ...chatHistory];
      setChatHistory((prev)=>([...prev,systemPrompt]))
       //setChatHistory(prev => [...prev, updatedHistory]);

console.log(messages.text);

  };

  

  const userMessage = (textData)=>{
   // console.log(textData);
    
    
   setMessages((prevMessages) => [
    ...prevMessages, 
    { id: prevMessages.length, text: textData }
  ]);
        setSwitchText((prev)=>(
          [...prev,
            false
          ]
        ))
       setTextData("")

      // history.push(textData)
       //const historyString = history.join("\n");
      // setAiTraining((prevText) => `${prevText}\n${textData}`);
       //fetchData(aiTraining)
        fetchData(textData,"user")
       /// console.log(historyString);
        
       
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

     //fetchData(trainAI)
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
