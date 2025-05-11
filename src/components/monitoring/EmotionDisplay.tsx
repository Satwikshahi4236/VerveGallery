import React from 'react';
import { 
  Smile,
  Frown,
  Meh,
  AlertTriangle,
  Heart,
  Clock,
  Activity
} from 'lucide-react';
import useAppStore from '../../store';
import type { Emotion } from '../../types';

const EmotionDisplay: React.FC = () => {
  const { emotionData, currentEmployee } = useAppStore();
  
  // Get the most recent emotion if available
  const latestEmotion = emotionData.length > 0 
    ? emotionData[emotionData.length - 1] 
    : null;
  
  // Helper function to get icon based on emotion
  const getEmotionIcon = (emotion: Emotion) => {
    switch (emotion) {
      case 'happy':
        return <Smile className="text-success-500" />;
      case 'sad':
        return <Frown className="text-accent-500" />;
      case 'angry':
        return <Frown className="text-error-500" />;
      case 'neutral':
        return <Meh className="text-primary-500" />;
      case 'stressed':
        return <AlertTriangle className="text-error-500" />;
      case 'surprised':
        return <AlertTriangle className="text-accent-500" />;
      case 'fearful':
        return <AlertTriangle className="text-warning-500" />;
      case 'disgusted':
        return <Frown className="text-warning-500" />;
      default:
        return <Meh className="text-gray-500" />;
    }
  };
  
  // Helper function to get color based on emotion
  const getEmotionColor = (emotion: Emotion) => {
    switch (emotion) {
      case 'happy':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'sad':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'angry':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'neutral':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'stressed':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'surprised':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'fearful':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'disgusted':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Generate fake emotion intensity bars
  const renderIntensityBars = () => {
    if (!latestEmotion) return null;
    
    return (
      <div className="mt-4 space-y-2">
        {latestEmotion.intensities.sort((a, b) => b.score - a.score).map(intensity => (
          <div key={intensity.emotion} className="flex items-center">
            <span className="w-20 text-xs text-gray-600 capitalize">{intensity.emotion}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  intensity.emotion === 'happy' ? 'bg-success-500' :
                  intensity.emotion === 'sad' ? 'bg-accent-500' :
                  intensity.emotion === 'angry' ? 'bg-error-500' :
                  intensity.emotion === 'stressed' ? 'bg-error-500' :
                  intensity.emotion === 'neutral' ? 'bg-primary-500' :
                  intensity.emotion === 'surprised' ? 'bg-accent-500' :
                  intensity.emotion === 'fearful' ? 'bg-warning-500' :
                  'bg-warning-500' // disgusted
                }`}
                style={{ width: `${intensity.score * 100}%` }}
              />
            </div>
            <span className="w-10 text-right text-xs text-gray-600">
              {Math.round(intensity.score * 100)}%
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Heart className="mr-2" size={20} />
          Current Emotional State
        </h2>
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          {latestEmotion ? (
            <span>
              Updated {new Date(latestEmotion.timestamp).toLocaleTimeString()}
            </span>
          ) : (
            <span>No data yet</span>
          )}
        </div>
      </div>
      
      {!currentEmployee ? (
        <div className="p-6 text-center text-gray-500">
          <Meh size={40} className="mx-auto mb-2 opacity-30" />
          <p>Please select an employee to monitor their emotional state</p>
        </div>
      ) : !latestEmotion ? (
        <div className="p-6 text-center text-gray-500">
          <Activity size={40} className="mx-auto mb-2 opacity-30" />
          <p>Waiting for emotion data...</p>
          <p className="text-xs mt-2">Turn on the camera to begin monitoring</p>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
              {getEmotionIcon(latestEmotion.primaryEmotion)}
            </div>
            <div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getEmotionColor(latestEmotion.primaryEmotion)}`}>
                {latestEmotion.primaryEmotion.charAt(0).toUpperCase() + latestEmotion.primaryEmotion.slice(1)}
              </div>
              {latestEmotion.secondaryEmotion && (
                <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium inline-block ${getEmotionColor(latestEmotion.secondaryEmotion)}`}>
                  {latestEmotion.secondaryEmotion.charAt(0).toUpperCase() + latestEmotion.secondaryEmotion.slice(1)}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Detected via: {latestEmotion.source === 'facial' ? 'Facial Expression' : 
                  latestEmotion.source === 'voice' ? 'Voice Analysis' : 'Combined Analysis'}
              </p>
            </div>
          </div>
          
          {renderIntensityBars()}
        </div>
      )}
    </div>
  );
};

export default EmotionDisplay;