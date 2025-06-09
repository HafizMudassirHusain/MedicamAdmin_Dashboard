import { FiUser } from 'react-icons/fi';

const activities = [
  { id: 1, user: 'John Doe', action: 'Booked appointment', time: '10 mins ago' },
  { id: 2, user: 'Dr. Smith', action: 'Added new availability', time: '1 hour ago' },
  { id: 3, user: 'Admin', action: 'Updated user profile', time: '2 hours ago' },
  { id: 4, user: 'System', action: 'Scheduled maintenance', time: '5 hours ago' },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">Recent Activity</h3>
      <div className="space-y-5">
        {activities.map(({ id, user, action, time }) => (
          <div
            key={id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
            role="listitem"
            tabIndex={0}
            aria-label={`${user} ${action} ${time}`}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-lg shrink-0">
              <FiUser />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user}</p>
              <p className="text-sm text-gray-600">{action}</p>
              <p className="text-xs text-gray-400">{time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full text-center text-sm text-blue-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;
