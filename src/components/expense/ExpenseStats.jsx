import React from 'react';
import { PieChart, BarChart3 } from 'lucide-react';

const ExpenseStats = ({ categories }) => {
  const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const totalAmount = categoryEntries.reduce((sum, [, amount]) => sum + amount, 0);

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-red-500',
      'Transportation': 'bg-blue-500',
      'Entertainment': 'bg-purple-500',
      'Shopping': 'bg-pink-500',
      'Bills': 'bg-yellow-500',
      'Healthcare': 'bg-green-500',
      'Education': 'bg-indigo-500',
      'Other': 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  const getPercentage = (amount) => {
    return totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(1) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
        </div>

        {categoryEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No expenses to show</p>
        ) : (
          <div className="space-y-3">
            {categoryEntries.map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    ${amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getPercentage(amount)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
        </div>

        {categoryEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No data available</p>
        ) : (
          <div className="space-y-3">
            {categoryEntries.slice(0, 5).map(([category, amount]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-600">${amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryColor(category)}`}
                    style={{ width: `${getPercentage(amount)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Categories</span>
            <span className="text-sm font-semibold text-gray-900">
              {categoryEntries.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Highest Category</span>
            <span className="text-sm font-semibold text-gray-900">
              {categoryEntries.length > 0 ? categoryEntries[0][0] : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Average per Category</span>
            <span className="text-sm font-semibold text-gray-900">
              ${categoryEntries.length > 0 ? (totalAmount / categoryEntries.length).toFixed(2) : '0.00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;
