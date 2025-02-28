import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const TaxPrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    income: 85000,
    filingStatus: 'single',
    dependents: 0,
    mortgageInterest: 0,
    charitableDonations: 1000,
    medicalExpenses: 0,
    retirementContributions: 6000,
    studentLoanInterest: 0,
    selfEmployed: false,
    investmentIncome: 2000,
  });

  const [prediction, setPrediction] = useState<null | {
    taxLiability: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    refundEstimate: number;
    recommendations: string[];
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) || 0 
          : value
    });
  };

  const calculateTax = () => {
    // This is a simplified tax calculation for demonstration
    // In a real app, this would call a backend ML model
    
    const income = formData.income;
    let taxableIncome = income;
    
    // Standard deduction based on filing status
    const standardDeduction = formData.filingStatus === 'single' ? 13850 : 27700;
    
    // Itemized deductions
    const itemizedDeductions = 
      formData.mortgageInterest + 
      formData.charitableDonations + 
      formData.medicalExpenses;
    
    // Use the larger of standard or itemized deductions
    const deduction = Math.max(standardDeduction, itemizedDeductions);
    taxableIncome -= deduction;
    
    // Retirement contributions reduce taxable income
    taxableIncome -= formData.retirementContributions;
    
    // Student loan interest deduction
    taxableIncome -= Math.min(formData.studentLoanInterest, 2500);
    
    // Dependent tax credit
    const dependentCredit = formData.dependents * 2000;
    
    // Calculate tax based on 2023 tax brackets (simplified)
    let tax = 0;
    if (formData.filingStatus === 'single') {
      if (taxableIncome > 578125) {
        tax = 174238.25 + (taxableIncome - 578125) * 0.37;
      } else if (taxableIncome > 231250) {
        tax = 52832 + (taxableIncome - 231250) * 0.35;
      } else if (taxableIncome > 182100) {
        tax = 37104 + (taxableIncome - 182100) * 0.32;
      } else if (taxableIncome > 95375) {
        tax = 16290 + (taxableIncome - 95375) * 0.24;
      } else if (taxableIncome > 44725) {
        tax = 5147 + (taxableIncome - 44725) * 0.22;
      } else if (taxableIncome > 11000) {
        tax = 1100 + (taxableIncome - 11000) * 0.12;
      } else {
        tax = taxableIncome * 0.10;
      }
    } else {
      // Simplified married filing jointly calculation
      if (taxableIncome > 693750) {
        tax = 186601.50 + (taxableIncome - 693750) * 0.37;
      } else if (taxableIncome > 462500) {
        tax = 105664 + (taxableIncome - 462500) * 0.35;
      } else if (taxableIncome > 364200) {
        tax = 74208 + (taxableIncome - 364200) * 0.32;
      } else if (taxableIncome > 190750) {
        tax = 32580 + (taxableIncome - 190750) * 0.24;
      } else if (taxableIncome > 89450) {
        tax = 10294 + (taxableIncome - 89450) * 0.22;
      } else if (taxableIncome > 22000) {
        tax = 2200 + (taxableIncome - 22000) * 0.12;
      } else {
        tax = taxableIncome * 0.10;
      }
    }
    
    // Apply tax credits
    tax -= dependentCredit;
    
    // Ensure tax isn't negative
    tax = Math.max(0, tax);
    
    // Calculate effective tax rate
    const effectiveTaxRate = (tax / formData.income) * 100;
    
    // Determine marginal tax rate based on income
    let marginalTaxRate = 10;
    if (formData.filingStatus === 'single') {
      if (taxableIncome > 578125) marginalTaxRate = 37;
      else if (taxableIncome > 231250) marginalTaxRate = 35;
      else if (taxableIncome > 182100) marginalTaxRate = 32;
      else if (taxableIncome > 95375) marginalTaxRate = 24;
      else if (taxableIncome > 44725) marginalTaxRate = 22;
      else if (taxableIncome > 11000) marginalTaxRate = 12;
    } else {
      if (taxableIncome > 693750) marginalTaxRate = 37;
      else if (taxableIncome > 462500) marginalTaxRate = 35;
      else if (taxableIncome > 364200) marginalTaxRate = 32;
      else if (taxableIncome > 190750) marginalTaxRate = 24;
      else if (taxableIncome > 89450) marginalTaxRate = 22;
      else if (taxableIncome > 22000) marginalTaxRate = 12;
    }
    
    // Assume withholding is approximately correct but slightly higher
    const withholding = tax * 1.1;
    const refundEstimate = withholding - tax;
    
    // Generate recommendations
    const recommendations = [];
    
    if (formData.retirementContributions < 6000) {
      recommendations.push("Increase retirement contributions to reduce taxable income");
    }
    
    if (itemizedDeductions < standardDeduction && formData.charitableDonations > 0) {
      recommendations.push("Your itemized deductions are less than the standard deduction. Consider bunching charitable donations in alternate years.");
    }
    
    if (formData.selfEmployed) {
      recommendations.push("As a self-employed individual, consider setting up a SEP IRA or Solo 401(k) for higher retirement contribution limits.");
    }
    
    if (formData.income > 200000 && formData.investmentIncome > 0) {
      recommendations.push("Your income may subject you to the Net Investment Income Tax. Consider tax-loss harvesting strategies.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Your tax strategy appears optimized based on the provided information.");
    }
    
    setPrediction({
      taxLiability: tax,
      effectiveTaxRate,
      marginalTaxRate,
      refundEstimate,
      recommendations,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">Tax Prediction</h2>
        <p className="text-sm text-indigo-200">AI-powered tax liability estimation</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input form */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Enter Your Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filing Status
                </label>
                <select
                  name="filingStatus"
                  value={formData.filingStatus}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head">Head of Household</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Dependents
                </label>
                <input
                  type="number"
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleInputChange}
                  min="0"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mortgage Interest
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="mortgageInterest"
                      value={formData.mortgageInterest}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Charitable Donations
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="charitableDonations"
                      value={formData.charitableDonations}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retirement Contributions
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="retirementContributions"
                      value={formData.retirementContributions}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Income
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="investmentIncome"
                      value={formData.investmentIncome}
                      onChange={handleInputChange}
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="selfEmployed"
                    checked={formData.selfEmployed}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Self-employed
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={calculateTax}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Calculator size={16} className="mr-2" />
                  Calculate Tax Prediction
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {prediction ? (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Tax Prediction Results</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Tax Liability</h4>
                      <p className="text-2xl font-bold text-gray-900">${prediction.taxLiability.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Refund</h4>
                      <p className="text-2xl font-bold text-green-600">${prediction.refundEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Effective Tax Rate</h4>
                      <p className="text-2xl font-bold text-gray-900">{prediction.effectiveTaxRate.toFixed(1)}%</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Marginal Tax Rate</h4>
                      <p className="text-2xl font-bold text-gray-900">{prediction.marginalTaxRate}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">AI Tax Optimization Recommendations</h4>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <ArrowRight size={16} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-lg">
                <TrendingUp size={48} className="text-indigo-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Tax Prediction</h3>
                <p className="text-gray-500 mb-4">
                  Our AI-powered tax prediction model uses machine learning to estimate your tax liability and provide personalized optimization strategies.
                </p>
                <p className="text-sm text-gray-400">
                  Fill out the form and click "Calculate" to see your prediction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxPrediction;