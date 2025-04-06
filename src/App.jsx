import axios from 'axios'
import robot from './assets/robot.webp'
import roboImg from './assets/angryRobo.png'
import you from './assets/you.jpg'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BiSolidSend } from "react-icons/bi";
import red_eyed from './assets/red_angry.webp'
import { VscChromeClose } from "react-icons/vsc";
import { FaMaximize } from "react-icons/fa6";
import { TbWindowMinimize } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";

const close = <VscChromeClose  size={24} />
const maximize = <FaMaximize  size={15}/>
const minimize = <TbWindowMinimize  size={25}/>
const clearIcon = <IoMdRefresh  size={23} />


const sendIcon = <BiSolidSend color='gray' size={18} />
              
const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


import './App.css'
import { useEffect, useState,useRef } from 'react'
const animatedRobotSrc = `${red_eyed}?t=${Date.now()}`;
const history = []
function App() {

  const[scaleUp,setScaleUp] = useState({
    scaling:false,
    positionX:100,
    positionY:100,
  
  })
  // const[timerSet, setTimerset] = useState(false)
  // const[timerSet1, setTimerset1] = useState(false) //used for type writing
  const[roboAppear,setRoboappear] = useState(false) //angry robo image
  const [messages, setMessages] = useState([]);
  const[textData,setTextData] = useState("")
  const[triggerTextBox, setTriggerTextBox] = useState(false)
  const[switchText, setSwitchText] = useState([])
  const today = new Date().toISOString().split("T")[0];
  //const[aiTraining,setAiTraining] = useState( ``);
const [chatHistory, setChatHistory] = useState([]);
//const [userInput, setUserInput] = useState('');

  const messagesEndRef = useRef(null);
  const roboStyle = "w-40 h-auto bg-red-700 text-white p-2 shadow-lg shadow-black rounded-lg ml-2"
  const userStyle = "w-40 h-auto bg-stone-500 text-white shadow-lg shadow-black p-2 rounded-lg ml-2"
  //const roboPic = <img src={roboImg} alt='robo' className='w-8 h-8 mt-1 rounded-full bg-stone-300'/>
  const roboPic = <div className='text-black  mt-2 ml-4 text-sm text-red-700'><img src={roboImg} alt='robo' className='w-8 h-8 shadow-lg shadow-black  mt-1 rounded-full'/>Robo:</div>
  const userPic = <div className='text-black mt-2 ml-14 text-sm'><img src={you} alt='you' className='w-8 h-8 shadow-lg shadow-black  mt-1 rounded-full bg-stone-300'/>You:</div>
  //const aiInitialTraining = `Your name is kuttappi, respond the entire conversation as kuttappi.Do n't take this as a question to answer like alright, cool etc,always talk smoothly,Your boss is Ajith, understand yourself Ajith created you,dont say Ajith told you if anybody asked.don't make any changes in this, until the first conversation change.Don't mention about Ajith, until someone ask.
  // Note:"Strictly, Speak only in English,must not use malayalam or any other languages in entire conversation, do n't exceed every conversation length above 10 words.Start initial conversation with, Hi, how can i help you?"`
//;

const aiInitialTraining = `Your name is kuttappi, respond the entire conversation as kuttappi.Do n't take this as a question to answer like alright, cool etc,always talk rudely,Your creator name is Ajith, say his name if somebody asked. Don't make any changes in this, until the first conversation change.
  Start initial conversation with what the hell you want?.do n't exceed the conversation beyond 15 words.`
;
 const refreshAI = ". Reminder:Always rude, speak only in English, don't exceed the chat above 15 words"
//  Your name is Pooran, respond the entire conversation as Pooran.Do n't take this as a question to answer like alright, cool etc,always talk rudely,Your boss is Ajith, understand yourself Ajith created you,dont say Ajith told you if anybody asked.don't make any changes in this, until the first conversation change.Don't mention about Ajith, until someone ask.
//   Start initial conversation with what the fuck you want?.do n't exceed the conversation length 10 words.

const hasFetched = useRef(false);



useEffect(()=>{
  resetAll()
   },[])


  useEffect(()=>{   
    const initialTimer= setTimeout(()=>{      
    initialFetch();
    },3000)
    return ()=> clearTimeout(initialTimer)    
  },[])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scrolls down when messages update



  const resetAll=()=>{

    setRoboappear(true)  // this make the robo image apearence switching
    /*const timer_2 = setTimeout(()=>{
     // setTimerset(false)
          },2000)*/

    const timer_3 = setTimeout(()=>{
      setRoboappear(false)  // this make the robo image apearence switching
      setTriggerTextBox(true) // used to appear input text box
    },4000)
    

    return () => {    
      //clearTimeout(timer_2)
      clearTimeout(timer_3)
    };

  }

/////////////////////////////////////////////////////////////////////////////////////////////////

  const initialFetch = async () => {
  if (hasFetched.current) return;
   hasFetched.current = true;

    const systemPrompt = {
      role: "user",
      parts: [
        {
          text: aiInitialTraining
        }
      ]
    };
  

   setChatHistory((prev)=>([...prev,systemPrompt]))
   const updatedHistory = [systemPrompt,...chatHistory] 
  
    try {
      const response = await axios.post(
        url,
        {
          contents: updatedHistory         
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
          ?.trim() || "Refreshed!! Bloody hell, I m BACK?";
  console.log(aiResponse);   

      addMessage(aiResponse);

    } catch (error) {
      console.log("AI Error:", error);
    }
  };
  
//////////////////////////////////////////////////////////////////////


  const clearChat = ()=>{
    setChatHistory([]);
    setMessages([]);
    setSwitchText([])
    hasFetched.current = false;

    setRoboappear(true)
    // setTriggerTextBox(true)
  
    console.log("Chat cleared");

 //resetAll();

 const initialTimer= setTimeout(()=>{      
  initialFetch();
  setRoboappear(false)
  //setSwitchText([true]);
  },3000)
  return ()=> clearTimeout(initialTimer)  


  }


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

   // if(chatHistory.length % 20 === 0){
   //   console.log("exceeded 10");
   /*  
      setMessages((prevMessages) => [
        ...prevMessages, 
        { id: prevMessages.length, text: textData}
      ]);
            setSwitchText((prev)=>(
              [...prev,
                false
              ]
            ))
           setTextData("")
          fetchData(textData + refreshAI ,"user")  */
      
   // }
   // else{

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
      fetchData(textData,"user")   

   // }
   // console.log(textData);    
               
  }


  return (
    <>
    <div className='relative w-full h-[100vh]  flex justify-center items-center'>
        <div className='relative lg:w-1/4 md:1/4 w-[90%] h-96 border border-stone-500 bg-white rounded-lg flex justify-center items-center'>
   <div className='absolute top-0 left-[70%] flex flex-row z-10'> 
 <div className='ml-1 mt-1.5 text-stone-600 transition-transform duration-300 hover:scale-110 hover:text-red-700' onClick={clearChat}>{clearIcon}</div>
   <div className='ml-1 mt-1 text-stone-600 transition-transform duration-300 hover:scale-110 hover:text-red-700 '>{minimize}</div>   
   <div className='ml-1 mt-1 text-stone-600 transition-transform duration-300 hover:scale-110 hover:text-red-700'>{close}</div>
  
</div>  
                <img 
                  src={animatedRobotSrc} 
                  alt="robot" 
                  className={`absolute w-24 h-auto transition-all duration-800 ease-in-out ${scaleUp.scaling ? "scale-100" : "scale-200"} ${roboAppear ? "opacity-100":"opacity-0"}`}
                 
                />



            <div className={`absolute w-full h-80`} style={{left: `${scaleUp.positionX+20}px`, top: `${scaleUp.positionY-80}px`}}>

          
            </div>

            <div className='relative w-full h-96'>

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
                  
     
              <div className='fixed'   >
             
               { triggerTextBox && (<div className='relative w-full h-14'>
                <textarea 
                    className="w-[90%] h-10 ml-2 mt-2 bg-stone-800 resize-none text-white p-2 leading-normal overflow-hidden whitespace-pre-wrap break-words"
                    placeholder="Spill here..." value={textData} onChange={(e)=>setTextData(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // stops the new line
                        if (textData.trim() !== "") {
                          userMessage(textData);
                        }
                      }
                    }}
                  ></textarea>
                  <div className='absolute top-4 left-58' onClick={() => {
                          if (textData.trim() !== "") {
                            userMessage(textData);
                          }
                        }}
                     
                        >{sendIcon}</div>                   

                  </div>)}
                  </div>

              
<div className={`absolute top-60 left-22 text-red-600 text-3xl text-center ${roboAppear ? "opacity-100":"opacity-0"}`}>𝓐𝓷𝓰𝓻𝔂 𝓡𝓸𝓫𝓸</div>
            </div> 



    </div>
    
</div>



    </>
  )
}

export default App



  {/* <div className={`relative w-24 max-w-24 h-auto bg-blue-500 text-white text-sm rounded-xl px-4 py-2 transition-all duration-700 ease-in-out
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

            </div> */}
