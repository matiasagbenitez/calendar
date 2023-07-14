import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',     // 'checking' | 'authenticated' | 'not-authenticated'
        username: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.username = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.username = payload;
            state.errorMessage = undefined;
        }
    }
});


export const { onChecking, onLogin } = authSlice.actions;