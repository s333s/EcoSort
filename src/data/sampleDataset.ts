export interface SampleItem {
  id: string;
  name: string;
  description: string;
  rawSynset: string;
  expectedCategory: 'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL' | 'ORGANIC' | 'E_WASTE' | 'UNCERTAIN';
  simulatedConfidence: number;
  topCandidates: { label: string; prob: number }[];
  inferenceTimeMs: number;
  imageUrl: string;
  isEdgeCase?: boolean;
}

export const SAMPLE_WASTE_ITEMS: SampleItem[] = [
  {
    id: "sample-1",
    name: "Clear PET Water Bottle",
    description: "Standard 500ml polyethylene terephthalate water bottle with plastic cap.",
    rawSynset: "water bottle",
    expectedCategory: "PLASTIC",
    simulatedConfidence: 0.948,
    topCandidates: [
      { label: "water bottle", prob: 0.948 },
      { label: "pill bottle", prob: 0.031 },
      { label: "plastic bag", prob: 0.012 },
      { label: "pop bottle", prob: 0.005 }
    ],
    inferenceTimeMs: 42,
    imageUrl: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-2",
    name: "Green Glass Wine Bottle",
    description: "Empty Bordeaux style green glass wine bottle.",
    rawSynset: "wine bottle",
    expectedCategory: "GLASS",
    simulatedConfidence: 0.924,
    topCandidates: [
      { label: "wine bottle", prob: 0.924 },
      { label: "beer bottle", prob: 0.052 },
      { label: "beer glass", prob: 0.014 },
      { label: "flask", prob: 0.006 }
    ],
    inferenceTimeMs: 38,
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-3",
    name: "Corrugated Cardboard Box",
    description: "Clean shipping carton without packing peanuts or plastic tape.",
    rawSynset: "carton",
    expectedCategory: "PAPER",
    simulatedConfidence: 0.963,
    topCandidates: [
      { label: "carton", prob: 0.963 },
      { label: "box", prob: 0.021 },
      { label: "packet", prob: 0.009 },
      { label: "envelope", prob: 0.004 }
    ],
    inferenceTimeMs: 35,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-4",
    name: "Crushed Soda Can",
    description: "Empty aluminum carbonated beverage container.",
    rawSynset: "pop can",
    expectedCategory: "METAL",
    simulatedConfidence: 0.937,
    topCandidates: [
      { label: "pop can", prob: 0.937 },
      { label: "beer can", prob: 0.041 },
      { label: "tin can", prob: 0.012 },
      { label: "thimble", prob: 0.004 }
    ],
    inferenceTimeMs: 44,
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-5",
    name: "Ripe Banana Peel",
    description: "Organic fruit peel suitable for municipal green compost.",
    rawSynset: "banana",
    expectedCategory: "ORGANIC",
    simulatedConfidence: 0.985,
    topCandidates: [
      { label: "banana", prob: 0.985 },
      { label: "lemon", prob: 0.008 },
      { label: "plantain", prob: 0.004 },
      { label: "cucumber", prob: 0.002 }
    ],
    inferenceTimeMs: 33,
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-6",
    name: "Old Smartphone (Lithium Battery)",
    description: "Decommissioned cellular phone containing lithium-ion battery.",
    rawSynset: "cellular telephone",
    expectedCategory: "E_WASTE",
    simulatedConfidence: 0.912,
    topCandidates: [
      { label: "cellular telephone", prob: 0.912 },
      { label: "ipod", prob: 0.054 },
      { label: "remote control", prob: 0.019 },
      { label: "hand-held computer", prob: 0.009 }
    ],
    inferenceTimeMs: 47,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-7",
    name: "Steel Soup Tin Can",
    description: "Canned tomato soup metal tin with lid.",
    rawSynset: "tin can",
    expectedCategory: "METAL",
    simulatedConfidence: 0.895,
    topCandidates: [
      { label: "tin can", prob: 0.895 },
      { label: "pop can", prob: 0.062 },
      { label: "milk can", prob: 0.025 },
      { label: "pot", prob: 0.011 }
    ],
    inferenceTimeMs: 39,
    imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-8",
    name: "Recyclable Newspaper Bundle",
    description: "Clean dry newsprint sheets without plastic wrap.",
    rawSynset: "newspaper",
    expectedCategory: "PAPER",
    simulatedConfidence: 0.941,
    topCandidates: [
      { label: "newspaper", prob: 0.941 },
      { label: "comic book", prob: 0.034 },
      { label: "book jacket", prob: 0.015 },
      { label: "packet", prob: 0.006 }
    ],
    inferenceTimeMs: 36,
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-9",
    name: "Preserve Glass Mason Jar",
    description: "Clear food preservation glass jar with metal band separated.",
    rawSynset: "jar",
    expectedCategory: "GLASS",
    simulatedConfidence: 0.887,
    topCandidates: [
      { label: "jar", prob: 0.887 },
      { label: "beaker", prob: 0.051 },
      { label: "wine bottle", prob: 0.033 },
      { label: "flask", prob: 0.018 }
    ],
    inferenceTimeMs: 41,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sample-10",
    name: "Blurry Foil Crisp Packet (Edge Case)",
    description: "Multilayer plastic/aluminum composite bag taken in low light.",
    rawSynset: "packet",
    expectedCategory: "UNCERTAIN",
    simulatedConfidence: 0.312,
    isEdgeCase: true,
    topCandidates: [
      { label: "packet", prob: 0.312 },
      { label: "envelope", prob: 0.284 },
      { label: "plastic bag", prob: 0.210 },
      { label: "comic book", prob: 0.114 }
    ],
    inferenceTimeMs: 52,
    imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&auto=format&fit=crop&q=80"
  }
];
