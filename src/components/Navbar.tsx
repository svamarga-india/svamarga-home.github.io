import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto w-full">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-brand-olive p-2 rounded-full text-white transition-transform group-hover:rotate-12">
          <Leaf size={20} />
        </div>
        <span className="serif text-2xl font-semibold tracking-tight">Svamarga</span>
      </Link>
      <div className="flex gap-8 items-center">
        <Link 
          to="/#careers" 
          className="text-sm uppercase tracking-widest font-medium hover:text-brand-olive transition-colors"
          onClick={() => {
            const el = document.getElementById('careers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Careers
        </Link>
        <Link 
          to="/apply" 
          className="bg-brand-olive text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
}
