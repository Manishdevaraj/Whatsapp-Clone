import  { useState, useEffect, useRef } from 'react';
import { IoIosMic } from "react-icons/io";
import { UsedbContext } from '../Hooks/UsedbContext';

const AudioRecorder = ({ id,senderId,reciverId,conversationId,type,message}) => {
  const [canRecord, setCanRecord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [src, setSrc] = useState(null);
  const [blob, setblob] = useState(null);
  const recorder = useRef(null);
  const chunks = useRef([]);
   const { upload_audio_firbase}=UsedbContext();
  useEffect(() => {
    setupAudio();
  }, []);

  const setupAudio = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(setupStream)
        .catch(err => {
          console.log(err);
        });
    } else {
      console.error("Your browser does not support audio recording");
    }
  };

  const setupStream = (stream) => {
    recorder.current = new MediaRecorder(stream);
    recorder.current.ondataavailable = (e) => {
      console.log("Data available:", e.data);
      chunks.current.push(e.data);
    };
    recorder.current.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
      console.log("Audio Blob:", audioBlob);
      setblob(audioBlob);
      chunks.current = [];
      const audioURL = URL.createObjectURL(audioBlob);
      setSrc(audioURL);
    };
    setCanRecord(true);
  };

  const toggleMic = () => {
    if (!canRecord) return;

    if (!isRecording) {
      recorder.current.start();
    } else {
      recorder.current.stop();
    }
    setIsRecording(!isRecording);
  };
  
  const uploadAudio = async () => 
    {
    if (!blob) {
      console.error('No audio blob to upload');
      return
    }
      try 
      {
        upload_audio_firbase(blob,id,conversationId,type); 
      } catch (err) {
        console.error('Error uploading audio:', err);
      }
    
    // reader.readAsDataURL(blob);
  };


  return (
    <div>
    <button className={`mic-toggle ${isRecording ? 'is-recording' : ''}`} onClick={toggleMic}> 
      <IoIosMic className="mic-icon" />
    </button>
    {src && <audio controls src={src}></audio>}
    <button onClick={uploadAudio}>send</button>
  </div>
  );
};

export default AudioRecorder;
