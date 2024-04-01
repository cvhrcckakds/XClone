import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import FeedPage from './pages/FeedPage'
import ProtectedRoute from './pages/ProtectedRoute' 

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage/>} />
        {/* giriş yapmayanlar aşağıdaki sayfalara ulaşamasındiye korumalı route içine al */}
        <Route element={<ProtectedRoute />}> 
        <Route path='/home' element={<FeedPage/>} />
        </Route>
       
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
