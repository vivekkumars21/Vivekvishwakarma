import { FC, useState } from 'react';
import { sound } from './sound';

interface Project {
  id: string;
  title: string;
  badge: string;
  category: string;
  desc: string;
  tags: string[];
  github: string;
  architecture: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'fakegen',
    title: 'FakeGEN',
    badge: 'DEEPFAKE FORENSICS',
    category: 'Computer Vision & Deep Learning',
    desc: 'Multi-stream forensic neural framework fusing spatial (EfficientNet-B3), frequency (DCT), and SRM noise residuals with dynamic attention to expose synthetic pixel manipulation.',
    tags: ['PyTorch', 'EfficientNet-B3', 'OpenCV', 'DCT', 'Focal Loss'],
    github: 'https://github.com/vivekkumars21/FakeGEN',
    architecture: ['EfficientNet-B3 Spatial Stream', '2D-DCT Frequency Stream', 'SRM Noise Residuals', 'Dynamic Cross-Attention'],
  },
  {
    id: 'rag',
    title: 'RAG Book Q&A Engine',
    badge: 'LLM & RETRIEVAL',
    category: 'Generative AI & Semantic Search',
    desc: 'High-precision retrieval-augmented generation pipeline querying dense technical literature with hierarchical chunking and ChromaDB vector persistence to eliminate hallucinations.',
    tags: ['LangChain', 'Hugging Face', 'ChromaDB', 'FastAPI', 'MiniLM'],
    github: 'https://github.com/vivekkumars21/RAG',
    architecture: ['Semantic Sentence Chunking', 'all-MiniLM-L6-v2 Embeddings', 'ChromaDB Vector Index', 'Context-Grounded Generation'],
  },
  {
    id: 'lstm',
    title: 'LSTM Next-Word Predictor',
    badge: 'SEQUENTIAL NLP',
    category: 'Recurrent Neural Networks',
    desc: 'Recurrent sequence predictor trained on extensive corpus data to anticipate sequence completions with interactive Streamlit demo.',
    tags: ['TensorFlow', 'LSTM', 'NLP', 'Streamlit', 'Python'],
    github: 'https://github.com/vivekkumars21/nextWordPrediction',
    architecture: ['Tokenization & Padding', 'Embedding Dimension 100', 'Bidirectional LSTM Cells', 'Softmax Probability Head'],
  },
  {
    id: 'loan',
    title: 'Loan Approval Classifier',
    badge: 'SUPERVISED ML & API',
    category: 'Financial Risk Intelligence',
    desc: 'Supervised credit scoring model and real-time FastAPI inference microservice with feature importance analysis and production validation.',
    tags: ['Scikit-learn', 'FastAPI', 'Pandas', 'Streamlit', 'Docker'],
    github: 'https://github.com/vivekkumars21/loanPrediction_fullstack',
    architecture: ['Missing Value Imputation', 'One-Hot & MinMax Scaling', 'Random Forest & Gradient Boost', 'FastAPI REST Endpoint'],
  },
  {
    id: 'medipredict',
    title: 'MediPredict AI',
    badge: 'HEALTHCARE DIAGNOSTICS',
    category: 'Clinical Decision Support',
    desc: 'Symptom-to-disease probabilistic inference API and healthcare specialist routing directory with Flask.',
    tags: ['Python', 'Flask', 'Scikit-learn', 'NumPy', 'EDA'],
    github: 'https://github.com/vivekkumars21/healthcareAI',
    architecture: ['Multi-Label Symptom Matrix', 'Probabilistic Naive Bayes & SVM', 'Specialist Directory Matching', 'Flask Microservice'],
  },
];

export const Projects3D: FC<{
  onSelectProject?: (id: string) => void;
  mouseX: number;
  mouseY: number;
}> = ({ onSelectProject, mouseX, mouseY }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono mb-3">
          <span>🪐</span> 3D ORBITAL REPOSITORIES
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Featured AI &amp; Machine Learning Missions
        </h2>
        <p className="text-white/60 text-sm max-w-xl mx-auto font-mono mt-2">
          End-to-end deep learning frameworks, multimodal forensics, and production APIs by Vivek Vishwakarma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj, idx) => {
          const isHovered = activeCard === proj.id;
          const tiltFactor = (idx % 2 === 0 ? 1 : -1);

          return (
            <div
              key={proj.id}
              onMouseEnter={() => {
                setActiveCard(proj.id);
                sound.playKeyClick();
              }}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative rounded-2xl border border-[#1a2a40] bg-[#071227]/80 backdrop-blur-xl p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              style={{
                transform: isHovered
                  ? `perspective(1000px) translate3d(0, -8px, 30px) rotateX(${mouseY * 8}deg) rotateY(${mouseX * 8}deg) scale3d(1.02, 1.02, 1.02)`
                  : `perspective(1000px) translate3d(${mouseX * tiltFactor * 6}px, ${mouseY * 6}px, 0px) rotateX(${mouseY * 3}deg) rotateY(${mouseX * tiltFactor * 3}deg)`,
                borderColor: isHovered ? 'rgba(121, 220, 232, 0.5)' : 'rgba(26, 42, 64, 0.9)',
                boxShadow: isHovered
                  ? '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(121, 220, 232, 0.2)'
                  : '0 12px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Subtle dynamic sheen reflection */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${(mouseX + 1) * 50}% ${(mouseY + 1) * 50}%, rgba(121, 220, 232, 0.15) 0%, transparent 60%)`,
                }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                    {proj.badge}
                  </span>
                  <span className="text-white/30 text-xs font-mono">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-white/50 font-mono mb-3">{proj.category}</p>
                
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  {proj.desc}
                </p>

                {/* Architecture Highlights */}
                <div className="mb-4 p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-cyan-100/70">
                  <span className="text-[10px] text-white/40 block mb-1">ARCHITECTURE</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {proj.architecture.slice(0, 2).map((item, i) => (
                      <li key={i} className="truncate">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playCommandSuccess()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-white transition-colors"
                  >
                    <span>GitHub Repo</span>
                    <span>↗</span>
                  </a>

                  {onSelectProject && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playCommandSuccess();
                        onSelectProject(proj.id);
                      }}
                      className="text-[11px] font-mono text-white/60 hover:text-cyan-300 underline underline-offset-4"
                    >
                      Inspect in Shell
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
