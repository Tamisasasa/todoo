import { Routes, Route } from 'react-router-dom'
import Daily from './pages/Daily'
import Weekly from './pages/Weekly'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Weekly />} />
      <Route path="/daily" element={<Daily />} />
    </Routes>
  )
}

export default App