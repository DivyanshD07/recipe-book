import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/recipe/:id' element={<RecipeDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App