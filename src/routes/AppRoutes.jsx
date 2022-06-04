import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import Signup from '../auth/Signup'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
