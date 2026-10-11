export interface DisposalInfo {
  category: 'PLASTIC' | 'GLASS' | 'PAPER' | 'METAL' | 'ORGANIC' | 'E_WASTE' | 'UNCERTAIN';
  displayName: string;
  binName: string;
  binColor: string;
  binBgColor: string;
  icon: string;
  why: string;
  preparationSteps: string[];
  warning?: string;
}

export const DISPOSAL_DATA: Record<string, DisposalInfo> = {
  PLASTIC: {
    category: 'PLASTIC',
    displayName: 'Plastic Packaging & Bottles',
    binName: 'Blue Recycling Bin',
    binColor: '#2563EB',
    binBgColor: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: '🧴',
    why: 'Recycling plastics saves crude oil petroleum feedstock, cuts greenhouse gas emissions by up to 70%, and stops microplastic fragments from contaminating marine ecosystems.',
    preparationSteps: [
      'Empty all liquid or food residue completely',
      'Give a quick water rinse (no need to waste soap or hot water)',
      'Replace screw caps tightly back onto the bottle (caps are recyclable when attached)',
      'Keep items loose — never bundle recyclables inside plastic grocery bags'
    ]
  },
  GLASS: {
    category: 'GLASS',
    displayName: 'Glass Bottles & Food Jars',
    binName: 'Teal / Glass Dedicated Bin',
    binColor: '#0D9488',
    binBgColor: 'bg-teal-50 border-teal-200 text-teal-900',
    icon: '🍾',
    why: 'Glass is 100% infinitely recyclable without any loss in chemical purity or structural integrity. 1 ton of recycled glass saves 1.2 tons of virgin raw materials (sand, soda ash, limestone).',
    preparationSteps: [
      'Empty all residual liquid or food condiments',
      'Rinse out sticky sugars to prevent insect attraction at sorting facilities',
      'Remove metal crowns or plastic lids (sort metal lids into the metal bin)',
      'Do not include mirrors, Pyrex cookware, lightbulbs, or window panes'
    ],
    warning: 'For broken glass, wrap in heavy newspaper before disposal to protect sanitation workers.'
  },
  PAPER: {
    category: 'PAPER',
    displayName: 'Cardboard & Clean Paper',
    binName: 'Yellow / Paper & Fiber Bin',
    binColor: '#CA8A04',
    binBgColor: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    icon: '📦',
    why: 'Recycling 1 ton of cardboard saves approximately 17 mature trees, 7,000 gallons of fresh water, 3 cubic yards of landfill space, and 4,000 kilowatt-hours of electrical energy.',
    preparationSteps: [
      'Break down and flatten cardboard boxes completely to maximize bin compaction',
      'Remove plastic shipping tape, bubble wrap, and styrofoam inserts',
      'Keep dry at all times: wet paper fibers degrade and foul mechanical sorting tumblers',
      'Greasy pizza box bottoms CANNOT be recycled here — send greasy sections to Compost'
    ]
  },
  METAL: {
    category: 'METAL',
    displayName: 'Metal Tins & Aluminum Cans',
    binName: 'Silver / Metal & Aluminum Bin',
    binColor: '#475569',
    binBgColor: 'bg-slate-50 border-slate-200 text-slate-900',
    icon: '🥫',
    why: 'Recycling aluminum cans saves 95% of the massive electrical energy required to smelt new aluminum from bauxite ore. A recycled soda can is back on grocery shelves in as few as 60 days.',
    preparationSteps: [
      'Rinse out soup, pet food, or soda residue',
      'Paper labels can stay on (they cleanly combust during the metallurgical smelting furnace process)',
      'Optionally crush aluminum soda cans with your foot to save bin volume',
      'Place small loose metal bottle caps inside an empty tin can and crimp the top shut'
    ]
  },
  ORGANIC: {
    category: 'ORGANIC',
    displayName: 'Organic Food Waste & Compost',
    binName: 'Green Compost Bin',
    binColor: '#16A34A',
    binBgColor: 'bg-green-50 border-green-200 text-green-900',
    icon: '🍌',
    why: 'When organic food scraps are trapped in landfills, they decompose anaerobically, producing methane (a greenhouse gas 28x more potent than CO2). Composting returns nutrients to soil.',
    preparationSteps: [
      'Peel off non-biodegradable PLU fruit stickers from peels (bananas, apples, oranges)',
      'Include fruit/vegetable scraps, coffee grounds, paper coffee filters, and tea bags',
      'Food-soiled paper and greasy pizza box bottoms belong here',
      'Do not include pet feces, treated lumber, or plastic "biodegradable" utensils unless certified'
    ]
  },
  E_WASTE: {
    category: 'E_WASTE',
    displayName: 'Electronic Waste & Lithium Batteries',
    binName: 'Red / Hazardous E-Waste Depot',
    binColor: '#DC2626',
    binBgColor: 'bg-red-50 border-red-200 text-red-900',
    icon: '🔋',
    why: 'Electronics contain dangerous heavy metals (lead, mercury, cadmium) that leach into groundwater, plus rare strategic elements (lithium, cobalt, copper, gold) that can be recovered.',
    preparationSteps: [
      'NEVER put electronics or batteries into normal household trash or curbside recycling',
      'Tape clear scotch tape over lithium battery contact terminals to eliminate short-circuit fire risks',
      'Perform a factory reset to erase personal photos and passwords prior to recycling',
      'Drop off at certified e-waste drives, Best Buy electronics drop-off bins, or school collection boxes'
    ],
    warning: 'FIRE HAZARD: Punctured, swollen, or crushed lithium-ion batteries cause severe garbage truck fires.'
  },
  UNCERTAIN: {
    category: 'UNCERTAIN',
    displayName: 'Ambiguous Item / Low AI Confidence',
    binName: 'Manual Inspection Required',
    binColor: '#9333EA',
    binBgColor: 'bg-purple-50 border-purple-200 text-purple-900',
    icon: '❓',
    why: 'AI model confidence fell below the 40% safety threshold. Mis-sorting items ("wish-cycling") contaminates entire recycling batches, turning truckloads of recyclable fiber into trash.',
    preparationSteps: [
      'Check the underside of plastic items for the triangular Resin Identification Code (1-7)',
      'Look for mixed materials (e.g., potato chip bags with foil lining cannot be recycled)',
      'Retake the photo with direct lighting, no glare, and a plain high-contrast background',
      'Consult your local municipal waste directory before sorting'
    ],
    warning: 'Rule of thumb: "When in doubt, throw it out" in general waste to protect recycling streams.'
  }
};
