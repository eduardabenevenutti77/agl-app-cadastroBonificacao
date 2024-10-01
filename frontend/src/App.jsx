import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Cadastro from './pages/Cadastro'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Cadastrogestor from './pages/Cadastro-gestor'
import Login from './pages/Login'
import DashboardGestor from './pages/Dashboard-gestor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Cadastro/>}></Route>
          <Route path="/cadastrogestor" element={<Cadastrogestor/>}></Route>
          <Route path="/dashboardgestor" element={<DashboardGestor/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
