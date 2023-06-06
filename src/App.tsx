import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home'

// Components
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Hooks
import useAuthContext from './hooks/useAuthContext'



function App() {

  const {user} = useAuthContext()

  return (
    <div className="bg-slate-800 h-full">
      <Header/>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
      </Routes>
    </div>
  )
}

export default App
