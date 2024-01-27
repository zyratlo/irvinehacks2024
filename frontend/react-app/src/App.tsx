//import { useState } from 'react'
import './App.css'
import Header from './Header'
import Search from './Search'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <div className="full-size">
          <Header />
          <Search />
      </div>
        <Footer />

    </>
  )
}

export default App
