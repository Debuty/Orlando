import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { syncAuthToken } from '../../shared/utils/api/authTokenBridge';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'ADMIN' | 'TENANT';
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      syncAuthToken(action.payload.token);
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      syncAuthToken(null);
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
