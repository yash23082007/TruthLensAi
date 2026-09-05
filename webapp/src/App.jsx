import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import VerifierPage from './components/verifier/VerifierPage';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify/text" element={<VerifierPage modality="text" />} />
            <Route path="/verify/image" element={<VerifierPage modality="image" />} />
            <Route path="/verify/video" element={<VerifierPage modality="video" />} />
            <Route path="/verify/audio" element={<VerifierPage modality="audio" />} />
            {/* Add About, FAQ, Pricing pages later if needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
