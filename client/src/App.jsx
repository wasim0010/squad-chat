/* eslint-disable react-hooks/exhaustive-deps */

// import e from "express";
// import { Input } from "postcss";
import React, {useEffect, useState } from "react";
import io from "socket.io-client"; 

const socket = io("http://localhost:5000");

const App = () => {
  const [first, setfirst] = useState(" ");
  const [chat, setchat] = useState(false);
  const [message, setmessage] = useState([]);
  const [newMessage, setnewMessage] = useState(" ");
  useEffect(() => {
    
  socket.on("received-message", (mesage) => {
    setmessage([...message ,mesage]);
    // console.log(message);
  });
  console.log(message);
  },[ message, socket]);
  
  const HandleSubmit =(e)=>{
    e.preventDefault();
    const mesageData ={
 message :newMessage,
 user: first,
  time : new Date(Date.now()).getHours() +":" + new Date(Date.now()).getMinutes() ,


    };
    if(!newMessage == ""){
      socket.emit("send-message" ,mesageData);
    }else{
      alert("message cannot be empty");
    }
   setnewMessage(" ") ;
  };

  return (
    <>
      <div
        className="w-screen h-screen bg-gray-100 flex justify-center
      items-center gap-2"
      >
        {chat ? (
          <div className="rounded-md p-2 w-full  md:[80vw] lg:w-[40vw]">
            <h1 className=" text-center font-bold text-xl my-2 uppercase"> Squad Chat</h1>
            <div>
              <div className=" overflow-scroll h-[80vh] lg:h-[60vh]">
{
  message.map((mesage,index)=>{
    return(
    <div key ={index} className={`flex rounded-md shadow-md my-5 w-fit ${ first === mesage.user && "ml-auto" } `}>
    <div className=" bg-green-400 flex justify-center item-center rounded-l-md">
    <h3 className="font-bold text-lg px-2 "> 
{mesage.user.charAt(0).toUpperCase()}
    </h3>
    </div>
<div className="px-2 bg-white rounded-md">
<span className="text-sm">{mesage.user}</span>
<h3 className="font-bold">{mesage.message}</h3>
<h3 className="text-xs text-right">{mesage.time}</h3>
</div>

    
    </div>
   

    
   ) })
}
              </div>
              <form className=" flex  gap-2 md:gap-4 justify-between " 
              onSubmit={HandleSubmit}
              
              >
                <input type="text"
                placeholder="type your message"  
                className="  w-full rounded-md border-2 outline-indigo-300 px-3 py-2 gap-2 "
                value={newMessage}
                onChange={ (e)=>setnewMessage(e.target.value)}
                
                
               / >
               <button type="submit" className="bg-green-500 text-white rounded-md font-bold px-3 py-2" > SEND</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen  flex justify-center items-center ">
            <input
              type="text"
              name=" "
              id=""
              value={first}
              onChange={(e)=> setfirst (e.target.value)}
              className="text-center py-3 px-3 outline-none border-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-500 text-white  px-3 py-2 rounded-md font-bold " onClick ={()=> !first == "" &&
               setchat(true) }
            >
              {" "}
              Start Chat{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
