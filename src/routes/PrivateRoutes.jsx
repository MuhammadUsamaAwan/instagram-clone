import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../config/firebase.config'

const PrivateRoute = () => {
  return auth.currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
