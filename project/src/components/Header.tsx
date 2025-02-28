import React from 'react';
import { User, Bell } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  tabs: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

const Header: React.FC<HeaderProps> = ({ activeTab, tabs }) => {
  const activeTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {activeTabInfo?.icon}
            <h1 className="ml-2 text-xl font-semibold text-gray-800">
              {activeTabInfo?.label}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;