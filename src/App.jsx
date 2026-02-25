import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResearchPapers from './pages/ResearchPapers'
import Agents from './pages/Agents'
import Projects from './pages/Projects'
import EDA from './pages/EDA'
import AIVideos from './pages/AIVideos'
import Tools from './pages/Tools'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research-papers" element={<ResearchPapers />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/eda" element={<EDA />} />
        <Route path="/ai-videos" element={<AIVideos />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;