import { useState } from 'react';
import { FiCalendar, FiEdit2, FiEye, FiXCircle, FiSearch, FiFilter, FiChevronUp, FiChevronDown, FiPlus } from 'react-icons/fi';

const appointments = [
  {
    id: 1,
    patient: 'John Doe',
    patientId: 'P1001',
    doctor: 'Dr. Smith',
    doctorId: 'D2001',
    date: '2025-06-12',
    time: '10:00 AM',
    duration: 30,
    status: 'Confirmed',
    reason: 'Annual checkup',
    notes: 'Patient has allergy to penicillin'
  },
  {
    id: 2,
    patient: 'Jane Doe',
    patientId: 'P1002',
    doctor: 'Dr. Adams',
    doctorId: 'D2002',
    date: '2025-06-13',
    time: '02:30 PM',
    duration: 45,
    status: 'Pending',
    reason: 'Back pain consultation',
    notes: 'Prefers afternoon appointments'
  },
  {
    id: 3,
    patient: 'Robert Paul',
    patientId: 'P1003',
    doctor: 'Dr. Watson',
    doctorId: 'D2003',
    date: '2025-06-14',
    time: '11:15 AM',
    duration: 60,
    status: 'Cancelled',
    reason: 'Dermatology follow-up',
    notes: 'Rescheduled to next week'
  },
  {
    id: 4,
    patient: 'Emily Johnson',
    patientId: 'P1004',
    doctor: 'Dr. Smith',
    doctorId: 'D2001',
    date: '2025-06-12',
    time: '03:00 PM',
    duration: 30,
    status: 'Confirmed',
    reason: 'Vaccination',
    notes: 'Needs flu shot'
  },
  {
    id: 5,
    patient: 'Michael Brown',
    patientId: 'P1005',
    doctor: 'Dr. Adams',
    doctorId: 'D2002',
    date: '2025-06-15',
    time: '09:00 AM',
    duration: 60,
    status: 'Pending',
    reason: 'Physical therapy evaluation',
    notes: 'Recent knee surgery'
  },
];

const AppointmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique doctors for filter dropdown
  const doctors = ['All', ...new Set(appointments.map(appt => appt.doctor))];

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appt.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'All' || appt.doctor === doctorFilter;
    const matchesDate = !dateFilter || appt.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    // Special handling for date sorting
    if (sortConfig.key === 'date') {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openAppointmentDetails = (appt) => {
    setSelectedAppointment(appt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp className="inline ml-1" /> : <FiChevronDown className="inline ml-1" />;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>
          <p className="text-gray-600">View and manage patient appointments</p>
        </div>
        <button 
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" />
          New Appointment
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search appointments by patient, doctor or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <button 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
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
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
              >
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="col-span-3 flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                onClick={() => {
                  setStatusFilter('All');
                  setDoctorFilter('All');
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
          Showing {sortedAppointments.length} of {appointments.length} appointments
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
                onClick={() => requestSort('patient')}
              >
                Patient {getSortIcon('patient')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('doctor')}
              >
                Doctor {getSortIcon('doctor')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('date')}
              >
                Date & Time {getSortIcon('date')}
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
            {sortedAppointments.map((appt) => (
              <tr 
                key={appt.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => openAppointmentDetails(appt)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{appt.patient}</div>
                  <div className="text-xs text-gray-500">ID: {appt.patientId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {appt.time} ({appt.duration} mins)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    title="View"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAppointmentDetails(appt);
                    }}
                  >
                    <FiEye />
                  </button>
                  <button 
                    className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                    title="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAppointmentDetails(appt);
                    }}
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    title="Cancel"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiXCircle />
                  </button>
                </td>
              </tr>
            ))}
            {sortedAppointments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FiSearch className="text-3xl mb-2 text-gray-400" />
                    No appointments found matching your criteria.
                    <button 
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setDoctorFilter('All');
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

      {/* Appointment Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedAppointment ? `Appointment #${selectedAppointment.id}` : 'New Appointment'}
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
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.patient || ''}
                    placeholder="Patient name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.patientId || ''}
                    placeholder="Patient ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.doctor || ''}
                  >
                    <option value="">Select doctor</option>
                    {doctors.filter(d => d !== 'All').map(doctor => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.date || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.time.replace(' AM', '').replace(' PM', '') || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input 
                    type="number" 
                    min="15"
                    max="120"
                    step="15"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.duration || 30}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.status || 'Pending'}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedAppointment?.reason || ''}
                    placeholder="Appointment reason"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="3"
                    defaultValue={selectedAppointment?.notes || ''}
                    placeholder="Additional notes"
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
                {selectedAppointment && (
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel Appointment
                  </button>
                )}
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedAppointment ? 'Update Appointment' : 'Create Appointment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;