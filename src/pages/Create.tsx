import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Image as ImageIcon, Video, Mic, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateChatResponse, generateMomentNarrative } from '../services/ai';
import { ChatMessage, MomentData } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [media, setMedia] = useState<{ images: string[], videos: string[], voice: string[] }>({
    images: [],
    videos: [],
    voice: []
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial message
    const startChat = async () => {
      setIsTyping(true);
      const response = await generateChatResponse([], "Hello! I want to create a moment.");
      setMessages([{ role: 'model', text: response }]);
      setIsTyping(false);
    };
    startChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input } as ChatMessage;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await generateChatResponse(messages, input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos' | 'voice') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const { url } = await res.json();
      setMedia(prev => ({
        ...prev,
        [type]: [...prev[type], url]
      }));
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const [previewData, setPreviewData] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const momentData: MomentData = {
      occasion: messages.find(m => m.text.toLowerCase().includes('birthday')) ? 'Birthday' : 
                messages.find(m => m.text.toLowerCase().includes('anniversary')) ? 'Anniversary' : 
                messages.find(m => m.text.toLowerCase().includes('proposal')) ? 'Proposal' : 'Special Occasion',
      relationship: "Partner",
      tone: "Romantic",
      memories: messages.filter(m => m.role === 'user').map(m => m.text),
      messages: [],
      media
    };

    try {
      const narrative = await generateMomentNarrative(momentData);
      setPreviewData({ ...momentData, ...narrative });
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!previewData) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/moments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previewData)
      });
      const { id } = await res.json();
      navigate(`/moment/${id}`);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (previewData) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex justify-between items-center border-b border-rose-100 pb-6">
            <h2 className="font-serif text-3xl italic text-rose-950">Preview Your Moment</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setPreviewData(null)}
                className="px-6 py-2 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all"
              >
                Back to Chat
              </button>
              <button 
                onClick={handleSave}
                disabled={isGenerating}
                className="bg-rose-900 text-white px-8 py-2 rounded-full font-medium hover:bg-rose-800 transition-all flex items-center gap-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Publish Moment
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-rose-50 rounded-xl">
              <h4 className="font-bold text-rose-900 mb-2">Hero Message</h4>
              <p className="text-rose-800">{previewData.heroMessage}</p>
            </div>
            <div className="p-6 bg-[#f4f4f0] rounded-xl">
              <h4 className="font-bold text-[#303330] mb-2">Narrative</h4>
              <p className="text-[#5d605c] leading-relaxed">{previewData.narrative}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewData.media.images.map((img: string, i: number) => (
                <img key={i} src={img} className="w-full aspect-square object-cover rounded-lg shadow-sm" alt="Preview" referrerPolicy="no-referrer" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[700px]">
        {/* Chat Header */}
        <div className="p-6 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-900 rounded-full flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-rose-950">AI Curator</h3>
              <p className="text-xs text-rose-700/70 uppercase tracking-widest">Designing your moment</p>
            </div>
          </div>
          {messages.length > 4 && (
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-rose-900 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-rose-800 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Moment
            </button>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-rose-900 text-white rounded-tr-none' 
                    : 'bg-[#f4f4f0] text-[#303330] rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#f4f4f0] p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce delay-150" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-rose-100 bg-white">
          <div className="flex items-center gap-4 mb-4">
            <label className="cursor-pointer p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-700">
              <ImageIcon className="w-5 h-5" />
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} />
            </label>
            <label className="cursor-pointer p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-700">
              <Video className="w-5 h-5" />
              <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'videos')} />
            </label>
            <label className="cursor-pointer p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-700">
              <Mic className="w-5 h-5" />
              <input type="file" className="hidden" accept="audio/*" onChange={(e) => handleFileUpload(e, 'voice')} />
            </label>
            <div className="flex-grow text-xs text-rose-700/50 italic">
              {media.images.length + media.videos.length + media.voice.length} assets uploaded
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tell your story..."
              className="flex-grow bg-[#f4f4f0] border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-rose-200 outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-rose-900 text-white p-3 rounded-full hover:bg-rose-800 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
