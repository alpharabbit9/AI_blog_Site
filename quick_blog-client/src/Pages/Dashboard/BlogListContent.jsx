import React from 'react'
import { blog_data } from '../../Assets/assets';
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

const BlogListContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Blog List</h2>
                <button className="btn bg-[#5044E5] text-white hover:bg-[#4038D4] border-none">
                    <Plus size={16} className="mr-2" />
                    Add New Blog
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left font-medium text-gray-600">Blog Details</th>
                                <th className="text-left font-medium text-gray-600">Views</th>
                                <th className="text-left font-medium text-gray-600">Date</th>
                                <th className="text-left font-medium text-gray-600">Status</th>
                                <th className="text-left font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blog_data.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50">
                                    <td>
                                        <div>
                                            <div className="font-semibold text-gray-900">{blog.title}</div>
                                            <div className="text-sm text-gray-500">{blog.subtitle}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center text-gray-600">
                                            <Eye size={16} className="mr-1" />
                                            {blog.views}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center text-gray-600">
                                            <Calendar size={16} className="mr-1" />
                                            {blog.date}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${blog.status === 'Published' ? 'badge-success' : 'badge-warning'
                                            }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex space-x-2">
                                            <button className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50">
                                                <Edit size={14} />
                                            </button>
                                            <button className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

export default BlogListContent