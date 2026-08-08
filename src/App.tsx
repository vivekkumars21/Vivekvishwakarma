import { type FC, useState, useEffect } from 'react'
import { useActiveSection } from './hooks/useActiveSection'
import { Ghost } from './components/ui/ghost'



/* ─────────────────────────────────────────────────────────────────────────────
   Vivek Vishwakarma — IT Undergraduate & AI Developer Portfolio
   Stack: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Lucide Icons
───────────────────────────────────────────────────────────────────────────── */

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

/* ─── Hover Effect Utility ─────────────────────────────────────────────────── */
const handleCardMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
    ; (e.currentTarget as any)._cardRect = rect
}

const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
  ; (e.currentTarget as any)._cardRect = null
}

const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  let rect = (e.currentTarget as any)._cardRect
  if (!rect) {
    rect = e.currentTarget.getBoundingClientRect()
      ; (e.currentTarget as any)._cardRect = rect
  }
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

/* ─── Logo ──────────────────────────────────────────────────────────────────── */
const Logo: FC<{ onNavClick: (id: string) => void }> = ({ onNavClick }) => (
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault()
      onNavClick('home')
      const el = document.getElementById('home')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }}
    className="text-2xl sm:text-3xl tracking-tight text-foreground select-none hover:opacity-90 transition-opacity no-underline"
    style={{ fontFamily: "'Instrument Serif', serif" }}
  >
    Vivek Vishwakarma
  </a>
)

interface NavbarProps {
  activeSection: string
  onNavClick: (id: string) => void
}

