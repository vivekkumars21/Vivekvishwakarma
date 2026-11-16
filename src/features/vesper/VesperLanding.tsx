import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import './vesper.css';

const video = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4';
const mark = <svg viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(-30 12 12)"><circle cx="7.3" cy="3.2" r="1.45"/><rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8"/><rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8"/><circle cx="16.7" cy="20.8" r="1.45"/></g></svg>;

export function VesperLanding() {
  const [open, setOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const resize = () => { if (window.innerWidth >= 901) setOpen(false); };
    window.addEventListener('keydown', close); window.addEventListener('resize', resize);
    let frame = 0;
    const move = (event: PointerEvent) => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setPointer({ x: event.clientX, y: event.clientY })); };
    window.addEventListener('pointermove', move, { passive: true });
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.appear, .hero-photo'));
    nodes.forEach((node) => node.addEventListener('animationend', () => node.classList.add('is-in'), { once: true }));
    requestAnimationFrame(() => requestAnimationFrame(() => nodes.forEach((node) => {
      if (!node.getAnimations().some((animation) => animation.playState === 'running' || animation.playState === 'finished')) node.classList.add('is-in');
    })));
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);
  const closeMenu = () => setOpen(false);
  const delay = (value: string): CSSProperties => ({ '--d': value } as CSSProperties);
  return <div className={`vesper ${open ? 'menu-open' : ''}`} style={{ '--px': `${pointer.x}px`, '--py': `${pointer.y}px` } as CSSProperties}>
    <div className="grain" aria-hidden="true"/><video className="hero-photo" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src={video} type="video/mp4"/></video>
    <div className="ambient" aria-hidden="true"/>
    <div className="page"><div className="menu-backdrop" onClick={closeMenu}/>
      <header className="header"><a className="logo appear appear--scale" style={delay('0.08s')} href="#top" aria-label="Vesper.ai">{mark}<span>Vesper<span className="logo-suffix">.ai</span></span></a>
        <nav className="site-nav" aria-label="Primary">{[['Benefits','#benefits','scale','0.16s'],['How It Works','#how-it-works','soft','0.28s'],['FAQs','#faqs','scale','0.40s'],['Pricing','#pricing','soft','0.52s']].map(([label,href,anim,itemDelay])=><a className={`nav-pill appear appear--${anim}`} style={delay(itemDelay)} href={href} key={label} onClick={closeMenu}>{label}</a>)}</nav>
        <a className="btn btn-solid header-cta appear appear--scale" style={delay('0.34s')} href="#start">Start for Free</a>
        <button className="burger appear appear--scale" style={delay('0.34s')} aria-label={open?'Close menu':'Open menu'} aria-controls="site-nav" aria-expanded={open} onClick={()=>setOpen(!open)}><i/><i/><i/></button>
      </header>
      <main className="hero" id="top"><div className="hero-copy"><div className="badge appear appear--pop" style={delay('0.22s')}><svg className="badge-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z"/></svg>Operational AI Infrastructure</div>
        <h1><span className="headline-line appear appear--mask" style={delay('0.42s')}>Train <em>AI agents</em> on your</span><span className="headline-line appear appear--mask" style={delay('0.62s')}>workflows in minutes.</span></h1>
        <p className="lede appear appear--soft" style={delay('0.82s')}>Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.</p>
        <div className="hero-actions"><a className="btn btn-solid hero-btn appear appear--btn" style={delay('0.96s')} href="#start">Start for Free</a><a className="btn btn-ghost hero-btn appear appear--side" style={delay('1.10s')} href="#demo">See it in action <span>↗</span></a></div>
      </div></main>
      <footer className="stats"><div className="stat appear appear--stat" style={delay('1.12s')}><svg viewBox="0 0 24 24"><rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6"/><rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6"/><path d="M9.2 10.9h5.6v2.2H9.2z"/></svg><span>4.2M+ workflows automated</span></div><div className="stat appear appear--stat" style={delay('1.28s')}><svg viewBox="0 0 24 24"><rect className="tile" x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2"/><path className="download" d="M12 7.1v7.4m-3.85-2.15L12 16.2l3.85-3.85"/></svg><span>92% reduction in manual operations</span></div><div className="stat appear appear--stat" style={delay('1.44s')}><svg className="wide" viewBox="0 0 40 22"><circle cx="10.2" cy="11" r="9.2"/><circle className="face" cx="10.2" cy="12.1" r="3.7"/><circle cx="20.2" cy="11" r="9.2"/><circle className="eye" cx="17.6" cy="10" r="1.1"/><circle className="eye" cx="22.8" cy="10" r="1.1"/><circle className="orange" cx="30.2" cy="11" r="9.2"/><text x="30.2" y="15.1">e</text></svg><span>180+ operational teams onboarded</span></div></footer>
    </div>
  </div>;
}
