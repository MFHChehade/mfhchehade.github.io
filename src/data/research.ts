export type ResearchTopic = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  focus: string;
  /** What this direction contributes to the overall question. */
  role: string;
  /** Paper whose figure represents the direction. */
  featured: string;
  paperSlugs: string[];
};

/**
 * Citation record behind the BibTeX block and the Google Scholar meta tags.
 * Authors are "Last, First" exactly as the publisher lists them (PMLR, IEEE,
 * HICSS); papers not yet in proceedings use the camera-ready / arXiv names.
 */
export type Citation = {
  key: string;
  authors: string[];
  /** Title with BibTeX brace protection, when it differs from the display title. */
  title?: string;
  /** BibTeX-escaped (\&). */
  booktitle: string;
  series?: string;
  volume?: string;
  pages?: string;
  publisher?: string;
  doi?: string;
  url?: string;
  /** Self-hosted PDF, for citation_pdf_url. */
  pdf?: string;
};

export type Publication = {
  slug: string;
  title: string;
  shortTitle: string;
  authors: string;
  venue: string;
  year: string;
  shortVenue: string;
  type: "peer-reviewed" | "preprint";
  summary: string;
  contribution: string[];
  topics: string[];
  /** Caption for the paper's hand-drawn figure (src/components/figures); HTML allowed, $...$ is typeset as TeX. */
  figureCaption?: string;
  /** Order: published version (venue, PMLR, IEEE Xplore), arXiv, OpenReview, PDF, code. BibTeX is appended. */
  links: Array<{ label: string; href: string }>;
  cite: Citation;
};

export const topics: ResearchTopic[] = [
  {
    slug: "risk-aware-learning",
    title: "Risk-Aware Learning and Reinforcement Learning",
    shortTitle: "Risk-aware learning",
    summary:
      "Methods for learning decisions under uncertainty, distribution shift, and explicit risk specifications.",
    focus:
      "This thread asks how policies should adapt when the cost of failure changes across environments, users, or operating regimes.",
    role: "The objective",
    featured: "tram",
    paperSlugs: ["tram", "battery-control", "levis", "sitalign"],
  },
  {
    slug: "data-driven-reliability",
    title: "Data-Driven Reliability and Verification",
    shortTitle: "Reliability and verification",
    summary:
      "Stress testing, verification, and input-space construction for learned models used in constrained settings.",
    focus:
      "This direction focuses on making model behavior inspectable before learned components enter reliability-critical workflows.",
    role: "The guarantees",
    featured: "levis",
    paperSlugs: ["levis", "neo-grid", "llm-grid-actions", "battery-control"],
  },
  {
    slug: "llm-decision-systems",
    title: "LLMs for Constrained Decision Systems",
    shortTitle: "LLMs for decisions",
    summary:
      "Fine-tuning and inference-time methods for language models that propose technical actions under constraints.",
    focus:
      "The goal is not only better text generation, but more reliable decisions when language models interact with structured domains.",
    role: "Language-driven control",
    featured: "sitalign",
    paperSlugs: ["sitalign", "llm-grid-actions", "tram"],
  },
  {
    slug: "power-systems-applications",
    title: "Power Systems Applications",
    shortTitle: "Power systems",
    summary:
      "Power-system testbeds for studying learning, optimization, reliability, market participation, and control.",
    focus:
      "These projects use power systems as a concrete domain where uncertainty, constraints, and model reliability matter immediately.",
    role: "A reliability-critical domain",
    featured: "neo-grid",
    paperSlugs: [
      "llm-grid-actions",
      "carbon-aware-bems",
      "neo-grid",
      "boost",
      "battery-control",
    ],
  },
];

