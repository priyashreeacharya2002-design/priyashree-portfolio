import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './fonts/albert-sans.css';

// ─── SITE COLORS (matching App.js exactly) ───────────────────────────────────
const COLORS = {
  bg: '#0D0C0A',
  surface: '#141412',
  textPrimary: '#EDEAE3',
  textSecondary: '#6B6860',
  accent: '#D81060',
  border: 'rgba(255,255,255,0.08)',
};

// ─── PROJECT COLORS ───────────────────────────────────────────────────────────
const CC = {
  darkBg:       '#131A13',
  darkBg2:      '#1E2E1A',   // more saturated — visually distinct from darkBg
  lightBg:      '#F7F7F2',
  lightBg2:     '#EEEEE8',
  headingGreen: '#3D5A1E',
  accentGreen:  '#6B8E23',
  textLight:    '#EDEAE3',
  textMuted:    'rgba(237,234,227,0.65)',
  textDark:     '#1A2A1A',
  textDarkMuted:'#4A5A4A',
  cardDark:     'rgba(107,142,35,0.07)',  // green-tinted — visible against dark bg
  cardBorderDark:'rgba(107,142,35,0.18)',
  cardBorderLight:'rgba(0,0,0,0.09)',
  dotGreen:     '#6B8E23',
  placeholderDark: '#2A3A2A',
  placeholderLight: '#DEDED8',
};

// ─── FONTS ────────────────────────────────────────────────────────────────────
const F = {
  serif:  "'Albert Sans', Arial, sans-serif",
  sans:   "'Albert Sans', Arial, sans-serif",
  mono:   "'DM Mono', 'Courier New', monospace",
  black:  "'Blackletter', cursive",
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function fadeUp(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  };
}

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [threshold]);
  return scrolled;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [bp]);
  return mobile;
}

function useGlobalSetup() {
  useEffect(() => {
    if (!document.querySelector('link[data-portfolio-fonts]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.setAttribute('data-portfolio-fonts', 'true');
      l.href = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap';
      document.head.appendChild(l);
    }

    if (!document.querySelector('style[data-blackletter]')) {
      const s = document.createElement('style');
      s.setAttribute('data-blackletter', 'true');
      s.textContent = `@font-face{font-family:'Blackletter';src:url('/BLACEB__.TTF') format('truetype');font-weight:normal;}`;
      document.head.appendChild(s);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = CC.darkBg;
    document.body.style.overflowX = 'hidden';
    document.body.style.fontFamily = "'Albert Sans', Arial, sans-serif";
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.fontFamily = '';
    };
  }, []);
}

// ─── SHARED SITE COMPONENTS ───────────────────────────────────────────────────

function StarCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          el.style.left = pos.current.x + 'px';
          el.style.top  = pos.current.y + 'px';
          raf.current = null;
        });
      }
    };
    const CLICK = 'a, button, [role="button"], input, label, select, textarea, [tabindex]';
    const onOver = (e) => { if (e.target.closest(CLICK)) el.style.animation = 'starPulse 0.6s ease-in-out infinite'; };
    const onOut  = (e) => { if (e.target.closest(CLICK)) { el.style.animation = 'none'; el.style.fontSize = '18px'; } };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);
  return (
    <div ref={ref} style={{
      position: 'fixed', pointerEvents: 'none', zIndex: 99999,
      fontSize: '18px', color: '#ffffff',
      transform: 'translate(-50%, -50%) rotate(-20deg)',
      userSelect: 'none', lineHeight: 1, left: '-100px', top: '-100px',
    }}>✦</div>
  );
}

function LogoLink() {
  const navigate = useNavigate();
  return (
    <a href="/" style={{ fontFamily: F.black, fontSize: '31px', color: COLORS.accent, cursor: 'pointer', textDecoration: 'none', lineHeight: 1 }}
      onClick={e => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
      P
    </a>
  );
}

function NavLink({ link, isHovered, onHover, onLeave, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPage = !link.href.startsWith('#');
  const onHome = location.pathname === '/';
  return (
    <a href={link.href}
      style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none', color: isHovered ? COLORS.accent : '#B0ADA6', transition: 'color 0.3s ease', cursor: 'pointer' }}
      onMouseEnter={onHover} onMouseLeave={onLeave}
      onClick={e => {
        e.preventDefault();
        if (onClick) onClick();
        if (isPage) { navigate(link.href); }
        else if (onHome) { document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }
        else { navigate('/'); setTimeout(() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }), 300); }
      }}>
      {link.label}
    </a>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'BLOG', href: '#sandbox' },
    { label: 'ABOUT', href: '/about' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: '64px',
      background: scrolled ? 'rgba(13,12,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : '1px solid transparent',
      transition: 'background 0.4s ease, border-color 0.4s ease',
    }}>
      <LogoLink />
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          {navLinks.map((l, i) => (
            <NavLink key={l.label} link={l} isHovered={hovered === i}
              onHover={() => setHovered(i)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      )}
      {isMobile && (
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: '#B0ADA6', fontSize: '20px', cursor: 'pointer', padding: '8px', lineHeight: 1 }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      )}
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,12,10,0.97)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '48px' }}>
          {navLinks.map((l, i) => (
            <NavLink key={l.label} link={l} isHovered={hovered === i}
              onHover={() => setHovered(i)} onLeave={() => setHovered(null)} onClick={() => setMenuOpen(false)} />
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── PROJECT HELPER COMPONENTS ────────────────────────────────────────────────

function ImgPlaceholder({ label, height = 300, onLight = false }) {
  return (
    <div style={{
      width: '100%', minHeight: `${height}px`,
      background: onLight ? CC.placeholderLight : CC.placeholderDark,
      border: `1.5px dashed ${onLight ? '#AAAAAA' : '#4A6A4A'}`,
      borderRadius: '6px', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px', boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.05em', color: onLight ? '#888880' : '#7A9A7A', textAlign: 'center' }}>
        [ {label} ]
      </span>
    </div>
  );
}

function DotDivider() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', zIndex: 10,
      marginTop: '-80px', marginBottom: '-80px',
      pointerEvents: 'none',
      mixBlendMode: 'difference',
    }}>
      <div style={{
        width: 2, height: 160,
        background: `repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 6px, transparent 6px, transparent 13px)`,
      }} />
      <div style={{
        width: 12, height: 12, borderRadius: '50%',
        background: '#ffffff', marginTop: 6, flexShrink: 0,
      }} />
    </div>
  );
}

function SectionTag({ children }) {
  return (
    <div style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '10px', letterSpacing: '0.14em', color: CC.accentGreen, marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span>/</span>{children}
    </div>
  );
}

// ─── SECTION 1 — HERO ─────────────────────────────────────────────────────────

