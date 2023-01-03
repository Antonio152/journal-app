import { Routes, Route, Navigate } from 'react-router-dom'
import { useCheckAuth } from '../auth/hooks/useCheckAuth'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'
export const AppRouter = () => {
 
  const status = useCheckAuth()
  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>

      {
        (status === "authenticated")
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />

      {/* Login y pagina de registro */}
      {/* <Route path='/auth/*' element={<AuthRoutes />} /> */}
      {/* Jorunal app */}
      {/* <Route path='/*' element={<JournalRoutes />} /> */}
    </Routes>
  )
}
