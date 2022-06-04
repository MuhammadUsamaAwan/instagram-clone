import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../config/firebase.config'
import PublicFooter from '../layouts/PublicFooter'

const PublicRoutes = () => {
  return !auth.currentUser ? (
    <>
      <main className='grid place-content-center min-h-[93vh]'>
        <Outlet />
      </main>
      <PublicFooter />
    </>
  ) : (
    <Navigate to='/' />
  )
}

export default PublicRoutes
