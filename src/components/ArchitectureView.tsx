import React from 'react';
import { Network, Layers, GitFork, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Network className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">EcoSort Architecture & OOP Class Diagram</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          EcoSort follows strict Object-Oriented Design principles (SOLID), leveraging <strong>Java 17 records</strong>, <strong>enhanced enums</strong>, <strong>interfaces for polymorphic classification</strong>, and the <strong>Template Method pattern</strong> in an abstract base class.
        </p>
      </div>

      {/* Visual Mermaid / UML Class Diagram Card */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>Mermaid UML Class Diagram (Inheritance & Polymorphism)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">com.ecosort.*</span>
        </div>

        {/* Visual Diagram Representation */}
        <div className="min-w-[760px] py-4 px-2 space-y-6 font-mono text-xs">
          {/* Top Level: Interface */}
          <div className="flex justify-center">
            <div className="bg-slate-800 border-2 border-purple-500/80 rounded-xl p-4 w-96 shadow-lg text-center">
              <div className="text-purple-400 text-[11px] font-bold tracking-wider">&laquo;interface&raquo;</div>
              <div className="text-sm font-bold text-white mb-2">WasteClassifier</div>
              <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2 text-left space-y-1">
                <div>+ initialize(): void</div>
                <div>+ classify(File): ClassificationResult</div>
                <div>+ isReady(): boolean</div>
                <div>+ getEngineName(): String</div>
                <div>+ close(): void</div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center text-slate-500 text-xs">
            ▲ implements (realization)
          </div>

          {/* Middle Level: Abstract Class */}
          <div className="flex justify-center">
            <div className="bg-slate-800 border-2 border-indigo-500/80 rounded-xl p-4 w-96 shadow-lg text-center">
              <div className="text-indigo-400 text-[11px] font-bold tracking-wider">&laquo;abstract class&raquo;</div>
              <div className="text-sm font-bold text-white mb-2">AbstractWasteClassifier</div>
              <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2 text-left space-y-1">
                <div>- confidenceThreshold: double = 0.40</div>
                <div># initialized: volatile boolean</div>
                <div className="text-indigo-300 font-semibold">+ classify(File): ClassificationResult [final Template Method]</div>
                <div># doPredict(File): ClassificationResult [abstract hook]</div>
                <div># validateImageFile(File): void</div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center text-slate-500 text-xs">
            ▲ extends (inheritance & polymorphic dispatch)
          </div>

          {/* Bottom Level: Concrete Subclasses */}
          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* DJL Concrete Subclass */}
            <div className="bg-slate-800 border border-blue-500/80 rounded-xl p-4 shadow-lg">
              <div className="text-blue-400 text-[11px] font-bold text-center">&laquo;concrete class&raquo;</div>
              <div className="text-sm font-bold text-white text-center mb-2">DJLWasteClassifier</div>
              <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2 space-y-1">
                <div>- model: ZooModel&lt;Image, Classifications&gt;</div>
                <div>- predictor: Predictor&lt;Image, Classifications&gt;</div>
                <div>+ initialize(): void (PyTorch ResNet-50)</div>
                <div># doPredict(File): ClassificationResult</div>
                <div>+ close(): void (Releases native C++ memory)</div>
              </div>
            </div>

            {/* Mock Concrete Subclass */}
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 shadow-lg">
              <div className="text-slate-400 text-[11px] font-bold text-center">&laquo;concrete class&raquo;</div>
              <div className="text-sm font-bold text-white text-center mb-2">MockWasteClassifier</div>
              <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2 space-y-1">
                <div>+ initialize(): void (Instant offline)</div>
                <div># doPredict(File): ClassificationResult</div>
                <div>+ close(): void</div>
              </div>
            </div>
          </div>

          {/* Domain Services & Data Objects */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
            <div className="bg-slate-800/80 border border-emerald-500/50 rounded-lg p-3">
              <div className="text-emerald-400 text-[10px] font-bold">&laquo;enum&raquo;</div>
              <div className="font-bold text-slate-200">WasteCategory</div>
              <div className="text-[10px] text-slate-400 mt-1">
                PLASTIC, GLASS, PAPER, METAL, ORGANIC, E_WASTE, UNCERTAIN
              </div>
            </div>

            <div className="bg-slate-800/80 border border-cyan-500/50 rounded-lg p-3">
              <div className="text-cyan-400 text-[10px] font-bold">&laquo;record DTO&raquo;</div>
              <div className="font-bold text-slate-200">ClassificationResult</div>
              <div className="text-[10px] text-slate-400 mt-1">
                category, confidenceScore, rawModelLabel, topCandidates, inferenceTimeMs
              </div>
            </div>

            <div className="bg-slate-800/80 border border-amber-500/50 rounded-lg p-3">
              <div className="text-amber-400 text-[10px] font-bold">&laquo;domain service&raquo;</div>
              <div className="font-bold text-slate-200">DisposalAdvisor</div>
              <div className="text-[10px] text-slate-400 mt-1">
                getAdvice(WasteCategory): DisposalAdvice (bin, why, preparation steps)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One-Line Class Explanations Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
          <GitFork className="w-4 h-4 text-blue-600" />
          <span>One-Line Explanation for Every Class (Teacher Cheat Sheet)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Class / Component</th>
                <th className="py-2.5 px-3 font-semibold">OOP Construct</th>
                <th className="py-2.5 px-3 font-semibold">Package</th>
                <th className="py-2.5 px-3 font-semibold">One-Line Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">WasteCategory</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700">enum</td>
                <td className="py-2.5 px-3 text-slate-400">model</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Defines the 6 waste categories plus UNCERTAIN, encapsulating bin color, display name, and icon symbol.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">ClassificationResult</td>
                <td className="py-2.5 px-3 font-mono text-cyan-700">record (Java 17)</td>
                <td className="py-2.5 px-3 text-slate-400">model</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Immutable data transfer record holding predicted category, confidence score, raw model synset, and top candidates.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">DisposalAdvice</td>
                <td className="py-2.5 px-3 font-mono text-cyan-700">record (Java 17)</td>
                <td className="py-2.5 px-3 text-slate-400">model</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Immutable value object encapsulating target bin name, hex color, environmental rationale, and step-by-step prep checklist.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">WasteClassifier</td>
                <td className="py-2.5 px-3 font-mono text-purple-700">interface</td>
                <td className="py-2.5 px-3 text-slate-400">classifier</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Polymorphic behavioral contract defining initialization, classification, thresholding, and resource closure.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">AbstractWasteClassifier</td>
                <td className="py-2.5 px-3 font-mono text-indigo-700">abstract class</td>
                <td className="py-2.5 px-3 text-slate-400">classifier</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Base class implementing the Template Method pattern to handle file validation, latency timing, and confidence thresholding.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">DJLWasteClassifier</td>
                <td className="py-2.5 px-3 font-mono text-blue-700">class (concrete)</td>
                <td className="py-2.5 px-3 text-slate-400">classifier</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Production classifier running local PyTorch ResNet-50 inference via Deep Java Library criteria and translator.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">MockWasteClassifier</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (concrete)</td>
                <td className="py-2.5 px-3 text-slate-400">classifier</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Deterministic offline test double for immediate UI verification and emergency hackathon backup.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">CategoryMapper</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (final utility)</td>
                <td className="py-2.5 px-3 text-slate-400">classifier</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Translates over 150 raw ImageNet synsets into the 6 EcoSort municipal waste categories using dictionary heuristics.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">ImagePreprocessor</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (final utility)</td>
                <td className="py-2.5 px-3 text-slate-400">image</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Validates image format, prevents out-of-memory leaks, and resizes rasters using standard Java ImageIO.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">DisposalAdvisor</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (domain service)</td>
                <td className="py-2.5 px-3 text-slate-400">service</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Encapsulates municipal recycling knowledge to output actionable bin assignments, environmental reasons, and prep steps.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">EcoSortApp</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (JavaFX)</td>
                <td className="py-2.5 px-3 text-slate-400">com.ecosort</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  JavaFX graphical desktop UI managing asynchronous tasks, drag-and-drop file inputs, and interactive result displays.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-blue-600">Main</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">class (launcher)</td>
                <td className="py-2.5 px-3 text-slate-400">com.ecosort</td>
                <td className="py-2.5 px-3 font-medium text-slate-800">
                  Standard static main launcher that bypasses JavaFX modular runtime restrictions in Java 11+.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key OOP Pillars Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>1. Polymorphism</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The UI controller holds a reference to <code className="bg-slate-100 px-1 py-0.5 rounded">WasteClassifier</code> interface. It has no idea whether it is calling PyTorch C++ via DJL or the mock engine!
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase">
            <Layers className="w-4 h-4" />
            <span>2. Template Method Pattern</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <code className="bg-slate-100 px-1 py-0.5 rounded">AbstractWasteClassifier.classify()</code> orchestrates validation, timing, and confidence threshold checks in a final method, delegating only <code className="bg-slate-100 px-1 py-0.5 rounded">doPredict()</code>.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Java 17 Records & Enums</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminates all mutable state bugs. Enums encapsulate metadata with each constant, while records guarantee thread-safe immutability across asynchronous background threads.
          </p>
        </div>
      </div>
    </div>
  );
};
