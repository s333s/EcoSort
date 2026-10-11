import React, { useState } from 'react';
import { JAVA_CLASSES, POM_XML_CODE, JavaFile } from '../data/javaCodebase';
import { Copy, Check, Download, BookOpen, HelpCircle, Code2, FileCode } from 'lucide-react';
import JSZip from 'jszip';

export const CodeExplorer: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Allow selecting pom.xml or Java classes
  const [isPomSelected, setIsPomSelected] = useState<boolean>(false);

  const activeJavaFile: JavaFile = JAVA_CLASSES[selectedFileIndex];
  const activeCode = isPomSelected ? POM_XML_CODE : activeJavaFile.code;
  const activeFileName = isPomSelected ? 'pom.xml' : activeJavaFile.name;
  const activePath = isPomSelected ? 'pom.xml' : activeJavaFile.path;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([activeCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add pom.xml
      zip.file('pom.xml', POM_XML_CODE);

      // Add README.md
      zip.file('README.md', `# EcoSort - Banana Hacks 2026
AI-Powered Waste Classifier using Deep Java Library (DJL) and JavaFX.

## Requirements
- Java 17+ (e.g. Eclipse Temurin 17)
- Apache Maven 3.8+

## Quick Start
\`\`\`bash
# 1. Clean and compile
mvn clean compile

# 2. Run the JavaFX Application
mvn javafx:run

# 3. Run Benchmark Tests
mvn test
\`\`\`
`);

      // Add all Java classes
      for (const file of JAVA_CLASSES) {
        zip.file(file.path, file.code);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ecosort-bananahacks-2026.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with quick download all button */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            <span>Complete Java 17 + DJL + JavaFX Source Repository</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pure Java OOP architecture. Explore every class, inspect design patterns, and prepare for oral defense with your teacher.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg text-xs flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Generating ZIP...' : 'Download Full Maven Project (.zip)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: File Tree */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 mb-2">
              Maven Configuration
            </div>
            <button
              onClick={() => setIsPomSelected(true)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                isPomSelected
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-amber-600" />
                <span>pom.xml</span>
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Maven</span>
            </button>

            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 mt-4 mb-2">
              Java Classes (OOP Hierarchy)
            </div>

            <div className="space-y-1">
              {JAVA_CLASSES.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => {
                    setSelectedFileIndex(idx);
                    setIsPomSelected(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    !isPomSelected && selectedFileIndex === idx
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${
                      file.type === 'interface' ? 'text-purple-600' :
                      file.type === 'abstract' ? 'text-indigo-600' :
                      file.type === 'record' ? 'text-cyan-600' :
                      file.type === 'enum' ? 'text-emerald-600' :
                      file.type === 'test' ? 'text-rose-600' : 'text-blue-600'
                    }`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                    {file.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Teacher Q&A Defense Card */}
          {!isPomSelected && (
            <div className="bg-amber-50/80 rounded-xl border border-amber-200/80 p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Teacher Question & Oral Defense</span>
              </div>

              <div className="text-xs text-amber-950 font-semibold bg-white/70 p-2.5 rounded-lg border border-amber-200/60">
                &ldquo;{activeJavaFile.teacherQA.question}&rdquo;
              </div>

              <div className="text-xs text-amber-900 leading-relaxed bg-white/50 p-2.5 rounded-lg border border-amber-200/40">
                <span className="font-bold text-amber-950">How to answer: </span>
                {activeJavaFile.teacherQA.answer}
              </div>

              <div className="pt-2 border-t border-amber-200/60 text-[11px] text-amber-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span><strong>OOP Concept:</strong> {activeJavaFile.oopConcept}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Code Viewer */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
            {/* Code Toolbar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>{activePath}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownloadSingle}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto max-h-[620px] scrollbar-thin">
              <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre">
                <code>{activeCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
