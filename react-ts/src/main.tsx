import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Placeholder components for other routes
const Home = () => <h1>Welcome to the Home Page</h1>
const About = () => <h1>About Us</h1>

const Root = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/3d-scene">3D Scene</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/3d-scene" element={<App />} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)