import { useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUsers, FiCalendar, FiBarChart2 } from 'react-icons/fi';

const actions = [
  { icon: <FiUserPlus className="text-3xl" />, label: 'Add Doctor', path: '/admin/doctors/add' },
  { icon: <FiUsers className="text-3xl" />, label: 'Manage Users', path: '/admin/users' },
  { icon: <FiCalendar className="text-3xl" />, label: 'Schedule', path: '/admin/appointments' },
  { icon: <FiBarChart2 className="text-3xl" />, label: 'Generate Report', path: '/admin/reports' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map(({ icon, label, path }, idx) => (
          <button
            key={idx}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-100 rounded-xl border border-transparent hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={`Navigate to ${label}`}
          >
            {icon}
            <span className="text-sm font-medium text-gray-700 mt-2">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
