import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import SpeechAnalysis from "./SpeechAnalysis";
import "./Translator.css";

const socket = io.connect("http://localhost:4000");

export default function Socket() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {
      message: message,
    });
  };

  useEffect(() => {
    socket.on(
      "recieve",
      (data) => {
        console.log(data);
        setMessageRecieved(data.message);
      },
      [socket]
    );
  });

  // useEffect(()=>{
  //   message = window.localStorage.getItem("TranslatedText")
  //   if(message){
  //       sendMessage();
  //   }
  // })
  
  return (
    <>
      <div class="header">
        <div class="scrolling-text">
          <h3 class="h3-text">Voice Translator App</h3>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send Message</button>
        <p className="caption">Caption: {messageRecieved}</p>
        <SpeechAnalysis />
      </div>
    </>
  );
}
