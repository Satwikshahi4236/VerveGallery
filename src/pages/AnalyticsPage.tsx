import React from 'react';
import { BarChart2, FileDown, BarChart, LineChart } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import EmotionChart from '../components/analytics/EmotionChart';
import EmployeeSelector from '../components/common/EmployeeSelector';

const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Team Analytics"
        description="Track and analyze emotional wellness across teams and departments"
        icon={BarChart2}
        actions={
          <div className="flex items-center space-x-3">
            <div className="w-64">
              <EmployeeSelector />
            </div>
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center">
              <FileDown size={16} className="mr-1.5" />
              Export Data
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Team Mood</h3>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-success-50 rounded-lg p-3 border border-success-100">
              <h4 className="text-xs font-medium text-success-800">Engineering</h4>
              <p className="text-2xl font-bold text-success-900 mt-1">Happy</p>
              <p className="text-xs text-success-600 mt-1">↑ 12% from yesterday</p>
            </div>
            <div className="bg-primary-50 rounded-lg p-3 border border-primary-100">
              <h4 className="text-xs font-medium text-primary-800">Design</h4>
              <p className="text-2xl font-bold text-primary-900 mt-1">Neutral</p>
              <p className="text-xs text-primary-600 mt-1">↔ Same as yesterday</p>
            </div>
            <div className="bg-warning-50 rounded-lg p-3 border border-warning-100">
              <h4 className="text-xs font-medium text-warning-800">Marketing</h4>
              <p className="text-2xl font-bold text-warning-900 mt-1">Stressed</p>
              <p className="text-xs text-warning-600 mt-1">↑ 8% from yesterday</p>
            </div>
            <div className="bg-error-50 rounded-lg p-3 border border-error-100">
              <h4 className="text-xs font-medium text-error-800">Sales</h4>
              <p className="text-2xl font-bold text-error-900 mt-1">Angry</p>
              <p className="text-xs text-error-600 mt-1">↑ 15% from yesterday</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Stress Levels by Department</h3>
            <span className="text-xs text-gray-500">This Week</span>
          </div>
          <div className="h-40 flex items-end justify-between px-2">
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '30%' }}></div>
              <span className="text-xs mt-1">Eng</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '20%' }}></div>
              <span className="text-xs mt-1">Design</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '80%' }}></div>
              <span className="text-xs mt-1">Marketing</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '45%' }}></div>
              <span className="text-xs mt-1">Sales</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '60%' }}></div>
              <span className="text-xs mt-1">Product</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 bg-primary-500 rounded-t-sm" style={{ height: '25%' }}></div>
              <span className="text-xs mt-1">Support</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Emotion Distribution</h3>
            <span className="text-xs text-gray-500">All Employees</span>
          </div>
          <div className="flex flex-col h-40 justify-center">
            <div className="flex items-center mb-3">
              <div className="w-24 text-xs text-gray-600">Happy</div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-success-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="w-8 text-right text-xs text-gray-600">45%</div>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-24 text-xs text-gray-600">Neutral</div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="w-8 text-right text-xs text-gray-600">30%</div>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-24 text-xs text-gray-600">Stressed</div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-warning-500 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="w-8 text-right text-xs text-gray-600">15%</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-xs text-gray-600">Angry</div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-error-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <div className="w-8 text-right text-xs text-gray-600">10%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <LineChart className="mr-2" size={20} />
              Emotion Trends Over Time
            </h2>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 rounded-md bg-primary-50 text-primary-700">
                Day
              </button>
              <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700">
                Week
              </button>
              <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700">
                Month
              </button>
            </div>
          </div>
          <div className="h-80">
            <EmotionChart chartType="line" title="" showLegend={true} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <BarChart className="mr-2" size={20} />
              Emotion Intensity
            </h2>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1 rounded-md bg-primary-50 text-primary-700">
                Individual
              </button>
              <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700">
                Team
              </button>
            </div>
          </div>
          <div className="h-80">
            <EmotionChart chartType="bar" title="" showLegend={true} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Productivity Correlation</h2>
          <div className="flex space-x-2">
            <button className="text-xs px-3 py-1 rounded-md bg-primary-50 text-primary-700">
              Last 30 Days
            </button>
            <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700">
              Last Quarter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Mood</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correlation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Engineering</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full bg-success-100 text-success-800 text-xs">Happy</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Strong Positive</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600">↑ 8%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Design</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full bg-primary-100 text-primary-800 text-xs">Neutral</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">78%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderate</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">↔ 0%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Marketing</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full bg-warning-100 text-warning-800 text-xs">Stressed</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">65%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Strong Negative</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-error-600">↓ 12%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sales</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full bg-error-100 text-error-800 text-xs">Angry</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">58%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Strong Negative</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-error-600">↓ 15%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;