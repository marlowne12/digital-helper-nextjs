"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Calendar, Bell, Clock, Search, Folder, 
  ChevronDown, MoreVertical, Trello, List, 
  Plus, Play, CheckCircle2, User, MessageSquare
} from "lucide-react";

export function HeroV2() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: "50%", y: "50%" });
  const [glowOpacity, setGlowOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px` });
  };

  return (
    <section className="relative overflow-hidden bg-[#090a0c] pt-32 pb-24 px-6 md:px-12 lg:px-24 agency-theme">
      {/* Visual background wrapper */}
      <div className="absolute inset-0 w-full h-full -z-10" />

      <div className="flex flex-col z-10 max-w-[80rem] mx-auto items-start relative">
        
        {/* Eyebrow badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/70 mb-6 border border-white/5 bg-white/[0.02]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff8964]"></span>
          Strategy • Automation • Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:text-8xl leading-none text-balance font-normal text-white tracking-tighter max-w-4xl mb-6 text-5xl sm:text-6xl"
        >
          Scale your business
          <br />
          with intelligence
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:text-xl text-[#95979e] leading-relaxed text-lg font-light max-w-3xl mb-10"
        >
          Digital Helper partners with growing service teams to automate client workflows, 
          deploy custom AI assistant pipelines, optimize Google search rankings, and design 
          scalable digital product experiences.
        </motion.p>

        {/* Call to Action - Interactive cursor glowing button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative group mb-24"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff8964] to-orange-400 rounded-full blur opacity-50 group-hover:opacity-80 transition duration-500" />
          <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setGlowOpacity(1)}
            onMouseLeave={() => setGlowOpacity(0)}
            className="group inline-flex text-xs sm:text-sm uppercase whitespace-nowrap transition-all duration-500 hover:scale-[1.02] outline-none font-semibold tracking-widest px-8 sm:px-10 py-4 relative items-center justify-center cursor-pointer text-[#3b2110]"
          >
            {/* Ambient glows inside the button that follow the cursor */}
            <span
              className="absolute -inset-10 z-[-2] rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(180px circle at ${coords.x} ${coords.y}, rgba(255, 116, 44, 0.22) 0%, rgba(255, 116, 44, 0.12) 32%, transparent 70%)`,
                filter: "blur(22px)",
              }}
            />
            <span
              className="absolute -inset-3 z-[-1] rounded-full transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(130px circle at ${coords.x} ${coords.y}, rgba(255, 235, 180, 0.36) 0%, rgba(255, 132, 55, 0.20) 42%, transparent 78%)`,
                filter: "blur(10px)",
              }}
            />

            {/* Button background pill */}
            <span className="absolute inset-0 z-0 rounded-full overflow-hidden bg-gradient-to-b from-[#fbfbfb] via-[#eeeeef] to-[#d9dadd] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.06),0_6px_16px_rgba(0,0,0,0.28)] ring-1 ring-white/70 pointer-events-none transition-all duration-500">
              <span
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: glowOpacity,
                  background: `radial-gradient(145px circle at ${coords.x} ${coords.y}, rgba(255,255,245,0.95) 0%, rgba(255,244,205,0.65) 24%, rgba(255,152,78,0.22) 52%, transparent 78%)`,
                }}
              />
            </span>

            {/* Text and Icon */}
            <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_0_rgba(255,255,255,0.75)]">
              See In Action
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Enhanced Complex UI Mockup - Project Tracker Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="overflow-hidden min-h-[580px] flex flex-col md:flex-row bg-[#0d0e12] w-full max-w-6xl border-charcoal border rounded-[20px] mx-auto relative shadow-[0_0_80px_rgba(0,0,0,0.7)]"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* 1. App Icon Sidebar (Left Pane) */}
          <div className="flex flex-col shrink-0 bg-[#090a0d] w-16 z-20 border-white/5 border-r pt-4 pb-4 gap-6 items-center hidden sm:flex">
            {/* DH Icon box */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mb-2 cursor-pointer hover:scale-105 transition-transform">
              <span className="text-[11px] font-extrabold tracking-tight">DH</span>
            </div>

            {/* Indicator Circular Percentage Dial */}
            <div className="overflow-hidden cursor-pointer group bg-[#07080a] w-12 h-24 border-orange-500/25 border rounded-xl relative">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent opacity-70"></div>
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(249,115,22,0.4)_1px,transparent_1px)] bg-[size:4px_4px]"></div>
              
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-9 rounded-xl bg-black/40 border border-orange-500/20 px-1 py-1 text-center">
                <div className="text-[13px] leading-none font-semibold text-white">
                  56<span className="text-[8px] text-white/70">%</span>
                </div>
                <div className="mt-1.5 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[#ff8964] animate-todo-bar"></div>
                </div>
              </div>
              <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500/10 blur-sm"></div>
              <div className="absolute bottom-2 left-0 right-0 z-10 text-center">
                <span className="text-[8px] font-bold tracking-wider text-white">ACTIVE</span>
              </div>
            </div>

            {/* Dashboard Sub-navigation Icons */}
            <div className="flex flex-col gap-4 mt-2 w-full items-center">
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors group relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#ff8964] rounded-full border border-[#090a0d]"></div>
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] relative">
                <Trello className="w-5 h-5 text-[#ff8964]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full"></div>
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                <Clock className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-auto">
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all border-dashed">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Client Projects Sidebar (Middle Pane) */}
          <div className="w-60 bg-[#121318]/90 border-r border-white/5 p-4 flex flex-col shrink-0 hidden md:flex z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-white tracking-tight">Active Workspaces</span>
            </div>

            {/* Search Input Mockup */}
            <div className="relative mb-6 group">
              <Search className="text-zinc-500 w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
              <div className="w-full bg-[#1b1c22] border border-white/5 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-400 select-none">
                Search board...
              </div>
            </div>

            <div className="space-y-1 mb-8">
              <button className="w-full flex items-center gap-3 px-2 py-1.5 text-white/70 hover:bg-white/5 hover:text-white rounded-md text-xs transition-colors group">
                <Folder className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                My Assigned Tasks
              </button>
              <button className="w-full flex items-center gap-3 px-2 py-1.5 text-white/70 hover:bg-white/5 hover:text-white rounded-md text-xs transition-colors group">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                Completed Audits
              </button>
            </div>

            {/* Project List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center justify-between text-[9px] font-semibold text-zinc-500 px-2 mb-2 tracking-wider">
                <span>CLIENT SYSTEMS</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </div>

              <div className="space-y-1">
                {/* Active Projects */}
                <div className="group">
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 text-white bg-white/5 rounded-lg text-xs font-medium">
                    <div className="w-2.5 h-2.5 border border-[#ff8964] transform rotate-45 flex-shrink-0"></div>
                    AI & Web Design
                  </button>
                  <div className="pl-6 space-y-0.5 mt-1 border-l border-white/5 ml-3">
                    <button className="w-full text-left px-2 py-1 text-white bg-white/5 rounded text-[11px] font-medium">
                      Kanban Board
                    </button>
                    <button className="w-full text-left px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/5 rounded text-[11px] transition-colors">
                      API Configs
                    </button>
                    <button className="w-full text-left px-2 py-1 text-zinc-400 hover:text-white hover:bg-white/5 rounded text-[11px] transition-colors">
                      SEO Analytics
                    </button>
                  </div>
                </div>

                <button className="w-full flex items-center gap-2 px-2 py-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md text-xs transition-colors mt-2">
                  <div className="w-2.5 h-2.5 border border-blue-500 rounded-full flex-shrink-0"></div>
                  Local SEO Setup
                </button>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md text-xs transition-colors">
                  <div className="w-2.5 h-2.5 border border-green-500 flex-shrink-0" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                  CRM Workflows
                </button>
              </div>
            </div>
          </div>

          {/* 3. Kanban Board Board Pane (Right Pane) */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#14151a]/95 relative z-10">
            
            {/* Board Header Info */}
            <div className="px-6 py-4 border-b border-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="hover:text-white cursor-pointer transition-colors">Workspace</span>
                  <span>/</span>
                  <span className="hover:text-white cursor-pointer transition-colors">AI & Web Design</span>
                  <span>/</span>
                  <span className="text-[#ff8964]">Kanban Board</span>
                </div>

                {/* Simulated Collaboration Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full border border-[#14151a] bg-gradient-to-tr from-orange-400 to-red-500 text-[8px] flex items-center justify-center font-bold text-white relative z-30">M</div>
                    <div className="w-5 h-5 rounded-full border border-[#14151a] bg-gradient-to-tr from-blue-500 to-indigo-500 text-[8px] flex items-center justify-center font-bold text-white relative z-20">A</div>
                    <div className="w-5 h-5 rounded-full border border-[#14151a] bg-zinc-700 text-[8px] flex items-center justify-center font-bold text-white relative z-10">+3</div>
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title and views */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-normal text-white tracking-tight">AI & Web Design Delivery</h2>
                <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg p-0.5 text-xs">
                  <button className="flex items-center gap-1.5 px-2.5 py-1 text-white bg-white/5 rounded font-medium">
                    <Trello className="w-3 h-3 text-[#ff8964]" />
                    Board
                  </button>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 text-zinc-400 hover:text-white transition-colors">
                    <List className="w-3 h-3" />
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="flex-1 overflow-x-auto p-6 relative">
              <div className="flex gap-4 h-full items-start min-w-[650px]">
                
                {/* 1. TO DO Column */}
                <div className="w-[220px] flex flex-col gap-3 shrink-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      To Do
                    </span>
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">2</span>
                  </div>

                  {/* Card 1 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-2.5">
                      Urgent
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug mb-3">
                      Train AI chatbot on company services &amp; PDF files
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        4h est
                      </span>
                      <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center text-[7px] font-bold text-black">A</div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2.5">
                      Design
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug mb-3">
                      Design conversion-focused booking layout
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        8h est
                      </span>
                      <div className="w-4 h-4 rounded-full bg-zinc-600 flex items-center justify-center text-[7px]"><User className="w-2.5 h-2.5" /></div>
                    </div>
                  </div>
                </div>

                {/* 2. IN PROGRESS Column */}
                <div className="w-[220px] flex flex-col gap-3 shrink-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff8964]" />
                      In Progress
                    </span>
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">2</span>
                  </div>

                  {/* Card 1 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.03] border border-[#ff8964]/20 hover:border-[#ff8964]/40 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#ff8964]/10 text-[#ff8964] border border-[#ff8964]/20 mb-2.5">
                      Local SEO
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug mb-3">
                      Set up local schema markup &amp; Rich Snippets
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-white/5 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3 animate-pulse text-[#ff8964]" />
                        Active
                      </span>
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[7px] font-bold text-white">M</div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2.5">
                      CRM
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug mb-3">
                      Configure Resend API automation for new leads
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        3h est
                      </span>
                      <div className="w-4 h-4 rounded-full bg-[#ff8964] flex items-center justify-center text-[7px] font-bold text-black">DH</div>
                    </div>
                  </div>
                </div>

                {/* 3. DONE Column */}
                <div className="w-[220px] flex flex-col gap-3 shrink-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Done
                    </span>
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">2</span>
                  </div>

                  {/* Card 1 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.01] border border-white/5 opacity-60 transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 mb-2.5">
                      Database
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug line-through mb-3">
                      Initialize Supabase backend client configuration
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2.5">
                      <span className="text-green-500 font-semibold">Completed</span>
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[7px] font-bold text-white">M</div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group/card relative p-3.5 rounded-xl bg-white/[0.01] border border-white/5 opacity-60 transition-all duration-300 cursor-pointer">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 mb-2.5">
                      Audit
                    </span>
                    <h3 className="text-[13px] font-medium text-white leading-snug line-through mb-3">
                      Audit local Google My Business listings
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2.5">
                      <span className="text-green-500 font-semibold">Completed</span>
                      <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center text-[7px] font-bold text-black">A</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
