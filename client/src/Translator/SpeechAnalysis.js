import React, { useState } from "react";
import "./Translator.css";
import Translator from "./Translator";

export default function SpeechAnalysis() {
  const [output, setOutput] = useState("");
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");

  const recognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognitionInstance = new recognition();

  recognitionInstance.lang = "hi-IN";
  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = true;

  recognitionInstance.onresult = function (event) {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    setFinalTranscript(finalTranscript);

    setOutput(
      "<b>Voice Output:</b> " +
        interimTranscript +
        "<br><b>Final Output:</b> " +
        finalTranscript
    );

    // setInputText(finalTranscript);
  };

  const toggleListening = () => {
    if (listening) {
      recognitionInstance.stop();
      setListening(false);
    } else {
      recognitionInstance.start();
      setListening(true);
    }
  };

  recognitionInstance.onend = function () {
    setListening(false);
  };

  return (
    <>
      <Translator finalTranscript={finalTranscript} />
      <div>
        <div class="header">
          <div class="scrolling-text">
            <h3 class="h3-text">Voice-to-Text Translator</h3>
          </div>
      
        </div>
        <center>
          <button className="button" onClick={toggleListening}>
            {listening ? "Listening..." : "Start Listening"}
          </button>
        </center>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </>
  );
}
