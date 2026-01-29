import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResearchPapers from './pages/ResearchPapers'
import Manifesto from './pages/Manifesto'
import Projects from './pages/Projects'
import AIVideos from './pages/AIVideos'
import Tools from './pages/Tools'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research-papers" element={<ResearchPapers />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ai-videos" element={<AIVideos />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;