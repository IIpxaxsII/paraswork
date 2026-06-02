// Lightweight knowledge router for ParxAI.
// Designed to be swapped for embeddings/RAG later — keep the public API stable.

export interface ParxAIAnswer {
  text: string;
  source: "knowledge-base";
}

interface Entry {
  keywords: string[];
  answer: string;
}

const ENTRIES: Entry[] = [
  {
    keywords: ["who", "about paras", "tell me about", "introduce", "bio", "background"],
    answer:
      "Paras Bindra is an Applied AI Engineer focused on building intelligent systems with Machine Learning, Generative AI, RAG, and Computer Vision. He's a B.Tech Computer Science Engineering student (CGPA 8.5, graduating 2026) who turns models and data into practical real-world products.",
  },
  {
    keywords: ["education", "college", "university", "degree", "cgpa", "study", "graduation"],
    answer:
      "Paras is pursuing a B.Tech in Computer Science and Engineering at Punjab Technical University, with a CGPA of 8.5 and expected graduation in 2026.",
  },
  {
    keywords: ["projects", "what has he built", "work", "portfolio"],
    answer:
      "Paras's featured projects: 1) Mobile Usage Trend Analysis — flagship data science + ML project on behavioral patterns. 2) NeuroRAG — retrieval-augmented generation workflow with embeddings and semantic search. 3) Age Prediction Pipeline — computer vision pipeline with model training and evaluation. 4) TripMate AI — AI-powered travel planning platform.",
  },
  {
    keywords: ["mobile", "usage", "trend", "analysis"],
    answer:
      "Mobile Usage Trend Analysis is Paras's flagship project. It uses structured data preprocessing, EDA, feature engineering, regression, classification and visualization to uncover behavioral patterns and actionable insights from mobile usage data.",
  },
  {
    keywords: ["neurorag", "rag", "retrieval", "embeddings", "semantic"],
    answer:
      "NeuroRAG is a Retrieval-Augmented Generation project combining embeddings, semantic search, and contextual response generation to deliver more accurate, grounded AI interactions — demonstrating modern LLM workflow engineering.",
  },
  {
    keywords: ["age", "prediction", "computer vision", "cv", "image"],
    answer:
      "Age Prediction Pipeline is a computer vision project: dataset processing, metadata extraction, image preprocessing, model training, evaluation, and an inference workflow for age estimation.",
  },
  {
    keywords: ["tripmate", "travel", "supabase"],
    answer:
      "TripMate AI is an AI-assisted travel planning platform with authentication, Supabase integration, and structured trip organization — showcasing product thinking and scalable application architecture.",
  },
  {
    keywords: ["skill", "tech", "stack", "technolog", "capabilit", "tools"],
    answer:
      "Paras works across: ML (Python, Scikit-learn, PyTorch, regression/classification, feature engineering), Data Science (NumPy, Pandas, Matplotlib, Seaborn, EDA, statistics), Generative AI & NLP (LLM concepts, prompt engineering, embeddings, semantic search, RAG), and Engineering (Git, SQL, FastAPI, REST APIs, Supabase).",
  },
  {
    keywords: ["interest", "passion", "focus", "ai interest"],
    answer:
      "Paras is focused on Applied AI: machine learning, generative AI, retrieval systems, computer vision, and the engineering of useful AI products — especially RAG, agentic workflows, and intelligent automation.",
  },
  {
    keywords: ["role", "career", "target", "looking", "hire", "opportunit", "job"],
    answer:
      "Paras is targeting Applied AI Engineer, ML Engineer, AI Engineer, and Generative AI roles where he can build practical AI systems that bridge models, data, and real-world products.",
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "github", "connect"],
    answer:
      "You can reach Paras via the Contact section below, on LinkedIn (linkedin.com/in/bparas22), or on GitHub (github.com/IIpxaxsII).",
  },
  {
    keywords: ["future", "exploring", "next", "roadmap"],
    answer:
      "Paras is currently exploring agentic memory systems, hybrid retrieval pipelines, AI workflow automation, multi-agent systems, knowledge retrieval platforms, RAG-based applications, and AI orchestration.",
  },
];

const FALLBACK =
  "I can answer questions about Paras's background, education, projects (Mobile Usage Trend Analysis, NeuroRAG, Age Prediction Pipeline, TripMate AI), technical capabilities, AI interests, target roles, and how to contact him. Try one of the suggested prompts.";

export function answer(query: string): ParxAIAnswer {
  const q = query.toLowerCase();
  let best: { entry: Entry; score: number } | null = null;
  for (const entry of ENTRIES) {
    const score = entry.keywords.reduce(
      (acc, k) => (q.includes(k) ? acc + k.length : acc),
      0
    );
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  return { text: best?.entry.answer ?? FALLBACK, source: "knowledge-base" };
}

export const SUGGESTED_PROMPTS = [
  "Tell me about Paras",
  "What projects has Paras built?",
  "What technologies does Paras use?",
  "What is NeuroRAG?",
  "What is Mobile Usage Trend Analysis?",
  "What type of role is Paras targeting?",
  "How can I contact Paras?",
];
