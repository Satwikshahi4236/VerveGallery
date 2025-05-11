import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  AlertTriangle, 
  Clock, 
  CheckSquare,
  Shield,
  Settings,
  LogOut
} from 'lucide-react';
import useAppStore from '../../store';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, stressAlerts } = useAppStore();
  
  const unacknowledgedAlerts = stressAlerts.filter(alert => !alert.isAcknowledged).length;
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { id: 'employees', label: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { 
      id: 'alerts', 
      label: 'Alerts', 
      icon: <AlertTriangle size={20} />, 
      path: '/alerts',
      badge: unacknowledgedAlerts > 0 ? unacknowledgedAlerts : undefined
    },
    { id: 'history', label: 'History', icon: <Clock size={20} />, path: '/history' },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} />, path: '/tasks' },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={20} />, path: '/privacy' },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 z-10">
      <div className="flex flex-col h-full">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-700 flex items-center">
            <span className="bg-primary-500 text-white p-1 rounded mr-2 flex items-center justify-center">
              <Users size={18} />
            </span>
            Wellness Monitor
          </h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-error-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Settings size={18} className="mr-2" />
              <span>Settings</span>
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;