function S1Hero() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', background: `linear-gradient(160deg, #0E1A0E 0%, #1A2F1A 40%, #0F1F0F 70%, #0A0F0A 100%)` }}>
      {/* Botanical texture overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(60,100,40,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Top meta bar */}
      <div style={{ position: 'absolute', top: '88px', left: 0, right: 0, padding: '0 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontFamily: F.mono, fontSize: '11px', color: 'rgba(237,234,227,0.55)', letterSpacing: '0.05em' }}>
          Guided by Pranshu K Chaudhary&nbsp;&nbsp;|&nbsp;&nbsp;Duration: 2 weeks
        </span>
        <img src="/nid-logo.png" alt="NID Ahmedabad" style={{ height: '22px', width: 'auto', display: 'block', opacity: 0.85 }} />
      </div>

      {/* Main title */}
      <div style={{ ...fadeUp(visible, 0.1), position: 'relative', zIndex: 2, padding: '0 56px', marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(42px, 7vw, 96px)', color: CC.textLight, lineHeight: 1.08, margin: '0 0 56px 0', letterSpacing: '-0.02em' }}>
          Retail is going Transparent
        </h1>

        {/* Frosted overview card */}
        <div style={{ ...fadeUp(visible, 0.25), maxWidth: '720px', width: '100%', background: 'rgba(15,28,15,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: `1px solid rgba(107,142,35,0.3)`, borderRadius: '12px', padding: '40px 48px' }}>
          <div style={{ fontFamily: F.sans, fontSize: '10px', letterSpacing: '0.14em', color: CC.accentGreen, textAlign: 'center', marginBottom: '20px' }}>PROJECT OVERVIEW</div>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.8, color: 'rgba(237,234,227,0.85)', margin: 0, textAlign: 'center' }}>
            The Carbon Receipt is an interactive retail technology concept that makes the environmental cost of products visible at the point of engagement. Instead of only showing a monetary total, it delivers a 'receipt' for the planet, sharing a product's carbon footprint, lifecycle impact, and offset guidance in a way that is engaging, digestible, and emotionally resonant.
            <br /><br />
            This concept aims to help shoppers connect with the true cost of their purchases while rewarding climate-conscious brands and nudging consumers toward more sustainable choices.
          </p>
        </div>
      </div>

      {/* Bottom meta bar */}
      <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, padding: '0 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <span style={{ fontFamily: F.mono, fontSize: '11px', color: 'rgba(237,234,227,0.45)', letterSpacing: '0.04em' }}>Team Project by Priyashree and Bharti</span>
        <span style={{ fontFamily: F.mono, fontSize: '11px', color: 'rgba(237,234,227,0.45)', letterSpacing: '0.04em' }}>Interaction Design&nbsp;&nbsp;|&nbsp;&nbsp;Retail Technology</span>
      </div>
    </section>
  );
}

// ─── SECTION 2 — POETIC NARRATIVE ─────────────────────────────────────────────

function S2Poetic() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ position: 'relative', background: `linear-gradient(180deg, #0A0F0A 0%, #131A13 100%)`, padding: '120px 0 100px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(50,80,30,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 56px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ ...fadeUp(visible, 0), fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(32px, 5vw, 64px)', color: CC.textLight, margin: '0 0 80px 0', lineHeight: 1.15 }}>
          Retail interactions for today's world
        </h2>

        {/* Staggered verse */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <p style={{ ...fadeUp(visible, 0.1), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2.2vw, 22px)', lineHeight: 1.75, color: CC.textMuted, margin: 0, textAlign: 'right', paddingLeft: '20%' }}>
            We live in a world that moves fast<br />
            where buying has become a reflex,<br />
            and every checkout a small act of forgetting.
          </p>

          <p style={{ ...fadeUp(visible, 0.2), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2.2vw, 22px)', lineHeight: 1.75, color: CC.textMuted, margin: 0, textAlign: 'left', paddingRight: '20%' }}>
            We see the price on a tag,<br />
            but not the path that product took to get there.<br />
            the forest cleared,<br />
            the energy burned,<br />
            the journey made from mine to market.
          </p>

          <p style={{ ...fadeUp(visible, 0.3), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2.2vw, 22px)', lineHeight: 1.75, color: CC.textMuted, margin: 0, textAlign: 'right', paddingLeft: '20%' }}>
            Each item carries a story<br />
            of extraction, of creation,<br />
            of hands that shaped it,<br />
            and emissions that shadow it.
          </p>

          <p style={{ ...fadeUp(visible, 0.4), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px, 2.2vw, 22px)', lineHeight: 1.75, color: CC.textMuted, margin: 0, textAlign: 'left', paddingRight: '20%' }}>
            But in our rush for convenience,<br />
            the count that gets lost somewhere<br />
            between barcode and bag.
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── SECTION 3 — PROBLEM + CONCEPT ────────────────────────────────────────────

function ConceptIcon({ type }) {
  const c = CC.headingGreen;
  if (type === 'leaf') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4C10 4 4 12 4 20c0 6 4 10 14 10 2-4 2-10 2-10s-4 2-8 0c4-2 8-8 8-8s0 6-2 10c8-2 12-6 12-12C30 8 24 4 18 4z" fill={c} opacity="0.7" />
      <line x1="18" y1="14" x2="18" y2="30" stroke={c} strokeWidth="1.5" />
    </svg>
  );
  if (type === 'scan') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="8" y="8" width="20" height="20" rx="2" stroke={c} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="14" x2="12" y2="22" stroke={c} strokeWidth="2" />
      <line x1="16" y1="12" x2="16" y2="24" stroke={c} strokeWidth="1.5" />
      <line x1="20" y1="14" x2="20" y2="22" stroke={c} strokeWidth="2" />
      <line x1="24" y1="12" x2="24" y2="24" stroke={c} strokeWidth="1.5" />
      <line x1="4" y1="18" x2="32" y2="18" stroke={c} strokeWidth="1" opacity="0.5" />
    </svg>
  );
  if (type === 'tree') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,4 28,20 8,20" fill={c} opacity="0.6" />
      <polygon points="18,10 26,24 10,24" fill={c} opacity="0.8" />
      <rect x="16" y="24" width="4" height="8" fill={c} />
    </svg>
  );
  if (type === 'phone') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="10" y="4" width="16" height="28" rx="3" stroke={c} strokeWidth="1.5" fill="none" />
      <line x1="10" y1="10" x2="26" y2="10" stroke={c} strokeWidth="1" />
      <line x1="10" y1="26" x2="26" y2="26" stroke={c} strokeWidth="1" />
      <rect x="14" y="13" width="8" height="10" rx="1" fill={c} opacity="0.5" />
      <circle cx="18" cy="29" r="1.5" fill={c} />
    </svg>
  );
  return null;
}

function S3ProblemConcept() {
  const [ref, visible] = useFadeIn();
  const concepts = [
    { icon: 'leaf',  title: 'Data Fetch',      body: 'System retrieves verified or estimated carbon footprint data from a product database.' },
    { icon: 'scan',  title: 'Product Scan',    body: 'User scans a real or mock product (barcode / AI vision).' },
    { icon: 'tree',  title: 'Visual Impact',   body: 'An LED installation instantly lights up a sculptural tree node when a product is carbon-neutral or climate-positive.' },
    { icon: 'phone', title: 'Digital Receipt', body: 'A personalised carbon receipt is sent to the shopper via QR code or NFC.' },
  ];
  return (
    <section ref={ref} style={{ background: CC.lightBg, padding: '96px 64px' }}>
      {/* Problem Statement */}
      <div style={{ ...fadeUp(visible, 0), maxWidth: '680px', margin: '0 auto', textAlign: 'center', marginBottom: '96px' }}>
        <SectionTag>PROBLEM STATEMENT</SectionTag>
        <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textDark, margin: '0 0 24px 0', lineHeight: 1.15 }}>Sustainability stays buried in reports</h2>
        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '15px', lineHeight: 1.8, color: CC.textDarkMuted, margin: 0 }}>
          Sustainability efforts in retail often stay buried in reports, leaving shoppers without clear, engaging impact insights, while brands miss recognition and retailers lose chances to stand out with ESG-driven experiences.
        </p>
      </div>

      {/* Concept Overview */}
      <div style={{ ...fadeUp(visible, 0.1), maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <SectionTag>CONCEPT OVERVIEW</SectionTag>
        <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textDark, margin: '0 0 16px 0', lineHeight: 1.15 }}>The Carbon Receipt</h2>
        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', color: CC.textDarkMuted, marginBottom: '56px', lineHeight: 1.7 }}>
          The Carbon Receipt concept bridges this gap through sensor-based recognition and digital storytelling:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {concepts.map((c, i) => (
            <div key={c.title} style={{ ...fadeUp(visible, 0.1 + i * 0.08), background: '#fff', border: `1px solid ${CC.cardBorderLight}`, borderRadius: '10px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <ConceptIcon type={c.icon} />
              </div>
              <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: '13px', color: CC.headingGreen, marginBottom: '10px', letterSpacing: '0.03em' }}>{c.title}</div>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textDarkMuted, lineHeight: 1.7, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4 — TIMELINE ─────────────────────────────────────────────────────

function S4Timeline() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  const stages = [
    { label: 'Traditional Retail Brands',          date: 'Pre-2010s',    img: 'timeline-traditional-retail.png' },
    { label: 'Emergence of Sustainable Brands',    date: '2010–2015',    img: 'timeline-sustainable-brands.png' },
    { label: 'Commitment to Net-Zero Emissions',   date: '2015–2020',    img: 'timeline-net-zero.png' },
    { label: 'Transition to Climate-Positive Brands', date: '2020–Present', img: 'timeline-climate-positive.png' },
  ];
  return (
    <section ref={ref} style={{ background: CC.lightBg2, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '64px' }}>
          <SectionTag>CONTEXT</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textDark, margin: 0, lineHeight: 1.15 }}>
            Retail's Journey Towards Sustainability
          </h2>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '24px', alignItems: 'start' }}>
          {stages.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <img src={`/${s.img}`} alt={s.label} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />

              {/* Timeline connector */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '20px 0 16px' }}>
                {i > 0 && <div style={{ position: 'absolute', left: 0, right: '50%', height: '1px', background: `repeating-linear-gradient(to right, ${CC.headingGreen} 0px, ${CC.headingGreen} 4px, transparent 4px, transparent 8px)` }} />}
                {i < 3 && <div style={{ position: 'absolute', left: '50%', right: 0, height: '1px', background: `repeating-linear-gradient(to right, ${CC.headingGreen} 0px, ${CC.headingGreen} 4px, transparent 4px, transparent 8px)` }} />}
                <div style={{ position: 'relative', zIndex: 1, width: 12, height: 12, borderRadius: '50%', background: CC.headingGreen, flexShrink: 0 }} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: '12px', color: CC.textDark, lineHeight: 1.4, marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: '11px', color: CC.headingGreen }}>{s.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION A1 — SUSTAINABILITY MOMENTUM ────────────────────────────────────

function SA1SustainabilityMomentum() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '64px' }}>
          <SectionTag>SUSTAINABILITY MOMENTUM</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: 0, lineHeight: 1.15 }}>
            The Business Case for Transparency
          </h2>
        </div>

        {/* Two stat cards */}
        <div style={{ ...fadeUp(visible, 0.1), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '72px' }}>
          <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '12px', padding: '36px 40px', background: CC.cardDark, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
            <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: CC.textLight, margin: 0 }}>
              Brands who <strong style={{ color: '#fff' }}>proactively integrate sustainability into their retail experience</strong> gain measurable market share advantage. According to a study (2017–2022), products making ESG-related claims achieved <strong style={{ color: CC.accentGreen }}>28% cumulative growth</strong>, compared to <strong style={{ color: CC.accentGreen }}>20%</strong> for products without such claims.
            </p>
            <div>
              <div style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', color: CC.accentGreen, lineHeight: 1 }}>1.4×</div>
              <div style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textMuted, marginTop: '8px', letterSpacing: '0.05em' }}>faster growth. Source: McKinsey & Company and NielsenIQ</div>
            </div>
          </div>

          <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '12px', padding: '36px 40px', background: CC.cardDark, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
            <div style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(36px, 5vw, 64px)', color: CC.accentGreen, lineHeight: 1 }}>10,900+</div>
            <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: CC.textLight, margin: 0 }}>
              companies worldwide have either <strong style={{ color: '#fff' }}>validated or committed to near-term and net-zero targets</strong> through the Science Based Targets Initiative (SBTi), as of August 2025.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── SECTION A2 — THE STORY BEHIND THE RECEIPT ───────────────────────────────

