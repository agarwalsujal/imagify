import React, { useContext } from 'react'
import Home from './Pages/Home'
import Result from './Pages/Result'
import BuyCredit from './Pages/BuyCredit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const{ showLogin } = useContext(AppContext);
  return (
    <div className="App px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
     
    
     <Navbar></Navbar>
     <ToastContainer position='top-right' />
      { showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
        
      </Routes>
      <Footer></Footer>
  </div>

  )
}

export default App