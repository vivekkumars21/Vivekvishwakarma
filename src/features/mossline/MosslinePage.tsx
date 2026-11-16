import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './mossline.css';

const media = {
  hero: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_031618_8ce6dca1-972d-429d-8d13-bf0691c37848.png&w=2400&q=88',
  sensor: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_025630_9a37a1e0-2547-4973-8160-c75205993914.png&w=1400&q=82',
  island: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_025545_b003e5cc-e68f-4fee-b686-c217a5d81eea.png&w=1400&q=82',
  video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261106_025717_906b686d-9a9a-4dea-bab4-ae2454f8390e.mp4',
};

const points = [
  { title: 'Soil carbon', value: '+3.8 t/ha', x: '12%', y: '62%' },
  { title: 'Canopy moisture', value: '71% RH', x: '34%', y: '40%' },
  { title: 'Species index', value: '214 taxa', x: '70%', y: '66%' },
  { title: 'Microclimate', value: '14.2 °C', x: '84%', y: '45%' },
];

const solutions = [
  { label: 'Nature-based solutions', title: 'Forest & peatland carbon projects', body: 'Continuous flux measurement replaces sampled estimates, so credits reflect what the land actually absorbs.', image: media.sensor, position: '22% 70%', size: '260%' },
  { label: 'Supply chain solutions', title: 'Scope 3 sourcing verification', body: 'Trace commodities to the plots that grew them, with deforestation-free evidence attached to every shipment.', image: media.island, position: '50% 50%', size: '190%' },
  { label: 'Biodiversity credits', title: 'Living species baselines', body: 'Acoustic and eDNA monitoring builds a measurable biodiversity baseline you can report against year over year.', image: media.sensor, position: '62% 30%', size: '230%' },
];

const stats = [
  { value: 1240, label: 'Sensors deployed' },
  { value: 38, label: 'Countries monitored' },
  { value: 2.1, suffix: ' Mt', decimals: 1, label: 'CO₂e verified' },
  { value: 99.4, suffix: '%', decimals: 1, label: 'Data uptime' },
];

function Brand() {
  return <a className="ml-brand" href="#home" aria-label="Mossline home"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2 28 9v14l-12 7L4 23V9z" fill="currentColor"/><path d="M16 8c-4 4-5 9-1 16 1-5 4-9 8-11-3 0-5 1-7 3 0-3 0-5 0-8z" fill="#c6f35c"/></svg><span>Mossline</span></a>;
}

