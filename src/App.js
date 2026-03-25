import { useState, useEffect, useRef, useCallback } from 'react';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const COLORS = {
  bg: '#0D0C0A',
  bgAlt: '#0F0E0C',
  surface: '#141412',
  textPrimary: '#EDEAE3',
  textSecondary: '#6B6860',
  textMuted: '#3a3830',
  textVeryMuted: '#2e2d2a',
  accent: '#C9B99A',
  border: 'rgba(255,255,255,0.06)',
};

const ROTATING_WORDS = [
  'DESIGNER',
  'RESEARCHER',
  'STORYTELLER',
  'THINKER',
  'MAKER',
  'CURATOR',
];

const PROJECTS = [
  {
    id: 'ark',
    name: 'ARK',
    category: 'A',
    categoryLabel: 'Brand Identity',
    type: 'Branding & Visual System',
    description: 'A sanctuary brand for modern wellness — where ancient wisdom meets minimal form.',
    color: '#1a1915',
    accent: '#8B7355',
  },
  {
    id: 'groov',
    name: 'GROOV',
    category: 'B',
    categoryLabel: 'Product Design',
    type: 'App Design & UX',
    description: 'A music discovery app built around the social ritual of sharing sound.',
    color: '#131210',
    accent: '#6B5B4E',
  },
  {
    id: 'skippr',
    name: 'SKIPPR',
    category: 'A',
    categoryLabel: 'Brand Identity',
    type: 'Branding & Motion',
    description: 'Fast travel, slow stories. A brand for the new generation of spontaneous explorers.',
    color: '#111009',
    accent: '#7A6B5A',
  },
  {
    id: 'labyrinth',
    name: 'LABYRINTH',
    category: 'C',
    categoryLabel: 'Experience Design',
    type: 'Spatial & Installation',
    description: 'An immersive cultural exhibition exploring the architecture of memory.',
    color: '#141310',
    accent: '#5C5248',
  },
  {
    id: 'ojas',
    name: 'OJAS',
    category: 'B',
    categoryLabel: 'Web Design',
    type: 'Digital & Editorial',
    description: 'Ayurvedic wellness reimagined — a digital-first brand for conscious living.',
    color: '#120F0C',
    accent: '#9E8B76',
  },
  {
    id: 'tattva',
    name: 'TATTVA',
    category: 'C',
    categoryLabel: 'Motion Design',
    type: 'Film & Identity',
    description: 'A short film identity exploring the five elements through contemporary Indian aesthetics.',
    color: '#0F0E0C',
    accent: '#8A7B69',
  },
];

const DIGESTS = [
  {
    id: 1,
    title: 'On designing with restraint',
    subtitle: 'Why the best design decisions are often subtractions — and how to train yourself to see what can be removed.',
    tag: 'Process',
    readTime: '6 min read',
  },
  {
    id: 2,
    title: 'The typography of trust',
    subtitle: 'How letterforms communicate credibility, and what your font choices are saying about your brand before a word is read.',
    tag: 'Typography',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Designing for feeling, not function',
    subtitle: 'A case for emotional design: when products stop solving problems and start creating moments.',
    tag: 'Thinking',
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'The Indian design renaissance',
    subtitle: 'On the quiet resurgence of vernacular aesthetics in contemporary Indian brand design.',
    tag: 'Culture',
    readTime: '10 min read',
  },
];

const CABINET_SERVICES = [
  { label: 'Brand Identity', items: ['Logo & Visual Language', 'Brand Strategy', 'Messaging & Voice', 'Brand Guidelines'] },
  { label: 'Digital Design', items: ['Web & App Design', 'Design Systems', 'Prototyping', 'UX Research'] },
  { label: 'Motion & Film', items: ['Motion Graphics', 'Title Design', 'Short Film Identity', 'Visual Storytelling'] },
  { label: 'Print & Editorial', items: ['Publication Design', 'Poster & Collateral', 'Packaging', 'Wayfinding'] },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ─── ANIMATION STYLE ──────────────────────────────────────────────────────────

function fadeUp(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  };
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const scrolled = useScrolled();
  const [hoveredLink, setHoveredLink] = useState(null);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '64px',
    background: scrolled
      ? 'rgba(13, 12, 10, 0.85)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? `1px solid ${COLORS.border}` : '1px solid transparent',
    transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
  };

  const logoStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '18px',
    color: COLORS.textPrimary,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const navLinks = [
    { label: 'ABOUT', bracket: true, href: '#about' },
    { label: 'WORK', bracket: true, href: '#work' },
    { label: 'PLAY', bracket: true, href: '#sandbox' },
    { label: 'WORK WITH ME', bracket: false, href: '#contact' },
  ];

  return (
    <nav style={navStyle}>
      <a href="#hero" style={logoStyle} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        Nivedha.
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {navLinks.map((link, i) => (
          <NavLink
            key={link.label}
            link={link}
            isHovered={hoveredLink === i}
            onHover={() => setHoveredLink(i)}
            onLeave={() => setHoveredLink(null)}
          />
        ))}
      </div>
    </nav>
  );
}

