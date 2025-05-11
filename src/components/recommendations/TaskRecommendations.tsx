import React from 'react';
import { CheckSquare, ArrowRight, BarChart2 } from 'lucide-react';
import useAppStore from '../../store';

const TaskRecommendations: React.FC = () => {
  const { emotionData, taskRecommendations, currentEmployee } = useAppStore();
  
  // Get the most recent emotion
  const latestEmotion = emotionData.length > 0 
    ? emotionData[emotionData.length - 1].primaryEmotion
    : null;
  
  // Get recommendations based on the latest emotion
  const currentRecommendations = latestEmotion
    ? taskRecommendations.filter(task => task.forEmotion === latestEmotion)
    : [];
  
  // Add some general recommendations if we don't have enough specific ones
  const allRecommendations = currentRecommendations.length < 3
    ? [
        ...currentRecommendations,
        ...taskRecommendations
          .filter(task => task.forEmotion !== latestEmotion)
          .slice(0, 3 - currentRecommendations.length)
      ]
    : currentRecommendations;
  
  // Helper function to get priority style
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'medium':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'low':
        return 'bg-success-100 text-success-800 border-success-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <CheckSquare className="mr-2" size={20} />
          Recommended Tasks
        </h2>
        <button className="text-primary-600 hover:text-primary-800 text-sm flex items-center">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      {!currentEmployee ? (
        <div className="p-6 text-center text-gray-500">
          <CheckSquare size={40} className="mx-auto mb-2 opacity-30" />
          <p>Select an employee to see task recommendations</p>
        </div>
      ) : !latestEmotion ? (
        <div className="p-6 text-center text-gray-500">
          <BarChart2 size={40} className="mx-auto mb-2 opacity-30" />
          <p>Waiting for emotion data to generate recommendations...</p>
        </div>
      ) : allRecommendations.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <CheckSquare size={40} className="mx-auto mb-2 opacity-30" />
          <p>No recommendations available at this time</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allRecommendations.map((task) => (
            <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex justify-end mt-3">
                <button className="px-3 py-1 bg-primary-50 text-primary-700 rounded-md text-sm hover:bg-primary-100 transition-colors">
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {latestEmotion && allRecommendations.length > 0 && (
        <div className="text-xs text-gray-500 mt-4">
          <p>
            Recommendations based on detected emotion: <span className="font-medium">{latestEmotion.charAt(0).toUpperCase() + latestEmotion.slice(1)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskRecommendations;