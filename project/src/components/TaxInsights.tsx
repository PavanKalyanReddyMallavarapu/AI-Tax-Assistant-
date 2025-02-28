import React, { useState } from 'react';
import { FileText, BookOpen, ArrowRight, Search, Download } from 'lucide-react';

interface TaxInsight {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  source: string;
  content: string;
}

const TaxInsights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInsight, setSelectedInsight] = useState<TaxInsight | null>(null);

  const insights: TaxInsight[] = [
    {
      id: 1,
      title: 'New Home Office Deduction Rules for 2023',
      summary: 'IRS updates guidelines for claiming home office deductions with simplified options for remote workers.',
      category: 'Deductions',
      date: '2023-05-15',
      source: 'IRS Publication 587',
      content: `
        # Home Office Deduction Updates for 2023

        The IRS has updated its guidelines for claiming home office deductions, providing simplified options for the growing number of remote workers.

        ## Key Changes:

        1. **Simplified Option Enhancement**: The standard deduction rate has increased to $6 per square foot (up from $5), with a maximum of 300 square feet.
        
        2. **Eligibility Expansion**: Temporary remote workers may now qualify if they use a dedicated space exclusively for work, even if it's not their principal place of business for the entire year.
        
        3. **Documentation Requirements**: Digital documentation (photos, digital floor plans) is now accepted as proof of home office use.
        
        4. **Mixed-Use Considerations**: New guidelines for spaces that serve multiple purposes during different times of day.

        ## Who Qualifies:

        - Self-employed individuals
        - Remote employees (with certain restrictions)
        - Gig workers and freelancers
        - Small business owners operating from home

        ## Required Documentation:

        - Floor plan showing the dedicated workspace
        - Photos of your home office
        - Records of work performed in the space
        - Utility bills and other home-related expenses

        Always consult with a tax professional to ensure proper application of these deductions to your specific situation.
      `
    },
    {
      id: 2,
      title: 'Cryptocurrency Tax Reporting Requirements',
      summary: 'New regulations require detailed reporting of cryptocurrency transactions for capital gains calculations.',
      category: 'Digital Assets',
      date: '2023-06-22',
      source: 'IRS Notice 2023-27',
      content: `
        # Cryptocurrency Tax Reporting Requirements

        The IRS has issued new guidance on cryptocurrency taxation, emphasizing increased reporting requirements and enforcement.

        ## Key Points:

        1. **Transaction Reporting**: All cryptocurrency transactions must be reported, regardless of size. This includes:
           - Trading one cryptocurrency for another
           - Converting crypto to fiat currency
           - Purchasing goods or services with cryptocurrency

        2. **Cost Basis Methods**: The IRS now allows several methods for determining cost basis:
           - FIFO (First In, First Out)
           - Specific Identification
           - Average Cost (with limitations)

        3. **Mining and Staking Income**: Income from mining or staking is taxable when received, based on the fair market value at that time.

        4. **NFT Considerations**: Non-fungible tokens (NFTs) are treated as collectibles and may be subject to a higher long-term capital gains rate of 28%.

        5. **Reporting Forms**:
           - Form 8949 for reporting crypto sales and exchanges
           - Schedule D for summarizing capital gains and losses
           - Schedule 1 for mining/staking income

        ## Penalties for Non-Compliance:

        - Failure to report: Up to $10,000 fine
        - Willful neglect: Up to $100,000 fine and potential criminal charges

        Taxpayers with significant cryptocurrency holdings should consider working with a tax professional who specializes in digital asset taxation.
      `
    },
    {
      id: 3,
      title: 'Student Loan Interest Deduction Expansion',
      summary: 'Income thresholds for student loan interest deductions have increased, allowing more taxpayers to qualify.',
      category: 'Education',
      date: '2023-04-10',
      source: 'IRS Publication 970',
      content: `
        # Student Loan Interest Deduction Expansion

        The student loan interest deduction has been expanded for the 2023 tax year, with higher income thresholds and increased maximum deduction amounts.

        ## Major Changes:

        1. **Higher Income Limits**: 
           - Single filers: Phase-out begins at $75,000 (up from $70,000)
           - Married filing jointly: Phase-out begins at $155,000 (up from $140,000)

        2. **Increased Maximum Deduction**: 
           - The maximum deduction has increased to $2,500 per year

        3. **Qualified Loan Expansion**: 
           - Private refinanced loans now qualify for the deduction
           - Loans for vocational and certification programs are now included

        4. **No Documentation Threshold**: 
           - All student loan interest payments qualify regardless of amount
           - Previously, amounts under $600 might not have received a 1098-E form

        ## Eligibility Requirements:

        - You must be legally obligated to pay the loan
        - You cannot be claimed as a dependent on someone else's return
        - If married, you must file jointly to claim the deduction
        - The loan must have been used for qualified education expenses

        This deduction is particularly valuable as it's an "above-the-line" deduction, meaning you can claim it even if you don't itemize deductions on your tax return.
      `
    },
    {
      id: 4,
      title: 'Electric Vehicle Tax Credit Changes',
      summary: 'New requirements for qualifying for the electric vehicle tax credit under the Inflation Reduction Act.',
      category: 'Tax Credits',
      date: '2023-07-05',
      source: 'IRS Notice 2023-42',
      content: `
        # Electric Vehicle Tax Credit Changes

        The Inflation Reduction Act has significantly modified the Electric Vehicle (EV) tax credit program, with new requirements taking effect in phases throughout 2023.

        ## New Credit Structure:

        1. **Clean Vehicle Credit**: Up to $7,500 total, divided into two components:
           - $3,750 for meeting battery component requirements
           - $3,750 for meeting critical minerals requirements

        2. **Income Limitations**:
           - Single filers: AGI must be under $150,000
           - Head of household: AGI must be under $225,000
           - Married filing jointly: AGI must be under $300,000

        3. **Vehicle Price Caps**:
           - Cars must have an MSRP under $55,000
           - SUVs, vans, and pickup trucks must have an MSRP under $80,000

        4. **Manufacturing Requirements**:
           - Final assembly must occur in North America
           - Battery components and critical minerals must meet specific sourcing requirements

        ## Used EV Credit:

        - Credit of 30% of the sale price, up to $4,000 maximum
        - Vehicle must be at least 2 years old
        - Purchase must be from a dealer
        - Lower income thresholds apply

        ## How to Claim:

        - Form 8936 must be filed with your tax return
        - Vehicle identification number (VIN) required
        - Manufacturer's certification of eligibility

        Starting in 2024, there will be an option to transfer the credit to the dealer at the time of purchase, effectively making it a point-of-sale discount.
      `
    },
    {
      id: 5,
      title: 'Retirement Account Contribution Limit Increases',
      summary: 'IRS announces higher contribution limits for 401(k), IRA, and other retirement accounts for 2023.',
      category: 'Retirement',
      date: '2023-03-18',
      source: 'IRS Announcement 2023-60',
      content: `
        # Retirement Account Contribution Limit Increases

        The IRS has announced significant increases to retirement account contribution limits for 2023, allowing taxpayers to save more for retirement while potentially reducing their taxable income.

        ## 2023 Contribution Limits:

        1. **401(k), 403(b), and 457 Plans**:
           - Employee contribution limit: $22,500 (up from $20,500)
           - Catch-up contribution (age 50+): Additional $7,500
           - Total possible contribution (age 50+): $30,000

        2. **Traditional and Roth IRAs**:
           - Contribution limit: $6,500 (up from $6,000)
           - Catch-up contribution (age 50+): Additional $1,000
           - Total possible contribution (age 50+): $7,500

        3. **SIMPLE IRAs**:
           - Contribution limit: $15,500 (up from $14,000)
           - Catch-up contribution (age 50+): Additional $3,500

        4. **SEP IRAs**:
           - Contribution limit: 25% of compensation or $66,000, whichever is less

        ## Income Phase-out Ranges:

        1. **Roth IRA Contributions**:
           - Single filers: $138,000 to $153,000
           - Married filing jointly: $218,000 to $228,000

        2. **Traditional IRA Deductibility** (if covered by workplace plan):
           - Single filers: $73,000 to $83,000
           - Married filing jointly: $116,000 to $136,000

        ## Tax Planning Opportunities:

        - Consider "backdoor" Roth IRA conversions if over income limits
        - Evaluate Roth vs. Traditional contributions based on current and expected future tax rates
        - Maximize employer matching contributions in workplace plans
        - Coordinate spousal contributions for non-working spouses

        These increased limits present significant tax planning opportunities, especially for high-income earners and those nearing retirement age.
      `
    },
    {
      id: 6,
      title: 'Child Tax Credit Updates for 2023',
      summary: 'Changes to the Child Tax Credit eligibility and amounts following recent tax law adjustments.',
      category: 'Tax Credits',
      date: '2023-02-28',
      source: 'IRS Publication 972',
      content: `
        # Child Tax Credit Updates for 2023

        The Child Tax Credit has undergone several changes for the 2023 tax year, reverting to pre-2021 levels but with some modifications.

        ## Current Credit Structure:

        1. **Base Credit Amount**:
           - $2,000 per qualifying child under age 17
           - Up to $1,500 is refundable as the Additional Child Tax Credit

        2. **Credit for Other Dependents**:
           - $500 non-refundable credit for dependents who don't qualify for the Child Tax Credit

        3. **Income Phaseout Thresholds**:
           - Single filers: Begins at $200,000
           - Married filing jointly: Begins at $400,000
           - Credit reduced by $50 for each $1,000 of income above threshold

        ## Qualification Requirements:

        - Child must have a valid Social Security Number
        - Child must be under age 17 at the end of the tax year
        - Child must be your dependent
        - Child must be a U.S. citizen, U.S. national, or U.S. resident alien

        ## Additional Child Tax Credit (ACTC):

        - Up to $1,500 of the credit is refundable
        - Must have earned income of at least $2,500
        - Special rules apply for families with three or more qualifying children

        ## Documentation Needed:

        - Birth certificates or other proof of age
        - Social Security cards
        - School records showing the same address as the taxpayer
        - Medical records

        Taxpayers should be aware that the expanded credit from 2021 (with monthly advance payments) has expired, and the credit has largely returned to its pre-pandemic structure.
      `
    },
    {
      id: 7,
      title: 'Self-Employment Tax Deduction Strategies',
      summary: 'Legal strategies to minimize self-employment tax burden for freelancers and small business owners.',
      category: 'Self-Employment',
      date: '2023-05-30',
      source: 'IRS Publication 334',
      content: `
        # Self-Employment Tax Deduction Strategies

        Self-employed individuals face a higher tax burden due to paying both the employer and employee portions of Social Security and Medicare taxes. Here are legitimate strategies to reduce this tax liability.

        ## Understanding Self-Employment Tax:

        - 15.3% total tax rate (12.4% Social Security + 2.9% Medicare)
        - Applied to 92.35% of net self-employment income
        - Additional 0.9% Medicare tax on income over $200,000 (single) or $250,000 (married filing jointly)

        ## Effective Deduction Strategies:

        1. **Business Structure Optimization**:
           - S-Corporation election can reduce SE tax by allowing reasonable salary/distribution split
           - Only salary portion is subject to employment taxes
           - Must pay yourself a "reasonable compensation" first

        2. **Retirement Plan Contributions**:
           - SEP IRA: Contribute up to 25% of net self-employment income (max $66,000)
           - Solo 401(k): Contribute up to $22,500 as employee plus profit-sharing component
           - Both reduce income subject to SE tax and income tax

        3. **Health Insurance Premium Deduction**:
           - 100% deductible for self, spouse, and dependents
           - Reduces income tax (but not SE tax directly)

        4. **Home Office Deduction**:
           - Must have dedicated space used exclusively for business
           - Simplified option: $5 per square foot (up to 300 sq ft)
           - Regular method: Percentage of actual expenses

        5. **Hire Family Members**:
           - Hiring children under 18: Wages exempt from Social Security and Medicare taxes
           - Hiring spouse: Can establish spousal IRA and health benefits
           - Must be legitimate work with reasonable compensation

        ## Documentation Requirements:

        - Maintain separate business and personal accounts
        - Keep detailed records of all business expenses
        - Document business purpose for all deductions
        - Retain receipts for at least 7 years

        Always consult with a tax professional before implementing these strategies to ensure they're appropriate for your specific situation and properly executed.
      `
    }
  ];

  const categories = Array.from(new Set(insights.map(insight => insight.category)));

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = 
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">Tax Insights & Analysis</h2>
        <p className="text-sm text-indigo-200">NLP-powered tax law updates and insights</p>
      </div>

      <div className="p-6">
        {selectedInsight ? (
          <div>
            <button
              onClick={() => setSelectedInsight(null)}
              className="mb-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowRight size={16} className="mr-1 rotate-180" /> Back to insights
            </button>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedInsight.title}</h2>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">
                    <FileText size={14} className="inline mr-1" /> {selectedInsight.source}
                  </span>
                  <span className="mr-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {selectedInsight.category}
                    </span>
                  </span>
                  <span>Published: {selectedInsight.date}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                {selectedInsight.content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{line.substring(4)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.substring(2)}</li>;
                  } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
                    return <li key={index} className="ml-4 list-decimal">{line.substring(3)}</li>;
                  } else if (line.startsWith('   - ')) {
                    return <li key={index} className="ml-8">{line.substring(5)}</li>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="my-2">{line}</p>;
                  }
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Download size={16} className="mr-2" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search and filters */}
            <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tax insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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

            {/* Insights grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {insight.category}
                      </span>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{insight.summary}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center">
                        <FileText size={12} className="mr-1" /> {insight.source}
                      </span>
                      <button
                        onClick={() => setSelectedInsight(insight)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Read More <ArrowRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredInsights.length === 0 && (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No insights found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaxInsights;