import React, { useState } from 'react';
import { AlertCircle, Terminal, Copy, Check, Search, ShieldCheck } from 'lucide-react';

interface ErrorEntry {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  fix: string;
  command?: string;
  tag: 'DJL' | 'JavaFX' | 'ImageIO' | 'Maven' | 'Mac/OS';
}

const COMMON_ERRORS: ErrorEntry[] = [
  {
    id: "err-1",
    title: "JavaFX Runtime Components Missing",
    symptom: "Error: JavaFX runtime components are missing, and are required to run this application",
    cause: "In modern modular Java (Java 11+), launching a class that extends Application without the JavaFX module path triggers this JVM check.",
    fix: "Use our Main.java wrapper launcher (which doesn't extend Application) or launch via the openjfx maven plugin: 'mvn javafx:run'.",
    command: "mvn javafx:run",
    tag: "JavaFX"
  },
  {
    id: "err-2",
    title: "DJL EngineNotFoundException (PyTorch LibTorch)",
    symptom: "ai.djl.engine.EngineNotFoundException: No deep learning engine found. Please include a dependency for PyTorch...",
    cause: "Maven did not download the OS-specific native PyTorch library, or it was excluded during packaging.",
    fix: "Ensure 'pytorch-native-auto' version 2.1.1 is in pom.xml runtime dependencies. It automatically detects your OS (Windows, Linux, macOS) and fetches matching C++ binaries.",
    command: "mvn dependency:resolve -Dclassifier=linux-x86_64",
    tag: "DJL"
  },
  {
    id: "err-3",
    title: "ImageIO Unsupported Color Space (CMYK JPEG)",
    symptom: "javax.imageio.IIOException: Unsupported Image Type or black screen on preview.",
    cause: "Standard Java ImageIO natively parses RGB JPEGs well, but fails on CMYK color profiles from commercial camera exports.",
    fix: "Use our ImagePreprocessor.loadAndValidate() which explicitly draws raster buffers into BufferedImage.TYPE_INT_RGB before feeding into DJL.",
    tag: "ImageIO"
  },
  {
    id: "err-4",
    title: "JVM OutOfMemoryError During Model Initialization",
    symptom: "java.lang.OutOfMemoryError: Java heap space during ModelZoo.loadModel()",
    cause: "Default JVM heap limit on 64-bit systems may be capped at 512MB, while ResNet-50 weights require ~100MB plus native memory headroom.",
    fix: "Pass the -Xmx2g flag to allocate 2 Gigabytes of heap memory to the JVM.",
    command: "export MAVEN_OPTS=\"-Xmx2g\" && mvn javafx:run",
    tag: "Maven"
  },
  {
    id: "err-5",
    title: "Apple Silicon (M1/M2/M3) UnsatisfiedLinkError",
    symptom: "UnsatisfiedLinkError: dlopen(...): mach-o file, but is an incompatible architecture (have 'x86_64', need 'arm64')",
    cause: "Running an x86_64 (Rosetta) JDK while DJL attempts to link native arm64 aarch64 LibTorch binaries.",
    fix: "Install native ARM64 JDK 17 (e.g., Eclipse Temurin 17 aarch64) using Homebrew or SDKMAN.",
    command: "sdk install java 17.0.10-tem",
    tag: "Mac/OS"
  },
  {
    id: "err-6",
    title: "Offline WiFi Failure During Live Presentation",
    symptom: "Unable to download weights from internet cache during hackathon demo.",
    fix: "EcoSort includes an automatic fallback! If DJLWasteClassifier throws an exception during initialize(), EcoSortApp immediately catches it and switches to MockWasteClassifier, ensuring your presentation never crashes in front of judges.",
    tag: "DJL"
  }
];

export const TroubleshootingView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredErrors = COMMON_ERRORS.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Common Errors &amp; Instant Fixes (Hackathon Field Guide)</h2>
          </div>
          <p className="text-xs text-slate-600">
            Troubleshooting manual for DJL native PyTorch engine loading, JavaFX module paths, and image format pitfalls.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search symptoms or errors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Error Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredErrors.map((err) => (
          <div key={err.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  err.tag === 'DJL' ? 'bg-blue-50 text-blue-700' :
                  err.tag === 'JavaFX' ? 'bg-purple-50 text-purple-700' :
                  err.tag === 'ImageIO' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {err.tag}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">#{err.id}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{err.title}</h3>

              <div className="bg-red-50/70 border border-red-200/70 p-2.5 rounded-lg text-xs font-mono text-red-900 leading-snug">
                {err.symptom}
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div><strong>Cause:</strong> {err.cause}</div>
                <div><strong>Fix:</strong> {err.fix}</div>
              </div>
            </div>

            {err.command && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-900 p-2 rounded-lg text-slate-200 text-xs font-mono">
                <span className="truncate pr-2">{err.command}</span>
                <button
                  onClick={() => handleCopy(err.command!, err.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1 rounded shrink-0 transition-colors"
                  title="Copy terminal command"
                >
                  {copiedId === err.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Safety Net Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 leading-relaxed">
          <strong>Built-in Hackathon Resilience:</strong> EcoSort has zero single-points-of-failure. If conference hall firewalls block the initial PyTorch model weights download from S3, the application automatically catches the exception and engages <code className="bg-emerald-100 font-mono px-1 py-0.5 rounded">MockWasteClassifier</code>. You can present seamlessly without missing a beat!
        </div>
      </div>
    </div>
  );
};