function SA2StoryReceipt() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  const cards = [
    'Whenever a customer buys an item from a brand that adopts transparency, they see the Carbon Receipt',
    'Pulls in verified life-cycle data (manufacturing + Use + transport + use + end-of-life)',
    'Shows the carbon footprint right next to the monetary price',
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg2, overflow: 'hidden' }}>
      {/* Full-width grid — left content padded, right image bleeds to edge */}
      <div style={{ ...fadeUp(visible, 0), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'stretch' }}>
        {/* Left: all text content */}
        <div style={{ padding: isMobile ? '64px 32px' : '96px 48px 96px 64px' }}>
          <SectionTag>THE CONCEPT</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(32px, 5vw, 64px)', color: CC.textLight, margin: '0 0 24px 0', lineHeight: 1.1 }}>
            The Story Behind the Receipt
          </h2>
          <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: '18px', color: CC.accentGreen, margin: '0 0 8px 0', lineHeight: 1.5 }}>
            Ever wondered what your shopping bag really carries?
          </p>
          <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: '18px', color: CC.textMuted, margin: '0 0 40px 0', lineHeight: 1.5 }}>
            Every swipe at the checkout leaves a trace.
          </p>

          <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 32px)', color: CC.textLight, margin: '0 0 20px 0', lineHeight: 1.2 }}>
            What is really a Carbon Receipt?
          </h3>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: CC.textLight, margin: '0 0 16px 0' }}>
            A concept of Carbon Receipt is a <strong style={{ color: '#fff' }}>consumer-facing transparency tool</strong> that reveals the environmental cost of a product at checkout, showing the carbon footprint and lifecycle impact alongside the price.
          </p>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: CC.textMuted, margin: '0 0 48px 0' }}>
            It turns something typically <strong style={{ color: CC.textLight }}>hidden in corporate sustainability reports</strong> into a visible, everyday awareness for consumers.
          </p>

          {/* 3 feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {cards.map((c, i) => (
              <div key={i} style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '10px', padding: '20px 24px', background: CC.cardDark }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: CC.accentGreen, marginBottom: '12px' }} />
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.8, color: CC.textLight, margin: 0 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image bleeds to right edge */}
        {!isMobile && (
          <div style={{ position: 'relative', minHeight: '600px' }}>
            <img src="/receipt-hand2-nobg.png" alt="Hand holding phone showing Carbon Receipt" style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 'auto', maxWidth: '130%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── SECTION A3 — MAKING CARBON FOOTPRINT DATA VISIBLE ───────────────────────

function SA3FootprintVisible() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  const annotations = [
    { side: 'right', text: "Product's total carbon footprint in CO₂e." },
    { side: 'right', text: 'Breaks down emissions by lifecycle stages' },
    { side: 'left',  text: 'Includes an offset guide to help visualize environmental impact.' },
    { side: 'right', text: 'Sustainability Mission about the brands you are connecting' },
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag>THE RECEIPT</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.accentGreen, margin: '0 0 16px 0', lineHeight: 1.15 }}>
            Making Carbon Footprint Data Visible
          </h2>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', color: CC.textMuted, margin: 0, lineHeight: 1.7, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            One that tells the untold story of emissions, energy, transport, and material, transparently.
          </p>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), border: `1px solid ${CC.cardBorderDark}`, borderRadius: '12px', padding: isMobile ? '24px' : '48px', background: CC.cardDark }}>
          {!isMobile ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingTop: '80px' }}>
                {annotations.filter(a => a.side === 'left').map((a, i) => (
                  <div key={i} style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: F.mono, fontSize: '11px', color: CC.accentGreen, lineHeight: 1.5, margin: 0 }}>{a.text}</p>
                    <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${CC.accentGreen})`, marginTop: '8px' }} />
                  </div>
                ))}
              </div>
              <img src="/carbon-receipt-mockup.png" alt="Carbon Receipt UI" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.35)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingTop: '40px' }}>
                {annotations.filter(a => a.side === 'right').map((a, i) => (
                  <div key={i}>
                    <div style={{ height: '1px', background: `linear-gradient(to right, ${CC.accentGreen}, transparent)`, marginBottom: '8px' }} />
                    <p style={{ fontFamily: F.mono, fontSize: '11px', color: CC.accentGreen, lineHeight: 1.5, margin: 0 }}>{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <img src="/carbon-receipt-mockup.png" alt="Carbon Receipt UI" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
          )}
        </div>
      </div>
    </section>
  );
}


// ─── SECTION 5 — RESEARCH INSIGHTS ───────────────────────────────────────────

function LogoBox({ src, alt, bg = 'transparent', w = 90, h = 65, pad = '10px', scale = 1 }) {
  return (
    <div style={{ width: `${w}px`, height: `${h}px`, background: bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: pad, overflow: 'hidden', flexShrink: 0 }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', transform: `scale(${scale})`, transformOrigin: 'center' }} />
    </div>
  );
}

function BubbleBox({ claim, sharpCorner = 'bottom-left' }) {
  const r = {
    'bottom-right': '12px 12px 0 12px',
    'bottom-left':  '12px 12px 12px 0',
    'none':         '12px',
  }[sharpCorner] || '12px 12px 12px 0';
  return (
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(107,142,35,0.7)', borderRadius: r, padding: '10px 14px', maxWidth: '200px' }}>
      <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11px', color: CC.textLight, lineHeight: 1.6, margin: 0 }}>{claim}</p>
    </div>
  );
}

function Bubble({ claim, side }) {
  // side='right': bubble stacked above logo → logo is below-left → sharp bottom-left corner
  // side='left':  bubble is left of logo (row-reverse layout) → logo is to the right → sharp top-right corner
  const r = side === 'left' ? '12px 0 12px 12px' : '12px 12px 12px 0';
  return (
    <div style={{ marginBottom: '4px', display: 'flex', justifyContent: side === 'left' ? 'flex-end' : 'flex-start' }}>
      <div style={{ background: '#0a0a0a', border: '1px solid rgba(107,142,35,0.7)', borderRadius: r, padding: '10px 14px', maxWidth: '200px' }}>
        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11px', color: CC.textLight, lineHeight: 1.6, margin: 0 }}>{claim}</p>
      </div>
    </div>
  );
}

function SBrandTargets() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ ...fadeUp(visible, 0), borderLeft: `3px solid ${CC.accentGreen}`, paddingLeft: '28px', marginBottom: '48px', maxWidth: '680px' }}>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(24px, 3.5vw, 44px)', color: CC.textLight, margin: '0 0 28px 0', lineHeight: 1.2 }}>
            How Can Carbon Transparency Become India's Next Retail Advantage?
          </h2>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '15px', color: CC.textMuted, lineHeight: 1.75, margin: '0 0 8px 0' }}>
            A recent article explains that sustainable brands have moved beyond basic environmental initiatives, with many{' '}
            <strong style={{ color: CC.textLight, fontWeight: 600 }}>now setting net-zero targets</strong>{' '}
            (i.e., reducing greenhouse gas emissions to as close to zero as possible)
          </p>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, margin: '0 0 32px 0' }}>(SBTi)</p>
          <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '16px', color: CC.accentGreen, margin: 0, lineHeight: 1.5 }}>
            Evolving language and ambitions in corporate sustainability practice
          </p>
        </div>

        {/* Brand scatter map */}
        <div style={{ ...fadeUp(visible, 0.15), position: 'relative', width: '100%', height: '1080px', marginBottom: '56px' }}>
          {/* Apple — top left */}
          <div style={{ position: 'absolute', top: '40px', left: '14%' }}>
            <Bubble claim="Carbon neutral across supply chain & product life cycle by 2030." side="right" />
            <LogoBox src="/applelogo.png" alt="Apple" bg="transparent" w={60} h={70} pad="0" scale={1.5} />
          </div>
          {/* IKEA — top center */}
          <div style={{ position: 'absolute', top: '80px', left: '42%' }}>
            <Bubble claim="Climate-positive ambition by 2030." side="right" />
            <LogoBox src="/ikealogo.png" alt="IKEA" bg="transparent" w={110} h={70} pad="0" />
          </div>
          {/* Siemens — top right */}
          <div style={{ position: 'absolute', top: '30px', right: '6%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '4px' }}>
            <LogoBox src="/Siemens-logo.svg.png" alt="Siemens" bg="transparent" w={140} h={50} pad="0" />
            <Bubble claim="Net-zero carbon operational assets by 2030." side="left" />
          </div>
          {/* Microsoft — mid left */}
          <div style={{ position: 'absolute', top: '290px', left: '6%' }}>
            <Bubble claim="Carbon negative by 2030; remove historic emissions by 2050." side="right" />
            <LogoBox src="/Microsoft_logo.svg.png" alt="Microsoft" bg="transparent" w={70} h={70} pad="0" />
          </div>
          {/* Burberry — mid center */}
          <div style={{ position: 'absolute', top: '310px', left: '38%' }}>
            <Bubble claim="Climate-positive by 2040, beyond net-zero." side="right" />
            <LogoBox src="/burberrylogo.jpg" alt="Burberry" bg="transparent" w={90} h={90} pad="0" />
          </div>
          {/* Nestlé — mid right */}
          <div style={{ position: 'absolute', top: '280px', right: '4%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '4px' }}>
            <LogoBox src="/nestlelogo.svg" alt="Nestlé" bg="transparent" w={100} h={70} pad="0" />
            <Bubble claim="Net-zero GHG emissions by 2050, 50% reduction by 2030." side="left" />
          </div>
          {/* Logitech — lower left */}
          <div style={{ position: 'absolute', top: '540px', left: '8%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '4px', maxWidth: '210px' }}>
              <BubbleBox claim={'They also state \u201c84% of our products are carbon-labelled\u201d and commit to transparent life-cycle disclosure.'} sharpCorner="none" />
              <BubbleBox claim='To be climate positive (beyond net-zero) through its "Reduce-Renew-Restore" strategy.' sharpCorner="bottom-left" />
            </div>
            <LogoBox src="/logitechlogo.png" alt="Logitech" bg="transparent" w={180} h={70} pad="0" scale={1.8} />
          </div>
          {/* Shell — lower center */}
          <div style={{ position: 'absolute', top: '560px', left: '40%' }}>
            <Bubble claim="Net-zero carbon intensity ambition by 2050; 15–20% reduction by 2030." side="right" />
            <LogoBox src="/Shell_logo.svg.png" alt="Shell" bg="transparent" w={70} h={70} pad="0" />
          </div>
          {/* HP — lower right */}
          <div style={{ position: 'absolute', top: '530px', right: '5%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '4px' }}>
            <LogoBox src="/HP_logo_2012.svg.png" alt="HP" bg="transparent" w={70} h={70} pad="0" />
            <Bubble claim="Net-zero GHG emissions by 2040; circular sourcing by 2030." side="left" />
          </div>
          {/* H&M — bottom left */}
          <div style={{ position: 'absolute', top: '800px', left: '10%' }}>
            <Bubble claim="Achieve net-zero emissions by 2040." side="right" />
            <LogoBox src="/H&M-Logo.svg.png" alt="H&M" bg="transparent" w={110} h={70} pad="0" />
          </div>
          {/* Nike — bottom center */}
          <div style={{ position: 'absolute', top: '810px', left: '41%' }}>
            <Bubble claim="65% emission reduction by 2030 (from 2015) for entire value chain." side="right" />
            <LogoBox src="/nikelogo.png" alt="Nike" bg="transparent" w={120} h={70} pad="0" />
          </div>
          {/* Natura & Co — bottom right */}
          <div style={{ position: 'absolute', top: '800px', right: '5%', display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: '4px' }}>
            <LogoBox src="/naturaandcologo.png" alt="Natura & Co" bg="transparent" w={160} h={70} pad="0" scale={1.8} />
            <Bubble claim="Net-zero carbon emissions by 2030." side="left" />
          </div>
        </div>

        {/* Footer note */}
        <p style={{ ...fadeUp(visible, 0.3), fontFamily: F.sans, fontWeight: 300, fontSize: '15px', color: CC.textMuted, lineHeight: 1.75, maxWidth: '680px', margin: 0 }}>
          A Forbes Council article explains that promoting eco-friendly practices is not just a moral step, but a{' '}
          <strong style={{ color: CC.textLight, fontWeight: 600 }}>brand-loyalty and growth tool</strong>.
        </p>
      </div>
    </section>
  );
}

function S5Research() {
  const [ref, visible] = useFadeIn();
  const stats = [
    { text: '52% of global fashion brands now disclose their first-tier suppliers , up from 32% in 2017.', src: 'Fashion Transparency Index, 2023' },
    { text: '83% of Indian consumers value the environmental impact of packaging, and 60% are willing to pay 13% more for sustainable options.', src: 'Fashion Transparency Index, 2023' },
    { text: 'Regulation is catching up: top 1,000 listed Indian companies are now required to report emissions under SEBI\'s BRSR Core.', src: 'SEBI\'s BRSR Core 2024–25' },
    { text: '79% of consumers globally want more information on product origins and footprint.', src: 'BCG × Vogue Business, 2024' },
  ];
  return (
    <section ref={ref} style={{ background: CC.lightBg, padding: '96px 64px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '48px' }}>
          <SectionTag>DATA & EVIDENCE</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textDark, margin: '0 0 8px 0', lineHeight: 1.15 }}>Research Insights</h2>
          <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: '14px', color: CC.textDarkMuted, margin: '0 0 8px 0' }}>Science-Based Targets Adoption</p>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textDarkMuted, margin: '0 0 48px 0' }}>As of August 2025, over 2,800 companies globally have set net-zero targets, with many in the retail sector.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ ...fadeUp(visible, 0.08 * i), position: 'relative', borderRadius: '10px', overflow: 'hidden', minHeight: '240px', backgroundImage: `url('/research-stat-${i + 1}.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 20px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.7, color: '#fff', margin: 0 }}>{s.text}</p>
                <span style={{ fontFamily: F.mono, fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '12px' }}>({s.src})</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── North Face Case Study ── */}
        <div style={{ ...fadeUp(visible, 0.35), marginBottom: '56px' }}>
          <p style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 'clamp(14px, 1.4vw, 16px)', color: CC.textDarkMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>Case Study</p>
          <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(22px, 3vw, 38px)', color: CC.textDark, margin: '0 0 40px 0', lineHeight: 1.25, maxWidth: '820px' }}>
            Turning sustainability metrics into a language that's Experiential, Emotional, and Visible.
          </h3>
          <div style={{ background: CC.darkBg, borderRadius: '16px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {/* Left: info */}
            <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: F.serif, fontWeight: 700, fontSize: '9px', color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.2 }}>THE<br/>NORTH<br/>FACE</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: F.sans, fontWeight: 600, fontSize: '17px', color: CC.textLight, margin: 0 }}>Sustainability Corner</p>
                    <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textMuted, margin: '2px 0 0 0' }}>In-Store Experience Design</p>
                  </div>
                </div>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', color: CC.textMuted, lineHeight: 1.75, marginBottom: '28px' }}>
                  The North Face launched an in-store sustainability corner that transformed dry environmental metrics into a tactile, immersive shopping experience. Product lifecycle data, material sourcing stories, and carbon impact figures were woven into physical touchpoints throughout the store.
                </p>
              </div>
              <div style={{ borderTop: `1px solid rgba(107,142,35,0.25)`, paddingTop: '24px' }}>
                <p style={{ fontFamily: F.mono, fontSize: '11px', color: CC.accentGreen, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Result</p>
                <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '15px', color: CC.textLight, lineHeight: 1.6, margin: 0 }}>
                  Increased dwell time and repeat visits, with customers citing the sustainability corner as a key reason for returning.
                </p>
              </div>
            </div>
            {/* Right: image collage — 1 wide on top, 2 below */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '4px 4px 4px 0' }}>
              <div style={{ flex: '0 0 55%', overflow: 'hidden', borderRadius: '8px' }}>
                <img src="/northfacesus.webp" alt="The North Face in-store sustainability corner" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                  <img src="/northfacesuscorner.png" alt="Store display unit wireframe" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                  <img src="/northfacesuscorner.webp" alt="Store display unit rendered" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <blockquote style={{ ...fadeUp(visible, 0.4), fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 19px)', color: CC.headingGreen, textAlign: 'center', margin: '0 auto 0', maxWidth: '760px', lineHeight: 1.65, borderLeft: 'none' }}>
          "Research into retail behavior revealed that while consumers increasingly care about sustainability, most impact data remains hidden behind reports and certifications."
        </blockquote>
      </div>
    </section>
  );
}

