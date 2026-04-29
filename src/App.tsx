import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homes from './pages/Homes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homes" replace />} />
        <Route path="/homes" element={<Homes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
