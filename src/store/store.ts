import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSlice } from './auth/authSlice'
import { journalSlice } from './journal/journalSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
  /* Fix error - A non-serializable value was detected in an action */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();