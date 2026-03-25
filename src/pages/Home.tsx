import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Sparkles, Music, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-200 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-100 rounded-full blur-[150px]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl space-y-8 px-4"
        >
          <h1 className="font-serif text-5xl md:text-7xl italic leading-tight text-[#303330] tracking-tight">
            Don’t just send a message. <br/>
            <span className="bg-gradient-to-r from-rose-700 to-amber-600 bg-clip-text text-transparent">Create a moment</span> they’ll never forget.
          </h1>
          <p className="font-body text-lg md:text-xl text-[#5d605c] max-w-2xl mx-auto leading-relaxed">
            The AI-powered storyteller that turns your memories into a bespoke digital experience for proposals, anniversaries, and birthdays.
          </p>
          <div className="pt-6">
            <Link 
              to="/create"
              className="inline-flex items-center gap-2 bg-rose-900 text-white px-12 py-5 rounded-full font-medium tracking-widest uppercase text-sm shadow-xl hover:scale-105 transition-transform"
            >
              Create Your Moment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Animated Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative mt-20 w-full max-w-5xl group"
        >
          <div className="bg-white/70 backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden border border-white/20 aspect-video relative flex items-center justify-center">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
              src="https://picsum.photos/seed/moment/1920/1080?blur=4" 
              alt="Dreamy aesthetic"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex flex-col items-center space-y-8">
              <motion.div 
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-lg shadow-xl -translate-x-10"
              >
                <p className="font-serif italic text-2xl text-rose-900">"To our forever..."</p>
              </motion.div>
              <div className="flex space-x-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src="https://picsum.photos/seed/love/200/200" alt="Memory" referrerPolicy="no-referrer" />
                </div>
                <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg rotate-3">
                  <img src="https://picsum.photos/seed/joy/300/300" alt="Memory" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl py-2 px-6 rounded-full flex items-center space-x-3 shadow-lg">
                <Music className="w-4 h-4 text-rose-500" />
                <span className="font-medium text-xs tracking-widest uppercase">Playing: Our First Song</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="bg-[#f4f4f0] py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-medium text-xs tracking-[0.3em] uppercase text-amber-600">The Canvas</span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#303330]">Crafted with Pure Emotion</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-white rounded-lg p-12 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl group-hover:bg-rose-200/50 transition-colors"></div>
              <div className="relative z-10 space-y-8">
                <h3 className="font-serif text-3xl italic">Interactive Timelines</h3>
                <p className="font-body text-[#5d605c] max-w-md">Scroll through a seamless narrative of your journey, where photos and memories fade in with cinematic grace.</p>
                <div className="relative h-64 w-full bg-[#eeeeea] rounded-lg overflow-hidden">
                  <img className="w-full h-full object-cover opacity-60" src="https://picsum.photos/seed/vintage/800/400" alt="Timeline" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="md:col-span-4 space-y-8">
              <div className="bg-rose-100/30 rounded-lg p-10 h-[300px] flex flex-col justify-end">
                <Music className="w-8 h-8 text-rose-700 mb-6" />
                <h3 className="font-serif text-2xl italic mb-4">Sonic Atmosphere</h3>
                <p className="font-body text-sm text-rose-900/70">We synchronize the emotional peaks of your story with a curated soundtrack.</p>
              </div>
              <div className="bg-amber-100/30 rounded-lg p-10 h-[300px] flex flex-col justify-end">
                <Sparkles className="w-8 h-8 text-amber-600 mb-6" />
                <h3 className="font-serif text-2xl italic mb-4">Reveal Effects</h3>
                <p className="font-body text-sm text-amber-900/70">Typewriter reveals and fading vignettes that pull the heartstrings at just the right moment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-[#eeeeea] flex items-center justify-center rounded-full mx-auto md:mx-0">
                <Heart className="w-8 h-8 text-rose-700" />
              </div>
              <h4 className="font-serif text-2xl italic">Tell us about them</h4>
              <p className="font-body text-[#5d605c] leading-relaxed">Chat with our AI Curator about your shared history, inside jokes, and special milestones.</p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-[#eeeeea] flex items-center justify-center rounded-full mx-auto md:mx-0">
                <Sparkles className="w-8 h-8 text-rose-700" />
              </div>
              <h4 className="font-serif text-2xl italic">Share memories</h4>
              <p className="font-body text-[#5d605c] leading-relaxed">Upload photos, voice notes, or even short video clips from your most cherished moments.</p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <div className="w-16 h-16 bg-[#eeeeea] flex items-center justify-center rounded-full mx-auto md:mx-0">
                <Shield className="w-8 h-8 text-rose-700" />
              </div>
              <h4 className="font-serif text-2xl italic">We create magic</h4>
              <p className="font-body text-[#5d605c] leading-relaxed">Our engine weaves it all together into a living digital archive that feels truly human.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
