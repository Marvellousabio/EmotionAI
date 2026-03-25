import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isMomentPage = location.pathname.startsWith('/moment/');

  if (isMomentPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#303330] font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-rose-100/50">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
          <Link to="/" className="text-xl font-serif tracking-tighter text-rose-950 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Moment Engine
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-rose-900/70 hover:text-rose-950 transition-colors font-medium text-sm">Home</Link>
            <Link to="/create" className="bg-rose-900 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-rose-800 transition-all">
              Create a Moment
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-zinc-50 py-12 px-8 text-center border-t border-rose-100">
        <div className="font-serif text-2xl italic text-rose-950 mb-4">Moment Creation Engine</div>
        <p className="text-rose-800/60 font-serif italic text-sm">© 2026 The Ethereal Archive. Crafting digital eternity.</p>
      </footer>
    </div>
  );
}
