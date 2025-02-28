import React from 'react';
import { Home, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  tabs: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tabs, 
  activeTab, 
  setActiveTab, 
  sidebarOpen,
  setSidebarOpen
}) => {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-indigo-800">
            <h1 className="text-xl font-bold">AI Tax Assistant</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-indigo-800 text-white' 
                        : 'text-indigo-100 hover:bg-indigo-600'}
                    `}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-indigo-800">
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center px-4 py-2 text-sm text-indigo-100 rounded-lg hover:bg-indigo-600 transition-colors">
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-2 text-sm text-indigo-100 rounded-lg hover:bg-indigo-600 transition-colors">
                  <LogOut size={20} className="mr-3" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;