import { useState, useRef, useEffect } from 'react';
import { Camera, Loader, RotateCcw, Search } from 'lucide-react';
import { detectFaces, cropFaceFromImage } from '../../services/faceDetectionService';
import Webcam from 'react-webcam';

interface FaceDetectionProps {
  onFaceDetected: (faceImageData: string) => void;
}

const FaceDetection = ({ onFaceDetected }: FaceDetectionProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedFace, setDetectedFace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);
  const capturedImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize face detection when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        // This will be handled by the faceDetectionService
      } catch (err) {
        setError('Failed to initialize face detection.');
        console.error('Face detection initialization error:', err);
      }
    };
    
    loadModel();
  }, []);
  
  const startCamera = () => {
    setIsCameraActive(true);
    setError(null);
  };
  
  const stopCamera = () => {
    setIsCameraActive(false);
  };
  
  const captureImage = async () => {
    if (!webcamRef.current) return;
    
    setIsCapturing(true);
    setError(null);
    
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      
      // Wait for the image to load before processing
      setTimeout(async () => {
        await processCapturedImage();
      }, 300);
    } catch (err) {
      setError('Failed to capture image.');
      console.error('Image capture error:', err);
    } finally {
      setIsCapturing(false);
    }
  };
  
  const processCapturedImage = async () => {
    if (!capturedImageRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    try {
      const faceData = await cropFaceFromImage(
        capturedImageRef.current,
        canvasRef.current
      );
      
      if (faceData) {
        setDetectedFace(faceData);
      } else {
        setError('No face detected. Please try again with a clearer view of your face.');
      }
    } catch (err) {
      setError('Failed to process face detection.');
      console.error('Face processing error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setDetectedFace(null);
    setError(null);
  };
  
  const searchWithFace = () => {
    if (detectedFace) {
      onFaceDetected(detectedFace);
    }
  };
  
  const webcamConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user',
  };
  
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 rounded-lg bg-white p-6 shadow-smooth dark:bg-secondary-800">
        <h2 className="mb-4 text-xl font-medium">Face Search</h2>
        
        {error && (
          <div className="mb-4 rounded-lg bg-error-50 p-3 text-sm text-error-700 dark:bg-error-900/20 dark:text-error-400">
            {error}
          </div>
        )}
        
        <div className="relative mb-4 overflow-hidden rounded-lg bg-secondary-100 dark:bg-secondary-700">
          {isCameraActive && !capturedImage ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={webcamConstraints}
              className="mx-auto h-auto w-full max-w-full"
            />
          ) : capturedImage ? (
            <img
              ref={capturedImageRef}
              src={capturedImage}
              alt="Captured"
              className="mx-auto h-auto w-full"
            />
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center p-6 text-center">
              <Camera className="mb-4 h-16 w-16 text-secondary-400" />
              <p className="mb-2 text-lg font-medium">Camera is currently off</p>
              <p className="mb-4 text-sm text-secondary-600 dark:text-secondary-400">
                Turn on the camera to take a photo for face search
              </p>
              <button 
                onClick={startCamera}
                className="btn btn-primary"
              >
                <Camera className="mr-2 h-4 w-4" />
                Enable Camera
              </button>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="spinner" />
                <p className="mt-4 text-white">Processing face detection...</p>
              </div>
            </div>
          )}
          
          {/* Hidden canvas for face processing */}
          <canvas 
            ref={canvasRef}
            style={{ display: 'none' }}
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {isCameraActive && !capturedImage && (
            <>
              <button
                onClick={captureImage}
                disabled={isCapturing}
                className="btn btn-primary"
              >
                {isCapturing ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </>
                )}
              </button>
              <button
                onClick={stopCamera}
                className="btn btn-outline"
              >
                Turn Off Camera
              </button>
            </>
          )}
          
          {capturedImage && (
            <>
              <button
                onClick={resetCapture}
                className="btn btn-outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Photo
              </button>
              
              {detectedFace && (
                <button
                  onClick={searchWithFace}
                  className="btn btn-primary"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search with This Face
                </button>
              )}
            </>
          )}
        </div>
      </div>
      
      {detectedFace && (
        <div className="mb-6 rounded-lg bg-white p-6 shadow-smooth dark:bg-secondary-800">
          <h3 className="mb-3 font-medium">Detected Face</h3>
          <div className="flex items-center space-x-4">
            <div className="h-24 w-24 overflow-hidden rounded-lg border border-secondary-200 dark:border-secondary-700">
              <img
                src={detectedFace}
                alt="Detected face"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                This face will be used to search for similar photos in your gallery.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceDetection;