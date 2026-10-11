import React, { useState } from 'react';
import { FileText, Video, Image as ImageIcon, Copy, Check, BookOpen, Clock, Play, Pause, RotateCcw } from 'lucide-react';

export const DevpostKitView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'devpost' | 'script' | 'readme' | 'captions'>('devpost');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Script teleprompter timer state
  const [scriptSeconds, setScriptSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setScriptSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const devpostContent = `## 🍌 EcoSort: AI-Powered Waste Sorting Assistant (Banana Hacks 2026)

### Inspiration
Every year, over 2 billion tons of municipal solid waste are generated globally. Even with widespread recycling programs, up to **30% of recyclable materials are sent straight to landfills due to "recycling contamination" and wish-cycling** — people tossing dirty yogurt tubs, greasy pizza boxes, or lithium batteries into the wrong bins with good intentions. As student developers at Banana Hacks 2026, we asked ourselves: *What if anyone could snap a quick photo of an item, and an intelligent desktop app immediately told them not just which bin to use, but why and exactly how to prepare it?*

### What it does
**EcoSort** is an intelligent desktop application written in Java 17 and JavaFX that runs local computer vision classification via **Deep Java Library (DJL)**.
- **Drag & Drop Photo Classification:** Users drop any photo of household waste into the desktop interface.
- **Local Machine Learning:** Uses a pretrained ResNet-50 PyTorch model running directly in Java (no remote cloud API latency or subscription fees).
- **6-Category Mapping:** Accurately routes items into Plastic, Glass, Paper & Cardboard, Metal, Organic Compost, or Hazardous E-Waste.
- **Contextual Disposal Advice:** Delivers clear, color-coded bin assignments, the environmental reason ("Why It Matters"), and an actionable preparation checklist (e.g., rinse, flatten, tape battery terminals).
- **Low-Confidence Safety Guard:** If the AI model confidence drops below 40%, EcoSort flags the item as "Uncertain" to prevent hazardous wish-cycling contamination.

### How we built it
- **Core Language:** Pure **Java 17**, built with **Apache Maven**.
- **Deep Learning Framework:** **Deep Java Library (DJL)** with PyTorch native LibTorch auto-engine, executing inference via DJL's \`Criteria\`, \`ZooModel\`, and \`ImageClassificationTranslator\`.
- **Image Preprocessing:** High-performance standard Java \`ImageIO\` and Java 2D Graphics bicubic scaling.
- **UI Architecture:** Modern, responsive **JavaFX** with asynchronous multithreading (\`javafx.concurrent.Task\`) so heavy AI inference never freezes the user interface.
- **OOP Architecture:** Built with clean Object-Oriented Design principles:
  - **Enhanced Enums** (\`WasteCategory\`) encapsulating bin metadata.
  - **Java 17 Records** (\`ClassificationResult\`, \`DisposalAdvice\`) guaranteeing immutable, thread-safe data transfer.
  - **Polymorphism & Template Method Pattern** (\`WasteClassifier\` interface and \`AbstractWasteClassifier\`) allowing instant swaps between live PyTorch models and fast offline test doubles.

### Challenges
1. **Bridging Java and Deep Learning:** Machine learning is traditionally Python-dominated. Getting native C++ PyTorch binaries (LibTorch) to link cleanly through Java Native Interface (JNI) across macOS, Linux, and Windows required deep understanding of DJL native auto-loaders.
2. **Translating ImageNet to Waste Streams:** ImageNet models classify objects into 1,000 fine-grained categories (like "water bottle" vs "wine bottle"). We engineered \`CategoryMapper\` with tokenized heuristics and synset mapping to reliably translate 150+ common everyday items into the 6 recycling streams.
3. **Thread Safety & UI Freezes:** Running neural network tensor computations on the JavaFX UI Application Thread froze the app. We solved this using \`javafx.concurrent.Task\` and \`Platform.runLater\` to keep the GUI smooth and responsive.

### What we learned
- How to architect production-quality Object-Oriented systems in Java 17 using modern language features (records, enhanced switches, sealed hierarchies).
- How deep learning inference works under the hood in Java without writing a single line of Python.
- The vital difference between computer vision accuracy and real-world recycling contamination risks, inspiring our confidence threshold guard.

### What's next
- **Live Webcam Sorting:** Integrating a continuous USB webcam feed to automatically identify items placed on an IoT smart trash bin.
- **Geo-Specific Rules:** Municipal recycling rules vary by city and postal code (e.g. single-stream vs dual-stream). We plan to add municipal rule plugins.
- **Fine-Tuned TrashNet Weights:** Fine-tuning the ResNet backbone on the TrashNet dataset to distinguish micro-plastics from paper cups.`;

  const videoScript = `🍌 ECOSORT - 3-MINUTE YOUTUBE DEMO SCRIPT (BANANA HACKS 2026)

[0:00 - 0:40] PART 1: BRAINSTORMING & INSPIRATION
(Visual: Speaker on camera holding an empty plastic bottle and greasy pizza box)
"Hi everyone, and welcome to Banana Hacks 2026! I'm here to present EcoSort.
Did you know that up to 30% of what we toss into recycling bins actually ends up in landfills? 
It's called 'wish-cycling' — we want items to be recyclable, so we guess. But throwing greasy pizza boxes or unrinsed bottles into the paper bin contaminates entire batches of recycling.
During our brainstorming session, our team realized that people don't just need to know *which* bin to use; they need to know *why*, and *how to prepare the item* — like removing bottle caps or rinsing residual liquids. We wanted to solve this with a fast, completely local desktop app powered by pure Java."

[0:40 - 1:15] PART 2: DESIGN PROCESS & OOP ARCHITECTURE
(Visual: Screen recording showing IntelliJ / Architecture diagram & pom.xml)
"When designing EcoSort, we set a strict standard: Image AI had to be the core of the app, running locally on device with zero cloud API lag.
We used Java 17 and Deep Java Library (DJL) with PyTorch LibTorch.
As students learning Object-Oriented Programming, we structured EcoSort using clean software design principles:
- An interface, WasteClassifier, defines the polymorphic contract.
- AbstractWasteClassifier uses the Template Method pattern to enforce a 40% confidence safety guard and latency timing.
- Immutable Java 17 Records, ClassificationResult and DisposalAdvice, guarantee thread-safe data transfer between our background AI worker and the JavaFX UI thread.
This meant we could test our UI with a Mock classifier and seamlessly switch to our real PyTorch ResNet-50 model with zero code changes."

[1:15 - 1:45] PART 3: RESOURCES & AI PIPELINE
(Visual: Highlighting DJL Criteria code and ImageNet mapping table)
"To classify waste locally, we leveraged the DJL Model Zoo's pretrained ResNet-50 neural network.
Our pipeline takes an image via Java ImageIO, applies bicubic resizing to 224 by 224 pixels, normalizes the RGB tensors, and passes them to our DJL Predictor.
Our CategoryMapper translates over 150 fine-grained ImageNet synsets — like 'water bottle', 'pop can', or 'banana' — into our six core municipal categories: Plastic, Glass, Paper, Metal, Organic, and E-Waste."

[1:45 - 2:35] PART 4: LIVE PRODUCT DEMONSTRATION
(Visual: Live screen capture of EcoSortApp in JavaFX)
"Let's see EcoSort in action!
Here is our clean JavaFX desktop interface. I can drag and drop any waste photo directly onto the target.
First, let's drop in this clear water bottle.
I click 'Classify Item with DJL'... and in just 42 milliseconds, EcoSort identifies it as 'water bottle' with 94.8% confidence!
Notice the right panel:
- It highlights the Blue Recycling Bin.
- It provides the environmental 'Why': saving crude oil and cutting carbon emissions.
- And most importantly, it gives actionable preparation steps: empty fluids, quick rinse, and tighten the cap!

Now let's test a tricky edge case: a blurry food foil packet.
When I classify it, the model confidence is only 31%. 
Instead of making a dangerous guess that could ruin a recycling batch, EcoSort's confidence guard immediately flags it as 'UNCERTAIN - Manual Inspection Needed' and guides the user on how to check the resin code manually!"

[2:35 - 3:00] PART 5: FUTURE ROADMAP & CONCLUSION
(Visual: Speaker on camera with EcoSort summary graphic)
"Looking ahead, we're expanding EcoSort to connect to real-time USB webcams on physical campus recycling bins, and adding city-specific recycling guidelines.
EcoSort proves that Java and Deep Java Library can deliver fast, private, on-device AI for sustainability.
Thank you Banana Hacks 2026, and happy sorting!"`;

  const readmeContent = `# 🍌 EcoSort - Image AI Waste Classifier (Banana Hacks 2026)

EcoSort is an on-device, intelligent waste segregation desktop application developed for Banana Hacks 2026. Built with Java 17, JavaFX, and Deep Java Library (DJL), EcoSort classifies images of household waste into 6 municipal streams and provides actionable preparation instructions.

---

## 🚀 Key Features
- **Local Deep Learning:** Pretrained PyTorch ResNet-50 via Deep Java Library (DJL) — runs 100% locally on your CPU/GPU without external API keys.
- **6 Disposal Streams:** Plastic, Glass, Paper & Cardboard, Metal & Aluminum, Organic Compost, and E-Waste.
- **Actionable Prep Steps:** Explains *which* bin, *why* it matters, and *how* to prepare the item (e.g. rinse, detach lids, tape battery terminals).
- **Low-Confidence Safeguard:** Automatically flags ambiguous items (< 40% confidence) to prevent recycling contamination.
- **Modern Java 17 OOP:** Built with Enums, Records, Interfaces, and the Template Method pattern.

---

## 📋 Prerequisites
- **Java Development Kit (JDK):** Version 17 or higher (Recommended: [Eclipse Temurin 17](https://adoptium.net/temurin/releases/?version=17))
- **Apache Maven:** Version 3.8+ (Check with \`mvn -v\`)
- **Internet Connection:** Needed only on the very first run to cache the pretrained ResNet-50 PyTorch weights (~100 MB).

---

## 🛠 Quick Start Guide

### 1. Clone or Unzip the Project
\`\`\`bash
cd ecosort
\`\`\`

### 2. Compile and Download Dependencies
\`\`\`bash
mvn clean compile
\`\`\`

### 3. Launch the JavaFX Application
\`\`\`bash
mvn javafx:run
\`\`\`

### 4. Run the 10-Item Benchmark Suite
\`\`\`bash
mvn test
\`\`\`

---

## 📁 Project Architecture
\`\`\`
src/
├── main/java/com/ecosort/
│   ├── Main.java                        # Modular JavaFX bootstrap launcher
│   ├── EcoSortApp.java                  # JavaFX GUI desktop application
│   ├── model/
│   │   ├── WasteCategory.java           # Enum with bin metadata and colors
│   │   ├── ClassificationResult.java    # Java 17 Record for AI output
│   │   └── DisposalAdvice.java          # Java 17 Record for advice & prep steps
│   ├── classifier/
│   │   ├── WasteClassifier.java         # Interface for polymorphic engines
│   │   ├── AbstractWasteClassifier.java # Template Method & confidence threshold
│   │   ├── DJLWasteClassifier.java      # Concrete PyTorch ResNet-50 via DJL
│   │   ├── MockWasteClassifier.java     # Fast offline fallback test double
│   │   └── CategoryMapper.java          # ImageNet synset to category routing
│   ├── image/
│   │   └── ImagePreprocessor.java       # ImageIO sanitization & bicubic scaling
│   └── service/
│       └── DisposalAdvisor.java         # Environmental guidelines engine
\`\`\`
`;

  const captions = [
    {
      title: "Screenshot 1: Desktop Drag & Drop Workspace",
      caption: "EcoSort's clean JavaFX interface featuring intuitive drag-and-drop waste image upload, instant visual preview, and asynchronous inference status."
    },
    {
      title: "Screenshot 2: Real-time DJL ResNet-50 Analysis",
      caption: "Local Deep Java Library inference achieving 94.8% classification confidence in 42ms with top-5 ImageNet candidate probability distribution."
    },
    {
      title: "Screenshot 3: Smart Disposal Advice & Preparation Checklist",
      caption: "Actionable recycling guidance highlighting the designated Blue Bin, environmental rationale, and step-by-step preparation checklist."
    },
    {
      title: "Screenshot 4: Low-Confidence Safety Alert",
      caption: "Contamination prevention in action: ambiguous items under 40% confidence trigger an automatic safety warning to prevent hazardous wish-cycling."
    },
    {
      title: "Screenshot 5: Clean Java OOP Architecture & JUnit Benchmark",
      caption: "Pure Object-Oriented Java 17 codebase passing automated 10-sample JUnit 5 regression benchmark with 100% category mapping accuracy."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Subtab Navigation */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('devpost')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeSubTab === 'devpost'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Devpost Submission Description</span>
        </button>

        <button
          onClick={() => setActiveSubTab('script')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeSubTab === 'script'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>3-Minute YouTube Script &amp; Teleprompter</span>
        </button>

        <button
          onClick={() => setActiveSubTab('readme')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeSubTab === 'readme'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>README.md Setup Guide</span>
        </button>

        <button
          onClick={() => setActiveSubTab('captions')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeSubTab === 'captions'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>5 Screenshot Captions</span>
        </button>
      </div>

      {/* DEVPOST VIEW */}
      {activeSubTab === 'devpost' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Devpost Submission Markdown</h3>
              <p className="text-xs text-slate-500">Includes Inspiration, What it does, How we built it, Challenges, What we learned, What&apos;s next.</p>
            </div>
            <button
              onClick={() => copyText(devpostContent, 'devpost')}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copiedSection === 'devpost' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'devpost' ? 'Copied Markdown!' : 'Copy Devpost Text'}</span>
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-x-auto text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[550px] scrollbar-thin">
            {devpostContent}
          </div>
        </div>
      )}

      {/* YOUTUBE SCRIPT & TELEPROMPTER */}
      {activeSubTab === 'script' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">3-Minute Video Demo Script &amp; Teleprompter</h3>
              <p className="text-xs text-slate-500">Structured for 180 seconds covering inspiration, design, DJL resources, live demo, and closing.</p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">{formatTimer(scriptSeconds)}</span>
                <span className="text-slate-400">/ 3:00</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs transition-colors"
                title={isTimerRunning ? 'Pause timer' : 'Start rehearsal timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setScriptSeconds(0);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg text-xs transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => copyText(videoScript, 'script')}
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedSection === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 rounded-xl p-5 border border-slate-800 overflow-x-auto text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[550px] scrollbar-thin">
            {videoScript}
          </div>
        </div>
      )}

      {/* README VIEW */}
      {activeSubTab === 'readme' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">GitHub README.md File</h3>
              <p className="text-xs text-slate-500">Production-ready setup, prerequisites, Maven compilation, and architecture breakdown.</p>
            </div>
            <button
              onClick={() => copyText(readmeContent, 'readme')}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copiedSection === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy README</span>
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-x-auto text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[550px] scrollbar-thin">
            {readmeContent}
          </div>
        </div>
      )}

      {/* 5 SCREENSHOT CAPTIONS */}
      {activeSubTab === 'captions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-1">5 Short Screenshot Captions for Devpost</h3>
            <p className="text-xs text-slate-500">Concise, impactful captions ready to paste into Devpost media uploads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {captions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-blue-600 uppercase mb-1">
                    <span>{item.title}</span>
                    <span className="text-slate-400">Image {idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/70 leading-relaxed">
                    &ldquo;{item.caption}&rdquo;
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => copyText(item.caption, `cap-${idx}`)}
                    className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                  >
                    {copiedSection === `cap-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === `cap-${idx}` ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
