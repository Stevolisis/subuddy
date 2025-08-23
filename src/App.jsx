import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Subscriptions from './pages/subscriptions'
import Header from './components/app/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/subscriptions' element={<Subscriptions />} />
        <Route
          path="*"
          element={
            <div className='w-screen h-screen flex justify-center items-center'>
              404 Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
