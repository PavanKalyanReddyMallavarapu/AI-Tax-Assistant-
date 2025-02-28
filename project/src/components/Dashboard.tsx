import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, DollarSign, Calendar, Download, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('year');
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">Tax Analytics Dashboard</h2>
        <p className="text-sm text-indigo-200">Data visualization and business intelligence</p>
      </div>

      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Timeframe:</span>
            <div className="inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium ${
                  timeframe === 'year'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setTimeframe('year')}
              >
                Year
              </button>
              <button
                type="button"
                className={`relative inline-flex items-center px-4 py-2 border-t border-b text-sm font-medium ${
                  timeframe === 'quarter'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setTimeframe('quarter')}
              >
                Quarter
              </button>
              <button
                type="button"
                className={`relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium ${
                  timeframe === 'month'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setTimeframe('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={refreshData}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 text-blue-600">
                <DollarSign size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Tax Paid</h3>
                <p className="text-lg font-semibold text-gray-900">$24,568</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp size={12} className="mr-1" /> 8.2% from last year
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                <DollarSign size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Deductions</h3>
                <p className="text-lg font-semibold text-gray-900">$12,350</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp size={12} className="mr-1" /> 12.5% from last year
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-purple-100 text-purple-600">
                <DollarSign size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Tax Credits</h3>
                <p className="text-lg font-semibold text-gray-900">$3,750</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingUp size={12} className="mr-1 rotate-180" /> 4.1% from last year
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                <Calendar size={20} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Effective Tax Rate</h3>
                <p className="text-lg font-semibold text-gray-900">22.4%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp size={12} className="mr-1 rotate-180" /> 1.2% from last year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tax Breakdown Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-900">Tax Breakdown</h3>
              <div className="flex items-center text-sm text-gray-500">
                <PieChart size={16} className="mr-1" />
                <span>Distribution</span>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="w-full h-full p-4 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Simulated pie chart */}
                  <div className="absolute inset-0 rounded-full border-8 border-indigo-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-yellow-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">Total</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-600">Federal Income Tax (35%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-600">State Income Tax (15%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-600">Social Security (25%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-xs text-gray-600">Medicare (25%)</span>
              </div>
            </div>
          </div>

          {/* Monthly Tax Trend */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-900">Tax Payments Trend</h3>
              <div className="flex items-center text-sm text-gray-500">
                <BarChart3 size={16} className="mr-1" />
                <span>Monthly</span>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="w-full h-full p-4 flex items-end justify-between">
                {/* Simulated bar chart */}
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '30%' }}></div>
                  <span className="text-xs mt-1">Jan</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '45%' }}></div>
                  <span className="text-xs mt-1">Feb</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '60%' }}></div>
                  <span className="text-xs mt-1">Mar</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '40%' }}></div>
                  <span className="text-xs mt-1">Apr</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '35%' }}></div>
                  <span className="text-xs mt-1">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '50%' }}></div>
                  <span className="text-xs mt-1">Jun</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '55%' }}></div>
                  <span className="text-xs mt-1">Jul</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-indigo-500 rounded-t" style={{ height: '65%' }}></div>
                  <span className="text-xs mt-1">Aug</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions and Fraud Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deductions Breakdown */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-900">Deductions Breakdown</h3>
              <div className="flex items-center text-sm text-gray-500">
                <BarChart3 size={16} className="mr-1" />
                <span>Top Categories</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Mortgage Interest</span>
                  <span className="text-sm font-medium text-gray-900">$4,250</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Charitable Donations</span>
                  <span className="text-sm font-medium text-gray-900">$2,800</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Retirement Contributions</span>
                  <span className="text-sm font-medium text-gray-900">$2,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Medical Expenses</span>
                  <span className="text-sm font-medium text-gray-900">$1,850</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '37%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Business Expenses</span>
                  <span className="text-sm font-medium text-gray-900">$950</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '19%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Fraud Risk Map */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-900">Fraud Risk Analysis</h3>
              <div className="flex items-center text-sm text-gray-500">
                <AlertTriangle size={16} className="mr-1" />
                <span>Risk Factors</span>
              </div>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-gray-400">
                <p>Geographic risk map visualization</p>
                <p className="text-xs">(Interactive map in production version)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Unusual deduction patterns</span>
                </div>
                <span className="text-xs font-medium text-red-600">High Risk</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Income source discrepancies</span>
                </div>
                <span className="text-xs font-medium text-yellow-600">Medium Risk</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-700">Documentation completeness</span>
                </div>
                <span className="text-xs font-medium text-green-600">Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export default Dashboard