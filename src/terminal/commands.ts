export interface CommandOutput {
  type: 'text' | 'ascii' | 'table' | 'error' | 'success' | 'component';
  content: string;
  action?: string;
  metadata?: any;
}

export const COMMAND_LIST = [
  'help',
  'whoami',
  'skills',
  'projects',
  'fakegen',
  'rag',
  'experience',
  'education',
  'contact',
  'hire',
  'vibecheck',
  'matrix',
  '3d',
  'clear',
  'audio'
];

export const COMMAND_DOCS: Record<string, string> = {
  help: 'Display all available commands and operations',
  whoami: 'Print biography, profile, and engineering philosophy',
  skills: 'Inspect deep learning, ML, and systems engineering stack',
  projects: 'List all featured open-source AI repositories',
  fakegen: 'Deep-dive into FakeGEN Multi-Stream Forensics architecture',
  rag: 'Inspect high-precision RAG & LLM question-answering engine',
  experience: 'View work history and research experience',
  education: 'View formal degree and academic achievements',
  contact: 'Show direct communication endpoints and social handles',
  hire: 'Information for hiring managers, recruiters, and collaborators',
  vibecheck: 'Run real-time diagnostics on Vivek\'s engineering mindset',
  matrix: 'Toggle 3D digital neural rain simulation',
  '3d': 'Switch between 3D Tilt Terminal, Projects Grid, and Neural View',
  clear: 'Clear current terminal session buffer',
  audio: 'Toggle procedural Web Audio synthesizer effects'
};

export const BANNER_ASCII = `
╔══════════════════════════════════════════════════════════════╗
║  VIVEK VISHWAKARMA // AI & MACHINE LEARNING ENGINEER SHELL  ║
║  Status: GPU Cluster Online • PyTorch 2.4 • CUDA 12.1        ║
╚══════════════════════════════════════════════════════════════╝
Type 'help' for available commands or tap the quick chips below:`;

