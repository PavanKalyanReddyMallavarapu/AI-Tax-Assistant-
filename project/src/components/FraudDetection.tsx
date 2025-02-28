import React, { useState } from 'react';
import { AlertTriangle, Search, Check, X, Info } from 'lucide-react';

interface TransactionData {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  riskScore: number;
  flagged: boolean;
}

const FraudDetection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  
  // Sample transaction data
  const [transactions, setTransactions] = useState<TransactionData[]>([
    {
      id: 1,
      date: '2023-04-15',
      description: 'Charitable Donation - United Way',
      amount: 5000,
      category: 'Charitable Contributions',
      riskScore: 15,
      flagged: false
    },
    {
      id: 2,
      date: '2023-03-22',
      description: 'Home Office Equipment',
      amount: 3200,
      category: 'Business Expenses',
      riskScore: 25,
      flagged: false
    },
    {
      id: 3,
      date: '2023-02-18',
      description: 'Medical Expenses - Surgery',
      amount: 12500,
      category: 'Medical Expenses',
      riskScore: 5,
      flagged: false
    },
    {
      id: 4,
      date: '2023-05-10',
      description: 'Consulting Income - ABC Corp',
      amount: 8500,
      category: 'Income',
      riskScore: 10,
      flagged: false
    },
    {
      id: 5,
      date: '2023-01-30',
      description: 'Rental Property Repairs',
      amount: 7800,
      category: 'Rental Expenses',
      riskScore: 85,
      flagged: true
    },
    {
      id: 6,
      date: '2023-06-05',
      description: 'Cryptocurrency Trading Profit',
      amount: 15000,
      category: 'Capital Gains',
      riskScore: 92,
      flagged: true
    },
    {
      id: 7,
      date: '2023-04-28',
      description: 'Foreign Income - Unreported',
      amount: 22000,
      category: 'Income',
      riskScore: 98,
      flagged: true
    }
  ]);

  const toggleFlag = (id: number) => {
    setTransactions(
      transactions.map(transaction => 
        transaction.id === id 
          ? { ...transaction, flagged: !transaction.flagged } 
          : transaction
      )
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    const matchesFlagged = !showFlaggedOnly || transaction.flagged;
    
    return matchesSearch && matchesCategory && matchesFlagged;
  });

  const categories = Array.from(new Set(transactions.map(t => t.category)));
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low';
    if (score < 70) return 'Medium';
    return 'High';
  };

  const totalFlagged = transactions.filter(t => t.flagged).length;
  const highRiskCount = transactions.filter(t => t.riskScore >= 70).length;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">Tax Fraud Detection</h2>
        <p className="text-sm text-indigo-200">AI-powered anomaly detection for tax transactions</p>
      </div>

      <div className="p-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Transactions</h3>
            <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">High Risk Transactions</h3>
            <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Flagged for Review</h3>
            <p className="text-2xl font-bold text-yellow-600">{totalFlagged}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-1 mb-4 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="flaggedOnly"
              checked={showFlaggedOnly}
              onChange={(e) => setShowFlaggedOnly(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="flaggedOnly" className="ml-2 block text-sm text-gray-700">
              Show flagged transactions only
            </label>
          </div>
        </div>

        {/* Transactions table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className={transaction.flagged ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.flagged && (
                        <AlertTriangle size={16} className="text-red-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-900">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(transaction.riskScore)}`}>
                      {getRiskLabel(transaction.riskScore)} ({transaction.riskScore}%)
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleFlag(transaction.id)}
                      className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                        transaction.flagged
                          ? 'text-red-700 bg-red-100 hover:bg-red-200'
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {transaction.flagged ? (
                        <>
                          <X size={14} className="mr-1" /> Unflag
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={14} className="mr-1" /> Flag
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Information panel */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-start">
          <Info size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">How AI Fraud Detection Works</h4>
            <p className="text-sm text-blue-700">
              Our system uses Isolation Forest and Autoencoder algorithms to detect anomalies in your tax data. 
              Transactions are scored based on their deviation from normal patterns, with higher scores indicating 
              potential fraud risk. The AI model analyzes factors such as transaction amount, timing, category, 
              and relationship to other transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetection;