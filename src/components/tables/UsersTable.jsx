import { FiSearch, FiEdit2, FiUserX } from 'react-icons/fi';

const UsersTable = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient', status: 'Active', createdAt: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Patient', status: 'Inactive', createdAt: '2023-02-20' },
    { id: 3, name: 'Dr. Robert', email: 'robert@example.com', role: 'Doctor', status: 'Active', createdAt: '2023-03-10' },
    // More users...
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Name', 'Email', 'Role', 'Status', 'Created At', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                  <button
                    aria-label={`Edit user ${user.name}`}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    aria-label={`Deactivate user ${user.name}`}
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                  >
                    <FiUserX size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">24</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-100 focus:outline-none">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-100 focus:outline-none">
            2
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium hover:bg-gray-100 focus:outline-none">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
