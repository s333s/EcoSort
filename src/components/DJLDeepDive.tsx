import React from 'react';
import { Cpu, Database, CheckCircle, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export const DJLDeepDive: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Deep Java Library (DJL) Architecture & Model Integration</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Deep Java Library (DJL) is an open-source, high-level, engine-agnostic Java framework developed by AWS for deep learning. Unlike Python wrappers or cloud API calls, DJL compiles and executes native C++ deep learning models (PyTorch LibTorch) directly inside the JVM process with near-zero latency.
        </p>
      </div>

      {/* 3 Step Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1</span>
            <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Model Selection</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Pretrained ResNet-50 (PyTorch)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We select <strong>ResNet-50</strong> from the DJL Model Zoo. ResNet (Residual Network) features 50 layers with residual skip connections that prevent the vanishing gradient problem, achieving <strong>76.1% top-1 accuracy</strong> on ImageNet with blazing fast 30-50ms CPU inference on laptops.
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <strong>Why not custom train?</strong> For a 2-day hackathon, fine-tuning takes hours of GPU time. ImageNet already knows bottles, cans, boxes, and bananas!
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 2</span>
            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">Pre-processing</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Image Translator Pipeline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Neural networks cannot process raw JPEG bytes directly. DJL&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">ImageClassificationTranslator</code> manages the tensor pipeline:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong>Resize:</strong> Scales image to exactly 224 x 224 pixels.</li>
            <li><strong>ToTensor:</strong> Converts pixel integers [0..255] to float32 tensors [0.0..1.0].</li>
            <li><strong>Normalize:</strong> Subtracts ImageNet mean <code className="font-mono text-[10px]">[0.485, 0.456, 0.406]</code> and divides by std deviation.</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 3</span>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Category Mapping</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">ImageNet to 6 Waste Bins</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The model outputs one of 1,000 fine-grained ImageNet synsets (e.g., &quot;beer bottle&quot;, &quot;pop can&quot;). Our <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">CategoryMapper</code> translates these into the 6 human-actionable disposal categories.
          </p>
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <strong>Safety Threshold:</strong> If maximum probability &lt; 40%, the system flags the item as <span className="text-purple-700 font-bold">UNCERTAIN</span> to protect recycling streams.
          </div>
        </div>
      </div>

      {/* Code Breakdown Card: Criteria Builder */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-sm font-bold text-slate-100">
              DJL Criteria &amp; Translator Loading Pattern (Java 17)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">DJLWasteClassifier.java</span>
        </div>

        <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto bg-slate-950 p-4 rounded-lg border border-slate-800">
          <code>{`// 1. Build the Computer Vision Translator (Resize + Normalization + Softmax)
ImageClassificationTranslator translator = ImageClassificationTranslator.builder()
        .addTransform(new Resize(224, 224))
        .addTransform(new ToTensor())
        .addTransform(new Normalize(
                new float[]{0.485f, 0.456f, 0.406f}, // ImageNet RGB Means
                new float[]{0.229f, 0.224f, 0.225f}  // ImageNet RGB StdDevs
        ))
        .optApplySoftmax(true) // Computes normalized probability distribution [0.0..1.0]
        .build();

// 2. Specify Criteria for the Model Zoo
Criteria<Image, Classifications> criteria = Criteria.builder()
        .setTypes(Image.class, Classifications.class)
        .optApplication(Application.CV.IMAGE_CLASSIFICATION)
        .optFilter("backbone", "resnet50")
        .optEngine("PyTorch") // Employs LibTorch native engine automatically
        .optTranslator(translator)
        .optProgress(new ProgressBar())
        .build();

// 3. Load Model & Instantiate Predictor
ZooModel<Image, Classifications> model = ModelZoo.loadModel(criteria);
Predictor<Image, Classifications> predictor = model.newPredictor();

// 4. Run Inference in Pure Java!
Classifications result = predictor.predict(djlImage);
Classifications.Classification best = result.best();
System.out.printf("Synset: %s, Probability: %.2f%%%n", best.getClassName(), best.getProbability() * 100);`}</code>
        </pre>
      </div>

      {/* Label Mapping Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>CategoryMapper Synset Table (How 1,000 Classes Map to 6 Bins)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-3">
            <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
              <span>🧴 PLASTIC</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> water bottle, plastic bag, pill bottle, nipple, measuring cup, lotion, sunscreen, shampoo, detergent, jug, milk can, soap dispenser.
            </p>
            <div className="text-[11px] text-blue-800">
              <strong>Heuristic Rule:</strong> Any label containing &quot;bottle&quot; without &quot;wine/beer/glass&quot;, or containing &quot;poly/plastic&quot;.
            </div>
          </div>

          <div className="border border-teal-200 bg-teal-50/50 rounded-lg p-3">
            <div className="font-bold text-teal-900 flex items-center gap-1.5 mb-1">
              <span>🍾 GLASS</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> wine bottle, beer bottle, beer glass, champagne, goblet, flask, jar, mason jar, beaker, vial, perfume.
            </p>
            <div className="text-[11px] text-teal-800">
              <strong>Heuristic Rule:</strong> Tokens matching &quot;glass&quot;, &quot;wine&quot;, &quot;beer bottle&quot;, &quot;jar&quot;, &quot;goblet&quot;.
            </div>
          </div>

          <div className="border border-yellow-200 bg-yellow-50/50 rounded-lg p-3">
            <div className="font-bold text-yellow-900 flex items-center gap-1.5 mb-1">
              <span>📦 PAPER &amp; CARDBOARD</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> carton, cardboard, envelope, packet, comic book, book jacket, newspaper, menu, paper towel, binder, box.
            </p>
            <div className="text-[11px] text-yellow-800">
              <strong>Heuristic Rule:</strong> Tokens matching &quot;carton&quot;, &quot;cardboard&quot;, &quot;paper&quot;, &quot;box&quot;, &quot;newspaper&quot;.
            </div>
          </div>

          <div className="border border-slate-300 bg-slate-50 rounded-lg p-3">
            <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <span>🥫 METAL &amp; ALUMINUM</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> pop bottle/can, tin can, beer can, soup can, thimble, nail, screw, frying pan, wok, pot, dumbbell, iron.
            </p>
            <div className="text-[11px] text-slate-700">
              <strong>Heuristic Rule:</strong> Tokens matching &quot;can&quot;, &quot;tin&quot;, &quot;aluminum&quot;, &quot;steel&quot;, &quot;pot&quot;, &quot;pan&quot;.
            </div>
          </div>

          <div className="border border-green-200 bg-green-50/50 rounded-lg p-3">
            <div className="font-bold text-green-900 flex items-center gap-1.5 mb-1">
              <span>🍌 ORGANIC COMPOST</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> banana, orange, apple, lemon, strawberry, pineapple, cucumber, broccoli, mushroom, pizza, burrito, bread, leaf.
            </p>
            <div className="text-[11px] text-green-800">
              <strong>Heuristic Rule:</strong> Fruits, vegetables, prepared meals, and plant matter.
            </div>
          </div>

          <div className="border border-red-200 bg-red-50/50 rounded-lg p-3">
            <div className="font-bold text-red-900 flex items-center gap-1.5 mb-1">
              <span>🔋 E-WASTE</span>
            </div>
            <p className="text-slate-600 mb-2">
              <strong>Synsets:</strong> cellular telephone, cell phone, ipod, laptop, keyboard, mouse, hard disc, monitor, screen, television, battery, remote control.
            </p>
            <div className="text-[11px] text-red-800">
              <strong>Heuristic Rule:</strong> Electronic devices, circuit boards, batteries, and peripherals.
            </div>
          </div>
        </div>
      </div>

      {/* Low Confidence Strategy Card */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="font-bold text-purple-900 text-sm">How EcoSort Handles Low Confidence Predictions</h4>
            <p className="text-xs text-purple-800 leading-relaxed">
              In real-world recycling, a false positive is far worse than an uncertain answer. Putting a lithium battery into a paper bin can cause a recycling facility fire. When the model&apos;s best candidate probability is <strong>under 40% (0.40)</strong>:
            </p>
            <ol className="text-xs text-purple-900 space-y-1 list-decimal pl-4">
              <li>The <code className="bg-purple-100 font-mono px-1 py-0.5 rounded">AbstractWasteClassifier</code> template method intercepts the result.</li>
              <li>It overrides the category to <code className="bg-purple-100 font-mono px-1 py-0.5 rounded">WasteCategory.UNCERTAIN</code>.</li>
              <li>The UI warns the user: <em>&ldquo;Confidence too low for safe automated sorting.&rdquo;</em></li>
              <li>It gives actionable recovery steps: check the resin recycling triangle stamp, turn on a room light, or inspect local municipal rules.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
