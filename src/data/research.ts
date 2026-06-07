export type ResearchTopic = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  focus: string;
  image: string;
  imageAlt: string;
  paperSlugs: string[];
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
  image?: string;
  imageAlt?: string;
  links: Array<{ label: string; href: string }>;
};

export const topics: ResearchTopic[] = [
  {
    slug: "risk-aware-learning",
    index: "01",
    title: "Risk-Aware Learning and Reinforcement Learning",
    shortTitle: "Risk-aware learning",
    summary:
      "Methods for learning decisions under uncertainty, distribution shift, and explicit risk specifications.",
    focus:
      "This thread asks how policies should adapt when the cost of failure changes across environments, users, or operating regimes.",
    image: "/paper-images/tram.jpg",
    imageAlt: "TRAM paper figure illustrating deployment-time risk adaptation",
    paperSlugs: ["tram", "battery-control", "levis", "sitalign"],
  },
  {
    slug: "data-driven-reliability",
    index: "02",
    title: "Data-Driven Reliability and Verification",
    shortTitle: "Reliability and verification",
    summary:
      "Stress testing, verification, and input-space construction for learned models used in constrained settings.",
    focus:
      "This direction focuses on making model behavior inspectable before learned components enter reliability-critical workflows.",
    image: "/paper-images/levis.jpg",
    imageAlt: "LEVIS paper figure showing verifiable input spaces for neural networks",
    paperSlugs: ["levis", "neo-grid", "llm-grid-actions", "battery-control"],
  },
  {
    slug: "llm-decision-systems",
    index: "03",
    title: "LLMs for Constrained Decision Systems",
    shortTitle: "LLMs for decisions",
    summary:
      "Fine-tuning and inference-time methods for language models that propose technical actions under constraints.",
    focus:
      "The goal is not only better text generation, but more reliable decisions when language models interact with structured domains.",
    image: "/paper-images/sitalign.jpg",
    imageAlt: "SITAlign paper figure showing satisficing alignment reward behavior",
    paperSlugs: ["sitalign", "llm-grid-actions", "tram"],
  },
  {
    slug: "power-systems-applications",
    index: "04",
    title: "Power Systems Applications",
    shortTitle: "Power systems",
    summary:
      "Power-system testbeds for studying learning, optimization, reliability, market participation, and control.",
    focus:
      "These projects use power systems as a concrete domain where uncertainty, constraints, and model reliability matter immediately.",
    image: "/paper-images/neo-grid.jpg",
    imageAlt: "NEO-Grid paper figure showing a neural digital twin for grid control",
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
    slug: "llm-grid-actions",
    title: "Fine-Tuning LLMs to Generate Economical and Reliable Actions for the Power Grid",
    shortTitle: "Fine-Tuning LLMs for Grid Actions",
    authors: "M. Chehade, H. Zhu",
    venue: "Accepted to 2026 IEEE Power & Energy Society General Meeting (PESGM), 2026",
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
    image: "/paper-images/llm-grid-actions.jpg",
    imageAlt: "Paper preview showing the multi-stage LLM adaptation pipeline for PSPS corrective switching",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2602.15350" }],
  },
  {
    slug: "carbon-aware-bems",
    title: "Carbon-aware Market Participation for Building Energy Management Systems",
    shortTitle: "Carbon-Aware Building Energy Markets",
    authors: "Y. Cho, M. Chehade, F. Al-Janahi, S. Lim, J. Mohammadi, H. Zhu",
    venue: "Accepted to 2026 IEEE Power & Energy Society General Meeting (PESGM), 2026",
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
    image: "/paper-images/carbon-aware-bems.jpg",
    imageAlt: "Carbon-aware market participation paper preview with price and emission time-series plots",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2603.08654" }],
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
    image: "/paper-images/neo-grid.jpg",
    imageAlt: "NEO-Grid paper preview showing neural approximation for distribution-grid control",
    links: [
      { label: "paper", href: "/Neo-Grid.pdf" },
      { label: "code", href: "https://github.com/MFHChehade/Neo-Grid" },
    ],
  },
  {
    slug: "levis",
    title: "LEVIS: Large Exact Verifiable Input Spaces for Neural Networks",
    shortTitle: "LEVIS",
    authors: "M. Chehade, W. Li, B. W. Bell, R. Bent, S. R. Kazi, H. Zhu",
    venue: "Proceedings of the 41st International Conference on Machine Learning (ICML), 2025",
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
    image: "/paper-images/levis.jpg",
    imageAlt: "LEVIS paper preview showing verifiable neural-network input regions",
    links: [
      { label: "paper", href: "https://doi.org/10.48550/arXiv.2408.08824" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=WFIMSlNS7C" },
    ],
  },
  {
    slug: "sitalign",
    title: "Bounded Rationality for LLMs: Satisficing Alignment at Inference-Time",
    shortTitle: "SITAlign",
    authors: "M. Chehade, S. S. Ghosal, S. Chakraborty, A. Reddy, D. Manocha, H. Zhu, A. S. Bedi",
    venue: "Proceedings of the 41st International Conference on Machine Learning (ICML), 2025",
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
    image: "/paper-images/sitalign.jpg",
    imageAlt: "SITAlign paper preview showing satisficing reward thresholds",
    links: [
      { label: "paper", href: "https://arxiv.org/abs/2505.23729" },
      { label: "OpenReview", href: "https://openreview.net/forum?id=cEhLObwvvu" },
    ],
  },
  {
    slug: "boost",
    title: "BOOST: Microgrid Sizing using Ordinal Optimization",
    shortTitle: "BOOST",
    authors: "M. Chehade, S. Karaki",
    venue: "2025 Texas Power and Energy Conference (TPEC), IEEE, pp. 1-4, Feb. 2025",
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
    links: [{ label: "paper", href: "https://ieeexplore.ieee.org/document/10907217" }],
  },
  {
    slug: "battery-control",
    title: "Should We Use Model-Free or Model-Based Control? A Case Study of Battery Control",
    shortTitle: "Battery Control",
    authors: "M. Chehade, Y. H. Cho, S. Chinchali, H. Zhu",
    venue: "2024 56th North American Power Symposium (NAPS), IEEE, pp. 1-5, Oct. 2024",
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
    links: [{ label: "paper", href: "https://ieeexplore.ieee.org/abstract/document/10741791" }],
  },
  {
    slug: "tram",
    title: "TRAM: Test-Time Risk Adaptation with Mixture of Agents",
    shortTitle: "TRAM",
    authors: "M. Chehade, A. S. Bedi, A. Zhang, H. Zhu",
    venue: "arXiv, 2024",
    year: "2024",
    shortVenue: "arXiv",
    type: "preprint",
    summary:
      "A test-time risk-adaptation method that composes source agents according to deployment-time risk specifications.",
    contribution: [
      "Separates source training from deployment-time risk selection.",
      "Uses mixture-of-agents behavior to adapt policies locally.",
      "Studies transfer when risk preferences change after training.",
    ],
    topics: ["risk-aware-learning", "llm-decision-systems"],
    image: "/paper-images/tram.jpg",
    imageAlt: "TRAM paper preview showing test-time source-agent selection under risk specifications",
    links: [{ label: "arXiv", href: "https://doi.org/10.48550/arXiv.2408.08812" }],
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

export function getTopicPapers(topicSlug: string) {
  return publications.filter((paper) => paper.topics.includes(topicSlug));
}