// ─── SECTION 6 — CARBON FOOTPRINT CONTEXT ────────────────────────────────────


// ─── SECTION 8 — VISION STATEMENT ─────────────────────────────────────────────

function S8Vision() {
  const [ref, visible] = useFadeIn();
  const parts = [
    { text: 'Creating a ', green: false },
    { text: 'Retail Landscape', green: true },
    { text: ' of tomorrow. Where ', green: false },
    { text: 'Data', green: true },
    { text: ' becomes ', green: false },
    { text: 'Dialogue', green: true },
    { text: ' between ', green: false },
    { text: 'Brand', green: true },
    { text: ' and ', green: false },
    { text: 'Buyer.', green: true },
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px', borderTop: `1px solid rgba(107,142,35,0.12)` }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ ...fadeUp(visible, 0), marginBottom: '40px' }}>
          <SectionTag>VISION</SectionTag>
        </div>
        <p style={{ ...fadeUp(visible, 0.1), fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1.3, margin: 0 }}>
          {parts.map((p, i) => (
            <span key={i} style={{ color: p.green ? CC.accentGreen : 'rgba(237,234,227,0.6)' }}>{p.text}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 12 — EXPERIENTIAL RETAIL STATS ──────────────────────────────────

function S12Experiential() {
  const [ref, visible] = useFadeIn();
  const stats = [
    'A RetailTech Innovation Hub article notes that the rise of experiential retail is driven by consumer behaviour: customers today expect immersive in-store experiences, and brands are shifting accordingly.',
    'The 2025 Deloitte retail industry outlook found that **80% of retail executives expect consumers to prefer spending on experiences over goods.**',
    'According to the \'State of Experiential Marketing 2024\' report, **82% of retail companies have increased their experiential marketing budgets** over the past three years.',
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), marginBottom: '48px' }}>
          <SectionTag>EXPERIENTIAL RETAIL</SectionTag>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ ...fadeUp(visible, 0.08 * i), border: `1px solid ${CC.cardBorderDark}`, borderRadius: '10px', padding: '28px 24px', background: CC.cardDark }}>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.85, color: CC.textLight, margin: 0 }}>
                {s.split('**').map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#fff' }}>{p}</strong> : p)}
              </p>
            </div>
          ))}
        </div>

        <div style={{ ...fadeUp(visible, 0.3), textAlign: 'center' }}>
          <blockquote style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(16px, 2.2vw, 22px)', color: CC.accentGreen, margin: '0 auto 24px', maxWidth: '680px', lineHeight: 1.6, borderLeft: 'none' }}>
            "Making sustainability felt, bringing unseen reports to life."
          </blockquote>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', color: CC.textMuted, lineHeight: 1.75 }}>
            This shift positions Indian retail to lead the global transition toward responsible, data-driven consumption.<br />
            <span style={{ color: CC.accentGreen }}>It is evolving into a visible, experiential layer of retail…</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 13 — TURNING METRICS ────────────────────────────────────────────

function S13Metrics() {
  const [ref, visible] = useFadeIn();
  const parts = [
    { text: "Turning sustainability metrics into a language that\u2019s ", green: false },
    { text: 'Experiential,', green: true },
    { text: ' ', green: false },
    { text: 'Emotional,', green: true },
    { text: ' and ', green: false },
    { text: 'Visible.', green: true },
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg2, padding: '96px 64px', borderTop: `1px solid rgba(107,142,35,0.1)`, borderBottom: `1px solid rgba(107,142,35,0.1)` }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ ...fadeUp(visible, 0), marginBottom: '32px' }}>
          <SectionTag>DESIGN GOAL</SectionTag>
        </div>
        <p style={{ ...fadeUp(visible, 0.1), fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(22px, 3.5vw, 46px)', lineHeight: 1.35, margin: 0 }}>
          {parts.map((p, i) => (
            <span key={i} style={{ color: p.green ? CC.accentGreen : 'rgba(237,234,227,0.55)' }}>{p.text}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 15 — YOUTUBE ─────────────────────────────────────────────────────

function S15YouTube() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), marginBottom: '32px', textAlign: 'center' }}>
          <SectionTag>PROJECT FILM</SectionTag>
        </div>
        <div style={{ ...fadeUp(visible, 0.1), position: 'relative', paddingTop: '56.25%', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${CC.cardBorderDark}` }}>
          <iframe
            src="https://www.youtube.com/embed/GMYOH06U3Q8"
            title="Carbon Receipt Project Film"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 16 — CARBON COUNTS INSTALLATION ─────────────────────────────────

function S16Installation() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg2, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), marginBottom: '48px' }}>
          <SectionTag>THE INSTALLATION</SectionTag>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            <div style={{ width: '3px', height: '52px', background: CC.accentGreen, marginTop: '4px', flexShrink: 0 }} />
            <div>
              <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4.5vw, 56px)', color: CC.accentGreen, margin: '0 0 16px 0', lineHeight: 1.1 }}>Carbon Counts</h2>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '15px', lineHeight: 1.85, color: CC.textLight, margin: 0, maxWidth: '600px' }}>
                This installation is an attempt to transform carbon data into an{' '}
                <strong style={{ color: '#fff' }}>in-store interactive experience.</strong>
              </p>
            </div>
          </div>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), display: 'grid', gridTemplateColumns: '180px 1fr 180px', gap: '32px', alignItems: 'center' }}>
          {/* Left annotations */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: '60px', paddingBottom: '60px', gap: '48px' }}>
            {[
              { title: 'Infographics:', body: 'Explain the issue of carbon transparency.' },
              { title: 'Feedback:', body: 'Captures user reflections and responses.' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '13px', color: CC.textLight, margin: '0 0 4px 0' }}>{a.title}</p>
                  <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textMuted, lineHeight: 1.6, margin: 0 }}>{a.body}</p>
                </div>
                <div style={{ width: '32px', height: '1px', background: CC.accentGreen, marginTop: '8px', flexShrink: 0 }} />
              </div>
            ))}
          </div>
          {/* Center: plain photo */}
          <img src="/installationcc.png" alt="Carbon Counts installation — Infinity Forest, kiosk, infographics and scan area" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
          {/* Right annotations */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingTop: '40px', paddingBottom: '60px', gap: '36px' }}>
            {[
              { title: 'Infinity Forest:', body: 'Lights up to visualize product impact.' },
              { title: 'Kiosk:', body: 'Displays the carbon receipt on scan.' },
              { title: 'Scan Area:', body: 'Designed for users to scan products clearly.' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '32px', height: '1px', background: CC.accentGreen, marginTop: '8px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '13px', color: CC.textLight, margin: '0 0 4px 0' }}>{a.title}</p>
                  <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textMuted, lineHeight: 1.6, margin: 0 }}>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 17 — STAKEHOLDER MAP ────────────────────────────────────────────

function S17Stakeholder() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  const points = [
    'The project created a meaningful link between brands, consumers, retailers, and the planet.',
    'For brands, it enhanced credibility by turning sustainability data into an engaging, transparent experience.',
    'Consumers gained awareness of their choices and their direct environmental impact.',
    'Retailers benefited from offering an innovative, responsible in-store interaction that aligned with growing eco-conscious values.',
    'Ultimately, the planet stood at the core of this ecosystem, as every informed action and transparent exchange contributed to collective environmental responsibility.',
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '48px' }}>
          <SectionTag>ECOSYSTEM</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: '0 0 24px 0', lineHeight: 1.15 }}>Stakeholder Map</h2>
          <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 20px)', color: CC.textMuted, maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
            This project anticipates the retail landscape of tomorrow, where data becomes{' '}
            <em style={{ color: CC.accentGreen }}>dialogue</em> between brand and buyer.
          </p>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <img src="/stakeholder-map.png" alt="Stakeholder Map" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {points.map((p, i) => (
              <li key={i} style={{ ...fadeUp(visible, 0.1 + i * 0.06), display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: CC.accentGreen, marginTop: '7px', flexShrink: 0 }} />
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.8, color: CC.textMuted, margin: 0 }}>{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}

// ─── SECTION 18 — DATA FLOW DIAGRAM ──────────────────────────────────────────

function FlowRow({ number, stage, step1, step2, isLast = false, splitOutput = false }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '36px 120px 1fr auto 1fr', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(107,142,35,0.15)', border: `1px solid ${CC.accentGreen}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: '12px', color: CC.accentGreen, flexShrink: 0 }}>{number}</div>
      <div style={{ background: CC.accentGreen, borderRadius: '20px', padding: '6px 14px', textAlign: 'center' }}>
        <span style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{stage}</span>
      </div>
      <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '8px', padding: '12px 16px', background: CC.cardDark }}>
        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textLight, margin: 0, lineHeight: 1.5 }}>{step1}</p>
      </div>
      <div style={{ color: CC.accentGreen, fontSize: '18px', padding: '0 4px' }}>→</div>
      {!splitOutput ? (
        <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '8px', padding: '12px 16px', background: CC.cardDark }}>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textLight, margin: 0, lineHeight: 1.5 }}>{step2}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '8px', padding: '10px 16px', background: CC.cardDark, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: F.sans, fontSize: '10px', color: CC.accentGreen, fontWeight: 600 }}>Physical</span>
            <span style={{ color: CC.accentGreen, fontSize: '12px' }}>→</span>
            <span style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textLight }}>LED tree lights up</span>
          </div>
          <div style={{ border: `1px solid ${CC.cardBorderDark}`, borderRadius: '8px', padding: '10px 16px', background: CC.cardDark, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: F.sans, fontSize: '10px', color: CC.accentGreen, fontWeight: 600 }}>Digital</span>
            <span style={{ color: CC.accentGreen, fontSize: '12px' }}>→</span>
            <span style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textLight }}>Carbon receipt generated.</span>
          </div>
        </div>
      )}
    </div>
  );
}

