import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import VotingPortal from './pages/voting_portal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/voting-portal' element={<VotingPortal/>} />
          <Route path="*" element={<div className='w-screen h-screen flex justify-center items-center'>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
                  
      {/* Footer */}
      <footer className="absolute bottom-0 z-10 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400">
              © 2025 Abubakar Tafawa Balewa University - Mechatronics Department
          </p>
          </div>
      </footer>    
    </>

  )
}

export default App
