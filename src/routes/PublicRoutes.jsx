import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../config/firebase.config'

const PublicRoutes = () => {
  return !auth.currentUser ? <Outlet /> : <Navigate to='/' />
}

export default PublicRoutes
