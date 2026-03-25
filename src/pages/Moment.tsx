import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Music, Sparkles, Share2 } from 'lucide-react';
import { MomentData } from '../types';

export default function Moment() {
  const { id } = useParams();
  const [data, setData] = useState<MomentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const res = await fetch(`/api/moments/${id}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch moment", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoment();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Heart className="w-12 h-12 text-rose-300 fill-rose-300" />
      </motion.div>
    </div>
  );

  if (!data) return <div className="min-h-screen flex items-center justify-center">Moment not found</div>;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#303330] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 z-0">
          {data.media.images[0] ? (
            <img src={data.media.images[0]} className="w-full h-full object-cover opacity-30" alt="Hero" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full bg-rose-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#faf9f6]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-8"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto" />
          <h1 className="font-serif text-5xl md:text-7xl italic text-rose-950">
            {(data as any).heroMessage || `A Special ${data.occasion}`}
          </h1>
          <p className="font-body text-xl text-rose-900/70 max-w-2xl mx-auto">
            A digital archive of our most cherished memories.
          </p>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-rose-700/50">Scroll to begin</p>
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <h2 className="font-serif text-4xl italic text-rose-950">Our Story</h2>
          </div>
          <div className="font-serif text-2xl italic leading-relaxed text-rose-900/80 text-center">
            {data.narrative}
          </div>
        </motion.div>
      </section>

      {/* Media Timeline */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {(data as any).sections?.map((section: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={data.media.images[section.suggestedMediaIndex] || `https://picsum.photos/seed/${i}/800/800`} 
                  className="w-full h-full object-cover" 
                  alt={section.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="font-serif text-3xl italic text-rose-950">{section.title}</h3>
                <p className="font-body text-lg text-rose-900/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Surprise Section */}
      <section className="bg-zinc-950 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
          <div className="text-center space-y-6">
            <span className="font-medium text-xs tracking-[0.4em] uppercase text-amber-500">The Art of the Reveal</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white italic">Whispered Secrets & <br/><span className="text-amber-500">Hidden Wonders</span></h2>
          </div>
          
          <div className="w-full max-w-4xl aspect-[21/9] rounded-xl overflow-hidden relative group">
            <img 
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000" 
              src="https://picsum.photos/seed/secret/1200/600" 
              alt="Secret"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => alert("This is where your hidden message would be revealed!")}
                className="bg-amber-500 text-zinc-950 px-8 py-4 rounded-full font-medium tracking-widest uppercase text-xs hover:scale-110 transition-transform"
              >
                Unlock the Secret
              </button>
            </div>
          </div>
          
          <p className="text-zinc-400 font-serif italic text-xl text-center max-w-2xl leading-relaxed">
            "Some memories are meant to be found, not just shown. We create digital artifacts that require curiosity and reward connection."
          </p>
        </div>
      </section>
      <section className="py-40 px-6 text-center bg-rose-50/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h2 className="font-serif text-5xl italic text-rose-950">Forever & Always</h2>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="flex items-center gap-2 bg-rose-900 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-800 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share this Moment
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
