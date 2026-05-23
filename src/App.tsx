import { type FC, useState, useEffect } from 'react'
import { Ghost } from './components/ui/ghost'
import {
  Github,
  Linkedin,
  Cpu,
  Database,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Code2,
  Server,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  Download,
  ShieldCheck,
  Zap
} from 'lucide-react'


/* ─────────────────────────────────────────────────────────────────────────────
   Vivek Vishwakarma — IT Undergraduate & AI Developer Portfolio
   Stack: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Lucide Icons
───────────────────────────────────────────────────────────────────────────── */

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
]

/* ─── Logo ──────────────────────────────────────────────────────────────────── */
const Logo: FC = () => (
  <a
    href="#home"
    className="text-2xl sm:text-3xl tracking-tight text-foreground select-none hover:opacity-90 transition-opacity no-underline"
    style={{ fontFamily: "'Instrument Serif', serif" }}
  >
    Vivek Vishwakarma
  </a>
)

/* ─── Nav ───────────────────────────────────────────────────────────────────── */
const Navbar: FC = () => {
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
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled ? 'glass-frosted-nav py-4' : 'bg-transparent border-none py-6'}
      `}
    >
      <div className="flex flex-row items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Logo />

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8 m-0 p-0 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 no-underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
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
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const handleScroll = (e?: any) => {
      const scrollEl = e?.target && e.target !== document ? e.target : (document.documentElement || document.body)
      const currentScroll = scrollEl.scrollTop ?? window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop
      if (currentScroll > 30) {
        setShowScroll(false)
      } else {
        setShowScroll(true)
      }
    }
    window.addEventListener('scroll', handleScroll, true)
    // Run once on mount to handle initial load
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [])

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
      {/* Subheading / Location Badge */}
      <div className="animate-fade-rise flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-xs text-muted-foreground mb-8">
        <MapPin className="w-3.5 h-3.5 text-white/60" /> Ahmedabad, Gujarat, India
      </div>

      {/* Headline */}
      <h1
        className="
          animate-fade-rise
          text-5xl sm:text-7xl md:text-8xl
          leading-[1.05]
          font-normal
          text-foreground
          max-w-6xl
          mx-auto
        "
        style={{
          fontFamily:    "'Instrument Serif', serif",
          letterSpacing: '-1.5px',
        }}
      >
        Engineering{' '}
        <span className="text-white/50">intelligent software</span>{' '}
        with{' '}
        <span className="text-white/50">clean architectures.</span>
      </h1>

      {/* Subtext */}
      <p
        className="
          animate-fade-rise-delay
          text-white/70
          text-base sm:text-lg font-light
          max-w-3xl
          mt-8
          leading-relaxed
          mx-auto
        "
      >
        I am Vivek Vishwakarma, an Information Technology undergraduate at Gujarat Technological University (2027) exploring AI and full-stack development. I build synchronized digital platforms, forensic computer vision classifiers, and clean modern interfaces.
      </p>

      {/* Hero CTA */}
      <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center">
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
          href="/VIVEK VISHWAKARMA CV.pdf"
          download="VIVEK VISHWAKARMA CV.pdf"
          className="
            glass-button
            rounded-full px-12 py-3.5
            text-sm font-medium
            no-underline flex items-center gap-2
          "
        >
          <Download className="w-4 h-4" /> Download CV
        </a>
      </div>

      {/* Elegant Bouncing Scroll Down Button */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce
          transition-opacity duration-300 hidden md:block
          ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <a
          href="#projects"
          className="
            w-10 h-10 rounded-full
            glass-button
            flex items-center justify-center
            no-underline
          "
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-5 h-5 text-white/70" />
        </a>
      </div>
    </section>
  )
}

/* ─── Projects Section ──────────────────────────────────────────────────────── */
const Projects: FC = () => {
  const projectsList = [
    {
      title: 'Deepfake Detection System',
      subtitle: 'AI & Forensic Computer Vision',
      desc: 'Built a multi-stream forensic classifier to detect AI-generated face videos. Combines frequency-domain analysis (DCT, SRM noise residuals) with EfficientNet-based spatial features to catch artifacts that single-model approaches miss. Operates completely offline on standard GPU hardware without external API dependencies.',
      tech: ['Python', 'PyTorch', 'OpenCV', 'EfficientNet', 'CNNs'],
      icon: Cpu,
      highlight: true
    },
    {
      title: 'PlexusNet — EMS',
      subtitle: 'Employee Management App & Web',
      desc: 'Built a synchronized mobile + web platform covering the full Employee → TL → Admin workflow with role-based access control and multi-level leave approvals. Features 2-second real-time attendance tracking (Punch In/Out) and team messaging powered by Firebase event-driven listeners, with robust admin CRUD operations.',
      tech: ['Flutter', 'Next.js', 'React', 'Firebase', 'Node.js'],
      icon: Database,
      highlight: true
    },
    {
      title: 'Upcoming AI Solution',
      subtitle: 'Under Development',
      desc: 'An exciting new intelligent engineering system currently under architectural layout planning. I will add the implementation details here later.',
      tech: ['AI / ML', 'Full-Stack', 'Next.js'],
      icon: (props: any) => <Ghost variant="glass" className={props.className} />,
      highlight: false
    }
  ]

  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 border-t border-white/[0.03]">
      <div className="flex flex-col items-center text-center mb-16">
        <h2
          className="text-4xl sm:text-6xl text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Selected Work
        </h2>
        <p className="text-muted-foreground max-w-xl mt-4 text-sm sm:text-base">
          A showcase of architectural systems and AI solutions I have designed, strictly matching my technical credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projectsList.map((project, idx) => {
          const Icon = project.icon
          return (
            <div
              key={idx}
              className={`
                liquid-glass
                rounded-2xl p-6 sm:p-10 flex flex-col justify-between
                transition-all duration-300 hover:scale-[1.01] group
                ${project.highlight ? 'border border-white/15 shadow-2xl shadow-white/[0.01]' : 'border border-white/[0.05]'}
              `}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  {project.highlight && (
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-foreground font-semibold">
                      Core Project
                    </span>
                  )}
                </div>
                <h3
                  className="text-3xl sm:text-4xl text-foreground mb-1"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {project.title}
                </h3>
                <span className="text-xs text-muted-foreground tracking-wider uppercase block mb-6 font-semibold">
                  {project.subtitle}
                </span>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                  {project.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[11px] bg-white/[0.02] border border-white/[0.05] text-muted-foreground px-2.5 py-1 rounded font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/vivekkumars21"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-foreground group-hover:text-muted-foreground flex items-center gap-1 transition-colors no-underline font-medium"
                >
                  Explore Code Repository <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )
        })}
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
          My academic leadership activities and management roles within the college technical communities.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, idx) => (
          <div key={idx} className="liquid-glass rounded-2xl p-6 sm:p-10 border border-white/[0.05]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground">
                  <Briefcase className="w-5 h-5 stroke-[1.5]" />
                </div>
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
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5" /> {exp.period}
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
      title: 'Programming',
      icon: Code2,
      skills: ['Python', 'C', 'Java']
    },
    {
      title: 'AI / ML',
      icon: Cpu,
      skills: ['PyTorch', 'scikit-learn', 'OpenCV', 'EfficientNet', 'NumPy', 'Pandas', 'Matplotlib']
    },
    {
      title: 'Web & Mobile',
      icon: Server,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Next.js', 'React', 'Flutter', 'Django']
    },
    {
      title: 'Databases & Backend',
      icon: Database,
      skills: ['Firebase', 'MongoDB', 'MySQL']
    },
    {
      title: 'Tools & Platforms',
      icon: Briefcase,
      skills: ['Git', 'GitHub', 'VS Code', 'Power BI', 'Figma', 'Unreal Engine']
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
          A comprehensive summary of the languages, libraries, and tools I utilize across computing projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon
          return (
            <div key={idx} className="liquid-glass rounded-2xl p-6 border border-white/[0.05] hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-foreground shrink-0">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h3
                  className="text-lg text-foreground leading-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {cat.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
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
    'Problem decomposition under ambiguity',
    'Fast prototyping',
    'Cross-functional team coordination'
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
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-white/[0.05] flex flex-col lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground shrink-0">
              <GraduationCap className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Degree</span>
              <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                B.E. — Information Technology
              </h3>
            </div>
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
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-white/[0.05] lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground">
              <Award className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Credentials</span>
              <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Certifications
              </h3>
            </div>
          </div>

          <ul className="flex flex-col gap-4 m-0 p-0 list-none">
            {certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-white/[0.05] lg:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground">
              <Zap className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Strengths</span>
              <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Core Competencies
              </h3>
            </div>
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
        Currently exploring starting roles, technical collaborations, and academic opportunities in the AI and software engineering fields. Reach out directly.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
      {/* Contact Cards */}
      <div className="flex flex-col gap-4">
        <a
          href="mailto:vivekvishwakarma21@outlook.com"
          className="liquid-glass rounded-2xl p-6 border border-white/[0.05] hover:scale-[1.01] transition-transform flex items-center gap-6 no-underline group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform shrink-0">
            <Mail className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">Primary Email</span>
            <span className="text-base sm:text-lg text-foreground font-medium group-hover:text-muted-foreground transition-colors break-all">
              vivekvishwakarma21@outlook.com
            </span>
          </div>
        </a>

        <a
          href="tel:+919328797168"
          className="liquid-glass rounded-2xl p-6 border border-white/[0.05] hover:scale-[1.01] transition-transform flex items-center gap-6 no-underline group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform shrink-0">
            <Phone className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">Mobile Connection</span>
            <span className="text-base sm:text-lg text-foreground font-medium group-hover:text-muted-foreground transition-colors">
              +91 93287 97168
            </span>
          </div>
        </a>
      </div>

      {/* Social Links Panel */}
      <div className="liquid-glass rounded-2xl p-8 border border-white/[0.05] flex flex-col justify-between">
        <div>
          <h3
            className="text-2xl sm:text-3xl text-foreground mb-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Digital Profiles
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Follow my latest coding updates, open-source repositories, and professional networks. I actively share updates on projects in AI systems and technical coordination.
          </p>
        </div>

        <div className="flex flex-row gap-4 mt-8">
          <a
            href="https://github.com/vivekkumars21"
            target="_blank"
            rel="noreferrer"
            className="
              flex-1
              glass-button
              rounded-xl py-3.5 flex items-center justify-center gap-2
              text-xs uppercase tracking-wider font-semibold
              no-underline
            "
          >
            <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://www.linkedin.com/in/viveks21/"
            target="_blank"
            rel="noreferrer"
            className="
              flex-1
              glass-button
              rounded-xl py-3.5 flex items-center justify-center gap-2
              text-xs uppercase tracking-wider font-semibold
              no-underline
            "
          >
            <Linkedin className="w-4 h-4" /> LinkedIn <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  </section>
)

/* ─── Background Video ──────────────────────────────────────────────────────── */
const BackgroundVideo: FC = () => (
  <video
    className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-95"
    src={VIDEO_SRC}
    autoPlay
    loop
    muted
    playsInline
    aria-hidden="true"
  />
)

/* ─── Ghost Companion ──────────────────────────────────────────────────────── */
const GhostCompanion: FC = () => {
  const [hovered, setHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const quotes = [
    "Boo! 👻 I'm Vivek's late-night coding ghost. I literally compile his React bugs into features!",
    "\"Engineering intelligent software...\" or just drinking 3 AM Chai trying to center a Tailwind div! ☕",
    "Fun fact: Vivek sketched me on paper during an IT lecture at GTU. Don't tell the professor! 🤫",
    "I guard the Deepfake Detection model. If any suspicious face vectors show up, I scare them away! 👁️",
    "Vivek wanted a 'glassmorphic frosted nav' so much, I had to freeze my ectoplasm for it! 🥶",
    "Click me! I spin faster than Vivek's CPU running deep learning epochs! 🌀",
    "PlexusNet attendance punches in 2 seconds, but it takes me 2 minutes to float to the header! 🏃💨",
    "Yes, I am a ghost. No, I am not a bug. Okay, maybe I'm a feature. 🐛✨"
  ]

  const handleClick = () => {
    setRotation(r => r + 360)
    setQuoteIndex(prev => (prev + 1) % quotes.length)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Speech bubble */}
      <div
        className={`
          mb-3 mr-1 p-4 rounded-2xl liquid-glass border border-white/10
          max-w-[220px] text-xs text-foreground transition-all duration-300 origin-bottom-right
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
const App: FC = () => (
  <div className="relative min-h-screen w-full overflow-x-hidden bg-background selection:bg-white/10">
    {/* Fullscreen fixed looping video */}
    <BackgroundVideo />

    {/* Content stack (above video) */}
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
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

export default App