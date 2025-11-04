import React from 'react'
import Sidebar from './Component/Sidebar'
import Navbar from './Component/Navbar'
import { BrowserRouter } from 'react-router-dom'
import Approutes from './routes/Approutes'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Approutes />
      </BrowserRouter>
    </div>
  )
}

export default App