export function executeCommand(
  rawInput: string,
  callbacks: {
    toggleMatrix?: () => void;
    toggleView?: (view: string) => void;
    toggleAudio?: () => boolean;
  }
): CommandOutput {
  const input = rawInput.trim();
  const [cmd, ...args] = input.split(' ');
  const normalized = cmd.toLowerCase();

  switch (normalized) {
    case 'help': {
      let text = "Available Terminal Commands:\n\n";
      for (const [key, desc] of Object.entries(COMMAND_DOCS)) {
        text += `  • ${key.padEnd(12, ' ')} : ${desc}\n`;
      }
      text += "\nTip: Use UP/DOWN arrow keys for history, or click the quick action chips.";
      return { type: 'text', content: text };
    }

    case 'whoami': {
      return {
        type: 'text',
        content: `NAME: Vivek Vishwakarma
ROLE: AI & Machine Learning Engineer
SPECIALIZATION: Deep Learning, Computer Vision, RAG & LLM Systems
LOCATION: Ahmedabad, India (Open for Global Roles & Relocation)
DEGREE: Bachelor of Engineering in IT (CGPA: 7.7)

SUMMARY:
Passionate AI Engineer focused on building robust deep learning systems from first principles.
Experienced in multi-stream neural forensic architectures (FakeGEN), retrieval-augmented generation
(RAG) with vector persistence, and deploying high-throughput inference endpoints with FastAPI.`
      };
    }

    case 'skills': {
      return {
        type: 'text',
        content: `CORE MACHINE LEARNING & ENGINEERING STACK:

[1] DEEP LEARNING & COMPUTER VISION
    • PyTorch, TensorFlow, OpenCV, EfficientNet-B3, CNNs, DCT Frequency Analysis
    • Loss Functions: Focal Loss, Triplet Loss, Cosine Similarity
    • Custom Training Loops, Mixed Precision (AMP), Tensor Profiling

[2] GENERATIVE AI & LLMs
    • LangChain, Hugging Face Transformers, ChromaDB, Semantic Chunking
    • RAG Pipeline Design, Context Grounding, Prompt Engineering, Ollama

[3] FULL STACK & PRODUCTION SERVING
    • Backend: FastAPI, Flask, Python 3.11+, RESTful Architectures, Docker
    • Frontend: React, TypeScript, Tailwind CSS, WebGL (OGL)
    • Tooling: Git, Linux, Streamlit, Jupyter Lab, VS Code`
      };
    }

    case 'projects': {
      if (callbacks.toggleView) {
        callbacks.toggleView('projects');
      }
      return {
        type: 'success',
        content: `Switching to 3D Projects Showcase Mode...\n
[1] FakeGEN       — Multi-Stream Deepfake Forensics (PyTorch, DCT, SRM)
[2] RAG Book Q&A  — Semantic Vector Retrieval & LLM Generation (LangChain, ChromaDB)
[3] LSTM Model    — Sequential Next-Word Recurrent Predictor (TensorFlow)
[4] Loan Classifier — Supervised Credit Risk Classifier & FastAPI Service
[5] MediPredict   — Clinical Healthcare Diagnostics Engine

Type 'fakegen' or 'rag' for architectural deep-dives.`
      };
    }

    case 'fakegen': {
      return {
        type: 'text',
        content: `[PROJECT DEEP DIVE: FakeGEN]
Domain: Multi-Stream Deepfake Video & Image Forensics
Repository: https://github.com/vivekkumars21/FakeGEN

ARCHITECTURE BREAKDOWN:
  Stream A [Spatial]   : EfficientNet-B3 backbone extracting fine semantic boundary artifacts.
  Stream B [Frequency] : 2D Discrete Cosine Transform (DCT) catching spectral high-frequency anomalies.
  Stream C [Noise]     : Spatial Rich Models (SRM) high-pass filtering sensor PRNU noise patterns.
  Fusion Layer         : Dynamic cross-attention weighted fusion vector trained with Focal Loss.

KEY RESULT:
  Superior cross-dataset generalization compared to single-stream classifiers, with high
  resistance to compression and post-processing blurring.`
      };
    }

    case 'rag': {
      return {
        type: 'text',
        content: `[PROJECT DEEP DIVE: RAG Book Q&A Engine]
Domain: Retrieval-Augmented Generation & Semantic Search
Repository: https://github.com/vivekkumars21/RAG

PIPELINE SPECIFICATION:
  1. Ingestion    : Hierarchical text splitting with semantic sentence boundary preservation.
  2. Embeddings   : all-MiniLM-L6-v2 vector embeddings tuned for dense semantic similarity.
  3. Vector Store : ChromaDB persistent collection with cosine distance indexing.
  4. Generation   : Dynamic prompt wrapping with retrieved context passages to eliminate hallucinations.
  5. Serving      : Real-time asynchronous streaming endpoint built on FastAPI.`
      };
    }

    case 'experience': {
      return {
        type: 'text',
        content: `EXPERIENCE & RESEARCH SUMMARY:

• AI / ML Engineering Projects & Open Source (2023 - Present)
  - Designed & deployed 10+ featured machine learning repositories.
  - Implemented end-to-end pipelines: data cleaning, exploratory analysis, model training,
    hyperparameter tuning, evaluation metrics, and API integration.

• Formal Education & Academic Research (2020 - 2024)
  - B.E. in Information Technology, CGPA 7.7
  - Focused coursework in Artificial Intelligence, Neural Networks, Advanced Data Structures,
    Operating Systems, and Database Management.`
      };
    }

    case 'education': {
      return {
        type: 'text',
        content: `ACADEMIC BACKGROUND:

Degree: Bachelor of Engineering in Information Technology
Institution: Gujarat Technological University (GTU)
Cumulative GPA: 7.7 / 10.0
Graduation: 2024

Key Coursework:
  • Artificial Intelligence & Deep Learning
  • Design and Analysis of Algorithms
  • Computer Vision & Digital Image Processing
  • Database Systems & Object Oriented Programming`
      };
    }

    case 'contact': {
      return {
        type: 'text',
        content: `CONNECT WITH VIVEK:

• Email    : vivekvishwakarma.dev@gmail.com
• GitHub   : https://github.com/vivekkumars21
• LinkedIn : https://www.linkedin.com/in/viveks21/
• Resume   : /Vivek_Vishwakarma_Resume.pdf

Always open to discussions on AI research, novel architectures, and engineering roles!`
      };
    }

    case 'hire': {
      return {
        type: 'success',
        content: `READY TO SHIP SENTIENT WEIGHTS INTO PRODUCTION.

Why hire Vivek?
  1. Solid mathematical intuition combined with clean, testable software engineering.
  2. Practical experience across PyTorch, LangChain, computer vision, and backend APIs.
  3. Self-driven learner with 10+ end-to-end repositories and research rigor.
  4. High autonomy, quick iteration cycles, and Gen Z speed of execution.

Contact directly: vivekvishwakarma.dev@gmail.com`
      };
    }

    case 'vibecheck': {
      return {
        type: 'success',
        content: `[VIBE DIAGNOSTICS: 100% UNREAL 🔥]
• Gradient Loss      : strictly decreasing (< 0.0008)
• Overfitting Risk   : zero (generalized dropout & regularized)
• GPU Temperatures   : optimal (cooling fans at 100%)
• Caffeine Level     : 400mg double shot espresso
• Hallucination Rate : 0.00%
• Status             : Ready to build the future of AI.`
      };
    }

    case 'matrix': {
      if (callbacks.toggleMatrix) {
        callbacks.toggleMatrix();
      }
      return {
        type: 'success',
        content: 'Toggling 3D Neural Matrix Stream overlay...'
      };
    }

    case '3d': {
      const mode = args[0] ? args[0].toLowerCase() : 'toggle';
      if (callbacks.toggleView) {
        callbacks.toggleView(mode);
      }
      return {
        type: 'success',
        content: `Updated 3D view mode. Available views: 'terminal', 'projects', 'skills'`
      };
    }

    case 'audio': {
      let state = true;
      if (callbacks.toggleAudio) {
        state = callbacks.toggleAudio();
      }
      return {
        type: 'text',
        content: `Procedural Web Audio Synth is now: ${state ? 'ENABLED [🔊]' : 'MUTED [🔇]'}`
      };
    }

    case 'clear': {
      return { type: 'text', content: '', action: 'clear' };
    }

    default: {
      return {
        type: 'error',
        content: `bash: command not found: '${rawInput}'. Type 'help' to inspect valid commands.`
      };
    }
  }
}
