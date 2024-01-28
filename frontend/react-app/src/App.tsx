//import { useState } from 'react'
import './App.css'
import Header from './Header'
import Search from './Search'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
        <ChakraProvider>

      <div className="full-size">
          <Header />
          <Search />
      </div>
        <Footer />

        </ChakraProvider>
    </>
  )
}

export default App
