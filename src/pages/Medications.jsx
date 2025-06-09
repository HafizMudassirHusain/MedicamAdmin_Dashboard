import { useState } from 'react';
import { FaSearch, FaTrash, FaPlus, FaFilter, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { MdAccessTime, MdOutlineCalendarToday } from 'react-icons/md';

const medications = [
  {
    id: 1,
    user: 'John Doe',
    userId: 'P1001',
    name: 'Paracetamol',
    dosage: '500mg',
    frequency: 'Every 6 hours',
    time: '08:00 AM',
    startDate: '2025-06-01',
    endDate: '2025-06-07',
    status: 'Scheduled',
    instructions: 'Take with food',
    prescribedBy: 'Dr. Smith'
  },
  {
    id: 2,
    user: 'Jane Smith',
    userId: 'P1002',
    name: 'Amoxicillin',
    dosage: '250mg',
    frequency: 'Twice daily',
    time: '02:00 PM',
    startDate: '2025-06-05',
    endDate: '2025-06-12',
    status: 'Completed',
    instructions: 'Complete full course',
    prescribedBy: 'Dr. Johnson'
  },
  {
    id: 3,
    user: 'Robert Wilson',
    userId: 'P1003',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'Every 8 hours',
    time: '10:00 AM',
    startDate: '2025-06-10',
    endDate: '2025-06-17',
    status: 'Missed',
    instructions: 'Take with plenty of water',
    prescribedBy: 'Dr. Lee'
  },
  {
    id: 4,
    user: 'Emily Davis',
    userId: 'P1004',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: '07:00 AM',
    startDate: '2025-05-15',
    endDate: '2025-08-15',
    status: 'Scheduled',
    instructions: 'Take in the morning',
    prescribedBy: 'Dr. Wilson'
  },
  {
    id: 5,
    user: 'Michael Brown',
    userId: 'P1005',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '08:00 AM, 08:00 PM',
    startDate: '2025-04-20',
    endDate: '2025-10-20',
    status: 'Scheduled',
    instructions: 'Take with meals',
    prescribedBy: 'Dr. Adams'
  },
];

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique users and statuses for filter dropdowns
  const users = ['All', ...new Set(medications.map(med => med.user))];
  const statuses = ['All', 'Scheduled', 'Completed', 'Missed'];

  const filteredMedications = medications.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         med.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || med.status === statusFilter;
    const matchesUser = userFilter === 'All' || med.user === userFilter;
    const matchesDate = !dateFilter || 
                       (med.startDate <= dateFilter && med.endDate >= dateFilter);
    return matchesSearch && matchesStatus && matchesUser && matchesDate;
  });

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    // Special handling for time sorting (convert to 24-hour format for comparison)
    if (sortConfig.key === 'time') {
      const timeA = convertTo24Hour(a.time.split(',')[0].trim());
      const timeB = convertTo24Hour(b.time.split(',')[0].trim());
      return sortConfig.direction === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
    }
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours}:${minutes}`;
  }

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openMedicationDetails = (med) => {
    setSelectedMedication(med);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedication(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Medication Records</h2>
          <p className="text-gray-600">Track and manage patient medications</p>
        </div>
        <div className="flex gap-4">
          <button 
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" />
            New Medication
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search by medication, patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Active On Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <MdOutlineCalendarToday className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="col-span-3 flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                onClick={() => {
                  setStatusFilter('All');
                  setUserFilter('All');
                  setDateFilter('');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <div className="p-4 text-sm text-gray-600">
          Showing {sortedMedications.length} of {medications.length} medications
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('id')}
              >
                ID {getSortIcon('id')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('user')}
              >
                Patient {getSortIcon('user')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('name')}
              >
                Medication {getSortIcon('name')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('dosage')}
              >
                Dosage {getSortIcon('dosage')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('time')}
              >
                Time {getSortIcon('time')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('status')}
              >
                Status {getSortIcon('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMedications.map((med) => (
              <tr 
                key={med.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => openMedicationDetails(med)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{med.user}</div>
                  <div className="text-xs text-gray-500">ID: {med.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{med.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div>{med.dosage}</div>
                  <div className="text-xs text-gray-500">{med.frequency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <MdAccessTime className="text-gray-400" />
                    {med.time}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(med.startDate).toLocaleDateString()} - {new Date(med.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(med.status)}`}>
                    {med.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    title="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMedicationDetails(med);
                    }}
                  >
                    <FaPencil />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    title="Delete"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {sortedMedications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FaSearch className="text-3xl mb-2 text-gray-400" />
                    No medications found matching your criteria.
                    <button 
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setUserFilter('All');
                        setDateFilter('');
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Medication Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedMedication ? `Edit ${selectedMedication.name}` : 'New Medication'}
                </h3>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.user || ''}
                  >
                    <option value="">Select patient</option>
                    {users.filter(u => u !== 'All').map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.userId || ''}
                    placeholder="Patient ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.name || ''}
                    placeholder="Medication name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.dosage || ''}
                    placeholder="e.g. 500mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.frequency || ''}
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Every 6 hours">Every 6 hours</option>
                    <option value="Every 8 hours">Every 8 hours</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Administration Time</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.time || ''}
                    placeholder="e.g. 08:00 AM, 02:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.startDate || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.endDate || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.status || 'Scheduled'}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Missed">Missed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prescribed By</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedMedication?.prescribedBy || ''}
                    placeholder="Doctor's name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="3"
                    defaultValue={selectedMedication?.instructions || ''}
                    placeholder="Any special instructions for this medication"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedMedication ? 'Update Medication' : 'Add Medication'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;