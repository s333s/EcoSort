import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Clock, Trophy, AlertCircle, ArrowRight } from 'lucide-react';

interface SprintTask {
  id: string;
  title: string;
  estimate: string;
  deliverable: string;
  tips: string;
}

interface SprintDay {
  day: string;
  theme: string;
  totalTime: string;
  tasks: SprintTask[];
}

const SPRINT_DAYS: SprintDay[] = [
  {
    day: "Day 1",
    theme: "Core Engine: Maven, DJL Model Loading & Domain Models",
    totalTime: "8.0 Hours",
    tasks: [
      {
        id: "d1-t1",
        title: "Environment Setup & Dependency Verification",
        estimate: "1.5 hours",
        deliverable: "Working pom.xml with DJL PyTorch auto-native engine compiling cleanly under Java 17.",
        tips: "Run 'mvn test' immediately to ensure your OS downloads the correct native LibTorch binaries (libtorch.dylib or libtorch.so) before writing code."
      },
      {
        id: "d1-t2",
        title: "Domain Model & OOP Hierarchy Setup",
        estimate: "1.5 hours",
        deliverable: "WasteCategory enum, ClassificationResult record, DisposalAdvice record, and WasteClassifier interface.",
        tips: "Keep records immutable. Define your 6 core categories clearly so your teammates know the exact contract."
      },
      {
        id: "d1-t3",
        title: "DJL ResNet-50 Model Loading & Inference",
        estimate: "3.0 hours",
        deliverable: "DJLWasteClassifier loads pretrained ResNet-50 from DJL ModelZoo and classifies a test image.",
        tips: "Use ImageClassificationTranslator with standard 224x224 resize and ImageNet normalization. Test with MockWasteClassifier first if offline."
      },
      {
        id: "d1-t4",
        title: "CategoryMapper Synset Dictionary & Confidence Guard",
        estimate: "2.0 hours",
        deliverable: "Translates 150+ ImageNet classes to EcoSort's 6 categories and falls back to UNCERTAIN below 40% confidence.",
        tips: "Implement dictionary lookup first, then substring token heuristics. Add a low-confidence threshold guard (0.40)."
      }
    ]
  },
  {
    day: "Day 2",
    theme: "JavaFX Desktop GUI, Benchmark Suite & Hackathon Submission",
    totalTime: "8.5 Hours",
    tasks: [
      {
        id: "d2-t1",
        title: "JavaFX Desktop GUI & Asynchronous Task",
        estimate: "3.0 hours",
        deliverable: "Native desktop window with Drag & Drop photo drop-zone, image preview, and loading spinner.",
        tips: "CRITICAL: Wrap classifier.classify() in a javafx.concurrent.Task on a background thread so the UI never freezes during inference."
      },
      {
        id: "d2-t2",
        title: "DisposalAdvisor Knowledge Engine & Prep Checklist",
        estimate: "1.5 hours",
        deliverable: "DisposalAdvisor returning target bin, environmental why, and actionable prep checklist.",
        tips: "Highlight practical student-friendly tips (e.g. rinse cans, remove fruit stickers, battery safety warnings)."
      },
      {
        id: "d2-t3",
        title: "10-Item Benchmark Evaluation & Test Plan",
        estimate: "1.5 hours",
        deliverable: "AccuracyEvaluatorTest running 10 sample test images to document >80% accuracy for judges.",
        tips: "Include 1 edge case (blurry foil packet) to prove your low-confidence safety fallback works in practice."
      },
      {
        id: "d2-t4",
        title: "Devpost Submission, 3-Min YouTube Demo & Slide Deck",
        estimate: "2.5 hours",
        deliverable: "Submitted Devpost page, high-quality 3-min YouTube walkthrough video, and clean GitHub README.",
        tips: "Dedicate the first 45 seconds to the problem (recycling contamination). Spend 90 seconds on the live demo, and 45 seconds on Java OOP architecture."
      }
    ]
  }
];

export const SprintPlanView: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ecosort_sprint_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ecosort_sprint_tasks', JSON.stringify(completedTasks));
    } catch {}
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const totalTaskCount = SPRINT_DAYS.reduce((sum, d) => sum + d.tasks.length, 0);
  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / totalTaskCount) * 100);

  return (
    <div className="space-y-6">
      {/* Sprint Header & Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">2-Day Hackathon Sprint Roadmap (Banana Hacks 2026)</h2>
            </div>
            <p className="text-xs text-slate-600">
              Battle-tested 48-hour plan prioritized for delivering a rock-solid working demo on time without scope creep.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-w-[220px]">
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Sprint Progress</span>
              <span className="text-blue-600">{doneCount} of {totalTaskCount} tasks ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hackathon Priority Rule */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Hackathon Golden Rule:</strong> Prioritize an end-to-end working MVP (Image -&gt; Prediction -&gt; Disposal Advice) over complex extra features. Once the core pipeline works, you can polish the UI and record your demo with confidence!
          </div>
        </div>
      </div>

      {/* Days Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SPRINT_DAYS.map((day) => (
          <div key={day.day} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{day.day}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{day.theme}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{day.totalTime}</span>
                </div>
              </div>

              {/* Task list */}
              <div className="space-y-3">
                {day.tasks.map((task) => {
                  const isDone = !!completedTasks[task.id];
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer text-xs ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200 opacity-90'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => {}} // handled by parent div
                          className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0 cursor-pointer"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                              {task.title}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 shrink-0 ml-2">
                              {task.estimate}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            <strong>Deliverable:</strong> {task.deliverable}
                          </p>
                          <p className="text-[11px] text-slate-500 bg-white/70 p-1.5 rounded border border-slate-200/50">
                            💡 <em>Tip:</em> {task.tips}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Day Milestone</span>
              <span className="font-medium text-slate-700">
                {day.day === 'Day 1' ? 'CLI Predictor Outputs Water Bottle' : 'Final JavaFX Video Recorded & Submitted'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
