import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoute from './PrivateRoutes'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import Home from '../pages/Home'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
