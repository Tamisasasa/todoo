import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Daily from './pages/Daily'
import Weekly from './pages/Weekly'

function App() {
  return (
    <BrowserRouter basename="/todoo">
      <Routes>
        <Route path="/" element={<Weekly />} />
        <Route path="/daily" element={<Daily />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App