import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '../types';
import { deleteUser, updateUser } from './auth.logic';

const initialState: AuthState = {
   user: null,
  loading: false,
  error: null,

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    clearUser(state){
     state.user = null;
     state.loading = false
    }
  },
  extraReducers: (builder) => {
    // 1. منطق تحديث المستخدم
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update failed";
      });

    // 2. منطق حذف المستخدم (يتم دمجهم هنا باستخدام نفس الـ builder)
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // لو المستخدم اللي انحذف هو نفسه اللي عامل Login حالياً
        if (state.user?.uid === action.payload) {
          state.user = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Delete failed";
      });
  },
});

export const {setLoading,setUser,setError,logout,clearUser} = authSlice.actions

export default authSlice.reducer;