/* ─── Nav ───────────────────────────────────────────────────────────────────── */
const Navbar: FC<NavbarProps> = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (e?: any) => {
      const scrollEl = e?.target && e.target !== document ? e.target : (document.documentElement || document.body)
      const currentScroll = scrollEl.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop
      if (currentScroll > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, true)
    // Run once on mount to handle initial load
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-[padding] duration-300
        ${isScrolled ? 'glass-frosted-nav py-4' : 'bg-transparent border-none py-6'}
      `}
    >
      <div className="flex flex-row items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Logo onNavClick={onNavClick} />

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6 m-0 p-0 list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    onNavClick(id)
                    const el = document.getElementById(id)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`
                    px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 no-underline border
                    ${isActive
                      ? 'text-foreground bg-white/[0.06] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)] scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.02] border-transparent'
                    }
                  `}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              onNavClick('contact')
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="
              glass-button
              rounded-full px-6 py-2
              text-xs font-semibold uppercase tracking-wider
              transition-transform duration-200
              hover:scale-[1.03]
              cursor-pointer
              outline-none
              no-underline
            "
          >
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
const Hero: FC = () => {
  return (
    <section
      id="home"
      className="
        relative z-10
        flex flex-col items-center justify-center
        text-center
        px-6 pt-24 pb-32
        min-h-[calc(100vh-80px)]
      "
    >
      {/* Identity Line */}
      <div className="animate-fade-rise text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-white/50 mb-8">
        AI/ML &middot; CREATIVE TECHNOLOGY &middot; PRODUCT DESIGN
      </div>

      {/* Headline */}
      <h1
        className="
          animate-fade-rise
          text-5xl sm:text-6xl md:text-7xl lg:text-8xl
          leading-[1.05]
          font-normal
          text-foreground
          max-w-6xl
          mx-auto
        "
        style={{
          fontFamily: "'Instrument Serif', serif",
          letterSpacing: '-1.5px',
        }}
      >
        Building <span className="text-white/50">AI</span>, designing{' '}
        <span className="text-white/50">experiences</span>, and turning{' '}
        <span className="text-white/50">ideas</span> into products.
      </h1>

      {/* Subtext */}
      <p
        className="
          animate-fade-rise-delay
          text-white/70
          text-base sm:text-lg font-light
          max-w-[760px]
          mt-8
          leading-relaxed
          mx-auto
          tracking-wide
        "
      >
        Information Technology undergraduate focused on Machine Learning, Deep Learning, and AI-powered applications — with a passion for creative technology and product design.
      </p>

      {/* Hero CTA */}
      <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 mt-10 justify-center items-center">
        <a
          href="#projects"
          className="
            glass-button
            rounded-full px-12 py-3.5
            text-sm font-medium
            no-underline
          "
        >
          Explore Selected Work
        </a>
        <a
          href="/Vivek_Vishwakarma_Resume.pdf"
          download="Vivek_Vishwakarma_Resume.pdf"
          className="
            glass-button
            rounded-full px-12 py-3.5
            text-sm font-medium
            no-underline
          "
        >
          Download Resume
        </a>
      </div>
    </section>
  )
}

/* ─── Projects Section ──────────────────────────────────────────────────────── */
const Projects: FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'AI & ML' | 'Full Stack' | 'Tools & CLI'>('All')

  const projectsList = [
    {
      title: 'Next Word & Sentence Prediction',
      subtitle: 'End-to-End LSTM Deep Learning & Streamlit App',
      desc: 'Complete deep learning pipeline built from scratch to deployment for sequential text completion. Features a custom-trained Keras/TensorFlow LSTM model with text sequence tokenization & padding, paired with a real-time interactive Streamlit web interface.',
      tech: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'Streamlit', 'NumPy', 'Pickle'],
      category: 'AI & ML',
      highlight: true,
      badgeText: 'Deep Learning',
      link: 'https://github.com/vivekkumars21/nextWordPrediction',
      secondaryLink: 'https://github.com/vivekkumars21/FFRAM/blob/main/DL/senComp/senCompletion.ipynb'
    },
    {
      title: 'Loan Approval & Load Prediction',
      subtitle: 'End-to-End ML & Web Application',
      desc: 'A full-stack machine learning application built with Scikit-learn, FastAPI backend, and Streamlit frontend. Predicts applicant loan approval eligibility and financial load risks in real-time based on historical metrics.',
      tech: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Pandas'],
      category: 'AI & ML',
      highlight: true,
      badgeText: 'Featured ML App',
      link: 'https://github.com/vivekkumars21/loanPrediction_fullstack'
    },
    {
      title: 'MediPredict AI — Healthcare & Heart Finder',
      subtitle: 'Clinical Diagnosis & Doctor Finder',
      desc: 'An intelligent healthcare platform predicting disease and heart risk conditions from patient symptoms. Features a Flask REST API, scikit-learn disease classification model, and specialist doctor recommendation directory.',
      tech: ['Python', 'Flask', 'scikit-learn', 'Pandas', 'NumPy'],
      category: 'AI & ML',
      highlight: true,
      badgeText: 'Healthcare AI',
      link: 'https://github.com/vivekkumars21/healthcareAI'
    },
    {
      title: 'Deepfake Detection System',
      subtitle: 'AI & Computer Vision Project',
      desc: 'Built FakeGEN to detect face manipulation in video content. Combines OpenCV frame extraction with a PyTorch EfficientNet-B3 multi-stream backbone for spatial and frequency artifact classification offline.',
      tech: ['Python', 'PyTorch', 'OpenCV', 'EfficientNet', 'CNNs'],
      category: 'AI & ML',
      highlight: true,
      badgeText: 'Computer Vision',
      link: 'https://github.com/vivekkumars21/FakeGEN'
    },
    {
      title: 'IntraKart — AI + AR Interior Design',
      subtitle: 'Next-Gen Spatial Web Application',
      desc: 'Modern spatial interior design platform featuring AI-driven room image analysis and interactive augmented reality (AR) room layout preview built with Next.js.',
      tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'AI/AR'],
      category: 'Full Stack',
      highlight: true,
      badgeText: 'Core Project',
      link: 'https://github.com/vivekkumars21/LIV.AI'
    },
    {
      title: 'Farm Fresh',
      subtitle: 'Agri-Tech E-Commerce Platform',
      desc: 'Direct-to-consumer agricultural marketplace connecting local farmers with consumers. Features modern catalog management, clean UI, and fast page loads built with Next.js 15.',
      tech: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js'],
      category: 'Full Stack',
      highlight: false,
      link: 'https://github.com/vivekkumars21/Farms-Fresh'
    },
    {
      title: 'Logistics Analytics Dashboard',
      subtitle: 'Real-Time Supply Chain Monitor',
      desc: 'Interactive enterprise logistics control panel displaying real-time fleet analytics, shipment status tracking, and dynamic supply chain performance charts.',
      tech: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Recharts'],
      category: 'Full Stack',
      highlight: false,
      link: 'https://github.com/vivekkumars21/logistics_dashboard'
    },
    {
      title: 'PlexusNet — EMS',
      subtitle: 'Employee Management App & Web',
      desc: 'Cross-platform Employee Management System utilizing Flutter for mobile check-ins, Next.js for the administrator web dashboard, and Firebase for real-time notifications.',
      tech: ['Flutter', 'Next.js', 'React', 'Firebase', 'Node.js'],
      category: 'Full Stack',
      highlight: false,
      link: 'https://github.com/vivekkumars21/EMS-for-Plexusnet'
    },
    {
      title: 'YouTube Video Manager CLI',
      subtitle: 'Terminal Channel Management Tool',
      desc: 'Command-line tool for managing YouTube channels, monitoring real-time video performance statistics, and securing API sessions using OAuth 2.0 authentication.',
      tech: ['Python', 'OAuth 2.0', 'YouTube API', 'CLI', 'JSON'],
      category: 'Tools & CLI',
      highlight: false,
      link: 'https://github.com/vivekkumars21/YT-video-manager'
    }
  ]

  const categories = ['All', 'AI & ML', 'Full Stack', 'Tools & CLI'] as const

  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
      <div className="flex flex-col items-center text-center mb-12">
        <h2
          className="text-4xl sm:text-6xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Selected Work & Projects
        </h2>
        <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
          A collection of machine learning systems, full-stack applications, and side projects pushed to GitHub.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer
              ${activeCategory === cat
                ? 'text-foreground bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105'
                : 'text-muted-foreground hover:text-foreground bg-white/[0.02] border-white/5 hover:border-white/10'
              }
            `}
          >
            {cat} {cat === 'All' ? `(${projectsList.length})` : `(${projectsList.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredProjects.map((project, idx) => {
          return (
            <div
              key={project.title + idx}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onMouseMove={handleCardMouseMove}
              className={`
                liquid-glass card-hover-transition
                rounded-2xl p-6 sm:p-8 flex flex-col justify-between
                group hover:border-white/15 relative overflow-hidden
                ${project.highlight ? 'border border-white/15 shadow-2xl shadow-white/[0.01]' : 'border border-white/[0.05]'}
              `}
            >
              {/* Radial Shimmer Effect Overlay */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
                }}
              />
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white/70 bg-white/[0.05] border border-white/10 font-mono font-medium">
                    {project.category}
                  </span>
                  {project.highlight && (
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-foreground font-semibold">
                      {project.badgeText || 'Core Project'}
                    </span>
                  )}
                </div>
                <h3
                  className="text-2xl sm:text-3xl text-foreground mb-1 leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {project.title}
                </h3>
                <span className="text-xs text-muted-foreground tracking-wider uppercase block mb-4 font-semibold">
                  {project.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] bg-white/[0.02] border border-white/[0.05] text-muted-foreground px-2 py-0.5 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-foreground group-hover:text-white transition-colors no-underline font-medium hover:underline"
                  >
                    <span>{project.secondaryLink ? 'App Repository' : 'Explore Code Repository'}</span>
                    <span className="text-xs opacity-70">↗</span>
                  </a>
                  {project.secondaryLink && (
                    <a
                      href={project.secondaryLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors no-underline font-medium hover:underline"
                    >
                      <span>Model Notebook</span>
                      <span className="text-xs opacity-70">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* GitHub Callout Banner */}
      <div className="mt-16 flex justify-center">
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="
            liquid-glass card-hover-transition group
            rounded-2xl p-6 sm:p-8 max-w-4xl w-full border border-white/10
            hover:border-white/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6
          "
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <div>
            <h4 className="text-2xl text-foreground mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Explore All Repositories on GitHub
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed m-0 max-w-xl">
              I am constantly building new side projects, training custom models, and experimenting with full-stack technologies. Check out all my open-source code on GitHub!
            </p>
          </div>
          <a
            href="https://github.com/vivekkumars21?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="glass-button rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider shrink-0 no-underline whitespace-nowrap"
          >
            View GitHub Profile ↗
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Experience Section ────────────────────────────────────────────────────── */
const Experience: FC = () => {
  const experiences = [
    {
      role: 'Technical Head',
      company: 'Indian Society for Technical Education (ISTE)',
      location: 'Sal Education, Ahmedabad',
      period: 'Aug 2024 – Present',
      bullets: [
        'Organized and led 50+ technical and cultural events with 800+ student participants across the academic year.',
        'Managed a team of 10 volunteers, coordinating photography, cinematography, and live troubleshooting under tight timelines.',
        'Oversaw photography, videography, and post-production for official college coverage.'
      ]
    }
  ]

  return (
    <section id="experience" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
      <div className="flex flex-col items-center text-center mb-16">
        <h2
          className="text-4xl sm:text-6xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Leadership & Experience
        </h2>
        <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
          My activities and volunteer roles in college technical groups and student events.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            onMouseMove={handleCardMouseMove}
            className="liquid-glass card-hover-transition group rounded-2xl p-6 sm:p-10 border border-white/[0.05] relative overflow-hidden"
          >
            {/* Radial Shimmer Effect Overlay */}
            <div
              className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
              }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3
                  className="text-2xl sm:text-3xl text-foreground leading-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {exp.role}
                </h3>
                <span className="text-sm text-muted-foreground font-medium">
                  {exp.company} — <em className="not-italic opacity-80">{exp.location}</em>
                </span>
              </div>

              <div className="text-xs text-muted-foreground bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                {exp.period}
              </div>
            </div>

            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {exp.bullets.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/45 mt-2.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Skills Section ────────────────────────────────────────────────────────── */
const Skills: FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      badge: 'Core Syntax',
      skills: ['Python', 'JavaScript', 'Java']
    },
    {
      title: 'AI & Machine Learning',
      badge: 'Vision & Models',
      skills: ['TensorFlow & Keras', 'LSTM & RNNs', 'Scikit-learn', 'FastAPI', 'Streamlit']
    },
    {
      title: 'Web & Mobile Frameworks',
      badge: 'Full Stack',
      skills: ['Next.js', 'React.js', 'REST APIs']
    },
    {
      title: 'Databases & Cloud',
      badge: 'Data Storage',
      skills: ['MySQL', 'Supabase', 'Firebase', 'SQLite']
    },
    {
      title: 'Data Science & Tools',
      badge: 'Analytics & Dev',
      skills: ['NumPy & Pandas', 'Matplotlib & Seaborn', 'Git & GitHub', 'Docker', 'Power BI', 'Figma']
    }
  ]

  return (
    <section id="skills" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
      <div className="flex flex-col items-center text-center mb-16">
        <h2
          className="text-4xl sm:text-6xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Technical Palette
        </h2>
        <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
          A comprehensive suite of programming languages, AI frameworks, web stack technologies, and tools I use in my projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {skillCategories.map((cat, idx) => {
          return (
            <div
              key={idx}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onMouseMove={handleCardMouseMove}
              className="liquid-glass card-hover-transition group rounded-2xl p-6 border border-white/[0.05] hover:border-white/15 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Radial Shimmer Effect Overlay */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
                }}
              />
              <div>
                <div className="mb-2">
                  <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full text-white/60 bg-white/[0.04] border border-white/10 font-mono font-medium">
                    {cat.badge}
                  </span>
                </div>
                <h3
                  className="text-xl text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {cat.title}
                </h3>
                <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/60 shrink-0 transition-colors"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Education Section ──────────────────────────────────────────────────────── */
const Education: FC = () => {
  const certifications = [
    'Cyber Security Workshop Certification',
    'CodeDex Python Programming Certification'
  ]

  const strengths = [
    'Enjoys figuring out code logic',
    'Building and testing projects quickly',
    'Working together with group mates'
  ]

  return (
    <section id="education" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
      <div className="flex flex-col items-center text-center mb-16">
        <h2
          className="text-4xl sm:text-6xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Academic & Credentials
        </h2>
        <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
          Details about my university education, verified professional credentials, and core operational strengths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {/* University Info */}
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="liquid-glass card-hover-transition group rounded-2xl p-6 sm:p-8 border border-white/[0.05] flex flex-col lg:col-span-1 relative overflow-hidden"
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <div className="mb-6">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Degree</span>
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              B.E. — Information Technology
            </h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed m-0">
            <strong>Sal Engineering and Technical Institute</strong>
            <br />
            Gujarat Technological University (GTU)
            <br />
            Batch: 2023 – 2027
          </p>
        </div>

        {/* Certifications */}
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="liquid-glass card-hover-transition group rounded-2xl p-6 sm:p-8 border border-white/[0.05] lg:col-span-1 relative overflow-hidden"
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <div className="mb-6">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Credentials</span>
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Certifications
            </h3>
          </div>

          <ul className="flex flex-col gap-4 m-0 p-0 list-none">
            {certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths */}
        <div
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="liquid-glass card-hover-transition group rounded-2xl p-6 sm:p-8 border border-white/[0.05] lg:col-span-1 relative overflow-hidden"
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <div className="mb-6">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Strengths</span>
            <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Core Competencies
            </h3>
          </div>

          <ul className="flex flex-col gap-4 m-0 p-0 list-none">
            {strengths.map((str) => (
              <li key={str} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact Section ───────────────────────────────────────────────────────── */
const Contact: FC = () => (
  <section id="contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
    <div className="flex flex-col items-center text-center mb-16">
      <h2
        className="text-4xl sm:text-6xl text-foreground"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Let&rsquo;s Connect
      </h2>
      <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
        I am currently looking for summer internships, student projects, or just chatting about code. Feel free to shoot me an email!
      </p>
    </div>

    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Full-width Email Card */}
      <a
        href="mailto:vivekvishwakarma.dev@gmail.com"
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
        onMouseMove={handleCardMouseMove}
        className="liquid-glass card-hover-transition rounded-2xl p-8 sm:p-10 border border-white/[0.05] hover:border-white/15 no-underline group relative overflow-hidden block"
      >
        {/* Radial Shimmer Effect Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
          }}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-semibold mb-1">Get In Touch</span>
            <span
              className="text-2xl sm:text-3xl text-foreground group-hover:text-white/80 transition-colors"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              vivekvishwakarma.dev@gmail.com
            </span>
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Send Email →
          </span>
        </div>
      </a>

      {/* Social Links Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="https://github.com/vivekkumars21"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="liquid-glass card-hover-transition rounded-2xl p-8 border border-white/[0.05] hover:border-white/15 no-underline group relative overflow-hidden block"
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-semibold mb-1">Code</span>
          <span
            className="text-xl sm:text-2xl text-foreground group-hover:text-white/80 transition-colors"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            GitHub
          </span>
          <p className="text-xs text-muted-foreground mt-2 m-0 leading-relaxed">
            Check out what I'm building and pushing today.
          </p>
        </a>

        <a
          href="https://www.linkedin.com/in/viveks21/"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onMouseMove={handleCardMouseMove}
          className="liquid-glass card-hover-transition rounded-2xl p-8 border border-white/[0.05] hover:border-white/15 no-underline group relative overflow-hidden block"
        >
          {/* Radial Shimmer Effect Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.08), transparent 80%)'
            }}
          />
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-semibold mb-1">Network</span>
          <span
            className="text-xl sm:text-2xl text-foreground group-hover:text-white/80 transition-colors"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            LinkedIn
          </span>
          <p className="text-xs text-muted-foreground mt-2 m-0 leading-relaxed">
            Connect with me to say hi or talk opportunities.
          </p>
        </a>
      </div>
    </div>
  </section>
)

/* ─── Background Video ──────────────────────────────────────────────────────── */
const BackgroundVideo: FC = () => (
  <div className="fixed inset-0 w-screen h-screen overflow-hidden z-0 pointer-events-none">
    <video
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto aspect-video object-cover opacity-95"
      src={VIDEO_SRC}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  </div>
)

/* ─── Ghost Companion ──────────────────────────────────────────────────────── */
const GhostCompanion: FC = () => {
  const [hovered, setHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const quotes = [
    "Boo! 👻 I'm Vivek's late-night coding ghost. I literally compile his React bugs into features!",
    "\"Engineering intelligent software...\" or just drinking 3 AM Coffee trying to center a Tailwind div! ☕",
    "Fun fact: Vivek sketched me on paper during an IT lecture at College. Don't tell the professor! 🤫",
    "I guard the Deepfake Detection model. If any suspicious face vectors show up, I scare them away! 👁️",
    "Vivek wanted a 'glassmorphic frosted nav' so much, I had to freeze my ectoplasm for it! 🥶",
    "Click me! I spin faster than Vivek's CPU running deep learning epochs! 🌀",
    "PlexusNet attendance punches in 2 seconds, but it takes me 2 minutes to float to the header! 🏃💨",
    "Look at those cards glow! I'm polishing the glass panels in the background with my ghost ectoplasm! 🧼✨",
    "I'm following your cursor around with my ambient cosmic space glow! Feel the gravitational pull! 🌌",
    "Yes, I am a ghost. No, I am not a bug. Okay, maybe I'm a feature. 🐛✨"
  ]

  const handleClick = () => {
    setRotation(r => r + 360)
    setQuoteIndex(prev => (prev + 1) % quotes.length)
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Speech bubble */}
      <div
        className={`
          mb-3 ml-1 p-4 rounded-2xl liquid-glass border border-white/10
          max-w-[220px] text-xs text-foreground transition-all duration-300 origin-bottom-left
          ${hovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
        `}
      >
        <div className="relative font-medium leading-relaxed">
          {quotes[quoteIndex]}
        </div>
      </div>

      {/* Floating Ghost Element */}
      <button
        onClick={handleClick}
        className="
          w-14 h-14 rounded-full
          glass-button
          flex items-center justify-center
          no-underline relative transition-transform duration-500
          animate-float-ghost
          cursor-pointer outline-none border-none
        "
        style={{ transform: `rotate(${rotation}deg)` }}
        aria-label="AI Ghost Companion"
      >
        <Ghost variant="glass" className="w-9 h-9" />
      </button>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
const App: FC = () => {
  const sectionIds = ['home', 'projects', 'experience', 'skills', 'education', 'contact']
  const [activeSection, handleNavClick] = useActiveSection(sectionIds)

  useEffect(() => {
    const glowEl = document.getElementById('global-space-glow')
    if (!glowEl) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Update coordinates dynamically on the DOM directly for optimal HMR performance (avoiding React re-renders)
      glowEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background selection:bg-white/10">
      {/* Global Ambient Cosmic Mouse Follower */}
      <div
        id="global-space-glow"
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full bg-white/[0.012] blur-[110px] pointer-events-none z-0 select-none mouse-glow-follower hidden md:block"
      />

      {/* Fullscreen fixed looping video */}
      <BackgroundVideo />

      {/* Content stack (above video) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />

        {/* Interactive Ghost Companion */}
        <GhostCompanion />

        {/* Footer */}
        <footer className="relative z-10 w-full py-8 border-t border-white/[0.03] text-center">
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest m-0">
            © {new Date().getFullYear()} Vivek Vishwakarma. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App