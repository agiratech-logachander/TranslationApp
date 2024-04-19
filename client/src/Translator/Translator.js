import { useState, useEffect } from "react";
import './Translator.css';
import { AiOutlineClose } from 'react-icons/ai';




const Translator = (props) => {
  // const [inputText, setInputText] = useState();
  const inputText = props.finalTranscript
  const [outputLang, setOutputLang] = useState('en');
  const [outputText, setOutputText] = useState('');
  const [isTranslated, setIsTranslated] = useState();
  const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0&to%5B0%5D=';
  const Query_Params = '&textType=plain&profanityAction=NoAction';
  

  const translate = () => {
    console.log("New ------  "+props.finalTranscript);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `214751ac8cmsh537fc4f2ab7b40bp12e8abjsn5841bc97241a`,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: `[{"Text":"${inputText}"}]`
    };

    fetch(`${url}${outputLang}${Query_Params}`, options)
      .then(response => {
        if (response.status !== 200) {
          setIsTranslated(false);
          return;
        }
        setIsTranslated(true);
        response.json()
          .then(response => {
            const translatedText = response[0].translations[0].text;
            setOutputText(translatedText);
            window.localStorage.setItem("TranslatedText", translatedText)
          })
      })
      .catch(err => {
        setIsTranslated(false);
        console.error(err)
      });
  }

  const clearInput = () => {
    // setInputText('');
    setOutputText('');
    setIsTranslated();
  }

  // Trigger translation whenever inputText or outputLang changes
  useEffect(() => {
    if (inputText) {
      translate();
    }
    if(!inputText){
      window.localStorage.removeItem("TranslatedText")
    }
  });

  return (
    <> 
    <section className="translator">
      <div className="row-wrapper">
        <div className="translator-container input-lang">
          <div className="top-row">
            {/* <button
              className="btn btn-primary btn-translate"
              onClick={translate}
            >
              Translate
            </button> */}
          </div>
          <form className="input-form">
            <textarea
              className="text-box"
              placeholder="Enter text (any language)"
              // onChange={e => setInputText(e.target.value)}
              value={inputText}
              // value={props.finalTranscript}
            />

            {inputText && (
              <AiOutlineClose
                className="icon-btn close-btn"
                onClick={clearInput}
              />
            )}
            
          </form>
        </div>
        <div className="translator-container output-lang">
          <div className="top-row">
            <select
              name="languages"
              id="languages"
              className="form-select form-select-sm"
              onChange={e => setOutputLang(e.target.value)}
              value={outputLang}
            >
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <p className="text-box output-box">
            {isTranslated === false ? (
              <span className="output-placeholder translation-error">Translation failed</span>
            ) : outputText === "" ? (
              <span className="output-placeholder">Select a language</span>
            ) : (
              outputText
            )}
          </p>
        </div>
      </div>
    </section>
  </>
  );
}

export default Translator;

