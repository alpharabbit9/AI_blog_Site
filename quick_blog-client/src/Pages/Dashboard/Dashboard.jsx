import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
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
import { blog_data, blogCategories, comments_data } from '../../Assets/assets';
import axios from 'axios';
import { parse } from 'marked';
import BlogListContent from './BlogListContent';
import CommentsContent from './CommentsContent';
import DashboardContent from './DashboardContent';
import AddBlogs from './AddBlogs';

const Dashboard = () => {
    const [activeRoute, setActiveRoute] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [quill, setQuill] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!editorRef.current) return;

        const q = new Quill(editorRef.current, {
            theme: "snow",
            placeholder: "Write your description...",
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                ],
            },
        });

        // Update state on text change
        q.on("text-change", () => {
            setContent(q.root.innerHTML);
        });

        setQuill(q);
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files[0]; // get selected file
        if (!file) return;

        setLoading(true);

        // prepare form data
        const formData = new FormData();
        formData.append("image", file);

        // replace with your API key
        const apiKey = "d124993969e06253e686485e0548aaa8";

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setImageUrl(data.data.url); // image link
            } else {
                console.error("Upload failed", data);
            }
        } catch (err) {
            console.error("Error uploading", err);
        } finally {
            setLoading(false);
        }
    };

    const routes = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Add Blogs', icon: Plus },
        { name: 'Blog List', icon: FileText },
        { name: 'Comments', icon: MessageSquare }
    ];

    // Dummy data
    const dashboardStats = [
        { title: 'Total Blogs', value: '24', change: '+12%', icon: FileText, color: 'text-blue-600' },
        { title: 'Total Views', value: '1.2k', change: '+8%', icon: Eye, color: 'text-green-600' },
        { title: 'Comments', value: '156', change: '+23%', icon: MessageSquare, color: 'text-purple-600' },
        { title: 'Subscribers', value: '89', change: '+5%', icon: Users, color: 'text-orange-600' }
    ];

    const recentBlogs = [
        { id: 1, title: 'Getting Started with React', views: 245, date: '2024-01-15', status: 'Published' },
        { id: 2, title: 'Advanced CSS Techniques', views: 189, date: '2024-01-14', status: 'Draft' },
        { id: 3, title: 'JavaScript Best Practices', views: 312, date: '2024-01-13', status: 'Published' },
        { id: 4, title: 'Building Responsive Layouts', views: 156, date: '2024-01-12', status: 'Published' }
    ];



    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        picture: '',
        description: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateWithAI = async () => {
        if (!formData.title) {
            alert("Please enter a title to generate description.");
            return;
        }

        if (!quill) {
            alert("Editor not ready yet.");
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('http://localhost:3000/api/blog/generate', {
                prompt: formData.title
            });

            if (data.success) {
                quill.root.innerHTML = parse(data.content); // Use quill instead of quillRef.current
            } else {
                 console.error("AI generation failed:", data.error || data);
            }
        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setLoading(false);
        }
    };

    const Sidebar = () => (
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-6 border-b">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="mt-6 px-4">
                {routes.map((route) => {
                    const Icon = route.icon;
                    return (
                        <button
                            key={route.name}
                            onClick={() => {
                                setActiveRoute(route.name);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center px-4 py-3 mt-2 text-left rounded-lg transition-colors ${activeRoute === route.name
                                ? 'bg-[#5044E5] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Icon size={20} className="mr-3" />
                            {route.name}
                        </button>
                    );
                })}
            </nav>
        </div>
    );

   

    const AddBlogContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">Add New Blog</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Blog Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter blog title..."
                                className="input input-bordered w-full focus:border-[#5044E5] focus:outline-none"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Subtitle</span>
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                placeholder="Enter blog subtitle..."
                                className="input input-bordered w-full focus:border-[#5044E5] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Blog Picture</span>
                        </label>
                        <div className="p-4">
                            {/* Hidden file input */}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                            />

                            {/* Custom button */}
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                Choose Image
                            </label>

                            {loading && <p className="mt-2 text-gray-600">Uploading...</p>}

                            {imageUrl && (
                                <div className="mt-4">
                                    <p className="font-medium">Uploaded Image:</p>
                                    <img src={imageUrl} alt="Uploaded" className="w-40 border rounded-lg mt-2" />
                                    <p className="text-sm text-gray-600 break-all mt-1">{imageUrl}</p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="p-4 border rounded-lg shadow bg-white">
                        <div ref={editorRef} className="min-h-[200px]"></div>

                        <div className="flex justify-end mt-2">
                            <button
                                disabled={loading}
                                onClick={generateWithAI}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                            >
                                Generate with AI
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Select Blog Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Choose a category</option>
                            {blogCategories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {category && (
                            <p className="mt-2 text-sm text-gray-600">
                                Selected Category: <span className="font-medium">{category}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" className="btn btn-outline">
                            Save as Draft
                        </button>
                        <button type="button" className="btn bg-[#5044E5] text-white hover:bg-[#4038D4] border-none">
                            Publish Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

   




    const renderContent = () => {
        switch (activeRoute) {
            case 'Dashboard':
                return <DashboardContent />;
            case 'Add Blogs':
                return <AddBlogs />;
            case 'Blog List':
                return <BlogListContent />;
            case 'Comments':
                return <CommentsContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile header */}
            <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-md hover:bg-gray-100"
                >
                    <Menu size={20} />
                </button>
            </div>

            <div className="flex">
                <Sidebar />

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main content */}
                <div className="flex-1 lg:ml-0">
                    <main className="p-4 lg:p-8">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;