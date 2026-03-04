import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '../types';
import { updateUser } from './auth.logic';

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
  },
  extraReducers(builder) {
    builder
    .addCase(updateUser.pending,(state)=>{
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
  },
});

export const {setLoading,setUser,setError,logout} = authSlice.actions

export default authSlice.reducer;
