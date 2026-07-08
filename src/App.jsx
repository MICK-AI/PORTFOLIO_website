import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ZenModeProvider } from './context/ZenModeContext'
import Home from './pages/Home'
import ResearchPapers from './pages/ResearchPapers'
import Agents from './pages/Agents'
import Projects from './pages/Projects'
import EDA from './pages/EDA'
import AIVideos from './pages/AIVideos'
import Tools from './pages/Tools'
import MissionControl from './pages/MissionControl'
import ZenEnvironment from './components/zen/ZenEnvironment'
import ZenCinematicTransition from './components/zen/ZenCinematicTransition'
import ZenModeControls from './components/zen/ZenModeControls'

const App = () => {
  return (
    <ZenModeProvider>
      <BrowserRouter>
        <ZenEnvironment />
        <ZenCinematicTransition />
        <ZenModeControls />
        <div id="app-shell" className="relative z-[1] min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research-papers" element={<ResearchPapers />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/eda" element={<EDA />} />
            <Route path="/ai-videos" element={<AIVideos />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/mission-control" element={<MissionControl />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ZenModeProvider>
  )
}

export default App;
