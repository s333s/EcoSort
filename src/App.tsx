import React, { useState } from 'react';
import { InteractiveDemo } from './components/InteractiveDemo';
import { CodeExplorer } from './components/CodeExplorer';
import { ArchitectureView } from './components/ArchitectureView';
import { SprintPlanView } from './components/SprintPlanView';
import { DJLDeepDive } from './components/DJLDeepDive';
import { TestPlanView } from './components/TestPlanView';
import { TroubleshootingView } from './components/TroubleshootingView';
import { DevpostKitView } from './components/DevpostKitView';
import {
  PlayCircle,
  FileCode2,
  Network,
  CalendarDays,
  Cpu,
  BarChart3,
  Wrench,
  Trophy,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

type TabType = 'demo' | 'code' | 'architecture' | 'sprint' | 'djl' | 'test' | 'troubleshooting' | 'devpost';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('demo');

  const navItems = [
    { id: 'demo' as TabType, label: 'Live Simulator', icon: PlayCircle },
    { id: 'code' as TabType, label: 'Java Codebase', icon: FileCode2 },
    { id: 'architecture' as TabType, label: 'Architecture & OOP', icon: Network },
    { id: 'sprint' as TabType, label: '2-Day Sprint Plan', icon: CalendarDays },
    { id: 'djl' as TabType, label: 'DJL Model & Mapping', icon: Cpu },
    { id: 'test' as TabType, label: '10-Sample Benchmark', icon: BarChart3 },
    { id: 'troubleshooting' as TabType, label: 'Troubleshooting', icon: Wrench },
    { id: 'devpost' as TabType, label: 'Devpost & Pitch Kit', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Main Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl bg-amber-400/20 p-1.5 rounded-xl border border-amber-400/30">🍌</span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-white">EcoSort</h1>
                  <span className="text-[11px] bg-amber-400/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-400/30">
                    Banana Hacks 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Java 17 • Deep Java Library (DJL) • JavaFX Desktop Assistant
                </p>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 font-mono">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                <span>Mentor &amp; Hackathon Edition</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Row */}
          <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none text-xs font-medium border-t border-slate-800 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'demo' && <InteractiveDemo />}
        {activeTab === 'code' && <CodeExplorer />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'sprint' && <SprintPlanView />}
        {activeTab === 'djl' && <DJLDeepDive />}
        {activeTab === 'test' && <TestPlanView />}
        {activeTab === 'troubleshooting' && <TroubleshootingView />}
        {activeTab === 'devpost' && <DevpostKitView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span>EcoSort: Banana Hacks 2026 Student Image AI Submission</span>
            <span>•</span>
            <span className="font-mono text-slate-400">Pure Java OOP Architecture</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Deep Java Library (DJL) v0.26.0</span>
            <span>•</span>
            <span>JavaFX 17</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
