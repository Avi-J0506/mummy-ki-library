import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/Home'
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  return (
    <div className='bg-red-500 text-white'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books/create' element={<CreateBook/>}/>
        <Route path='/books/details/:id' element={<ShowBook/>}/>
        <Route path='/book/edit/:id' element={<EditBook/>}/>
        <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      </Routes>
    </div>
  )
}

export default App