function NavLink({ link, isHovered, onHover, onLeave }) {
  const isWorkWithMe = !link.bracket;
  const baseStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: '11px',
    letterSpacing: '0.12em',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
  };

  if (isWorkWithMe) {
    return (
      <a
        href={link.href}
        style={{
          ...baseStyle,
          color: COLORS.accent,
          padding: '6px 14px',
          border: `1px solid ${COLORS.accent}`,
          letterSpacing: '0.1em',
          transition: 'background 0.3s ease, color 0.3s ease',
          background: isHovered ? COLORS.accent : 'transparent',
          ...(isHovered ? { color: COLORS.bg } : {}),
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        {link.label}
      </a>
    );
  }

  return (
    <a
      href={link.href}
      style={{
        ...baseStyle,
        color: isHovered ? COLORS.textPrimary : COLORS.textSecondary,
        transition: 'color 0.3s ease',
        height: '20px',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
    >
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        transform: isHovered ? 'translateY(-50%)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
      }}>
        <span>[ {link.label} ]</span>
        <span>[ {link.label} ]</span>
      </span>
    </a>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 40px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 20%, rgba(201,185,154,0.04) 0%, transparent 60%)',
      }} />

      {/* Coordinates */}
      <div style={{
        position: 'absolute',
        top: '88px',
        right: '40px',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: '10px',
        letterSpacing: '0.15em',
        color: COLORS.textMuted,
        lineHeight: 1.8,
        textAlign: 'right',
      }}>
        <div>13.0827° N</div>
        <div>80.2707° E</div>
        <div style={{ marginTop: '6px', color: COLORS.textVeryMuted }}>CHENNAI, IN</div>
      </div>

      {/* Status indicator */}
      <div style={{
        position: 'absolute',
        top: '88px',
        left: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.12em',
        color: COLORS.textMuted,
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#4CAF50',
          boxShadow: '0 0 8px rgba(76,175,80,0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        AVAILABLE FOR PROJECTS
      </div>

      {/* Main hero text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          lineHeight: 0.9,
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
          }}>
            Multi—
          </div>
          <div style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0 0.15em',
          }}>
            <span>disciplinary</span>
          </div>
          <div style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            color: COLORS.accent,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.2em',
          }}>
            <span>designer</span>
            <span style={{
              fontSize: 'clamp(16px, 2.2vw, 30px)',
              fontStyle: 'normal',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              color: COLORS.textSecondary,
              letterSpacing: '0.2em',
              alignSelf: 'center',
              marginLeft: '0.3em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6em',
            }}>
              <span style={{ color: COLORS.textVeryMuted }}>—</span>
              <span style={{
                color: COLORS.accent,
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                display: 'inline-block',
              }}>
                {ROTATING_WORDS[wordIndex]}
              </span>
            </span>
          </div>
        </div>

        {/* Tagline + CTA row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: '32px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: COLORS.textSecondary,
            maxWidth: '480px',
            lineHeight: 1.7,
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            Designing for the future of tech, lifestyle and experience —
            <br />a multidisciplinary practice spanning brand, digital and space.
          </p>
          <CTAButton href="#contact">Taking up projects ↗</CTAButton>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 400,
      fontSize: '10px',
      letterSpacing: '0.2em',
      color: COLORS.textMuted,
      marginBottom: '48px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <span style={{ color: COLORS.accent, fontWeight: 500 }}>/</span>
      {children}
    </div>
  );
}

function CTAButton({ href, children, filled = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: hovered ? (filled ? COLORS.bg : COLORS.bg) : (filled ? COLORS.bg : COLORS.textPrimary),
        background: hovered ? COLORS.accent : (filled ? COLORS.accent : 'transparent'),
        border: `1px solid ${COLORS.accent}`,
        padding: '12px 28px',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={e => {
        if (href.startsWith('#')) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {children}
    </a>
  );
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${COLORS.border}`, width: '100%' }} />;
}

// ─── WORK / SHOWCASE ─────────────────────────────────────────────────────────

function WorkSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: COLORS.bgAlt,
        padding: '120px 40px',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '80px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>SHOWCASE</SectionLabel>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '560px',
              letterSpacing: '-0.01em',
            }}>
              Work that exists at the intersection of craft and intent
            </h2>
          </div>
          <div style={{ ...fadeUp(visible, 0.2), maxWidth: '340px', alignSelf: 'flex-end' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              color: COLORS.textSecondary,
              lineHeight: 1.8,
              margin: '0 0 32px',
            }}>
              A selection of projects across brand, product and experience design.
              Each one a collaboration, a question, a made thing.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.15em', color: COLORS.textMuted }}>
              <span>A — BRANDING</span>
              <span style={{ color: COLORS.textVeryMuted }}>·</span>
              <span>B — DIGITAL</span>
              <span style={{ color: COLORS.textVeryMuted }}>·</span>
              <span>C — EXPERIENCE</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: COLORS.border,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.08} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...fadeUp(visible, delay),
        background: hovered ? COLORS.surface : COLORS.bg,
        cursor: 'pointer',
        transition: 'background 0.4s ease, opacity 0.8s ease, transform 0.8s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{
        width: '100%',
        aspectRatio: '4/3',
        background: hovered
          ? `linear-gradient(135deg, ${project.color} 0%, #1a1816 100%)`
          : `linear-gradient(135deg, ${project.color} 0%, ${COLORS.bg} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Decorative element */}
        <div style={{
          width: '80px',
          height: '80px',
          border: `1px solid ${project.accent}`,
          opacity: hovered ? 0.4 : 0.15,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transform: hovered ? 'rotate(45deg) scale(1.1)' : 'rotate(45deg)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '64px',
          fontWeight: 300,
          color: project.accent,
          opacity: 0.12,
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {project.category}
        </div>
      </div>

      {/* Card info */}
      <div style={{ padding: '24px 28px 28px', flex: 1, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '10px',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: COLORS.textMuted,
          }}>
            {project.category} — {project.categoryLabel}
          </span>
          <span style={{
            fontSize: '14px',
            color: hovered ? COLORS.accent : COLORS.textMuted,
            transition: 'color 0.3s ease, transform 0.3s ease',
            display: 'inline-block',
            transform: hovered ? 'translate(3px, -3px)' : 'translate(0,0)',
          }}>↗</span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '28px',
          color: hovered ? COLORS.accent : COLORS.textPrimary,
          margin: '0 0 8px',
          letterSpacing: '0.05em',
          transition: 'color 0.3s ease',
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '12px',
          color: COLORS.textSecondary,
          margin: '0 0 12px',
          letterSpacing: '0.02em',
        }}>
          {project.type}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '12px',
          color: COLORS.textMuted,
          margin: 0,
          lineHeight: 1.7,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
        }}>
          {project.description}
        </p>
      </div>
    </div>
  );
}

