import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ApplicationForm from './components/ApplicationForm';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-cream selection:bg-brand-olive selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}
