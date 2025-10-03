import React from 'react'
import {
    LayoutDashboard,
    Plus,
    FileText,
    MessageSquare,
    Menu,
    X,
    TrendingUp,
    Users,
    Eye,
    Calendar,
    Edit,
    Trash2,
    Upload,
    Sparkles
} from 'lucide-react';

const recentBlogs = [
        { id: 1, title: 'Getting Started with React', views: 245, date: '2024-01-15', status: 'Published' },
        { id: 2, title: 'Advanced CSS Techniques', views: 189, date: '2024-01-14', status: 'Draft' },
        { id: 3, title: 'JavaScript Best Practices', views: 312, date: '2024-01-13', status: 'Published' },
        { id: 4, title: 'Building Responsive Layouts', views: 156, date: '2024-01-12', status: 'Published' }
    ];

     const dashboardStats = [
        { title: 'Total Blogs', value: '24', change: '+12%', icon: FileText, color: 'text-blue-600' },
        { title: 'Total Views', value: '1.2k', change: '+8%', icon: Eye, color: 'text-green-600' },
        { title: 'Comments', value: '156', change: '+23%', icon: MessageSquare, color: 'text-purple-600' },
        { title: 'Subscribers', value: '89', change: '+5%', icon: Users, color: 'text-orange-600' }
    ];

const DashboardContent = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <div className="text-sm text-gray-500">
                Welcome back, Admin! Here's what's happening with your blog.
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Recent Blogs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Recent Blogs</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentBlogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{blog.views}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{blog.date}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default DashboardContent