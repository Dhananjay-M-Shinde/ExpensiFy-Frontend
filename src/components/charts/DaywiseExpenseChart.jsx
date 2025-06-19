import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, TrendingUp, DollarSign, BarChart3, Activity, Target } from 'lucide-react';
import { fetchDaywiseExpenses } from '../../store/slices/expenseSlice';

const DaywiseExpenseChart = () => {
  const dispatch = useDispatch();
  const { daywiseExpenses, daywiseLoading } = useSelector((state) => state.expenses);
  const [selectedPeriod, setSelectedPeriod] = useState('currentMonth');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    let startDate, endDate;
    const now = new Date();

    switch (selectedPeriod) {
      case 'currentMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
        endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
        break;
      case 'last7Days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
        break;
      case 'last30Days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        endDate = now.toISOString().split('T')[0];
        break;
      default:
        break;
    }

    dispatch(fetchDaywiseExpenses({ startDate, endDate }));
  }, [dispatch, selectedPeriod]);

  const maxAmount = Math.max(...daywiseExpenses.map(day => day.total), 0);
  const totalExpenses = daywiseExpenses.reduce((sum, day) => sum + day.total, 0);
  const avgDailyExpense = daywiseExpenses.length > 0 ? totalExpenses / daywiseExpenses.length : 0;
  const highestSpendingDay = daywiseExpenses.reduce((max, day) => day.total > max.total ? day : max, { total: 0 });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (daywiseExpenses.length > 20) {
      // For many data points, use very short format
      return `${date.getDate()}`;
    } else if (daywiseExpenses.length > 10) {
      // For medium data points, use short format
      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
    } else {
      // For few data points, use longer format
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}`;
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const getBarColor = (amount, index) => {
    const intensity = maxAmount > 0 ? (amount / maxAmount) : 0;
    if (hoveredBar === index) {
      return `rgba(59, 130, 246, ${Math.max(0.8, intensity)})`;
    }
    return `rgba(59, 130, 246, ${Math.max(0.3, intensity * 0.8)})`;
  };

  const getGradientId = (index) => `gradient-${index}`;

  if (daywiseLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 bg-white/50 rounded-lg w-1/3"></div>
            <div className="h-10 bg-white/50 rounded-lg w-32"></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/50 rounded-xl p-4">
                <div className="h-4 bg-white/70 rounded w-16 mb-2"></div>
                <div className="h-6 bg-white/70 rounded w-20"></div>
              </div>
            ))}
          </div>
          <div className="h-80 bg-white/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 border-b border-blue-100">        <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <BarChart3 className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Daily Expense Analytics</h3>
              <p className="text-xs md:text-sm text-gray-600">Visualize your spending patterns and trends</p>
            </div>
          </div>          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-blue-200 rounded-xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            >
              <option value="last7Days">📅 Last 7 Days</option>
              <option value="currentMonth">📊 Current Month</option>
              <option value="lastMonth">📈 Last Month</option>
              <option value="last30Days">🗓️ Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-6">        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mb-1">Total Spent</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{formatAmount(totalExpenses)}</div>
              </div>
              <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mb-1">Daily Average</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{formatAmount(avgDailyExpense)}</div>
              </div>
              <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mb-1">Active Days</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{daywiseExpenses.length}</div>
              </div>
              <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
                <Activity className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-5 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mb-1">Highest Day</div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">{formatAmount(highestSpendingDay.total)}</div>
              </div>
              <div className="p-1.5 md:p-2 bg-red-100 rounded-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>{/* Enhanced Chart */}
        {daywiseExpenses.length > 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-md border border-white/20">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-900">Spending Trends</h4>
              {hoveredBar !== null && (
                <div className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium">
                  {formatDate(daywiseExpenses[hoveredBar].date)}: {formatAmount(daywiseExpenses[hoveredBar].total)}
                </div>
              )}
            </div>
            
            <div className="h-32 sm:h-48 md:h-64 lg:h-80 relative">
              <svg className="w-full h-full" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
                {/* Gradient Definitions */}
                <defs>
                  {daywiseExpenses.map((_, index) => (
                    <linearGradient key={index} id={getGradientId(index)} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                    </linearGradient>
                  ))}
                </defs>

                {/* Grid lines with better styling */}
                {[0, 25, 50, 75, 100].map((percentage) => {
                  const yPos = 40 + (percentage / 100) * 200; // Map to chart area
                  return (
                    <g key={percentage}>
                      <line
                        x1="80"
                        y1={yPos}
                        x2="750"
                        y2={yPos}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <text
                        x="75"
                        y={yPos + 4}
                        fontSize="12"
                        fill="#6b7280"
                        textAnchor="end"
                        className="font-medium"
                      >
                        {formatAmount(maxAmount * (1 - percentage / 100))}
                      </text>
                    </g>
                  );
                })}

                {/* Enhanced Bars */}
                {daywiseExpenses.map((day, index) => {
                  const chartWidth = 670; // 750 - 80 = available width for bars
                  const barWidth = Math.min(Math.max(chartWidth / daywiseExpenses.length - 8, 20), 60);
                  const barSpacing = chartWidth / daywiseExpenses.length;
                  const barHeight = maxAmount > 0 ? (day.total / maxAmount) * 200 : 0;
                  const x = 80 + (index * barSpacing) + (barSpacing - barWidth) / 2;
                  const y = 240 - barHeight;

                  return (
                    <g key={day.date}>
                      {/* Bar with gradient and hover effects */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={hoveredBar === index ? `url(#${getGradientId(index)})` : getBarColor(day.total, index)}
                        className="transition-all duration-300 cursor-pointer"
                        rx="3"
                        onMouseEnter={() => setHoveredBar(index)}
                        onMouseLeave={() => setHoveredBar(null)}
                        onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                        style={{
                          filter: hoveredBar === index ? 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' : 'none',
                          transform: hoveredBar === index ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'bottom center'
                        }}
                      />

                      {/* Amount label on hover */}
                      {hoveredBar === index && (
                        <text
                          x={x + barWidth / 2}
                          y={y - 8}
                          fontSize="12"
                          fill="#1f2937"
                          textAnchor="middle"
                          className="font-semibold"
                          style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                        >
                          {formatAmount(day.total)}
                        </text>
                      )}                      {/* Date label with smart formatting */}
                      <text
                        x={x + barWidth / 2}
                        y={260}
                        fontSize={daywiseExpenses.length > 20 ? "10" : "11"}
                        fill={hoveredBar === index ? "#1f2937" : "#6b7280"}
                        textAnchor="middle"
                        className="font-medium"
                        transform={daywiseExpenses.length > 12 ? `rotate(-45 ${x + barWidth / 2} 260)` : ''}
                      >
                        {daywiseExpenses.length > 15 ? formatShortDate(day.date) : formatDate(day.date)}
                      </text>

                      {/* Day name - only show if enough space */}
                      {daywiseExpenses.length <= 12 && (
                        <text
                          x={x + barWidth / 2}
                          y={280}
                          fontSize="9"
                          fill="#9ca3af"
                          textAnchor="middle"
                          className="font-medium"
                        >
                          {day.day.slice(0, 3)}
                        </text>
                      )}

                      {/* Month indicator for short format */}
                      {daywiseExpenses.length > 15 && index === 0 && (
                        <text
                          x={x + barWidth / 2}
                          y={290}
                          fontSize="8"
                          fill="#9ca3af"
                          textAnchor="middle"
                          className="font-medium"
                        >
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-12 shadow-md border border-white/20 text-center">
            <div className="max-w-sm mx-auto">
              <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-600 mb-4">No expense data found for the selected period</p>
              <p className="text-sm text-gray-500">Add some expenses to see beautiful charts and analytics</p>
            </div>
          </div>
        )}

        {/* Enhanced Daily Breakdown */}
        {selectedDay !== null && daywiseExpenses[selectedDay] && (          <div className="mt-4 md:mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md border border-white/20">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h4 className="text-base md:text-lg font-semibold text-gray-900">
                📅 {formatFullDate(daywiseExpenses[selectedDay].date)}
              </h4>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="bg-blue-50 rounded-lg p-2 md:p-3">
                <div className="text-xs md:text-sm text-blue-600 font-medium">Total Spent</div>
                <div className="text-lg md:text-xl font-bold text-blue-700">
                  {formatAmount(daywiseExpenses[selectedDay].total)}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 md:p-3">
                <div className="text-xs md:text-sm text-green-600 font-medium">Transactions</div>
                <div className="text-lg md:text-xl font-bold text-green-700">
                  {daywiseExpenses[selectedDay].count}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">Expense Breakdown:</h5>
              {daywiseExpenses[selectedDay].expenses.map((expense, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{expense.category}</span>
                    <span className="text-xs text-gray-500">at {expense.time}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatAmount(expense.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Summary */}
        {daywiseExpenses.length > 0 && (          <div className="mt-4 md:mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md border border-white/20">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">📊 Quick Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Spending Consistency</span>
                  <span className="text-sm font-medium text-gray-900">
                    {((daywiseExpenses.length / 30) * 100).toFixed(0)}% active days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Peak Spending</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(highestSpendingDay.date)} - {formatAmount(highestSpendingDay.total)}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Budget Pace</span>
                  <span className="text-sm font-medium text-gray-900">
                    {avgDailyExpense > 50 ? '⚡ High' : avgDailyExpense > 25 ? '📈 Moderate' : '🎯 Conservative'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Transactions</span>
                  <span className="text-sm font-medium text-gray-900">
                    {daywiseExpenses.reduce((sum, day) => sum + day.count, 0)} transactions
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaywiseExpenseChart;