function S18DataFlow() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg2, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag>SYSTEM DESIGN</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: 0, lineHeight: 1.15 }}>
            How data flows through the system
          </h2>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), overflowX: 'auto' }}>
          <div style={{ minWidth: '640px' }}>
            <FlowRow number="1" stage="Input Stage"       step1="Shopper scans product"            step2="via Teachable Machine vision" />
            <FlowRow number="2" stage="Recognition Stage" step1="Product ID sent to the database." step2="Database checks" />
            <FlowRow number="3" stage="Processing Stage"  step1="System classifies product"        step2="Matches classification to LED response." />
            <FlowRow number="4" stage="Output Stage"      step1="Output triggered"                 step2="" splitOutput />
          </div>
        </div>
      </div>

    </section>
  );
}

// ─── SECTION 19 — USER JOURNEY MAP ───────────────────────────────────────────

const UJM_DATA = {
  headers: ['', 'Approach', 'Observe', 'Scan', 'Feedback', 'Receipt'],
  touchpoint: ['Touchpoint', 'LED forest installation', 'Kiosk + signifiers', 'Kiosk scanner / camera', 'LED forest response', 'NFC / QR on kiosk'],
  actions:    ['Actions', 'Shopper notices glowing sculpture', 'Shopper reads prompt / instructions', 'Shopper places product, system identifies', 'Shopper sees section light up (or not)', 'Shopper taps to receive digital receipt'],
  emotions:   ['Emotions', 'Curious, intrigued', 'Interested, guided', 'Engaged, anticipatory', 'Rewarded & proud (light!) / Curious (no light)', 'Informed, reflective'],
  pain:       ['Pain Points', 'May not realize it\'s interactive', 'Instructions could be missed or unclear', 'Mis-scans, delay, or error in recognition', 'No response could feel negative / judgmental', 'Some may skip QR/NFC if feels extra effort'],
  opps:       ['Opportunities', 'Use ambient motion/light + signage to attract', 'Clear CTA: "Place product here to see impact"', 'Combine barcode + AI vision for reliability', 'Frame no-light as "high impact → room for improvement"', 'Auto-trigger receipt, offer instant preview on screen'],
};

