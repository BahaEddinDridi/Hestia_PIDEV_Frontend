import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null;
  currentUser: null;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  token: null,
  username: null,
  role: null,
  currentUser: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; currentUser: null }>) => {
      const { accessToken, currentUser } = action.payload;
      state.token = accessToken;
      state.currentUser = currentUser;
      state.username = currentUser.username;
      state.role = currentUser.role;
      state.isAuthorized = true;
      console.log("user: " + currentUser);
      console.log("token: " + accessToken);
    },
    logOut: (state) => {
      state.token = null;
      state.currentUser = null;
      state.username = null;
      state.role = null;
      state.isAuthorized = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentUsername = (state: { auth: AuthState }) => state.auth.username;
export const selectCurrentRole = (state: { auth: AuthState }) => state.auth.role;
export const selectCurrentUser = (state: {auth: AuthState}) => state.auth.currentUser;

export const selectIsAuthorized = (state: { auth: AuthState }) => state.auth.isAuthorized;