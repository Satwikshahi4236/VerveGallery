import React, { useState } from 'react';
import { Shield, Lock, Database, Info, CheckSquare } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const PrivacyPage: React.FC = () => {
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({
    dataCollection: false,
    storage: false,
    anonymization: false,
    access: false,
  });
  
  const toggleDetails = (section: string) => {
    setShowDetails(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div>
      <PageHeader 
        title="Data Privacy & Security"
        description="Information about how employee data is collected, anonymized, and protected"
        icon={Shield}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="prose max-w-none">
          <p className="text-gray-600">
            The Employee Wellness Monitor application is designed with privacy and security as core principles. 
            We understand the sensitive nature of emotional and wellness data and have implemented comprehensive 
            measures to ensure your employees' information is protected.
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-700 mr-3">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Data Collection Consent</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We require explicit employee consent before monitoring, with clear explanations of what data is collected.
                </p>
                <button 
                  onClick={() => toggleDetails('dataCollection')}
                  className="text-primary-600 hover:text-primary-800 text-sm mt-2 flex items-center"
                >
                  {showDetails.dataCollection ? 'Hide details' : 'View details'}
                  <Info size={14} className="ml-1" />
                </button>
                
                {showDetails.dataCollection && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm text-gray-600 animate-fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Employees must opt-in to emotion monitoring</li>
                      <li>Clear documentation of data collection purposes</li>
                      <li>Right to withdraw consent at any time</li>
                      <li>Transparency about all monitoring systems</li>
                      <li>Options to limit collection scope (e.g., camera only, no audio)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-700 mr-3">
                <Database size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Secure Data Storage</h3>
                <p className="text-sm text-gray-600 mt-1">
                  All emotional and wellness data is encrypted at rest and in transit using industry-standard encryption.
                </p>
                <button 
                  onClick={() => toggleDetails('storage')}
                  className="text-primary-600 hover:text-primary-800 text-sm mt-2 flex items-center"
                >
                  {showDetails.storage ? 'Hide details' : 'View details'}
                  <Info size={14} className="ml-1" />
                </button>
                
                {showDetails.storage && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm text-gray-600 animate-fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>AES-256 encryption for all stored data</li>
                      <li>TLS 1.3 for all data in transit</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Strict data retention policies with automatic deletion</li>
                      <li>Compliance with regional data protection regulations</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-700 mr-3">
                <CheckSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Data Anonymization</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Team-level analytics and reports use anonymized data to protect individual privacy.
                </p>
                <button 
                  onClick={() => toggleDetails('anonymization')}
                  className="text-primary-600 hover:text-primary-800 text-sm mt-2 flex items-center"
                >
                  {showDetails.anonymization ? 'Hide details' : 'View details'}
                  <Info size={14} className="ml-1" />
                </button>
                
                {showDetails.anonymization && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm text-gray-600 animate-fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>K-anonymity techniques to prevent re-identification</li>
                      <li>Aggregated data only for team-level reporting</li>
                      <li>Minimum threshold requirements for team reports</li>
                      <li>Removal of personal identifiers for historical analysis</li>
                      <li>Differential privacy implementation for sensitive metrics</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-700 mr-3">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Access Controls</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Role-based access ensures only authorized personnel can view individual employee data.
                </p>
                <button 
                  onClick={() => toggleDetails('access')}
                  className="text-primary-600 hover:text-primary-800 text-sm mt-2 flex items-center"
                >
                  {showDetails.access ? 'Hide details' : 'View details'}
                  <Info size={14} className="ml-1" />
                </button>
                
                {showDetails.access && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md text-sm text-gray-600 animate-fade-in">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Role-based access control (RBAC) implementation</li>
                      <li>Principle of least privilege for all users</li>
                      <li>Comprehensive audit logging of all data access</li>
                      <li>Multi-factor authentication for sensitive data access</li>
                      <li>Automatic session timeouts and access revocation</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy Settings</h2>
        <div className="space-y-4">
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Camera Recording</h3>
              <p className="text-xs text-gray-500 mt-1">
                Allow facial expression analysis through camera
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Voice Analysis</h3>
              <p className="text-xs text-gray-500 mt-1">
                Allow speech pattern analysis for emotion detection
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Historical Data Retention</h3>
              <p className="text-xs text-gray-500 mt-1">
                Store historical emotion data for trend analysis
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Team Analytics</h3>
              <p className="text-xs text-gray-500 mt-1">
                Include your data in anonymized team reports
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-start p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Stress Alerts</h3>
              <p className="text-xs text-gray-500 mt-1">
                Allow notifications to HR when stress is detected
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            Save Privacy Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;