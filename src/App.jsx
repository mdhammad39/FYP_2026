import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Methodology from './components/Methodology'
import YieldMap from './components/YieldMap'
import Predictions from './components/Predictions'
import Metrics from './components/Metrics'
import Team from './components/Team'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Methodology />
      <YieldMap />
      <Predictions />
      <Metrics />
      <Team />
      <Footer />
    </div>
  )
}

export default App
