import React, { useState, useRef } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const audioRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting text:', text);

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: 'en-US',
              name: 'en-US-Wavenet-I',
              ssmlGender: 'MALE'
            },
            audioConfig: { audioEncoding: 'MP3' },
          }),
        }
      );
      console.log('API response:', response);

      const data = await response.json();
      console.log('API response data:', data);

      const audioFile = `data:audio/mpeg;base64,${data.audioContent}`;
      setAudioFile(audioFile);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Text to Speech</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <textarea
            className="form-control"
            rows="3"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="apiKey">Google API key:</label>
          <input
            type="password"
            className="form-control"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {audioFile && (
        <div>
          <audio
            src={audioFile}
            ref={audioRef}
            controls
            onEnded={() => audioRef.current.load()}
          />
        </div>
      )}
    </div>
  );
}

export default TextToSpeech;
