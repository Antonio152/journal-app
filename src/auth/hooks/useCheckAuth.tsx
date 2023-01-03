import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { FirebaseAuth } from "../../firebase/config"
import { login, logout } from "../../store/auth/authSlice"
import { startLoadingNotes } from "../../store/journal/thunks"
import { RootState, useAppDispatch } from "../../store/store"

export const useCheckAuth = () => {
  const { status } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout({ errorMessage: null }))
      dispatch(login(user))
      dispatch(startLoadingNotes())
    })
  }, [])
  return status
}
