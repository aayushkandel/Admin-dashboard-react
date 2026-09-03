import React from 'react';

const Dashboard = () => {
  // Data for cards
  const stats = [
    { label: 'Total Products', value: '1,234', change: '+12%', positive: true },
    { label: 'Low Stock', value: '23', change: '-5%', positive: false },
    { label: 'Orders Today', value: '45', change: '+8%', positive: true },
    { label: 'Revenue', value: '$12,450', change: '+22%', positive: true },
  ];

  return (
    <main className="ml-64 pt-16 p-8 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your inventory today.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h2>
            <p className={`text-sm font-medium mt-2 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;