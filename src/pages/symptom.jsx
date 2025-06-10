import { useState } from 'react';
import { FaSearch, FaFilter, FaUser, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { format } from 'date-fns';

const symptomLogs = [
  {
    id: 1,
    userId: 'u1001',
    userName: 'John Doe',
    symptom: 'Persistent headache and dizziness',
    severity: 'High',
    timestamp: '2025-06-10T08:30:00Z',
    status: 'Unreviewed'
  },
  {
    id: 2,
    userId: 'u1002',
    userName: 'Jane Smith',
    symptom: 'Mild fever (99.5°F)',
    severity: 'Medium',
    timestamp: '2025-06-09T14:15:00Z',
    status: 'Reviewed'
  },
  {
    id: 3,
    userId: 'u1003',
    userName: 'Robert Wilson',
    symptom: 'Cough and sore throat',
    severity: 'Medium',
    timestamp: '2025-06-08T19:45:00Z',
    status: 'Escalated'
  },
  {
    id: 4,
    userId: 'u1001',
    userName: 'John Doe',
    symptom: 'Nausea after meals',
    severity: 'Low',
    timestamp: '2025-06-07T12:20:00Z',
    status: 'Reviewed'
  },
];

const SymptomLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const uniqueUsers = [...new Set(symptomLogs.map(log => log.userId))];

  const filteredLogs = symptomLogs.filter(log => {
    const matchesSearch = log.symptom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUser === 'all' || log.userId === selectedUser;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    
    return matchesSearch && matchesUser && matchesStatus;
  });

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'escalated': return 'bg-purple-100 text-purple-800';
      case 'unreviewed': return 'bg-orange-100 text-orange-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Symptom Logs</h1>
          <p className="text-gray-600">Review and manage reported symptoms from users</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search symptoms or users..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by User</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(userId => {
                  const user = symptomLogs.find(log => log.userId === userId);
                  return (
                    <option key={userId} value={userId}>
                      {user.userName} ({userId})
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Unreviewed">Unreviewed</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Escalated">Escalated</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FaFilter /> Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredLogs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">{log.symptom}</h3>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <span className="flex items-center gap-1">
                          <FaUser className="text-gray-400" />
                          {log.userName} ({log.userId})
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-gray-400" />
                          {format(new Date(log.timestamp), 'MMM dd, yyyy - h:mm a')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                        Review
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1">
                        <FaExclamationTriangle /> Escalate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No symptom logs found matching your criteria
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Total Logs</h3>
            <p className="text-2xl font-bold">{symptomLogs.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Unreviewed</h3>
            <p className="text-2xl font-bold text-orange-600">
              {symptomLogs.filter(log => log.status === 'Unreviewed').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 font-medium">Escalated</h3>
            <p className="text-2xl font-bold text-purple-600">
              {symptomLogs.filter(log => log.status === 'Escalated').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomLogs;