import React from 'react';
import { LayoutDashboard, PlusCircle, BarChart2, Calendar } from 'lucide-react';
import EmotionDetector from '../components/monitoring/EmotionDetector';
import EmotionDisplay from '../components/monitoring/EmotionDisplay';
import TaskRecommendations from '../components/recommendations/TaskRecommendations';
import EmotionChart from '../components/analytics/EmotionChart';
import PageHeader from '../components/common/PageHeader';
import EmployeeSelector from '../components/common/EmployeeSelector';
import StressAlertComponent from '../components/alerts/StressAlertComponent';
import useAppStore from '../store';

const Dashboard: React.FC = () => {
  const { stressAlerts } = useAppStore();
  
  const unacknowledgedAlerts = stressAlerts.filter(alert => !alert.isAcknowledged);
  
  return (
    <div>
      <PageHeader 
        title="Employee Wellness Dashboard"
        description="Monitor and track employee emotional states in real-time"
        icon={LayoutDashboard}
        actions={
          <div className="w-64">
            <EmployeeSelector />
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EmotionDetector />
        </div>
        <div>
          <EmotionDisplay />
        </div>
        
        <div>
          <TaskRecommendations />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <BarChart2 className="mr-2" size={20} />
                Emotion Trends
              </h2>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 rounded-md bg-primary-50 text-primary-700">
                  Today
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
              <EmotionChart title="" showLegend={true} />
            </div>
          </div>
        </div>
      </div>
      
      {unacknowledgedAlerts.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              Alert Notifications
            </h2>
            <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700 flex items-center">
              <PlusCircle size={14} className="mr-1" />
              Create Alert
            </button>
          </div>
          <div className="space-y-3">
            {unacknowledgedAlerts.slice(0, 3).map(alert => (
              <StressAlertComponent key={alert.id} alert={alert} />
            ))}
            {unacknowledgedAlerts.length > 3 && (
              <div className="text-center">
                <button className="text-primary-600 hover:text-primary-800 text-sm">
                  View all {unacknowledgedAlerts.length} alerts
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Calendar className="mr-2" size={20} />
            Upcoming Check-ins
          </h2>
          <button className="text-xs px-3 py-1 rounded-md bg-primary-600 text-white flex items-center">
            <PlusCircle size={14} className="mr-1" />
            Schedule Check-in
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                      AJ
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                      <div className="text-sm text-gray-500">Senior Developer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aug 15, 2025 • 10:00 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">Confirmed</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                  <button className="text-gray-500 hover:text-gray-700">Cancel</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                      SR
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Sam Rodriguez</div>
                      <div className="text-sm text-gray-500">UX Designer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Design</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aug 17, 2025 • 2:30 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">Pending</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                  <button className="text-gray-500 hover:text-gray-700">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;