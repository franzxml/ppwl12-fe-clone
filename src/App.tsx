import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Homes from './pages/Homes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/homes" replace />} />
          <Route path="/homes" element={<Homes />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
