import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back, here’s what’s happening today.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard iconKey="users" title="Total Users" value="1,234" trend="+12% from last month" />
        <StatsCard iconKey="doctors" title="Total Doctors" value="56" trend="+3 new this week" />
        <StatsCard iconKey="appointments" title="Appointments Today" value="24" trend="+2 from yesterday" />
        <StatsCard iconKey="medications" title="Medications Scheduled" value="48" trend="+5% from last week" />

      </div>

      {/* Actions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* You can add more dashboard sections here */}
    </section>
  );
};

export default Dashboard;