function S19UserJourney() {
  const [ref, visible] = useFadeIn();
  const rowStyles = {
    touchpoint: { bg: 'rgba(107,142,35,0.08)', label: CC.accentGreen },
    actions:    { bg: 'rgba(107,142,35,0.05)', label: 'rgba(107,142,35,0.8)' },
    emotions:   { bg: 'rgba(107,142,35,0.1)',  label: CC.accentGreen },
    pain:       { bg: 'rgba(180,120,60,0.08)', label: '#C8834A' },
    opps:       { bg: 'rgba(107,142,35,0.1)',  label: CC.accentGreen },
  };
  const rows = ['touchpoint', 'actions', 'emotions', 'pain', 'opps'];

  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '48px' }}>
          <SectionTag>USER RESEARCH</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: '0 0 16px 0', lineHeight: 1.15 }}>User Journey Map</h2>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', color: CC.textMuted, lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 48px' }}>
            We mapped the shopper's journey through The Carbon Receipt, capturing key touchpoints, actions, emotions, pain points, and opportunities at each stage.
          </p>
        </div>

        <div style={{ ...fadeUp(visible, 0.1), overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', border: `1px solid ${CC.cardBorderDark}` }}>
            {/* Header row — Stage */}
            <thead>
              <tr>
                <th style={{ width: '120px', padding: '14px 16px', background: CC.darkBg2, border: `1px solid ${CC.cardBorderDark}` }} />
                {['1 Approach', '2 Observe', '3 Scan', '4 Feedback', '5 Receipt'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', background: CC.darkBg2, border: `1px solid ${CC.cardBorderDark}`, fontFamily: F.sans, fontSize: '11px', fontWeight: 600, color: CC.accentGreen, letterSpacing: '0.06em', textAlign: 'center' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((rowKey, ri) => {
                const cells = UJM_DATA[rowKey];
                const st = rowStyles[rowKey];
                return (
                  <tr key={rowKey}>
                    <td style={{ padding: '16px', border: `1px solid ${CC.cardBorderDark}`, background: CC.darkBg2, verticalAlign: 'middle' }}>
                      <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: st.label, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
                        {cells[0]}
                      </span>
                    </td>
                    {cells.slice(1).map((cell, ci) => (
                      <td key={ci} style={{ padding: '16px', border: `1px solid ${CC.cardBorderDark}`, background: st.bg, verticalAlign: 'top' }}>
                        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textLight, lineHeight: 1.65, margin: 0 }}>{cell}</p>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p style={{ ...fadeUp(visible, 0.3), fontFamily: F.serif, fontStyle: 'italic', fontSize: '15px', color: CC.textMuted, textAlign: 'center', marginTop: '48px', lineHeight: 1.6 }}>
          Once the plan was set, the idea moved from paper to space through hands-on execution.
        </p>
      </div>

    </section>
  );
}

// ─── SECTION 20 — TECHNOLOGY STACK ───────────────────────────────────────────

function S20TechStack() {
  const [ref, visible] = useFadeIn();
  const techImgMap = {
    'Power Cables':         'power-cables.png',
    'ESP 32 Board':         'esp-32-board.png',
    'Neo Pixel LED Strip':  'neo-pixel-led-strip.png',
    'Web Cam':              'web-cam.png',
    'Teachable Machine':    'teachable-machine.png',
    'Arduino':              'arduino.png',
    'P5.JS':                'P5.JSsoftware.jpg',
    'MDF Board':            'mdf-board.png',
    'Chart Sheet':          'chart-sheet.png',
    'Soldering Kit':        'soldering-kit.png',
  };
  const hardware = ['Power Cables', 'ESP 32 Board', 'Neo Pixel LED Strip', 'Web Cam'];
  const software = ['Teachable Machine', 'Arduino', 'P5.JS'];
  const materials = ['MDF Board', 'Chart Sheet', 'Soldering Kit'];

  return (
    <section ref={ref} style={{ background: CC.lightBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '64px' }}>
          <SectionTag>TOOLS & MATERIALS</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.headingGreen, margin: 0, lineHeight: 1.15 }}>
            Technology Stack
          </h2>
        </div>

        {[
          { label: 'Hardware', items: hardware },
          { label: 'Software', items: software },
          { label: 'Other Materials and Tools', items: materials },
        ].map((group, gi) => (
          <div key={group.label} style={{ ...fadeUp(visible, 0.08 * gi), marginBottom: '56px' }}>
            <h3 style={{ fontFamily: F.sans, fontWeight: 500, fontSize: '13px', letterSpacing: '0.1em', color: CC.headingGreen, textAlign: 'center', textTransform: 'uppercase', margin: '0 0 24px 0' }}>{group.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: '16px', alignItems: 'end' }}>
              {group.items.map(item => (
                <div key={item} style={{ border: `1px solid ${CC.cardBorderLight}`, borderRadius: '10px', overflow: 'hidden', background: '#fff', textAlign: 'center' }}>
                  <img src={`/${techImgMap[item]}`} alt={item} style={{ width: '100%', height: '220px', display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ fontFamily: F.sans, fontSize: '12px', color: CC.textDark, padding: '10px 12px', fontWeight: 400 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION 21 — SETUP ──────────────────────────────────────────────────────

function S21Setup() {
  const [ref, visible] = useFadeIn();
  const steps = [
    { num: '1', label: 'Pick a Product',  img: 'step1-pick-product.png' },
    { num: '2', label: 'Scan the Product', img: 'step2-scan-product.png' },
    { num: '3', label: 'Carbon Receipt',   img: 'step3-carbon-receipt.png' },
    { num: '4', label: 'Forest glows',     img: 'step4-forest-glows.png' },
  ];
  return (
    <section ref={ref} style={{ background: CC.lightBg2, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '48px' }}>
          <SectionTag>SPATIAL DESIGN</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.headingGreen, margin: 0, lineHeight: 1.15 }}>Setup</h2>
        </div>

        {/* ── Infinity Forest Installation ── */}
        <div style={{ ...fadeUp(visible, 0.1), marginBottom: '80px' }}>
          <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(22px, 3vw, 38px)', color: CC.headingGreen, textAlign: 'center', margin: '0 0 56px 0' }}>Infinity Forest Installation</h3>

          {/* Cutouts + layered panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start', marginBottom: '80px' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#e8f0e0', color: CC.headingGreen, fontFamily: F.sans, fontSize: '12px', fontWeight: 500, padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>Cutouts</span>
              <img src="/cutouts.png" alt="Cutout diagrams" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ marginTop: '24px' }}>
                <span style={{ display: 'inline-block', background: '#e8f0e0', color: CC.headingGreen, fontFamily: F.sans, fontSize: '12px', fontWeight: 500, padding: '4px 14px', borderRadius: '20px', marginBottom: '12px' }}>Joinery</span>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textDark, lineHeight: 1.8, margin: 0 }}>
                  The four planes were placed parallel to each other on a central stand constructed using <strong style={{ fontStyle: 'italic' }}>cross-halving joinery</strong>, allowing the structure to securely hold and align all planes in place.
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textDark, lineHeight: 1.8, marginBottom: '20px' }}>
                Progressively <strong style={{ fontStyle: 'italic' }}>decreasing in size</strong> to create an illusion of infinity
              </p>
              <img src="/layered-panels.png" alt="Layered panels illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

          {/* Phygital Display Setup */}
          <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(22px, 3vw, 36px)', color: CC.textDark, textAlign: 'center', margin: '0 0 48px 0' }}>Phygital Display Setup</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11.5px', fontStyle: 'italic', color: CC.textDarkMuted, lineHeight: 1.75, margin: 0 }}>
                The phygital installation features layered planes with embedded NeoPixel lights and organic foliage that progressively create a sense of depth and infinity, symbolizing nature's growth and digital interaction.
              </p>
              {[
                { title: 'NeoPixel Lighting', body: 'Each layer is embedded with NeoPixels that light up sequentially, representing carbon data and environmental response.' },
                { title: 'Cross-Halving Structure', body: 'The planes are mounted on a cross-halving stand, providing structural balance and alignment.' },
              ].map((a, i) => (
                <div key={i}>
                  <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '12px', color: CC.textDark, margin: '0 0 5px 0' }}>{a.title}</p>
                  <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11.5px', color: CC.textDarkMuted, lineHeight: 1.7, margin: 0 }}>{a.body}</p>
                </div>
              ))}
            </div>
            <img src="/phygital-setup.png" alt="Phygital Display Setup" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { title: 'Layered Planes', body: 'Four parallel planes progressively decrease in size, creating a sense of visual depth and infinity.' },
                { title: 'Organic Form', body: 'The circular opening and layered greenery create an organic, forest-like shape symbolising nature\'s continuity.' },
                { title: 'Growing Leaves', body: 'Leaves extending outward blur the boundary between the physical and digital, symbolising growth beyond limits.' },
              ].map((a, i) => (
                <div key={i}>
                  <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '12px', color: CC.textDark, margin: '0 0 5px 0' }}>{a.title}</p>
                  <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11.5px', color: CC.textDarkMuted, lineHeight: 1.7, margin: 0 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontFamily: F.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(15px, 2vw, 20px)', color: CC.headingGreen, textAlign: 'center', margin: 0, lineHeight: 1.65 }}>
            We assembled the installation through hands-on experimentation,<br />uniting craft, light, and technology into a cohesive experience.
          </p>
        </div>

        {/* User flow steps */}
        <div style={{ ...fadeUp(visible, 0.2), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'start', marginBottom: '48px' }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <img src={`/${s.img}`} alt={s.label} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '16px 0 12px' }}>
                {i > 0 && <div style={{ position: 'absolute', left: 0, right: '50%', height: '1px', background: `repeating-linear-gradient(to right, ${CC.headingGreen} 0, ${CC.headingGreen} 4px, transparent 4px, transparent 8px)` }} />}
                {i < 3 && <div style={{ position: 'absolute', left: '50%', right: 0, height: '1px', background: `repeating-linear-gradient(to right, ${CC.headingGreen} 0, ${CC.headingGreen} 4px, transparent 4px, transparent 8px)` }} />}
                <div style={{ position: 'relative', zIndex: 1, width: 28, height: 28, borderRadius: '50%', background: CC.headingGreen, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>{s.num}</div>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: '12px', color: CC.textDark, textAlign: 'center', fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <blockquote style={{ ...fadeUp(visible, 0.3), fontFamily: F.serif, fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 19px)', color: CC.headingGreen, textAlign: 'center', margin: '0', lineHeight: 1.65, borderLeft: 'none' }}>
          "The journey from right to left mirrored the shift from awareness to action, from seeing impact to feeling it."
        </blockquote>
      </div>
    </section>
  );
}


// ─── SECTION 22 — HOW IT WAS BUILT ───────────────────────────────────────────

function BuildStep({ title, body, children, delay, visible, isLast = false }) {
  return (
    <div style={{ ...fadeUp(visible, delay), display: 'grid', gridTemplateColumns: '28px 1fr', gap: '24px', marginBottom: isLast ? 0 : '56px', paddingBottom: isLast ? 0 : '56px', borderBottom: isLast ? 'none' : `1px solid rgba(107,142,35,0.12)` }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: CC.accentGreen, flexShrink: 0 }} />
        <div style={{ width: 1, flex: 1, marginTop: 8, background: `repeating-linear-gradient(to bottom, ${CC.accentGreen} 0, ${CC.accentGreen} 4px, transparent 4px, transparent 8px)` }} />
      </div>
      <div>
        <h3 style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '15px', color: CC.textLight, margin: '0 0 14px 0', letterSpacing: '0.02em' }}>{title}</h3>
        <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.85, color: CC.textMuted, margin: '0 0 24px 0' }}>{body}</p>
        {children}
      </div>
    </div>
  );
}

