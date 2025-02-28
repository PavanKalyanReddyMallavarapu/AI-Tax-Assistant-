import React, { useState } from 'react';
import { 
  Brain, 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  MessageSquare, 
  FileSearch, 
  Menu, 
  X,
  Home,
  Settings
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import DocumentUploader from './components/DocumentUploader';
import TaxPrediction from './components/TaxPrediction';
import FraudDetection from './components/FraudDetection';
import TaxInsights from './components/TaxInsights';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'documents':
        return <DocumentUploader />;
      case 'prediction':
        return <TaxPrediction />;
      case 'fraud':
        return <FraudDetection />;
      case 'insights':
        return <TaxInsights />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <ChatInterface />;
    }
  };

  const tabs = [
    { id: 'chat', label: 'AI Tax Chat', icon: <MessageSquare size={20} /> },
    { id: 'documents', label: 'Document Processing', icon: <FileText size={20} /> },
    { id: 'prediction', label: 'Tax Prediction', icon: <Brain size={20} /> },
    { id: 'fraud', label: 'Fraud Detection', icon: <AlertTriangle size={20} /> },
    { id: 'insights', label: 'Tax Insights', icon: <FileSearch size={20} /> },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} tabs={tabs} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;