export const publications: Publication[] = [
  {
    slug: "tram",
    title: "TRAM: Test-Time Risk Adaptation with Mixture of Agents",
    shortTitle: "TRAM",
    authors: "M. Chehade, A. S. Bedi, S. Chakraborty, A. Zhang, H. Zhu",
    venue: "Advances in Neural Information Processing Systems (NeurIPS), 2026",
    year: "2026",
    shortVenue: "NeurIPS",
    type: "peer-reviewed",
    summary:
      "A test-time risk-adaptation method that composes source agents according to deployment-time risk specifications.",
    contribution: [
      "Separates source training from deployment-time risk selection.",
      "Uses mixture-of-agents behavior to adapt policies locally.",
      "Studies transfer when risk preferences change after training.",
    ],
    topics: ["risk-aware-learning", "llm-decision-systems"],
    figureCaption:
      String.raw`Risk-neutral source policies $\pi_1, \pi_2, \pi_3$ are trained once. When a new hazard $\overline{\mathcal{S}}$ is specified at deployment, TRAM scores every source as value minus risk penalty at each state and switches sources (here at states 2 and 3) instead of retraining.`,
    links: [
      { label: "NeurIPS", href: "https://neurips.cc/virtual/2026/poster/148449" },
      { label: "arXiv", href: "https://doi.org/10.48550/arXiv.2408.08812" },
    ],
    cite: {
      key: "chehade2026tram",
      authors: ["Chehade, Mohamad", "Bedi, Amrit Singh", "Chakraborty, Souradip", "Zhang, Amy", "Zhu, Hao"],
      title: "{TRAM}: Test-Time Risk Adaptation with Mixture of Agents",
      booktitle: "Advances in Neural Information Processing Systems",
    },
  },
  {
    slug: "llm-grid-actions",
    title: "Fine-Tuning LLMs to Generate Economical and Reliable Actions for the Power Grid",
    shortTitle: "Fine-Tuning LLMs for Grid Actions",
    authors: "M. Chehade, H. Zhu",
    venue: "2026 IEEE Power & Energy Society General Meeting (PESGM), pp. 1–5, Jul. 2026",
    year: "2026",
    shortVenue: "PESGM",
    type: "peer-reviewed",
    summary:
      "A fine-tuning framework for language models that generate corrective power-grid actions while balancing cost and reliability.",
    contribution: [
      "Connects LLM fine-tuning with structured grid-action generation.",
      "Evaluates action quality through economic and reliability-oriented criteria.",
      "Uses power systems as a constrained decision-making testbed for LLMs.",
    ],
    topics: ["llm-decision-systems", "power-systems-applications", "data-driven-reliability"],
    figureCaption:
      String.raw`Each stage is supervised by a stronger signal: SFT imitates a DC-OPF MILP oracle, DPO learns from AC power-flow evaluations ranked by voltage penalty, and best-of-$N$ keeps the best feasible plan at inference time. On IEEE 118-bus PSPS scenarios, AC power-flow failures drop from 50% (zero-shot) to single digits.`,
    links: [
      { label: "IEEE Xplore", href: "https://doi.org/10.1109/PESGM58988.2026.11693462" },
      { label: "arXiv", href: "https://arxiv.org/abs/2602.15350" },
    ],
    cite: {
      key: "chehade2026finetuning",
      authors: ["Chehade, Mohamad", "Zhu, Hao"],
      title: "Fine-Tuning {LLMs} to Generate Economical and Reliable Actions for the Power Grid",
      booktitle: String.raw`2026 IEEE Power \& Energy Society General Meeting (PESGM)`,
      pages: "1--5",
      publisher: "IEEE",
      doi: "10.1109/PESGM58988.2026.11693462",
    },
  },
  {
    slug: "carbon-aware-bems",
    title: "Carbon-aware Market Participation for Building Energy Management Systems",
    shortTitle: "Carbon-Aware Building Energy Markets",
    authors: "Y. Cho, M. Chehade, F. Al-Janahi, S. Lim, J. Mohammadi, H. Zhu",
    venue: "2026 IEEE Power & Energy Society General Meeting (PESGM), pp. 1–5, Jul. 2026",
    year: "2026",
    shortVenue: "PESGM",
    type: "peer-reviewed",
    summary:
      "A data-driven market-participation study for building energy systems that weighs energy cost against carbon emissions.",
    contribution: [
      "Models the trade-off between market cost and carbon-aware operation.",
      "Uses forecasting and control to inform building energy management.",
      "Studies realistic market and emissions signals from power-system data.",
    ],
    topics: ["power-systems-applications"],
    figureCaption:
      "Daily energy cost and carbon emissions on PJM data for carbon taxes of &#36;0 to &#36;30 per tonne, plus an unmanaged baseline (points read from the paper&rsquo;s Fig. 3). Cost-only dispatch (&#36;0/t) is cheapest but emits slightly more than the baseline; at &#36;30/t emissions fall by about 21% for about 1.5% more cost.",
    links: [
      { label: "IEEE Xplore", href: "https://doi.org/10.1109/PESGM58988.2026.11693113" },
      { label: "arXiv", href: "https://arxiv.org/abs/2603.08654" },
    ],
    cite: {
      key: "cho2026carbon",
      authors: ["Cho, Young-Ho", "Chehade, Mohamad", "Al-Janahi, Fatima", "Lim, Sol", "Mohammadi, Javad", "Zhu, Hao"],
      booktitle: String.raw`2026 IEEE Power \& Energy Society General Meeting (PESGM)`,
      pages: "1--5",
      publisher: "IEEE",
      doi: "10.1109/PESGM58988.2026.11693113",
    },
  },
  {
    slug: "neo-grid",
    title: "NEO-Grid: A Neural Approximation Framework for Optimization and Control in Distribution Grids",
    shortTitle: "NEO-Grid",
    authors: "M. Chehade, H. Zhu",
    venue: "Proceedings of the 59th Hawaii International Conference on System Sciences (HICSS), 2026",
    year: "2026",
    shortVenue: "HICSS",
    type: "peer-reviewed",
    summary:
      "A neural digital-twin approach for approximating distribution-grid physics while keeping optimization and control tractable.",
    contribution: [
      "Builds a neural approximation framework for distribution-grid optimization.",
      "Targets tractable volt-var control through learned power-flow structure.",
      "Connects data-driven models with interpretable control rules.",
    ],
    topics: ["power-systems-applications", "data-driven-reliability"],
    figureCaption:
      String.raw`The feeder&rsquo;s volt-var loop (power flow maps reactive power to voltage, a local rule $\mathbf{q}^{g} = g(\mathbf{v};\phi)$ maps voltage back) is learned as two ReLU networks and solved directly as the deep-equilibrium fixed point $\mathbf{v}^{*} = F_{\phi}(\mathbf{v}^{*})$.`,
    links: [
      { label: "HICSS", href: "https://doi.org/10.24251/HICSS.2026.380" },
      { label: "arXiv", href: "https://arxiv.org/abs/2509.21668" },
      { label: "PDF", href: "/Neo-Grid.pdf" },
      { label: "code", href: "https://github.com/MFHChehade/Neo-Grid" },
    ],
    cite: {
      key: "chehade2026neogrid",
      authors: ["Chehade, Mohamad", "Zhu, Hao"],
      title: "{NEO-Grid}: A Neural Approximation Framework for Optimization and Control in Distribution Grids",
      booktitle: "Proceedings of the 59th Hawaii International Conference on System Sciences",
      doi: "10.24251/HICSS.2026.380",
      pdf: "/Neo-Grid.pdf",
    },
  },
  {
    slug: "levis",
    title: "LEVIS: Large Exact Verifiable Input Spaces for Neural Networks",
    shortTitle: "LEVIS",
    authors: "M. Chehade, W. Li, B. W. Bell, R. Bent, S. R. Kazi, H. Zhu",
    venue: "Proceedings of the 42nd International Conference on Machine Learning (ICML), PMLR 267, pp. 7634–7647, 2025",
    year: "2025",
    shortVenue: "ICML",
    type: "peer-reviewed",
    summary:
      "A verification method for constructing large exact input spaces over which neural-network behavior can be certified.",
    contribution: [
      "Constructs verifiable input regions for neural networks.",
      "Focuses on exactness and scale rather than only local certificates.",
      "Connects verification with deployment-time reliability questions.",
    ],
    topics: ["data-driven-reliability", "risk-aware-learning"],
    figureCaption:
      String.raw`The verifiable region $\mathcal{C}$ holds every input whose output satisfies $f(x) > 0$. LEVIS-$\alpha$ finds the largest verifiable ball, which touches two boundaries of $\mathcal{C}$; LEVIS-$\beta$ covers the rest of $\mathcal{C}$ with a union of balls.`,
    links: [
      { label: "PMLR", href: "https://proceedings.mlr.press/v267/chehade25b.html" },
      { label: "arXiv", href: "https://doi.org/10.48550/arXiv.2408.08824" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=WFIMSlNS7C" },
    ],
    cite: {
      key: "chehade2025levis",
      authors: ["Chehade, Mohamad Fares El Hajj", "Li, Wenting", "Bell, Brian Wesley", "Bent, Russell", "Kazi, Saif R.", "Zhu, Hao"],
      title: "{LEVIS}: Large Exact Verifiable Input Spaces for Neural Networks",
      booktitle: "Proceedings of the 42nd International Conference on Machine Learning",
      series: "Proceedings of Machine Learning Research",
      volume: "267",
      pages: "7634--7647",
      publisher: "PMLR",
      url: "https://proceedings.mlr.press/v267/chehade25b.html",
    },
  },
  {
    slug: "sitalign",
    title: "Bounded Rationality for LLMs: Satisficing Alignment at Inference-Time",
    shortTitle: "SITAlign",
    authors: "M. Chehade, S. S. Ghosal, S. Chakraborty, A. Reddy, D. Manocha, H. Zhu, A. S. Bedi",
    venue: "Proceedings of the 42nd International Conference on Machine Learning (ICML), PMLR 267, pp. 7617–7633, 2025",
    year: "2025",
    shortVenue: "ICML",
    type: "peer-reviewed",
    summary:
      "An inference-time alignment method that treats acceptable behavior through satisficing rather than single-objective maximization.",
    contribution: [
      "Frames LLM alignment through bounded rationality and satisficing.",
      "Targets inference-time control without retraining the full model.",
      "Studies trade-offs among helpfulness, harmlessness, and other response objectives.",
    ],
    topics: ["llm-decision-systems", "risk-aware-learning"],
    figureCaption:
      "GPT-4 win-tie rates against the base model (Zephyr-7B-&beta;) on PKU-SafeRLHF, read from the paper&rsquo;s Figure 2. Decoding for helpfulness alone falls below the 50% harmlessness threshold. Decoding for harmlessness alone, or with MOD, clears it but gives up helpfulness. SITAlign stays above the threshold and is the most helpful of the four, about 22 points ahead of MOD.",
    links: [
      { label: "PMLR", href: "https://proceedings.mlr.press/v267/chehade25a.html" },
      { label: "arXiv", href: "https://arxiv.org/abs/2505.23729" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=cEhLObwvvu" },
    ],
    cite: {
      key: "chehade2025sitalign",
      authors: [
        "Chehade, Mohamad Fares El Hajj",
        "Ghosal, Soumya Suvra",
        "Chakraborty, Souradip",
        "Reddy, Avinash",
        "Manocha, Dinesh",
        "Zhu, Hao",
        "Bedi, Amrit Singh",
      ],
      title: "Bounded Rationality for {LLM}s: Satisficing Alignment at Inference-Time",
      booktitle: "Proceedings of the 42nd International Conference on Machine Learning",
      series: "Proceedings of Machine Learning Research",
      volume: "267",
      pages: "7617--7633",
      publisher: "PMLR",
      url: "https://proceedings.mlr.press/v267/chehade25a.html",
    },
  },
  {
    slug: "boost",
    title: "BOOST: Microgrid Sizing Using Ordinal Optimization",
    shortTitle: "BOOST",
    authors: "M. Chehade, S. Karaki",
    venue: "2025 IEEE Texas Power and Energy Conference (TPEC), pp. 1–4, Feb. 2025",
    year: "2025",
    shortVenue: "TPEC",
    type: "peer-reviewed",
    summary:
      "A microgrid sizing study using ordinal optimization to search design alternatives efficiently.",
    contribution: [
      "Applies ordinal optimization to microgrid sizing.",
      "Emphasizes efficient design search under engineering constraints.",
      "Connects optimization methodology with energy-system planning.",
    ],
    topics: ["power-systems-applications"],
    figureCaption:
      String.raw`Ordinal optimization ranks $N$ candidate microgrid sizings with a cheap model, then evaluates only the top $s$ exactly, returning a good-enough design with high probability.`,
    links: [{ label: "IEEE Xplore", href: "https://doi.org/10.1109/TPEC63981.2025.10907217" }],
    cite: {
      key: "chehade2025boost",
      authors: ["El Hajj Chehade, Mohamad Fares", "Karaki, Sami"],
      title: "{BOOST}: Microgrid Sizing Using Ordinal Optimization",
      booktitle: "2025 IEEE Texas Power and Energy Conference (TPEC)",
      pages: "1--4",
      publisher: "IEEE",
      doi: "10.1109/TPEC63981.2025.10907217",
    },
  },
  {
    slug: "battery-control",
    title: "Should We Use Model-Free or Model-Based Control? A Case Study of Battery Control",
    shortTitle: "Battery Control",
    authors: "M. Chehade, Y. H. Cho, S. Chinchali, H. Zhu",
    venue: "2024 56th North American Power Symposium (NAPS), pp. 1–5, Oct. 2024",
    year: "2024",
    shortVenue: "NAPS",
    type: "peer-reviewed",
    summary:
      "A case study comparing model-free and model-based control choices for battery control problems.",
    contribution: [
      "Compares learned and model-based decision strategies.",
      "Uses battery control to study when each approach is appropriate.",
      "Highlights the practical role of reliability in controller selection.",
    ],
    topics: ["power-systems-applications", "risk-aware-learning", "data-driven-reliability"],
    figureCaption:
      String.raw`The building buys energy at price $\rho_t$ and a battery shifts it in time through actions $a_t$, with $\mathrm{SOC}_{t+1} = \mathrm{SOC}_t + a_t$; the paper compares model-free and model-based controllers for choosing $a_t$.`,
    links: [{ label: "IEEE Xplore", href: "https://doi.org/10.1109/NAPS61145.2024.10741791" }],
    cite: {
      key: "chehade2024battery",
      authors: ["El Hajj Chehade, Mohamad Fares", "Cho, Young-Ho", "Chinchali, Sandeep", "Zhu, Hao"],
      title: "Should We Use Model-Free or Model-Based Control? {A} Case Study of Battery Control",
      booktitle: "2024 56th North American Power Symposium (NAPS)",
      pages: "1--5",
      publisher: "IEEE",
      doi: "10.1109/NAPS61145.2024.10741791",
    },
  },
];

export const peerReviewed = publications.filter((paper) => paper.type === "peer-reviewed");
export const preprints = publications.filter((paper) => paper.type === "preprint");

export function getPublication(slug: string) {
  return publications.find((paper) => paper.slug === slug);
}

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function toBibtex(paper: Publication) {
  const c = paper.cite;
  const fields = ([
    ["title", c.title ?? paper.title],
    ["author", c.authors.join(" and ")],
    ["booktitle", c.booktitle],
    ["series", c.series],
    ["volume", c.volume],
    ["pages", c.pages],
    ["publisher", c.publisher],
    ["year", paper.year],
    ["doi", c.doi],
    ["url", c.url],
  ] as const).filter(([, value]) => value);
  const width = Math.max(...fields.map(([name]) => name.length));
  const body = fields.map(([name, value]) => `  ${name.padEnd(width)} = {${value}}`).join(",\n");
  return `@inproceedings{${c.key},\n${body}\n}`;
}

/** BibTeX field text as plain text, for meta tags. */
export const untex = (text: string) => text.replace(/\\&/g, "&").replace(/[{}]/g, "");

/** Papers in a direction, with the direction's featured paper first. */
export function getTopicPapers(topicSlug: string) {
  const featured = getTopic(topicSlug)?.featured;
  const papers = publications.filter((paper) => paper.topics.includes(topicSlug));
  return [
    ...papers.filter((paper) => paper.slug === featured),
    ...papers.filter((paper) => paper.slug !== featured),
  ];
}
