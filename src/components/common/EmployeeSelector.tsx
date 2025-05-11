import React, { useState } from 'react';
import { Users, ChevronDown, Search, CheckCheck } from 'lucide-react';
import useAppStore from '../../store';

const EmployeeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { employees, currentEmployee, setCurrentEmployee, toggleCamera } = useAppStore();
  
  const filteredEmployees = searchTerm 
    ? employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : employees;
    
  const handleSelectEmployee = (employee: typeof employees[0]) => {
    setCurrentEmployee(employee);
    setIsOpen(false);
    // Automatically start the camera when an employee is selected
    toggleCamera();
  };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <div className="flex items-center">
          <Users size={18} className="mr-2 text-gray-500" />
          <span>
            {currentEmployee ? currentEmployee.name : 'Select Employee'}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredEmployees.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No employees found</p>
              </div>
            ) : (
              <ul>
                {filteredEmployees.map((employee) => (
                  <li key={employee.id}>
                    <button 
                      onClick={() => handleSelectEmployee(employee)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        currentEmployee?.id === employee.id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.position} • {employee.department}</p>
                      </div>
                      {currentEmployee?.id === employee.id && (
                        <CheckCheck size={16} className="text-primary-600" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSelector;