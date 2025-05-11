import React, { useRef, useEffect, useState } from 'react';
import { 
  Camera, 
  Mic, 
  Video, 
  VideoOff, 
  MicOff, 
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import useAppStore from '../../store';
import type { Emotion, EmotionData } from '../../types';

// This would normally use a real ML model, but for this demo we're simulating results
const EmotionDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing'>('idle');
  
  const { 
    isCameraActive, 
    toggleCamera, 
    isAudioActive, 
    toggleAudio,
    addEmotionData,
    currentEmployee
  } = useAppStore();
  
  // Simulated emotions for demo purposes
  const emotions: Emotion[] = ['happy', 'sad', 'angry', 'neutral', 'surprised', 'fearful', 'disgusted', 'stressed'];
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        setErrorMessage('');
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: isAudioActive
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setErrorMessage('Cannot access camera. Please check permissions.');
      }
    };
    
    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
    
    if (isCameraActive) {
      startCamera();
      // Start simulated emotion detection
      const intervalId = setInterval(() => {
        simulateEmotionDetection();
      }, 3000);
      
      return () => {
        clearInterval(intervalId);
        stopCamera();
      };
    }
    
    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [isCameraActive, facingMode, isAudioActive]);
  
  const simulateEmotionDetection = () => {
    if (!isCameraActive || !currentEmployee) return;
    
    setProcessingStatus('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate random emotion data
      const primaryEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      let secondaryEmotion: Emotion | null = emotions[Math.floor(Math.random() * emotions.length)];
      
      if (secondaryEmotion === primaryEmotion) {
        secondaryEmotion = null;
      }
      
      const intensities = emotions.map(emotion => ({
        emotion,
        score: emotion === primaryEmotion 
          ? Math.random() * 0.5 + 0.5 // 0.5-1.0 for primary
          : emotion === secondaryEmotion 
            ? Math.random() * 0.3 + 0.2 // 0.2-0.5 for secondary
            : Math.random() * 0.2 // 0-0.2 for others
      }));
      
      const emotionData: EmotionData = {
        primaryEmotion,
        secondaryEmotion,
        intensities,
        timestamp: new Date(),
        source: Math.random() > 0.5 ? 'facial' : (Math.random() > 0.5 ? 'voice' : 'combined')
      };
      
      addEmotionData(emotionData);
      setProcessingStatus('idle');
      
      // Draw face detection rectangle on canvas for visual feedback
      if (canvasRef.current && videoRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw a simulated face detection box
          const width = videoRef.current.videoWidth;
          const height = videoRef.current.videoHeight;
          
          if (width && height) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            
            const faceWidth = width * 0.6;
            const faceHeight = height * 0.8;
            const faceX = (width - faceWidth) / 2;
            const faceY = (height - faceHeight) / 2;
            
            ctx.strokeStyle = primaryEmotion === 'stressed' || primaryEmotion === 'angry' 
              ? '#EF4444' // Red for negative emotions
              : primaryEmotion === 'happy' || primaryEmotion === 'neutral'
                ? '#10B981' // Green for positive emotions
                : '#3B82F6'; // Blue for others
            
            ctx.lineWidth = 2;
            ctx.strokeRect(faceX, faceY, faceWidth, faceHeight);
            
            // Display emotion text
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillRect(faceX, faceY - 20, 100, 20);
            ctx.fillStyle = 'black';
            ctx.fillText(primaryEmotion, faceX + 5, faceY - 5);
          }
        }
      }
    }, 500);
  };
  
  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Camera className="mr-2" size={20} />
          Emotion Detection
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={toggleCamera}
            className={`p-2 rounded-full ${isCameraActive ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'} hover:bg-primary-200 transition-colors`}
            title={isCameraActive ? "Turn off camera" : "Turn on camera"}
          >
            {isCameraActive ? <Video size={18} /> : <VideoOff size={18} />}
          </button>
          <button 
            onClick={toggleAudio}
            className={`p-2 rounded-full ${isAudioActive ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'} hover:bg-primary-200 transition-colors`}
            title={isAudioActive ? "Turn off microphone" : "Turn on microphone"}
          >
            {isAudioActive ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button 
            onClick={switchCamera}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Switch camera"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {!isCameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-800">
            <Camera size={48} className="mb-2 opacity-50" />
            <p className="text-sm opacity-70">Camera is turned off</p>
            <button 
              onClick={toggleCamera}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md text-sm"
            >
              Turn On Camera
            </button>
          </div>
        )}
        
        {errorMessage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-error-900 bg-opacity-90">
            <AlertTriangle size={48} className="mb-2 text-error-300" />
            <p className="text-center max-w-xs">{errorMessage}</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${!isCameraActive || errorMessage ? 'hidden' : ''}`}
        />
        
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        
        {processingStatus === 'processing' && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <RefreshCcw size={12} className="mr-1 animate-spin" />
            Processing...
          </div>
        )}
      </div>
      
      {isCameraActive && currentEmployee && (
        <div className="mt-3 text-sm text-gray-500">
          <p>Monitoring: {currentEmployee.name}</p>
          <p>Department: {currentEmployee.department}</p>
        </div>
      )}
      
      {!currentEmployee && isCameraActive && (
        <div className="mt-3 text-sm text-orange-500">
          <p>No employee selected. Please select an employee to monitor.</p>
        </div>
      )}
    </div>
  );
};

export default EmotionDetector;