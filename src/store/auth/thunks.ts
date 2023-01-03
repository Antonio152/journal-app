import { createApi } from '@reduxjs/toolkit/query/react'
import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, singiInWithGoogle } from '../../firebase/providers'
import { registerWithEmailPasswordI } from '../../firebase/types/providers'
import { clearNoteOnLogout } from '../journal/journalSlice'
import { AppDispatch } from '../store'
import { checkingCredentials, logout, login } from './authSlice'

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
  }
}
export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    const result = await singiInWithGoogle()
    if (!result?.success) return dispatch(logout({ errorMessage: result?.errorMessage }))
    dispatch(login(result))
  }
}

export const createUserWithEmailPassword = ({ fullName, email, password }: registerWithEmailPasswordI) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    const { success, uid, photoURL, errorMessage }: any = await registerWithEmailPassword({ fullName, email, password })
    if (!success) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, email, displayName: fullName, photoURL }))
  }
}

export const startLoginWithEmailPassword = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredentials())
        const { success, uid, photoURL, errorMessage, displayName }: any = await loginWithEmailPassword({ email, password })
        if (!success) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, email, photoURL, displayName }))
    }
}

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase()
    dispatch(clearNoteOnLogout())
    dispatch(logout({ errorMessage:null }))
  }
}