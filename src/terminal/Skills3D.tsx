import { FC, useState } from 'react';
import { sound } from './sound';

interface SkillGroup {
  name: string;
  badge: string;
  icon: string;
  skills: { name: string; level: number; note: string }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Deep Learning & Neural Architectures',
    badge: 'CORE ENGINE',
    icon: '🧠',
    skills: [
      { name: 'PyTorch', level: 94, note: 'Custom modules, loss layers, tensor autograd' },
      { name: 'Computer Vision / OpenCV', level: 90, note: 'DCT transforms, SRM filtering, spatial features' },
      { name: 'EfficientNet & CNNs', level: 88, note: 'Backbone feature extraction, transfer learning' },
      { name: 'TensorFlow / Keras', level: 82, note: 'Sequential LSTM, recurrent sequence modeling' },
      { name: 'Focal & Custom Loss', level: 92, note: 'Imbalanced dataset regularization, weighting' },
    ],
  },
  {
    name: 'Generative AI & LLM Engineering',
    badge: 'FRONTIER',
    icon: '⚡',
    skills: [
      { name: 'LangChain & RAG', level: 92, note: 'Multi-document QA, retrieval routing, prompt synthesis' },
      { name: 'ChromaDB & Vector Stores', level: 90, note: 'Cosine distance, dense indexing, persistent storage' },
      { name: 'Hugging Face Ecosystem', level: 88, note: 'all-MiniLM-L6-v2, tokenizer pipelines, model hub' },
      { name: 'Context Grounding', level: 94, note: 'Hallucination elimination, semantic chunking' },
      { name: 'Prompt Engineering', level: 95, note: 'Zero-shot, few-shot, structured JSON schema outputs' },
    ],
  },
  {
    name: 'Production Serving & Architecture',
    badge: 'INFRASTRUCTURE',
    icon: '🚀',
    skills: [
      { name: 'FastAPI & Async Python', level: 90, note: 'High-throughput async endpoints, Pydantic schemas' },
      { name: 'Flask & REST APIs', level: 86, note: 'Microservice design, serialization, routing' },
      { name: 'Docker & Containerization', level: 82, note: 'Reproducible GPU inference images' },
      { name: 'Scikit-learn & Supervised ML', level: 92, note: 'Ensembles, feature importance, pipeline pipelines' },
      { name: 'CUDA Acceleration', level: 80, note: 'Batch inference profiling, memory management' },
    ],
  },
];

export const Skills3D: FC<{ mouseX: number; mouseY: number }> = ({ mouseX, mouseY }) => {
  const [activeGroup, setActiveGroup] = useState<number>(0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono mb-3">
          <span>⚡</span> NEURAL TENSOR CAPABILITIES
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Machine Learning &amp; AI Stack
        </h2>
        <p className="text-white/60 text-sm max-w-xl mx-auto font-mono mt-2">
          From low-level matrix multiplications to production RAG pipelines and autonomous LLMs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((group, idx) => {
          const isActive = activeGroup === idx;

          return (
            <div
              key={group.name}
              onMouseEnter={() => {
                setActiveGroup(idx);
                sound.playKeyClick();
              }}
              className="relative rounded-2xl border border-[#1a2a40] bg-[#071227]/80 backdrop-blur-xl p-6 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              style={{
                transform: `perspective(1000px) translate3d(${mouseX * (idx - 1) * 8}px, ${mouseY * 8}px, ${isActive ? '20px' : '0px'}) rotateX(${mouseY * 4}deg) rotateY(${mouseX * 4}deg)`,
                borderColor: isActive ? 'rgba(121, 220, 232, 0.5)' : 'rgba(26, 42, 64, 0.9)',
                boxShadow: isActive
                  ? '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(121, 220, 232, 0.2)'
                  : '0 12px 30px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{group.icon}</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {group.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4">
                {group.name}
              </h3>

              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-white/90 font-medium group-hover/skill:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-white/50 font-mono block mt-0.5">
                      {skill.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
