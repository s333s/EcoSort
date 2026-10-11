import React, { useState } from 'react';
import { SAMPLE_WASTE_ITEMS, SampleItem } from '../data/sampleDataset';
import { DISPOSAL_DATA } from '../data/disposalRules';
import { Upload, Play, CheckCircle2, AlertTriangle, Cpu, Clock, RefreshCw, Sliders } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SampleItem>(SAMPLE_WASTE_ITEMS[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(0.40);
  const [hasClassified, setHasClassified] = useState<boolean>(true);

  // Compute result based on current item and threshold
  const isLowConfidence = selectedItem.simulatedConfidence < threshold;
  const effectiveCategory = isLowConfidence ? 'UNCERTAIN' : selectedItem.expectedCategory;
  const disposalAdvice = DISPOSAL_DATA[effectiveCategory] || DISPOSAL_DATA.UNCERTAIN;

  const handleSelectSample = (item: SampleItem) => {
    setSelectedItem(item);
    setCustomImage(null);
    setHasClassified(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        setCustomImage(base64);
        // Create custom mock item based on filename heuristics
        const lowerName = file.name.toLowerCase();
        let cat: 'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL' | 'ORGANIC' | 'E_WASTE' | 'UNCERTAIN' = 'PLASTIC';
        let synset = 'water bottle';
        if (lowerName.includes('can') || lowerName.includes('tin')) {
          cat = 'METAL'; synset = 'pop can';
        } else if (lowerName.includes('glass') || lowerName.includes('bottle')) {
          cat = 'GLASS'; synset = 'wine bottle';
        } else if (lowerName.includes('paper') || lowerName.includes('box')) {
          cat = 'PAPER'; synset = 'carton';
        } else if (lowerName.includes('banana') || lowerName.includes('food')) {
          cat = 'ORGANIC'; synset = 'banana';
        } else if (lowerName.includes('phone') || lowerName.includes('battery')) {
          cat = 'E_WASTE'; synset = 'cellular telephone';
        }

        setSelectedItem({
          id: 'custom-' + Date.now(),
          name: file.name,
          description: 'Uploaded user photo',
          rawSynset: synset,
          expectedCategory: cat,
          simulatedConfidence: 0.892,
          topCandidates: [
            { label: synset, prob: 0.892 },
            { label: 'container', prob: 0.054 },
            { label: 'packet', prob: 0.031 },
          ],
          inferenceTimeMs: 46,
          imageUrl: base64
        });
        setHasClassified(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const runClassification = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasClassified(true);
    }, 450); // Replicate ~400ms JavaFX Task async run
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the simulator */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🍌</span>
            <h2 className="text-lg font-bold text-slate-100">EcoSort Live JavaFX & DJL Simulator</h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
              DJL PyTorch ResNet-50 Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Interactive desktop preview of the exact JavaFX GUI architecture, CategoryMapper synset routing, and DisposalAdvisor expert rules.
          </p>
        </div>

        {/* Confidence Threshold Controller */}
        <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60 flex items-center gap-4 text-xs min-w-[280px]">
          <Sliders className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between font-mono text-slate-300 mb-1">
              <span>Confidence Guard</span>
              <span className="text-amber-400 font-semibold">{Math.round(threshold * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Main Split-Pane Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sample Items Picker & Image Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm">Select Sample Item (10-Benchmark)</h3>
              <label className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 font-medium">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Grid of 10 items */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {SAMPLE_WASTE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSample(item)}
                  className={`group relative rounded-lg overflow-hidden border transition-all text-left aspect-square ${
                    selectedItem.id === item.id
                      ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                  title={`${item.name} (${item.expectedCategory})`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 py-0.5 px-1 text-[9px] text-white truncate font-medium">
                    {item.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Image Preview (Styled as JavaFX drop-zone) */}
            <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-3 min-h-[220px]">
              <img
                src={customImage || selectedItem.imageUrl}
                alt={selectedItem.name}
                className="max-h-[190px] w-auto rounded-lg shadow-sm object-contain"
              />
              <div className="mt-2 text-center">
                <p className="text-xs font-semibold text-slate-800">{selectedItem.name}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{selectedItem.description}</p>
              </div>
            </div>

            {/* Classify Button (Triggers simulated Task<ClassificationResult>) */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={runClassification}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing DJL Predictor...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Classify Waste Item with DJL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Runtime Metrics Bar */}
          <div className="bg-slate-100 rounded-lg p-3 text-xs text-slate-600 border border-slate-200 flex items-center justify-between font-mono">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Backbone: ResNet-50</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Inference: {selectedItem.inferenceTimeMs} ms</span>
            </span>
          </div>
        </div>

        {/* Right Column: JavaFX AI Analysis & Guidance Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>EcoSort JavaFX Output Pane</span>
                <span className="font-mono">com.ecosort.EcoSortApp</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>AI Classification & Disposal Advice</span>
              </h3>
            </div>

            {!hasClassified ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-sm text-slate-500 mb-2">New image loaded into buffer.</p>
                <p className="text-xs text-slate-400">Click &ldquo;Classify Waste Item with DJL&rdquo; to execute inference.</p>
              </div>
            ) : (
              <>
                {/* Result Hero Header */}
                <div
                  className="rounded-xl p-5 border transition-all"
                  style={{
                    backgroundColor: `${disposalAdvice.binColor}10`,
                    borderColor: `${disposalAdvice.binColor}40`
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                        {disposalAdvice.icon}
                      </span>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Detected Category
                        </div>
                        <h4
                          className="text-2xl font-black"
                          style={{ color: disposalAdvice.binColor }}
                        >
                          {disposalAdvice.displayName}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">Confidence</div>
                      <div className="text-2xl font-mono font-bold text-slate-900">
                        {Math.round(selectedItem.simulatedConfidence * 100)}%
                      </div>
                    </div>
                  </div>

                  {/* Synset and Confidence Guard Details */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">ImageNet Synset:</span>
                      <code className="bg-white/80 px-2 py-0.5 rounded font-mono font-semibold text-slate-800 border border-slate-200">
                        &quot;{selectedItem.rawSynset}&quot;
                      </code>
                    </div>

                    {isLowConfidence ? (
                      <span className="text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Below {Math.round(threshold * 100)}% Threshold
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence Pass
                      </span>
                    )}
                  </div>
                </div>

                {/* Target Bin Card */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
                  <div className="text-xs font-semibold uppercase text-slate-500 mb-1">
                    Designated Disposal Bin
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: disposalAdvice.binColor }}
                    />
                    <span className="font-bold text-base text-slate-900">
                      {disposalAdvice.binName}
                    </span>
                  </div>
                </div>

                {/* Environmental Rationale (Why) */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span>🌱 Why It Matters (Environmental Rationale)</span>
                  </h4>
                  <p className="text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 p-3 rounded-lg leading-relaxed">
                    {disposalAdvice.why}
                  </p>
                </div>

                {/* How to Prepare Steps */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🛠 Preparation Checklist (How to Prepare)</span>
                  </h4>
                  <ul className="space-y-2">
                    {disposalAdvice.preparationSteps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/70"
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Special Warning if present */}
                {disposalAdvice.warning && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <span className="font-bold">Safety Notice: </span>
                      {disposalAdvice.warning}
                    </div>
                  </div>
                )}

                {/* Top 4 Alternative Synsets */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Top Alternative Candidates (Softmax Distribution)
                  </div>
                  <div className="space-y-1.5">
                    {selectedItem.topCandidates.map((cand, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-600 gap-3">
                        <span className="w-28 truncate font-mono text-[11px]">{cand.label}</span>
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${Math.round(cand.prob * 100)}%` }}
                          />
                        </div>
                        <span className="w-12 text-right font-mono text-[11px] text-slate-500">
                          {Math.round(cand.prob * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
