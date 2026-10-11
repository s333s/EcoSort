<p align="center">
  <img src="docs/EcoSort.jpeg" alt="EcoSort.jpeg" width="700">
</p>

<h1 align="center">🍌 EcoSort</h1>

<p align="center">
  <b>Snap a photo of waste. Get the right bin, the reason why, and how to prepare it.</b><br>
  Built for <b>Banana Hacks 2026</b> (Image AI hackathon)
</p>

<p align="center">
  <a href="https://youtu.be/KU90xjKkEjs">🎥 Demo Video</a> ·
  <a href="https://devpost.com/s333s">📝 Devpost</a>
</p>

---

## 🎯 Problem
Recycling only works when items go in the right bin. People often put items in the wrong one with good intentions (greasy pizza boxes, dirty containers, batteries), which can contaminate recycling. The rules are confusing, and most people don't know them for every material.

## 💡 Solution
**EcoSort** is a Java desktop app that classifies a photo of waste with a computer vision model running **locally** (no cloud API) and tells the user:

- ♻️ **Which bin** the item belongs in
- 💬 **Why** it matters
- ✅ **How to prepare it** (rinse, flatten, tape battery terminals, etc.)

If the model isn't confident enough, EcoSort says **"Uncertain"** instead of guessing, to avoid putting the wrong item in recycling.

## ✨ Features
- Drag and drop photo classification
- Local image classification with a pretrained ResNet-50 model through Deep Java Library (DJL)
- 6 categories: Plastic, Glass, Paper & Cardboard, Metal, Organic Compost, Hazardous E-Waste
- Color-coded bin result with disposal advice and a preparation checklist
- Low-confidence safety guard (below 40% confidence the result is flagged "Uncertain")
- Responsive UI: inference runs on a background thread, so the app never freezes

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Language | Java 17 |
| Build tool | Apache Maven |
| Image AI | Deep Java Library (DJL) with PyTorch engine, ResNet-50 |
| Preprocessing | Java `ImageIO` and Java 2D scaling |
| UI | JavaFX, with `javafx.concurrent.Task` for async work |

## 🧱 OOP Design
- **Enhanced enum** `WasteCategory`: stores bin name, color, and metadata
- **Records** `ClassificationResult`, `DisposalAdvice`: immutable data objects
- **Interface and abstract class** `WasteClassifier` / `AbstractWasteClassifier`: allows swapping the real model and a test classifier (Template Method pattern)
- **`CategoryMapper`**: maps the model's ImageNet labels to the 6 waste categories
- **Background `Task`**: keeps heavy inference off the UI thread

## 🔄 How It Works
```
Photo → Preprocess (resize/normalize) → ResNet-50 via DJL
      → Top predictions → CategoryMapper → Waste category
      → Confidence check (≥ 40%?) → Bin + Why + Preparation steps
```

## 🚀 Getting Started

### Requirements
- Java 17 or newer
- Maven 3.8 or newer
- Internet connection on the first run (DJL downloads the model and native libraries)

### Run
```bash
git clone https://github.com/s333s/ecosort-banana-hacks-2026.git
cd ecosort-banana-hacks-2026
mvn clean javafx:run
```
If `javafx:run` isn't configured in your `pom.xml`, run the main class from your IDE (IntelliJ or Eclipse).

## 📁 Project Structure
```
ecosort-banana-hacks-2026/
├── src/main/java/        # Classifier, mapper, models, JavaFX UI
├── src/main/resources/   # UI styles and assets
├── docs/                 # Logo and screenshots
├── pom.xml
└── README.md
```

## 📸 Screenshots
| Home | Result |
|---|---|
| ![Home](docs/screenshot-1.png) | ![Result](docs/screenshot-2.png) |

| Disposal Advice | Uncertain Result |
|---|---|
| ![Advice](docs/screenshot-3.png) | ![Uncertain](docs/screenshot-4.png) |

## 🧗 Challenges
1. **Java + deep learning:** making the native PyTorch libraries load across operating systems through DJL.
2. **ImageNet to waste:** the model predicts 1,000 general object labels, so we built `CategoryMapper` to translate them into 6 recycling streams.
3. **UI freezing:** moving inference to a background `Task` kept the interface smooth.

## 🔮 What's Next
- Live webcam sorting
- Local recycling rules by city
- Fine-tuning on the TrashNet dataset for better accuracy

## 👤 Author
**Al Abri** ([@s333s](https://github.com/s333s))
**YouTube** ([https://github.com/s333s](https://youtu.be/KU90xjKkEjs))

## 📄 License
MIT
