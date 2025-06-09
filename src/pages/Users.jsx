import { FiPlus, FiSearch, FiFilter, FiDownload, FiRefreshCw } from 'react-icons/fi';
import UsersTable from '../components/tables/UsersTable';

const Users = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-1">Manage all registered users and their permissions</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          <FiPlus className="mr-2" size={18} />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold mt-2">1,248</p>
          <p className="text-green-500 text-sm mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
          <p className="text-2xl font-bold mt-2">984</p>
          <p className="text-green-500 text-sm mt-1">↑ 8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Inactive Users</h3>
          <p className="text-2xl font-bold mt-2">264</p>
          <p className="text-red-500 text-sm mt-1">↓ 3% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">New This Month</h3>
          <p className="text-2xl font-bold mt-2">142</p>
          <p className="text-green-500 text-sm mt-1">↑ 15% from last month</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-50">
              <FiFilter />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-50">
              <FiDownload />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-50">
              <FiRefreshCw />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Roles</option>
              <option>Patient</option>
              <option>Doctor</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Time</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;