function S22HowBuilt() {
  const [ref, visible] = useFadeIn();
  const isMobile = useIsMobile();
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '72px' }}>
          <SectionTag>MAKING OF</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: 0, lineHeight: 1.15 }}>
            How it was built
          </h2>
        </div>

        <BuildStep visible={visible} delay={0.05} title="Data Collection and Structuring"
          body="We created a structured carbon footprint database that maps each product or product category to its average CO₂ emission value. The dataset was built by compiling information from verified Life Cycle Assessment (LCA) sources, brand sustainability reports.">
          {/* Data sources diagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '32px', marginBottom: '8px' }}>
            {/* Left: source pills with connector lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', flexShrink: 0 }}>
              {[
                "Brands Sustainability Reports",
                "Verified Life Cycle Assessment (LCA) sources",
              ].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    background: 'rgba(107,142,35,0.10)',
                    border: `1.5px solid ${CC.accentGreen}`,
                    borderRadius: '999px',
                    padding: '10px 22px',
                    fontFamily: F.mono,
                    fontSize: '11px',
                    color: CC.accentGreen,
                    whiteSpace: 'nowrap',
                  }}>{label}</div>
                  {/* connector line */}
                  <div style={{ width: '40px', height: '1.5px', background: CC.accentGreen, flexShrink: 0 }} />
                </div>
              ))}
            </div>

            {/* Right: dark card — Carbon Radar top, NRF + arXiv bottom row */}
            <div style={{
              background: '#161c16',
              border: `1.5px solid rgba(107,142,35,0.28)`,
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexShrink: 0,
              minWidth: '220px',
            }}>
              {/* Carbon Radar — top full row */}
              <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '36px' }}>
                <img src="/carbonradarlogo.png" alt="Carbon Radar" style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
              {/* NRF + arXiv — bottom row */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '36px' }}>
                  <img src="/nrf-logo.svg" alt="NRF National Retail Federation" style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>
                <div style={{ background: '#b31b1b', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '36px' }}>
                  <img src="/arxiv.png" alt="arXiv" style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </BuildStep>

        <BuildStep visible={visible} delay={0.1} title="Database Creation"
          body="Compiled and normalised the collected data to create a structured carbon footprint database, mapping each product or category to its average CO₂ emission value through a local JSON structure for instant retrieval." />

        <BuildStep visible={visible} delay={0.15} title="User Interface Design"
          body="Designed a clear, intuitive interface using p5.js to visualize carbon data in real time, ensuring seamless connection between the system and the user.">
          <img src="/ui.png" alt="Carbon Receipt UI screen showing multiple product carbon footprints" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', marginBottom: '16px' }} />
          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
              {["Product's total carbon footprint in CO₂e.", "Breaks down emissions by lifecycle stages", "Includes an offset guide to help visualize environmental impact."].map((a, i) => (
                <span key={i} style={{ fontFamily: F.mono, fontSize: '10px', color: CC.accentGreen, textAlign: 'center', maxWidth: '200px' }}>{a}</span>
              ))}
            </div>
          )}
        </BuildStep>

        <BuildStep visible={visible} delay={0.2} title="Machine Learning Model"
          body="Trained a Teachable Machine model with multiple product images to recognize categories and link them to corresponding carbon data for live identification.">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
            <img src="/code-screenshot.png" alt="JavaScript product recognition code with NeoPixel LED control" style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: '8px' }} />
            <div style={{ height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src="/machinelearning2.png" alt="Scan area and carbon receipt kiosk during installation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            </div>
          </div>
          <p style={{ fontFamily: F.mono, fontSize: '11px', color: CC.textMuted, lineHeight: 1.6, margin: '0 0 20px 0' }}>
            We used Teachable Machine to recognize products and programmed NeoPixels to create responsive lighting interactions based on the identified items.
          </p>
          {/* Tech stack tags — horizontal */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { label: 'p5.js', color: '#e8185d' },
              { label: 'HTML', color: CC.textLight },
              { label: 'CSS',  color: CC.textLight },
            ].map((t) => (
              <span key={t.label} style={{
                border: `1px solid ${CC.accentGreen}`,
                borderRadius: '999px',
                padding: '4px 14px',
                background: 'transparent',
                fontFamily: F.mono,
                fontSize: '11px',
                fontWeight: 600,
                color: t.color,
              }}>{t.label}</span>
            ))}
          </div>
        </BuildStep>

        <BuildStep visible={visible} delay={0.25} title="System Integration"
          body="Connected the database, recognition model, and NeoPixel feedback so that every identified product instantly triggers a visual light response and generates a real-time digital carbon receipt.">
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '8px', height: '340px', overflow: 'hidden', borderRadius: '10px' }}>
            {/* Left: wide landscape image */}
            <div style={{ overflow: 'hidden', height: '340px' }}>
              <img src="/systemintegration.png" alt="NeoPixel LED panels wired up on table" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 70%', display: 'block' }} />
            </div>
            {/* Right: two portrait images stacked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '340px' }}>
              <div style={{ overflow: 'hidden', borderRadius: '10px', height: '166px' }}>
                <img src="/integration1.png" alt="Lit green Infinity Forest panel close-up" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '10px', height: '166px' }}>
                <img src="/integration2.png" alt="Infinity Forest panel with paper flora decoration" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            </div>
          </div>
        </BuildStep>

        <BuildStep visible={visible} delay={0.3} isLast title="Phygital Installation"
          body="Built with four layered planes decreasing in size to create an illusion of infinity, the installation used NeoPixel lights and cross-halving joinery for structure, blending digital light with organic elements.">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', height: '300px', display: 'flex', alignItems: 'center' }}>
              <img src="/setup.png" alt="MDF planes layout diagram for Infinity Forest" style={{ width: '85%', height: 'auto', display: 'block', margin: '0 auto' }} />
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '300px' }}>
              <img src="/installationcc.png" alt="Completed Infinity Forest installation with NeoPixel LEDs glowing" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </BuildStep>
      </div>
    </section>
  );
}

// ─── SECTION 23 — INTERACTION FLOW ───────────────────────────────────────────

function InteractionStep({ num, heading, body, imgLabel, imgRight, visible, delay }) {
  const isMobile = useIsMobile();
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(107,142,35,0.15)', border: `2px solid ${CC.accentGreen}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.mono, fontSize: '16px', color: CC.accentGreen, marginBottom: '20px' }}>{num}</div>
      <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(18px, 2.5vw, 28px)', color: CC.textLight, margin: '0 0 16px 0' }}>{heading}</h3>
      <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: CC.textMuted, margin: 0 }}>{body}</p>
    </div>
  );
  const src = '/' + imgLabel.split(' — ')[0];
  const image = <img src={src} alt={heading} style={{ width: '100%', height: '360px', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '12px' }} />;

  return (
    <div style={{ ...fadeUp(visible, delay), display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '80px' }}>
      {(imgRight || isMobile) ? <>{content}{image}</> : <>{image}{content}</>}
    </div>
  );
}

function S23InteractionFlow() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg2, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '72px' }}>
          <SectionTag>INTERACTION DESIGN</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.accentGreen, margin: 0, lineHeight: 1.15 }}>
            Interaction flow
          </h2>
        </div>

        <InteractionStep num="1" heading="User Selects a Product" body="The visitor picks a retail item and places it on the kiosk." imgLabel="interaction-step1.png — photo of visitor picking a product from the Products display area and approaching the kiosk" imgRight visible={visible} delay={0.05} />
        <InteractionStep num="2" heading="Scanning and Carbon Receipt" body="The user places the product on the kiosk, where the camera scans and identifies it. The screen displays a carbon receipt showing the product's footprint, equivalent impact, and brand sustainability details, while the Infinity Forest lights up in response." imgLabel="interaction-step2.png — photo of person placing product on kiosk scanner area while the screen shows the Carbon Receipt and the LED forest glows green" imgRight={false} visible={visible} delay={0.1} />
        <InteractionStep num="3" heading="Completion & Reflection" body="The user leaves with a sense of contribution, understanding that informed choices add light to a shared system of awareness and accountability." imgLabel="interaction-step3.png — photo of visitor stepping back from the installation, LED forest lit up, reflecting on the experience" imgRight visible={visible} delay={0.15} />
      </div>
    </section>
  );
}

// ─── FOREST BG SECTION ────────────────────────────────────────────────────────

function SForestBg() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{
      width: '100%',
      background: `linear-gradient(180deg, #0A0F0A 0%, #131A13 100%)`,
      padding: '80px 64px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>
        {/* LEFT: text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

          {/* heading block */}
          <div style={{ ...fadeUp(visible, 0) }}>
            <SectionTag>WHY FOREST</SectionTag>
            <h2 style={{
              fontFamily: F.serif,
              fontWeight: 300,
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: CC.textLight,
              margin: '0 0 24px 0',
              lineHeight: 1.1,
            }}>
              Why Forest?
            </h2>
            <p style={{
              fontFamily: F.sans,
              fontWeight: 300,
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              color: CC.textMuted,
              lineHeight: 1.8,
              margin: 0,
            }}>
              Forests are the planet's{' '}
              <span style={{ color: CC.accentGreen }}>largest natural carbon sinks</span>,
              absorbing nearly{' '}
              <span style={{ color: CC.accentGreen }}>2.6 billion tonnes of CO₂ every year</span>.
            </p>
            <p style={{
              fontFamily: F.sans,
              fontWeight: 300,
              fontSize: '11px',
              color: 'rgba(237,234,227,0.3)',
              marginTop: '8px',
              letterSpacing: '0.04em',
            }}>(FAO, 2023)</p>
          </div>

          {/* bullet 1 */}
          <div style={{ ...fadeUp(visible, 0.12) }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CC.dotGreen, flexShrink: 0, marginTop: '7px' }} />
              <p style={{
                fontFamily: F.sans,
                fontWeight: 300,
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: CC.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}>
                Every product, every purchase, and every emission{' '}
                <span style={{ color: CC.accentGreen }}>connects directly or indirectly to the capacity of forests to absorb carbon.</span>
              </p>
            </div>
          </div>

          {/* bullet 2 */}
          <div style={{ ...fadeUp(visible, 0.2) }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CC.dotGreen, flexShrink: 0, marginTop: '7px' }} />
              <p style={{
                fontFamily: F.sans,
                fontWeight: 300,
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: CC.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}>
                By using a{' '}
                <span style={{ color: CC.accentGreen }}>reactive forest</span>,
                the installation{' '}
                <span style={{ color: CC.accentGreen }}>mirrors this exact ecological relationship</span>{' '}
                — when carbon output rises, the forest dims; when the impact is low, the forest glows brighter.
              </p>
            </div>
          </div>

          {/* bullet 3 */}
          <div style={{ ...fadeUp(visible, 0.28) }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CC.dotGreen, flexShrink: 0, marginTop: '7px' }} />
              <p style={{
                fontFamily: F.sans,
                fontWeight: 300,
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: CC.textMuted,
                lineHeight: 1.8,
                margin: 0,
              }}>
                With the{' '}
                <span style={{ color: CC.accentGreen }}>rise of Business Responsibility & Sustainability Reporting</span>{' '}
                (India), and new carbon disclosure frameworks,{' '}
                <span style={{ color: CC.accentGreen }}>brands are being asked to measure, verify, and share their environmental data.</span>
              </p>
            </div>
          </div>

          {/* closing quote */}
          <div style={{ ...fadeUp(visible, 0.36) }}>
            <p style={{
              fontFamily: F.serif,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              color: 'rgba(237,234,227,0.4)',
              lineHeight: 1.85,
              margin: 0,
            }}>
              Sometimes, it goes beyond practice or experience — it becomes a genuine intent to care for the circularity and sustainability of ecosystems.
            </p>
          </div>
        </div>

        {/* RIGHT: forest image */}
        <div style={{ ...fadeUp(visible, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/bgforwhyforrest.png"
            alt="Infinity Forest — reactive LED forest installation"
            style={{ width: '100%', maxWidth: '560px', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 24 — REAL-LIFE IMPLEMENTATION ───────────────────────────────────

function S24Implementation() {
  const [ref, visible] = useFadeIn();
  const cards = [
    { title: 'Transparency Builds Trust',             stat: '94%', statDesc: 'of consumers stay loyal to transparent brands.', body: 'Expand the carbon database to SKU-level accuracy through verified APIs for real-time updates.', source: 'Paco-Smart, 2024' },
    { title: 'Sustainability Drives Purchase Decisions', stat: '60%', statDesc: 'of consumers are willing to pay more for sustainable products.', body: 'Adopt cloud-based integration so brands can update and sync sustainability data across platforms.', source: 'McKinsey, 2024' },
    { title: 'Digital Checkout as an Awareness Moment', stat: '', statDesc: 'UPI and wallet payments are now daily digital rituals in India.', body: 'Deliver digital carbon receipts through UPI apps, wallets, or WhatsApp.', source: 'Zenodo, 2025' },
    { title: 'Transparency as a Competitive Advantage', stat: '78%', statDesc: 'of customers prefer brands open about their environmental impact.', body: 'Build brand dashboards and align with BRSR Core and carbon credit frameworks, scaling the system into plug-and-play POS modules for retail deployment.', source: 'The Brand Hopper, 2025' },
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '56px' }}>
          <SectionTag>LOOKING AHEAD</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: 0, lineHeight: 1.15 }}>
            Real-Life Implementation & Future Development
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {cards.map((c, i) => (
            <div key={c.title} style={{ ...fadeUp(visible, 0.08 * i), border: `1px solid ${CC.cardBorderDark}`, borderRadius: '12px', padding: '28px 24px', background: CC.cardDark, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontFamily: F.sans, fontWeight: 600, fontSize: '13px', color: CC.textLight, margin: 0, letterSpacing: '0.02em' }}>{c.title}</h3>
              {c.stat && <div style={{ fontFamily: F.serif, fontSize: '36px', fontWeight: 700, color: CC.accentGreen, lineHeight: 1 }}>{c.stat}</div>}
              <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '13px', color: CC.textLight, margin: 0, lineHeight: 1.6 }}><strong>{c.statDesc}</strong></p>
              <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '12px', color: CC.textMuted, margin: 0, lineHeight: 1.7, flex: 1 }}>{c.body}</p>
              <span style={{ fontFamily: F.mono, fontSize: '10px', color: 'rgba(107,142,35,0.6)' }}>{c.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 24b — LIMITATIONS ───────────────────────────────────────────────

function S24bLimitations() {
  const [ref, visible] = useFadeIn();
  const cols = [
    {
      title: 'Data Reliability & Standardization',
      points: [
        'Accurate, product-level carbon data is often limited or inconsistent across brands and industries.',
        'Lack of standardized measurement methods can affect how carbon footprints are calculated and compared.',
      ],
    },
    {
      title: 'Dependence on Brand Participation',
      points: [
        "The system's effectiveness relies on brands being transparent and sharing verified lifecycle data.",
        'Without active participation, the experience risks becoming symbolic rather than truly informative.',
      ],
    },
  ];
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '56px' }}>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 48px)', color: CC.textLight, margin: 0, lineHeight: 1.1 }}>
            Limitations
          </h2>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: CC.dotGreen, flexShrink: 0 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
          {cols.map((col, i) => (
            <div key={col.title} style={{ ...fadeUp(visible, 0.1 * i) }}>
              <h3 style={{ fontFamily: F.sans, fontWeight: 400, fontSize: 'clamp(14px, 1.6vw, 17px)', color: CC.textLight, margin: '0 0 24px 0', lineHeight: 1.3 }}>
                {col.title}
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {col.points.map((pt, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: CC.accentGreen, fontSize: '14px', lineHeight: '1.8', flexShrink: 0 }}>•</span>
                    <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: 'clamp(13px, 1.3vw, 15px)', color: CC.textMuted, lineHeight: 1.8, margin: 0 }}>{pt}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 24c — SAP PROJECT SHOWCASE ──────────────────────────────────────

function S24cShowcase() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.darkBg, padding: '96px 64px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Text */}
        <div style={{ ...fadeUp(visible, 0), marginBottom: '56px' }}>
          <SectionTag>SAP DESIGN SUMMIT 2025</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.textLight, margin: '0 0 24px 0', lineHeight: 1.15 }}>
            SAP Project Showcase
          </h2>
          <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: 'clamp(14px, 1.5vw, 16px)', color: CC.textMuted, lineHeight: 1.8, margin: 0, maxWidth: '640px' }}>
            Our project was selected from (NID) to represent the Design for Retail Experience Booth at the SAP Design Summit 2025.
          </p>
        </div>

        {/* SAPSHOWCASE full width */}
        <div style={{ ...fadeUp(visible, 0.1), marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
          <img src="/SAPSHOWCASE.jpg" alt="SAP Design Summit 2025 — Carbon Counts project showcase presentation" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* SHOWCASE1 + SHOWCASE2 side by side, equal height */}
        <div style={{ ...fadeUp(visible, 0.2), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '96px' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '480px' }}>
            <img src="/SHOWCASE1.png" alt="SAP Design Summit — Carbon Counts booth interaction" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '480px' }}>
            <img src="/SHOWCASE2.png" alt="SAP Design Summit — audience engagement at Carbon Counts booth" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          </div>
        </div>

        {/* Audience Feedback */}
        <div style={{ ...fadeUp(visible, 0.3) }}>
          <h3 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(22px, 3vw, 38px)', color: CC.accentGreen, margin: '0 0 64px 0', lineHeight: 1.1 }}>
            What the Audience Said
          </h3>

          {/* Scattered dialogue boxes — 3 rows, 2 columns, staggered */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Row 1 */}
            <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
              {/* Box 1 — points bottom-left (sharp bottom-left corner) */}
              <div style={{ flex: '0 0 42%', background: 'rgba(107,142,35,0.08)', border: '1px solid rgba(107,142,35,0.3)', borderRadius: '16px', borderBottomLeftRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  Really thoughtful ideation. The product chosen and represented through visual sense — it is easy to understand and process. This will be a really thoughtful installation for environmental exhibitions. Keep it up, guys!
                </p>
              </div>
              <div style={{ flex: 1 }} />
              {/* Box 2 — points bottom-right (sharp bottom-right corner) */}
              <div style={{ flex: '0 0 40%', background: 'rgba(107,142,35,0.08)', border: '1px solid rgba(107,142,35,0.3)', borderRadius: '16px', borderBottomRightRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  A very impactful problem area. Love the representation through lights filling up in the world of trees — very pretty and aesthetic. Learned a few things about how brands are moving towards enabling transparency within their customers through carbon receipts. Beautiful job guys, keep it up ❤️
                </p>
              </div>
            </div>

            {/* Row 2 — offset inward to look staggered */}
            <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', paddingLeft: '6%' }}>
              {/* Box 3 — points top-left (sharp top-left corner) */}
              <div style={{ flex: '0 0 32%', background: 'rgba(30,46,26,0.95)', border: '1px solid rgba(107,142,35,0.4)', borderRadius: '16px', borderTopLeftRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  CO₂ emissions are a major problem in today's world. This project is really needed for all of us.
                </p>
              </div>
              <div style={{ flex: 1 }} />
              {/* Box 4 — points top-right (sharp top-right corner) */}
              <div style={{ flex: '0 0 34%', background: 'rgba(107,142,35,0.08)', border: '1px solid rgba(107,142,35,0.3)', borderRadius: '16px', borderTopRightRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  In today's day and age of need for the "next sustainable," here's a design that actually addresses the problem. Love the concept and the level the execution went to! Loved it.
                </p>
              </div>
            </div>

            {/* Row 3 — offset from right */}
            <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', paddingRight: '5%' }}>
              {/* Box 5 — points top-left (sharp top-left corner) */}
              <div style={{ flex: '0 0 30%', background: 'rgba(30,46,26,0.95)', border: '1px solid rgba(107,142,35,0.4)', borderRadius: '16px', borderTopLeftRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  Really love how it's highlighting our step towards greener options!
                </p>
              </div>
              <div style={{ flex: 1 }} />
              {/* Box 6 — points top-right (sharp top-right corner) */}
              <div style={{ flex: '0 0 34%', background: 'rgba(107,142,35,0.08)', border: '1px solid rgba(107,142,35,0.3)', borderRadius: '16px', borderTopRightRadius: '0px', padding: '24px 26px' }}>
                <p style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: CC.textMuted, lineHeight: 1.85, margin: 0 }}>
                  Great concept!! Every brand should start incorporating this. It will make people more aware.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 25 — REFLECTIONS ─────────────────────────────────────────────────

function S25Reflections() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: CC.lightBg, padding: '128px 64px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ ...fadeUp(visible, 0) }}>
          <SectionTag>REFLECTIONS</SectionTag>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: CC.headingGreen, margin: '0 0 48px 0', lineHeight: 1.15 }}>Reflections</h2>
        </div>
        <p style={{ ...fadeUp(visible, 0.1), fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px, 2vw, 19px)', lineHeight: 1.85, color: CC.textDarkMuted, margin: 0 }}>
          This project deepened our understanding of how interaction design can translate sustainability into a tangible experience. Through hands-on experimentation with sensors, coding, and spatial setup, we learned how light, material, and motion can communicate complex ideas simply. It reinforced the importance of designing experiences that make environmental awareness both engaging and meaningful.
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 26 — MORE PROJECTS ───────────────────────────────────────────────

const OTHER_PROJECTS = [
  { id: 'bunav',    name: 'BUNAV',    type: 'App Design & UX',          url: 'https://priyashreeacharya.myportfolio.com/bunav-parenting-app',        image: '/bunav.png' },
  { id: 'paradyes', name: 'PARADYES', type: 'Branding & Visual System', url: 'https://priyashreeacharya.myportfolio.com/something-1',                image: '/paradyes.png' },
  { id: 'ember',    name: 'EMBER',    type: 'App Design & UX',          url: 'https://priyashreeacharya.myportfolio.com/ember-mental-health-app',     image: '/ember.png' },
];

function S26MoreProjects() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: COLORS.bg, padding: '80px 56px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...fadeUp(visible, 0), fontFamily: F.sans, fontWeight: 400, fontSize: '10px', letterSpacing: '0.14em', color: COLORS.textSecondary, marginBottom: '32px' }}>
          <span style={{ color: COLORS.accent }}>/</span> YOU MAY ALSO LIKE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {OTHER_PROJECTS.map((p, i) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{ ...fadeUp(visible, 0.08 * i), textDecoration: 'none', color: 'inherit', display: 'block', border: `1px solid ${COLORS.border}`, borderRadius: '8px', overflow: 'hidden', background: COLORS.surface, transition: 'border-color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}>
              {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block', filter: 'grayscale(80%)', transition: 'filter 0.4s ease' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(80%)'} />}
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: F.sans, fontWeight: 600, fontSize: '12px', color: COLORS.textPrimary, letterSpacing: '0.06em', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '11px', color: COLORS.textSecondary }}>{p.type}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER (matching site's ContactSection) ─────────────────────────────────

function PageFooter() {
  const [ref, visible] = useFadeIn();
  const [emailHov, setEmailHov] = useState(false);
  return (
    <section ref={ref} style={{ background: COLORS.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '120px 80px 80px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '48px', position: 'relative', zIndex: 1 }}>
        <div style={{ ...fadeUp(visible, 0) }}>
          <div style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            <span style={{ color: COLORS.accent }}>/</span> LET'S CONNECT
          </div>
          <h2 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: 'clamp(56px, 10vw, 130px)', color: COLORS.textPrimary, lineHeight: 1.0, margin: 0, letterSpacing: '-0.02em' }}>
            Create<br />Together?
          </h2>
        </div>
        <div style={{ ...fadeUp(visible, 0.2), display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <a href="mailto:Priyashree@nid.edu" className="frosted-btn">GET TALKING</a>
          <a href="mailto:Priyashree@nid.edu"
            style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: emailHov ? '#ffffff' : 'rgba(255,255,255,0.6)', letterSpacing: '0.05em', textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={() => setEmailHov(true)} onMouseLeave={() => setEmailHov(false)}>
            Priyashree@nid.edu
          </a>
          <a href="https://www.linkedin.com/in/priyashree02/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textDecoration: 'none', transition: 'color 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
            LinkedIn ↗
          </a>
        </div>
      </div>
      <div style={{ padding: '48px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ fontFamily: F.sans, fontWeight: 300, fontSize: '16px', color: '#fff', marginBottom: '6px', letterSpacing: '0.02em' }}>Priyashree Acharya</div>
          <div style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>© 2026</div>
        </div>
        <div style={{ fontFamily: F.serif, fontWeight: 300, fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em', textShadow: '0 0 18px rgba(255,255,255,0.4)' }}>
          Vibecoded with love
        </div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function CarbonCountPage() {
  useGlobalSetup();
  return (
    <>
      <StarCursor />
      <div className="cc-page" style={{ background: CC.darkBg, minHeight: '100vh' }}>
        <Nav />
        <S1Hero />
        <S2Poetic />
        <S3ProblemConcept />
        <S4Timeline />
        <SA1SustainabilityMomentum />
        <SA2StoryReceipt />
        <DotDivider />
        <SA3FootprintVisible />
        <DotDivider />
        <SBrandTargets />
        <S5Research />
        <S8Vision />
        <S12Experiential />
        <S13Metrics />
        <S15YouTube />
        <S16Installation />
        <S17Stakeholder />
        <DotDivider />
        <S18DataFlow />
        <DotDivider />
        <S19UserJourney />
        <DotDivider />
        <S20TechStack />
        <S21Setup />
        <DotDivider />
        <S22HowBuilt />
        <DotDivider />
        <S23InteractionFlow />
        <SForestBg />
        <S24Implementation />
        <S24bLimitations />
        <S24cShowcase />
        <S25Reflections />
        <S26MoreProjects />
        <PageFooter />
      </div>
    </>
  );
}
