import React from 'react'
import { comments_data } from '../../Assets/assets';
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

const CommentsContent = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Comments</h2>
            <div className="flex space-x-2">
                <button className="btn btn-outline btn-sm">All</button>
                <button className="btn btn-outline btn-sm">Pending</button>
                <button className="btn btn-outline btn-sm">Approved</button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {comments_data.map((comment) => (
                <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#5044E5] rounded-full flex items-center justify-center text-white font-semibold">
                                {comment.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{comment.name}</h4>

                            </div>
                        </div>
                        <span className={`badge ${comment.status === 'Approved' ? 'badge-success' : 'badge-warning'
                            }`}>
                            {comment.status}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-4">{comment.content}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            {comment.date}
                        </div>
                        <div className="flex space-x-2">
                            {comment.status === 'Pending' && (
                                <button className="btn btn-sm bg-green-500 text-white hover:bg-green-600 border-none">
                                    Approve
                                </button>
                            )}
                            <button className="btn btn-sm btn-outline btn-error">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default CommentsContent