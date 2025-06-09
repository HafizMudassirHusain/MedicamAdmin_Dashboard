import { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';

const doctorsData = [
  { id: 1, name: 'Dr. Robert Johnson', specialization: 'Cardiology', availability: 3, status: 'Active', email: 'r.johnson@clinic.com', phone: '(555) 123-4567' },
  { id: 2, name: 'Dr. Anna Lee', specialization: 'Dermatology', availability: 2, status: 'Inactive', email: 'a.lee@clinic.com', phone: '(555) 234-5678' },
  { id: 3, name: 'Dr. Mark Smith', specialization: 'Pediatrics', availability: 5, status: 'Active', email: 'm.smith@clinic.com', phone: '(555) 345-6789' },
  { id: 4, name: 'Dr. Sarah Williams', specialization: 'Neurology', availability: 1, status: 'Active', email: 's.williams@clinic.com', phone: '(555) 456-7890' },
  { id: 5, name: 'Dr. James Wilson', specialization: 'Orthopedics', availability: 4, status: 'Active', email: 'j.wilson@clinic.com', phone: '(555) 567-8901' },
];

const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique specializations for filter dropdown
  const specializations = ['All', ...new Set(doctorsData.map(doc => doc.specialization))];

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || doctor.status === statusFilter;
    const matchesSpecialization = specializationFilter === 'All' || doctor.specialization === specializationFilter;
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
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

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp className="inline ml-1" /> : <FiChevronDown className="inline ml-1" />;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
          <p className="text-gray-600">Manage your clinic's doctors and their availability</p>
        </div>
        <button 
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" />
          Add New Doctor
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search doctors by name, specialization or email..."
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
                onClick={() => {
                  setStatusFilter('All');
                  setSpecializationFilter('All');
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
          Showing {sortedDoctors.length} of {doctorsData.length} doctors
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
                onClick={() => requestSort('name')}
              >
                Name {getSortIcon('name')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('specialization')}
              >
                Specialization {getSortIcon('specialization')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('availability')}
              >
                Availability {getSortIcon('availability')}
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
            {sortedDoctors.map((doctor) => (
              <tr 
                key={doctor.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => openDoctorDetails(doctor)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                  <div className="text-sm text-gray-500">{doctor.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.availability} slots</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${doctor.availability > 3 ? 'bg-green-500' : doctor.availability > 1 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${(doctor.availability / 5) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doctor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    title="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDoctorDetails(doctor);
                    }}
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    title="Delete"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {sortedDoctors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FiSearch className="text-3xl mb-2 text-gray-400" />
                    No doctors found matching your criteria.
                    <button 
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setSpecializationFilter('All');
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

      {/* Doctor Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedDoctor ? `Edit ${selectedDoctor.name}` : 'Add New Doctor'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.name || ''}
                    placeholder="Dr. First Last"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.specialization || ''}
                    placeholder="Cardiology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.email || ''}
                    placeholder="doctor@clinic.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.phone || ''}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Slots</label>
                  <input 
                    type="number" 
                    min="0"
                    max="10"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.availability || 0}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    defaultValue={selectedDoctor?.status || 'Active'}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
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
                  {selectedDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;