import React from 'react';
import { AlertTriangle, Filter, RefreshCw } from 'lucide-react';
import StressAlertComponent from '../components/alerts/StressAlertComponent';
import PageHeader from '../components/common/PageHeader';
import useAppStore from '../store';

const AlertsPage: React.FC = () => {
  const { stressAlerts } = useAppStore();
  
  // Sort alerts with unacknowledged first, then by timestamp (newest first)
  const sortedAlerts = [...stressAlerts].sort((a, b) => {
    if (a.isAcknowledged !== b.isAcknowledged) {
      return a.isAcknowledged ? 1 : -1;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  return (
    <div>
      <PageHeader 
        title="Stress Alerts"
        description="Monitor and manage employee stress notifications"
        icon={AlertTriangle}
        actions={
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center">
              <Filter size={16} className="mr-1.5" />
              Filter
            </button>
            <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center">
              <RefreshCw size={16} className="mr-1.5" />
              Refresh
            </button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
            <h3 className="text-sm font-medium text-primary-800">Total Alerts</h3>
            <p className="text-3xl font-bold text-primary-900 mt-2">{stressAlerts.length}</p>
          </div>
          <div className="bg-warning-50 rounded-lg p-4 border border-warning-100">
            <h3 className="text-sm font-medium text-warning-800">Pending Alerts</h3>
            <p className="text-3xl font-bold text-warning-900 mt-2">
              {stressAlerts.filter(a => !a.isAcknowledged).length}
            </p>
          </div>
          <div className="bg-success-50 rounded-lg p-4 border border-success-100">
            <h3 className="text-sm font-medium text-success-800">Resolved Alerts</h3>
            <p className="text-3xl font-bold text-success-900 mt-2">
              {stressAlerts.filter(a => a.isAcknowledged).length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedAlerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <AlertTriangle size={40} className="mx-auto mb-2 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Alerts</h3>
            <p className="text-gray-500">No stress alerts have been triggered yet.</p>
          </div>
        ) : (
          sortedAlerts.map(alert => (
            <StressAlertComponent key={alert.id} alert={alert} />
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage;