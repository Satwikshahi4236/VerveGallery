import React, { useState } from 'react';
import { Users, Search, Filter, PlusCircle, MoreHorizontal } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import useAppStore from '../store';

const EmployeesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { employees, setCurrentEmployee } = useAppStore();
  
  const filteredEmployees = searchTerm 
    ? employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : employees;
  
  return (
    <div>
      <PageHeader 
        title="Employees"
        description="Manage and monitor employee wellness"
        icon={Users}
        actions={
          <button className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors flex items-center">
            <PlusCircle size={16} className="mr-1.5" />
            Add Employee
          </button>
        }
      />
      
      <div className="flex mb-6 space-x-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center">
          <Filter size={18} className="mr-2" />
          Filter
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Mood</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check-in</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">ID: {employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.id === '1' ? 'bg-success-100 text-success-800' :
                      employee.id === '2' ? 'bg-primary-100 text-primary-800' :
                      employee.id === '3' ? 'bg-warning-100 text-warning-800' :
                      employee.id === '4' ? 'bg-error-100 text-error-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.id === '1' ? 'Happy' :
                       employee.id === '2' ? 'Neutral' :
                       employee.id === '3' ? 'Stressed' :
                       employee.id === '4' ? 'Angry' :
                       'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.id === '1' ? '15 minutes ago' :
                     employee.id === '2' ? '1 hour ago' :
                     employee.id === '3' ? '3 hours ago' :
                     employee.id === '4' ? 'Today, 9:45 AM' :
                     'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setCurrentEmployee(employee)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Monitor
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No employees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {employees.length > 0 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 bg-primary-50 text-primary-700 rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;