import React, { useState, useEffect, useRef } from 'react';

const languageOptions = [
  { code: 'hi-IN', label: 'Hindi' },
  { code: 'mr-IN', label: 'Marathi' },
  { code: 'ta-IN', label: 'Tamil' },
  { code: 'bn-IN', label: 'Bengali' },
  { code: 'gu-IN', label: 'Gujarati' },
  { code: 'en-US', label: 'English' }
];

const SpeechToEnglishTranslator = () => {
  const [isListening, setIsListening] = useState(false);
  const [sourceLang, setSourceLang] = useState('hi-IN');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setOriginalText(spokenText);
      translateToEnglish(spokenText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleListen = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.lang = sourceLang;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setOriginalText('');
      setTranslatedText('');
      recognitionRef.current.start();
    }

    setIsListening(!isListening);
  };

  const translateToEnglish = async (text) => {
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: 'en',
          format: 'text'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await res.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        setTranslatedText('⚠️ Could not translate. Try again.');
      }
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('⚠️ Translation failed. Server may be down or blocked.');
    }
  };
  
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">🌍 Regional Speech ➜ 🇺🇸 English</h1>

      <div className="flex gap-2 items-center">
        <label className="font-medium">Select Language:</label>
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleListen}
        className={`w-full py-3 font-bold text-white rounded-lg ${
          isListening ? 'bg-red-600' : 'bg-green-600'
        }`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      <div>
        <h2 className="text-lg font-semibold">Original Speech:</h2>
        <div className="bg-gray-100 p-3 rounded min-h-[50px]">{originalText || '—'}</div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Translated English:</h2>
        <div className="bg-green-100 p-3 rounded min-h-[50px]">{translatedText || '—'}</div>
      </div>
    </div>
  );
};

export default SpeechToEnglishTranslator;




