import React from 'react';
import { AlertTriangle, Check, User, Clock } from 'lucide-react';
import useAppStore from '../../store';
import type { StressAlert } from '../../types';

interface StressAlertProps {
  alert: StressAlert;
}

const StressAlertComponent: React.FC<StressAlertProps> = ({ alert }) => {
  const { acknowledgeAlert } = useAppStore();
  
  const handleAcknowledge = () => {
    acknowledgeAlert(alert.id);
  };
  
  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-error-100 text-error-800 border-error-300';
      case 'high':
        return 'bg-warning-100 text-warning-800 border-warning-300';
      case 'moderate':
        return 'bg-accent-100 text-accent-800 border-accent-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className={`border ${alert.isAcknowledged ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'} rounded-lg shadow-sm p-4 transition-colors`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${
          alert.isAcknowledged ? 'bg-gray-100' : 
          alert.level === 'critical' ? 'bg-error-100' : 
          alert.level === 'high' ? 'bg-warning-100' : 
          'bg-accent-100'
        } mr-3`}>
          <AlertTriangle size={20} className={
            alert.isAcknowledged ? 'text-gray-400' : 
            alert.level === 'critical' ? 'text-error-500' : 
            alert.level === 'high' ? 'text-warning-500' : 
            'text-accent-500'
          } />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${alert.isAcknowledged ? 'text-gray-500' : 'text-gray-900'}`}>
              Stress Alert: {alert.employeeName}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelStyles(alert.level)}`}>
              {alert.level.charAt(0).toUpperCase() + alert.level.slice(1)}
            </span>
          </div>
          
          <div className="mt-1 text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{new Date(alert.timestamp).toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span>Duration: {alert.duration}</span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <User size={14} className="mr-1 text-gray-400" />
              <span className="text-xs text-gray-500">Employee ID: {alert.employeeId}</span>
            </div>
            
            {!alert.isAcknowledged && (
              <button 
                onClick={handleAcknowledge}
                className="flex items-center text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors"
              >
                <Check size={14} className="mr-1" /> Acknowledge
              </button>
            )}
            
            {alert.isAcknowledged && (
              <span className="text-xs text-gray-400 flex items-center">
                <Check size={14} className="mr-1" /> Acknowledged
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressAlertComponent;