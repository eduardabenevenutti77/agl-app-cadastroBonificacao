import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Cadastro from './pages/Cadastro'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Cadastrogestor from './pages/Cadastro-gestor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Cadastro/>}></Route>
          <Route path="/cadastrogestor" element={<Cadastrogestor/>}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
