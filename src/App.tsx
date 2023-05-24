import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'

// Components
import Header from './components/Header'




function App() {
  return (
    <div className="bg-slate-800 h-full">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
