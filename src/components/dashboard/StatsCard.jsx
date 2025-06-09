import { FiUsers, FiUserCheck, FiCalendar, FiPackage } from 'react-icons/fi';

const iconMap = {
  users: <FiUsers className="text-2xl" />,
  doctors: <FiUserCheck className="text-2xl" />,
  appointments: <FiCalendar className="text-2xl" />,
  medications: <FiPackage className="text-2xl" />,
};

const StatsCard = ({ iconKey, title, value, trend }) => {
  const isPositive = trend.includes('+');

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300"
      role="region"
      aria-label={`${title} stats`}
    >
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
        {iconMap[iconKey]}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