export function MosslinePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counted, setCounted] = useState(false);
  const [statsProgress, setStatsProgress] = useState(0);
  const storyRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    const video = videoRef.current;
    if (!story) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = story.getBoundingClientRect();
        const distance = Math.max(1, story.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        setScrollProgress(progress);
        if (video && video.readyState >= 2 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const scrub = Math.min(1, Math.max(0, (progress - 0.06) / 0.64));
          if (Number.isFinite(video.duration)) video.currentTime = scrub * video.duration;
        }
        if (!counted && cardsRef.current && cardsRef.current.getBoundingClientRect().top < window.innerHeight * 0.7) setCounted(true);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [counted]);

  useEffect(() => {
    if (!counted) return;
    const started = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const t = Math.min(1, (now - started) / 1600);
      setStatsProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [counted]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <div className="mossline">
    <header className="ml-nav">
      <Brand />
      <nav className={menuOpen ? 'ml-links is-open' : 'ml-links'} aria-label="Main navigation">
        <a href="#solutions" onClick={closeMenu}>Solutions</a><a href="#technology" onClick={closeMenu}>Our tech</a><a href="#story" onClick={closeMenu}>Company</a><a href="#impact" onClick={closeMenu}>Resources</a>
      </nav>
      <a className="ml-contact" href="mailto:hello@mossline.earth">Let’s talk <span><ArrowUpRight size={15} /></span></a>
      <button className="ml-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="ml-story" id="story" ref={storyRef}>
        <div className="ml-stage">
          <div className="ml-scene" style={{ transform: `scale(${1 + scrollProgress * 0.09}) translateY(${scrollProgress * -2}%)` }}>
            <img className="ml-still" src={media.hero} alt="A moss-covered island suspended in a quiet, misty sky" />
            <video ref={videoRef} className="ml-video" src={media.video} muted playsInline preload="auto" aria-hidden="true" />
            <div className="ml-sky-wash" />
          </div>
          <div className="ml-hero" id="home" style={{ opacity: Math.max(0, 1 - scrollProgress * 8), transform: `translateY(${-scrollProgress * 50}px)` }}>
            <span className="ml-chip">Planet intelligence</span>
            <h1>Measure the<br className="mobile-break" /> Living Planet</h1>
          </div>
          <div className="ml-hero-meta">
            <div className="ml-caption"><span />Real-time ecosystem insights.<br />Powered by science and transparent data.</div>
            <div className="ml-coordinate"><span className="ml-chip">Biodiversity</span><p>LAT&nbsp; 34.0922° N<br />LON&nbsp;116.2432° W<br />ELEV&nbsp;842 M</p></div>
            <a className="ml-scroll" href="#solutions">Scroll to explore <span><ArrowDown size={14} /></span></a>
          </div>
          <div className="ml-story-copy" style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - .17) * 8)) * Math.min(1, Math.max(0, (.43 - scrollProgress) * 8)), visibility: scrollProgress > .16 && scrollProgress < .45 ? 'visible' : 'hidden' }}>
            <span className="ml-chip">Our vision</span><h2>From data chaos to<br />science-backed,<br />actionable insights.</h2><p>A breakthrough in environmental measurement, built for commercial use.</p>
          </div>
          <div className="ml-accounting" style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - .46) * 8)) * Math.min(1, Math.max(0, (.69 - scrollProgress) * 8)), visibility: scrollProgress > .45 && scrollProgress < .70 ? 'visible' : 'hidden' }}>
            <p>Our ecosystem-level accounting translates complex field science into verifiable, compliance-ready metrics — so you can drive measurable results, not just reports.</p>
          </div>
          {points.map((point, i) => <button key={point.title} className={`ml-hotspot ${activePoint === i ? 'is-active' : ''}`} style={{ left: point.x, top: point.y, opacity: Math.min(1, Math.max(0, (scrollProgress - .48) * 8)) * Math.min(1, Math.max(0, (.69 - scrollProgress) * 8)), visibility: scrollProgress > .47 && scrollProgress < .70 ? 'visible' : 'hidden' }} onClick={() => setActivePoint(activePoint === i ? null : i)} aria-expanded={activePoint === i}>
            <span className="ml-hot-dot">+</span><span className="ml-hot-label">{point.title}<b>{point.value}</b></span>
          </button>)}
          <div className="ml-station-copy" style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - .71) * 9)), visibility: scrollProgress > .70 ? 'visible' : 'hidden' }}><span className="ml-chip">Field station 07</span><h2>Scientific credibility for corporate climate action.</h2></div>
          <div className="ml-carbon-card" style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - .73) * 8)), visibility: scrollProgress > .72 ? 'visible' : 'hidden' }}><div className="ml-card-kicker">Accumulated carbon balance</div><div className="ml-card-note">Plot 07 · 12 months</div><div className="ml-carbon-number">{Math.round(Math.min(1, Math.max(0, (scrollProgress - .74) / .15)) * 24)}<small>tCO₂e</small></div><span className="ml-carbon-tag">+2.6 tCO₂e</span><svg className="ml-spark" viewBox="0 0 220 70" role="img" aria-label="Carbon balance trending upward"><polyline points="0,60 30,55 60,57 90,44 120,46 150,30 180,24 214,10"/><circle cx="90" cy="44" r="2.4"/><circle cx="150" cy="30" r="2.4"/><circle className="ml-spark-end" cx="214" cy="10" r="3.4"/></svg><div className="ml-card-foot">Q1 · Q2 · Q3 · Q4</div></div>
          <div className="ml-features" style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - .75) * 8)), visibility: scrollProgress > .74 ? 'visible' : 'hidden' }}>{['Gold-standard observation system', 'World-class atmospheric monitoring', 'Integrated algorithmic processing', 'Transparent data traceability', 'Built for scale and complexity'].map((item, i) => <div className="ml-feature" key={item}><span>0{i + 1}</span>{item}<ArrowRight size={14} /></div>)}</div>
          <div className="ml-progress"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
        </div>
      </section>

      <section className="ml-solutions" id="solutions">
        <div className="ml-section-head" data-reveal><div><span className="ml-chip">Our solutions</span><h2>Validating what nature does naturally.</h2></div><p>Field sensors, atmospheric flux towers and satellite data fused into one auditable record — so every tonne you report can be traced back to the ground it came from.</p></div>
        <div className="ml-solution-grid">{solutions.map((item, index) => <article className="ml-solution-card" data-reveal key={item.label} style={{ transitionDelay: `${index * 100}ms` }}>
          <div className="ml-card-image" style={{ backgroundImage: `url("${item.image}")`, backgroundPosition: item.position, backgroundSize: item.size }} />
          <div className="ml-card-shade" /><div className="ml-solution-top"><span>[{item.label}]</span><i><ArrowUpRight size={17} /></i></div>
          <div className="ml-solution-bottom"><h3>{item.title}</h3><p>{item.body}</p></div>
        </article>)}</div>
        <div className="ml-stats" id="impact">{stats.map((stat, i) => <div className="ml-stat" key={stat.label} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><div><span>{stat.decimals ? (stat.value * statsProgress).toFixed(stat.decimals) : Math.round(stat.value * statsProgress).toLocaleString('en-US')}</span>{stat.suffix && <small>{stat.suffix}</small>}</div><p>{stat.label}</p></div>)}</div>
      </section>
    </main>
    <footer className="ml-footer"><Brand /><p>Better data for a living planet.</p><span>© 2026 Mossline</span></footer>
  </div>;
}