// ─── DIGESTS ─────────────────────────────────────────────────────────────────

function DigestsSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      id="digests"
      ref={ref}
      style={{
        background: COLORS.bg,
        padding: '120px 40px',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '80px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>DIGESTS</SectionLabel>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '520px',
              letterSpacing: '-0.01em',
            }}>
              Thinking out loud about design, culture & making things
            </h2>
          </div>
          <div style={{ ...fadeUp(visible, 0.15), alignSelf: 'flex-end' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              color: COLORS.textSecondary,
              lineHeight: 1.8,
              margin: '0 0 24px',
              maxWidth: '300px',
            }}>
              Notes from the studio — occasional writing on craft, process and the ideas that won't leave me alone.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {DIGESTS.map((article, i) => (
            <DigestCard key={article.id} article={article} delay={i * 0.1} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DigestCard({ article, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...fadeUp(visible, delay),
        borderTop: `1px solid ${COLORS.border}`,
        padding: '36px 0',
        display: 'flex',
        gap: '40px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: '14px',
        color: COLORS.textVeryMuted,
        minWidth: '28px',
        paddingTop: '4px',
      }}>
        0{article.id}
      </span>

      {/* Cover area */}
      <div style={{
        width: '120px',
        height: '80px',
        flexShrink: 0,
        background: hovered
          ? 'linear-gradient(135deg, #1c1a17 0%, #141210 100%)'
          : 'linear-gradient(135deg, #141210 0%, #0f0e0c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          width: '30px', height: '30px',
          border: `1px solid ${COLORS.border}`,
          transform: 'rotate(45deg)',
          opacity: hovered ? 0.6 : 0.2,
          transition: 'opacity 0.3s ease',
        }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: COLORS.textMuted,
            border: `1px solid ${COLORS.border}`,
            padding: '3px 8px',
          }}>
            {article.tag}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            color: COLORS.textVeryMuted,
            letterSpacing: '0.05em',
          }}>
            {article.readTime}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '22px',
          color: hovered ? COLORS.accent : COLORS.textPrimary,
          margin: '0 0 8px',
          transition: 'color 0.3s ease',
          letterSpacing: '0.01em',
        }}>
          {article.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '13px',
          color: COLORS.textSecondary,
          margin: 0,
          lineHeight: 1.7,
          maxWidth: '600px',
        }}>
          {article.subtitle}
        </p>
      </div>

      {/* Arrow */}
      <span style={{
        fontSize: '16px',
        color: hovered ? COLORS.accent : COLORS.textMuted,
        transition: 'color 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translate(3px, -3px)' : 'translate(0,0)',
        display: 'inline-block',
        alignSelf: 'center',
      }}>↗</span>
    </div>
  );
}

