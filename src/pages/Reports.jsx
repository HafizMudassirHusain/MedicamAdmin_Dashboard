import { useState } from 'react';
import { FaDownload, FaTrash, FaSearch, FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const reports = [
  {
    id: 1,
    user: 'John Doe',
    title: 'Blood Test Report',
    type: 'PDF',
    date: '2025-06-05',
    size: '2.4 MB',
  },
  {
    id: 2,
    user: 'Jane Smith',
    title: 'X-Ray Scan',
    type: 'Image',
    date: '2025-06-01',
    size: '5.1 MB',
  },
  {
    id: 3,
    user: 'Robert Wilson',
    title: 'MRI Report',
    type: 'PDF',
    date: '2025-05-30',
    size: '3.7 MB',
  },
  {
    id: 4,
    user: 'Emily Johnson',
    title: 'Doctor Consultation Notes',
    type: 'Document',
    date: '2025-05-28',
    size: '0.8 MB',
  },
];

const Reports = () => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedReports, setSelectedReports] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredReports = sortedReports.filter((r) =>
    r.user.toLowerCase().includes(search.toLowerCase()) ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const toggleReportSelection = (id) => {
    setSelectedReports(prev =>
      prev.includes(id) 
        ? prev.filter(reportId => reportId !== id)
        : [...prev, id]
    );
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'image':
        return <FaFileImage className="text-blue-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const handleDownload = (id) => {
    // In a real app, this would trigger a download
    console.log(`Downloading report ${id}`);
  };

  const handleDelete = (id) => {
    // In a real app, this would delete the report
    console.log(`Deleting report ${id}`);
  };

  const handleBulkDelete = () => {
    // In a real app, this would delete all selected reports
    console.log(`Deleting reports: ${selectedReports.join(', ')}`);
    setSelectedReports([]);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Uploaded Reports</h2>
          <p className="text-sm text-gray-500">{filteredReports.length} reports found</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {selectedReports.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaTrash size={14} />
              <span>Delete Selected ({selectedReports.length})</span>
            </button>
          )}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              <FaSearch size={14} />
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onChange={() => {
                      if (selectedReports.length === filteredReports.length) {
                        setSelectedReports([]);
                      } else {
                        setSelectedReports(filteredReports.map(r => r.id));
                      }
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('user')}
                >
                  User {sortConfig.key === 'user' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('title')}
                >
                  Report Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('type')}
                >
                  File Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  Uploaded Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('size')}
                >
                  Size {sortConfig.key === 'size' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className={selectedReports.includes(report.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => toggleReportSelection(report.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-2">
                      {getFileIcon(report.type)}
                      {report.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {format(new Date(report.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button 
                        onClick={() => handleDownload(report.id)}
                        className="text-green-600 hover:text-green-800 transition-colors" 
                        title="Download"
                      >
                        <FaDownload size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(report.id)}
                        className="text-red-600 hover:text-red-800 transition-colors" 
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No reports found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;