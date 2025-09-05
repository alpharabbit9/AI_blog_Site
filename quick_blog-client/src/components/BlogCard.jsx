import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Eye } from "lucide-react";

const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id, author, publishedDate, views, readTime } = blog;
    const navigate = useNavigate();

    // Clean HTML from description for preview
    const getCleanDescription = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || '';
    };

    return (
        <article 
            onClick={() => navigate(`/blog/${_id}`)}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 max-w-sm mx-auto"
        >
            {/* Image Container with Overlay */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-sm">
                        {category}
                    </span>
                </div>

                {/* Views Badge */}
                {views && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        <Eye size={12} />
                        <span>{views}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                        {author && (
                            <div className="flex items-center gap-1">
                                <User size={12} />
                                <span>{author}</span>
                            </div>
                        )}
                        {publishedDate && (
                            <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{new Date(publishedDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                    {readTime && (
                        <span className="text-gray-400">{readTime} min read</span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {getCleanDescription(description)}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/btn transition-colors duration-200">
                        <span>Read More</span>
                        <ArrowRight 
                            size={14} 
                            className="group-hover/btn:translate-x-1 transition-transform duration-200" 
                        />
                    </button>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
        </article>
    );
};

export default BlogCard;