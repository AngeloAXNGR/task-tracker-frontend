import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'

// Components
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'




function App() {
  return (
    <div className="bg-slate-800 h-full">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
