import React, { useState } from 'react'

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [activeRoute, setActiveRoute] = useState('Dashboard');


    return (
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
    )
}

export default Sidebar