import React, { useState, useRef } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [voiceName, setVoiceName] = useState('en-US-Wavenet-I');
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
              name: voiceName,
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

  const voiceOptions = [
    { name: 'en-US-Wavenet-A', label: 'Voice A' },
    { name: 'en-US-Wavenet-B', label: 'Voice B' },
    { name: 'en-US-Wavenet-C', label: 'Voice C' },
    { name: 'en-US-Wavenet-D', label: 'Voice D' },
    { name: 'en-US-Wavenet-E', label: 'Voice E' },
    { name: 'en-US-Wavenet-F', label: 'Voice F' },
    { name: 'en-US-Wavenet-G', label: 'Voice G' },
    { name: 'en-US-Wavenet-H', label: 'Voice H' },
    { name: 'en-US-Wavenet-I', label: 'Voice I' },
    { name: 'en-US-Wavenet-J', label: 'Voice J' },
  ];

  return (
    <div className="container">
      <h1>Text to Speech</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            className="form-control"
            rows="3"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="voiceName">Voice</label>
          <select
            className="form-control"
            id="voiceName"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
          >
            {voiceOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="apiKey">Google API key</label>
          <input
            type="password"
            className="form-control"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
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