// ─── CABINET ─────────────────────────────────────────────────────────────────

function CabinetSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: COLORS.bgAlt,
        padding: '120px 40px',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionLabel>CABINET</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', flexWrap: 'wrap' }}>
          {/* Left: Approach */}
          <div style={fadeUp(visible, 0)}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 4.5vw, 58px)',
              color: COLORS.textPrimary,
              lineHeight: 1.15,
              margin: '0 0 40px',
              letterSpacing: '-0.01em',
            }}>
              Design that holds its ground — and its warmth
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { n: '01', t: 'Intent-led', b: 'Every project starts with a question. What should this feel like? What should it do in the world? Design follows from there.' },
                { n: '02', t: 'Craft as care', b: 'The details are not decoration. Typography, spacing, texture — these are the places where respect for the viewer lives.' },
                { n: '03', t: 'Honest work', b: 'No trend-chasing, no bloat. Just clear thinking made visible. If it doesn\'t need to be there, it isn\'t.' },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: '24px', paddingTop: '24px', borderTop: `1px solid ${COLORS.border}` }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10px',
                    color: COLORS.textVeryMuted,
                    letterSpacing: '0.1em',
                    paddingTop: '3px',
                    minWidth: '24px',
                  }}>{item.n}</span>
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: '13px',
                      color: COLORS.textPrimary,
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                    }}>{item.t}</div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: '13px',
                      color: COLORS.textSecondary,
                      lineHeight: 1.8,
                      margin: 0,
                    }}>{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Services */}
          <div style={fadeUp(visible, 0.2)}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: COLORS.textSecondary,
              lineHeight: 1.9,
              margin: '0 0 48px',
            }}>
              Whether it's a brand that needs to find its voice, a product that needs to earn trust, or a space that needs to feel like something —
              <em style={{ color: COLORS.accent, fontStyle: 'italic' }}> I work across the full range of what design can do.</em>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {CABINET_SERVICES.map((service, i) => (
                <ServiceRow key={service.label} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: `1px solid ${COLORS.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: '13px',
          letterSpacing: '0.1em',
          color: COLORS.textPrimary,
        }}>
          {service.label}
        </span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '16px',
          color: COLORS.accent,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
        }}>+</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {service.items.map(item => (
            <span key={item} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: COLORS.textSecondary,
              border: `1px solid ${COLORS.border}`,
              padding: '5px 12px',
            }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SANDBOX ─────────────────────────────────────────────────────────────────

function SandboxSection() {
  const [ref, visible] = useFadeIn();

  const experiments = [
    { label: 'Poster archive', sub: 'Ongoing collection of type explorations' },
    { label: 'Type specimens', sub: 'Playing with custom lettering & forms' },
    { label: 'Texture studies', sub: 'Material & surface experiments' },
    { label: 'Movement notes', sub: 'Motion sketches & animation trials' },
    { label: 'Field sketchbook', sub: 'Drawing from observation & travel' },
    { label: 'Collage works', sub: 'Analog & digital cut-and-paste' },
  ];

  return (
    <section
      id="sandbox"
      ref={ref}
      style={{
        background: COLORS.bg,
        padding: '120px 40px',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px', flexWrap: 'wrap', gap: '40px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>SANDBOX</SectionLabel>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '540px',
              letterSpacing: '-0.01em',
            }}>
              Where the brief ends and the real work begins
            </h2>
          </div>
          <div style={{ ...fadeUp(visible, 0.15), maxWidth: '320px', alignSelf: 'flex-end' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              color: COLORS.textSecondary,
              lineHeight: 1.8,
              margin: 0,
            }}>
              Off-hours experiments, self-set briefs, and the work that happens when no one is watching.
              This is where I keep the things I make for the love of making.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: COLORS.border,
        }}>
          {experiments.map((exp, i) => (
            <SandboxCard key={exp.label} exp={exp} delay={i * 0.07} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SandboxCard({ exp, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...fadeUp(visible, delay),
        background: hovered ? COLORS.surface : COLORS.bg,
        padding: '40px 32px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, opacity 0.8s ease, transform 0.8s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minHeight: '160px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: '24px',
        height: '1px',
        background: hovered ? COLORS.accent : COLORS.textVeryMuted,
        transition: 'background 0.3s ease, width 0.3s ease',
        ...(hovered ? { width: '40px' } : {}),
      }} />
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: '20px',
        color: hovered ? COLORS.textPrimary : COLORS.textSecondary,
        margin: 0,
        letterSpacing: '0.02em',
        transition: 'color 0.3s ease',
      }}>
        {exp.label}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: '11px',
        color: COLORS.textMuted,
        margin: 0,
        letterSpacing: '0.05em',
        lineHeight: 1.6,
      }}>
        {exp.sub}
      </p>
    </div>
  );
}

// ─── CONTACT / FOOTER ────────────────────────────────────────────────────────

function ContactSection() {
  const [ref, visible] = useFadeIn();
  const [emailHovered, setEmailHovered] = useState(false);

  const footerLinks = ['About', 'Work', 'Logs', 'Cabinet', 'Sandbox', 'Resume'];
  const socialLinks = ['LinkedIn', 'Twitter', 'Instagram'];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: COLORS.bgAlt,
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      {/* Big CTA */}
      <div style={{
        padding: '120px 40px 80px',
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}>
        <div style={fadeUp(visible, 0)}>
          <SectionLabel>LET'S TALK</SectionLabel>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(56px, 10vw, 130px)',
            color: COLORS.textPrimary,
            lineHeight: 0.95,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            build<br />
            <em style={{ color: COLORS.accent }}>together?</em>
          </h2>
        </div>
        <div style={{ ...fadeUp(visible, 0.2), display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CTAButton href="mailto:hello@nivedhanirmal.com" filled>GET TALKING</CTAButton>
          <a
            href="mailto:hello@nivedhanirmal.com"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: emailHovered ? COLORS.textPrimary : COLORS.textSecondary,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            hello@nivedhanirmal.com
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={{
        padding: '48px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '32px',
      }}>
        {/* Name + copyright */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '16px',
            color: COLORS.textPrimary,
            marginBottom: '6px',
            letterSpacing: '0.02em',
          }}>
            Nivedha Nirmal
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            color: COLORS.textVeryMuted,
            letterSpacing: '0.1em',
          }}>
            © 2025 — All rights reserved
          </div>
        </div>

        {/* Footer nav */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {footerLinks.map(link => (
            <FooterLink key={link} label={link} />
          ))}
        </div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {socialLinks.map(link => (
            <FooterLink key={link} label={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.12em',
        color: hovered ? COLORS.textSecondary : COLORS.textMuted,
        textDecoration: 'none',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={e => e.preventDefault()}
    >
      {label.toUpperCase()}
    </a>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    // Inject Google Fonts
    const existing = document.querySelector('link[data-portfolio-fonts]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-portfolio-fonts', 'true');
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap';
      document.head.appendChild(link);
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Base styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = COLORS.bg;
    document.body.style.overflowX = 'hidden';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <WorkSection />
      <DigestsSection />
      <CabinetSection />
      <SandboxSection />
      <ContactSection />
    </div>
  );
}
