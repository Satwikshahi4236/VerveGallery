import React, { useState } from 'react';
import { Clock, Calendar, Filter, FileDown, ChevronDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import EmotionChart from '../components/analytics/EmotionChart';
import EmployeeSelector from '../components/common/EmployeeSelector';

const HistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  return (
    <div>
      <PageHeader 
        title="Emotional History"
        description="Track emotional patterns and historical trends"
        icon={Clock}
        actions={
          <div className="flex items-center space-x-3">
            <div className="w-64">
              <EmployeeSelector />
            </div>
            <div className="relative">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center">
                <Calendar size={16} className="mr-1.5" />
                {selectedDate.toLocaleDateString()}
                <ChevronDown size={14} className="ml-1.5" />
              </button>
            </div>
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center">
              <FileDown size={16} className="mr-1.5" />
              Export
            </button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('day')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'day' 
                ? 'text-primary-700 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Daily View
          </button>
          <button 
            onClick={() => setActiveTab('week')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'week' 
                ? 'text-primary-700 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Weekly View
          </button>
          <button 
            onClick={() => setActiveTab('month')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'month' 
                ? 'text-primary-700 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly View
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {activeTab === 'day' ? 'Daily Emotion Timeline' : 
               activeTab === 'week' ? 'Weekly Emotion Trends' : 
               'Monthly Emotion Patterns'}
            </h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-md text-gray-700 flex items-center">
                <Filter size={14} className="mr-1" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="h-96">
            <EmotionChart 
              chartType={activeTab === 'day' ? 'line' : activeTab === 'week' ? 'bar' : 'line'} 
              showLegend={true}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Emotional Event Log</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10:15 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-success-100 text-success-800 text-xs">Happy</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Facial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:30 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-warning-100 text-warning-800 text-xs">Stressed</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">62%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Voice</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1:45 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-primary-100 text-primary-800 text-xs">Neutral</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">70%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Combined</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 hour 15 minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3:20 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-accent-100 text-accent-800 text-xs">Surprised</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">58%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Facial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4:45 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-success-100 text-success-800 text-xs">Happy</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Combined</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35 minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 5 of 24 events
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-primary-50 text-primary-700 rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;