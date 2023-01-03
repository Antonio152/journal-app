import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { interfaceSliceAuth, interfaceSliceAuthLogOut } from './types/authSliceTypes';
const initialState: interfaceSliceAuth = {
    status: "checking",// not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<interfaceSliceAuth>) => {
            state.status = "authenticated",
            state.uid = action.payload.uid,
            state.email = action.payload.email,
            state.displayName = action.payload.displayName,
            state.photoURL = action.payload.photoURL,
            state.errorMessage = null
        },
        logout: (state, action: PayloadAction<interfaceSliceAuthLogOut>) => {
            state.status = "not-authenticated",
            state.uid = null,
            state.email = null,
            state.displayName = null,
            state.photoURL = null,
            state.errorMessage = action.payload.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = "checking";
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;