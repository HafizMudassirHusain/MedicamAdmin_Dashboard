import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiPieChart, 
  FiUsers, 
  FiUserCheck, 
  FiCalendar, 
  FiClipboard, 
  FiActivity, 
  FiSettings, 
  FiChevronDown, 
  FiChevronRight, 
  FiMenu, 
  FiX, 
  FiArrowLeft, 
  FiArrowRight 
} from 'react-icons/fi';

const iconMap = {
  '/admin/dashboard': <FiPieChart size={20} />,
  '/admin/users': <FiUsers size={20} />,
  '/admin/doctors': <FiUserCheck size={20} />,
  '/admin/appointments': <FiCalendar size={20} />,
  '/admin/medications': <FiClipboard size={20} />,
  '/admin/reports': <FiActivity size={20} />,
  '/admin/symptoms': <FiActivity size={20} />,  // Use an icon that fits symptoms if you want
  '/admin/settings': <FiSettings size={20} />,
};

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/users', label: 'Users' },
    { 
      path: '/admin/doctors', 
      label: 'Doctors',
      submenu: [
        { path: '/admin/doctors/list', label: 'All Doctors' },
        { path: '/admin/doctors/add', label: 'Add New' },
        { path: '/admin/doctors/specialties', label: 'Specialties' }
      ]
    },
    { 
      path: '/admin/appointments', 
      label: 'Appointments',
      submenu: [
        { path: '/admin/appointments/calendar', label: 'Calendar View' },
        { path: '/admin/appointments/list', label: 'List View' }
      ]
    },
    { path: '/admin/medications', label: 'Medications' },
    { path: '/admin/reports', label: 'Reports' },
    { path: '/admin/symptoms', label: 'Symptoms' },
    { 
      path: '/admin/settings', 
      label: 'Settings',
      submenu: [
        { path: '/admin/settings/profile', label: 'Profile' },
        { path: '/admin/settings/security', label: 'Security' }
      ]
    },
  ];

  // Close mobile menu and submenus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  // Auto-collapse sidebar on small screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSubmenu = (path) => {
    setActiveSubmenu(activeSubmenu === path ? null : path);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-600 text-white z-40 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}`}
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-blue-700 h-16 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {!isCollapsed ? (
            <h1 className="text-2xl font-extrabold truncate">MediConnect</h1>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-xl font-extrabold">M</div>
          )}

          {/* Collapse toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-blue-300 focus:outline-none hidden lg:block"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <FiArrowRight size={20} /> : <FiArrowLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]" role="menu" aria-orientation="vertical">
          {navItems.map((item) => {
            const hasSubmenu = !!item.submenu;
            const isActive = location.pathname.startsWith(item.path);
            const isSubmenuOpen = activeSubmenu === item.path;

            return (
              <div key={item.path} className="mb-1">
                <NavLink
                  to={item.path}
                  className={({ isActive: linkIsActive }) =>
                    `flex items-center cursor-pointer select-none
                    px-4 py-3 rounded-r-lg
                    hover:bg-blue-700 transition-colors duration-200
                    ${linkIsActive || isActive ? 'bg-blue-700' : ''}
                    ${isCollapsed ? 'justify-center px-2' : 'px-4'}`
                  }
                  onClick={(e) => {
                    if (hasSubmenu) {
                      e.preventDefault();
                      toggleSubmenu(item.path);
                    }
                  }}
                  role="menuitem"
                  aria-haspopup={hasSubmenu ? 'true' : undefined}
                  aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
                  tabIndex={0}
                >
                  <span className={`${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`}>
                    {iconMap[item.path]}
                  </span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}

                  {hasSubmenu && !isCollapsed && (
                    <span className="ml-auto">
                      {isSubmenuOpen ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                    </span>
                  )}
                </NavLink>

                {/* Submenu */}
                {hasSubmenu && isSubmenuOpen && !isCollapsed && (
                  <div
                    className="bg-blue-700 pl-6"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive: subIsActive }) =>
                          `block py-2 px-4 hover:bg-blue-800 transition-colors duration-200 rounded-r-lg
                          ${subIsActive ? 'bg-blue-800 font-semibold' : ''}`
                        }
                        role="menuitem"
                        tabIndex={0}
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Tooltip for collapsed menu */}
        {isCollapsed && (
          <div className="absolute left-full top-0 ml-2 hidden lg:block">
            <div className="bg-gray-900 text-white text-sm rounded shadow-lg p-2 whitespace-nowrap">
              {navItems.map((item) => (
                <div key={item.path} className="py-1 px-2 hover:bg-gray-700 rounded cursor-default">
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
