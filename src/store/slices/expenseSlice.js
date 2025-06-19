import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks for expense operations
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/expenses/get-expenses');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch expenses');
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      console.log('API call - adding expense:', expenseData);
      const response = await api.post('/expenses/add-expense', expenseData);
      console.log('API response - add expense:', response.data);
      toast.success('Expense added successfully!');
      return response.data.data;
    } catch (error) {
      console.error('API error - add expense:', error.response?.data);
      toast.error(error.response?.data?.error?.message || 'Failed to add expense');
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to add expense');
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/expenses/update-expense/${id}`, expenseData);
      toast.success('Expense updated successfully!');
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to update expense');
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to update expense');
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (expenseId, { rejectWithValue }) => {
    try {
      await api.delete(`/expenses/delete-expense/${expenseId}`);
      toast.success('Expense deleted successfully!');
      return expenseId;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to delete expense');
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to delete expense');
    }
  }
);

export const fetchDaywiseExpenses = createAsyncThunk(
  'expenses/fetchDaywiseExpenses',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await api.get(`/expenses/daywise-expenses?${params}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch daywise expenses');
    }
  }
);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  totalAmount: 0,
  currentMonthExpenses: [],
  categories: {},
  daywiseExpenses: [],
  daywiseLoading: false,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    calculateTotals: (state) => {
      state.totalAmount = state.expenses.reduce((total, expense) => total + expense.amount, 0);
      
      // Get current month expenses
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      state.currentMonthExpenses = state.expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      });

      // Calculate category totals
      state.categories = state.expenses.reduce((categories, expense) => {
        if (categories[expense.category]) {
          categories[expense.category] += expense.amount;
        } else {
          categories[expense.category] = expense.amount;
        }
        return categories;
      }, {});
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
        state.error = null;
        // Calculate totals after fetching
        expenseSlice.caseReducers.calculateTotals(state);
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })      .addCase(addExpense.fulfilled, (state, action) => {
        console.log('Redux - Add expense fulfilled, payload:', action.payload);
        state.loading = false;
        
        // Ensure payload is a single expense object, not an array
        const newExpense = Array.isArray(action.payload) ? action.payload[0] : action.payload;
        state.expenses = [...state.expenses, newExpense];
        state.error = null;
        
        // Recalculate totals
        expenseSlice.caseReducers.calculateTotals(state);
        console.log('Redux - Updated expenses array:', state.expenses);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(expense => expense._id === action.payload._id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
        state.error = null;
        // Recalculate totals
        expenseSlice.caseReducers.calculateTotals(state);
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(expense => expense._id !== action.payload);
        state.error = null;
        // Recalculate totals
        expenseSlice.caseReducers.calculateTotals(state);
      })      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Daywise Expenses
      .addCase(fetchDaywiseExpenses.pending, (state) => {
        state.daywiseLoading = true;
        state.error = null;
      })
      .addCase(fetchDaywiseExpenses.fulfilled, (state, action) => {
        state.daywiseLoading = false;
        state.daywiseExpenses = action.payload;
        state.error = null;
      })
      .addCase(fetchDaywiseExpenses.rejected, (state, action) => {
        state.daywiseLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, calculateTotals } = expenseSlice.actions;
export default expenseSlice.reducer;
