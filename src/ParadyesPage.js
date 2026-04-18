import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const PD = {
  yellow:  '#F7C500',
  gold:    '#F7C23B',
  pink:    '#E1018D',
  black:   '#0D0D0D',
  white:   '#FFFFFF',
  muted:   'rgba(13,13,13,0.5)',
};

const F = {
  sans: "'Afacad', Arial, sans-serif",
  display: "'Dashing', Arial, sans-serif",
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function fadeUp(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  };
}

function useGlobalSetup() {
  useEffect(() => {
    if (!document.querySelector('link[data-paradyes-fonts]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.setAttribute('data-paradyes-fonts', 'true');
      l.href = 'https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
      document.head.appendChild(l);
    }
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    return () => { document.body.style.overflowX = ''; };
  }, []);
}

// ─── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
          raf.current = null;
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div ref={dot} style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999,
      width: '12px', height: '12px', borderRadius: '50%',
      background: PD.pink, pointerEvents: 'none',
      marginLeft: '-6px', marginTop: '-6px', mixBlendMode: 'multiply',
    }} />
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '64px',
      background: scrolled ? 'rgba(247,197,0,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s ease',
    }}>
      <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }}
        style={{ fontFamily: F.sans, fontWeight: 700, fontSize: '20px', color: PD.black, textDecoration: 'none' }}>
        P
      </a>
      <div style={{ display: 'flex', gap: '40px' }}>
        {[['WORK', '/'], ['ABOUT', '/about']].map(([label, href]) => (
          <a key={label} href={href} onClick={e => { e.preventDefault(); navigate(href); }}
            style={{ fontFamily: F.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', color: PD.black, textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ width: '100%', height: '100vh', minHeight: '560px', overflow: 'hidden', lineHeight: 0 }}>
      <img
        src="/paradyes-1.jpg"
        alt="Paradyes — Ever messed up a Hair Color at Home?"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
      />
    </section>
  );
}

// ─── OVERVIEW + DESIGN PROCESS ────────────────────────────────────────────────
function OverviewSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 40px 100px', textAlign: 'center' }}>
      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(28px, 3vw, 48px)',
        color: PD.gold, margin: '0 0 36px 0',
      }}>Project Overview</h2>
      <p style={{
        ...fadeUp(visible, 0.1),
        fontFamily: F.sans, fontWeight: 400,
        fontSize: '20px', lineHeight: 1.4,
        color: PD.black, maxWidth: '780px', margin: '0 auto 96px',
      }}>
        Paradyes, India's first semi-permanent hair color brand, empowers self-expression and
        experimentation. This project explores its product ecosystem, retail, and consumer behavior to
        uncover growth opportunities. Insights from brand study, market analysis, and user research
        informed the Paradyes At-Home Salon Service in collaboration with Urban Company, offering
        professional coloring at home with convenience and safety. The project showcases end-to-end
        design thinking, from research to actionable product and brand strategy.
      </p>

      <h2 style={{
        ...fadeUp(visible, 0.18),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(28px, 3vw, 48px)',
        color: PD.gold, margin: '0 0 60px 0',
      }}>Design Process</h2>
      <div style={{ ...fadeUp(visible, 0.26), maxWidth: '960px', margin: '0 auto' }}>
        <img src="/paradyes-diagram1.png" alt="Design process diagram"
          style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </section>
  );
}

// ─── INDUSTRY SECTION ─────────────────────────────────────────────────────────
function IndustrySection() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 42px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 56px 0',
      }}>Indian Hair Colour Industry</h2>

      <div style={{
        ...fadeUp(visible, 0.08),
        display: 'flex', alignItems: 'center',
        gap: '48px', maxWidth: '1100px', margin: '0 auto 100px',
      }}>
        <img src="/paradyes-diagram2.png" alt="India hair colour market map"
          style={{ flex: '0 0 62%', width: '62%', height: 'auto', display: 'block' }} />
        <div style={{ border: '1.5px dashed #0D0D0D', borderRadius: '8px', padding: '28px 32px', flex: 1 }}>
          <p style={{
            fontFamily: F.sans, fontWeight: 400, fontStyle: 'italic',
            fontSize: 'clamp(14px, 1.3vw, 20px)', lineHeight: 1.6,
            color: PD.black, margin: 0, textAlign: 'center',
          }}>
            By 2030, the hair colour market is expected to nearly double in size,
            showing rapid industry growth.
          </p>
        </div>
      </div>

      <h2 style={{
        ...fadeUp(visible, 0.14),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 42px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 56px 0',
      }}>Hair Dye Market Segmentation</h2>

      <div style={{ ...fadeUp(visible, 0.2), maxWidth: '1000px', margin: '0 auto 100px' }}>
        <img src="/paradyes-diagram3.png" alt="Hair dye market segmentation"
          style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      <h2 style={{
        ...fadeUp(visible, 0.26),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 42px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 56px 0',
      }}>Competitive Landscape</h2>

      <div style={{ ...fadeUp(visible, 0.32), maxWidth: '1000px', margin: '0 auto' }}>
        <img src="/paradyes-diagram4.png" alt="Competitive landscape"
          style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

    </section>
  );
}

// ─── BRAND STUDY SECTION ──────────────────────────────────────────────────────
function BrandSection() {
  const [ref, visible] = useFadeIn();
  const sectionHead = {
    fontFamily: F.display, fontWeight: 400,
    fontSize: 'clamp(22px, 2.4vw, 38px)',
    color: PD.gold, textAlign: 'center',
    letterSpacing: '0.04em',
    margin: '0 0 48px 0',
  };

  return (
    <section ref={ref} style={{ background: PD.white, padding: '80px 60px 100px' }}>

      {/* Question pill + connector */}
      <div style={{ ...fadeUp(visible, 0), display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ background: PD.yellow, borderRadius: '999px', padding: '28px 64px', maxWidth: '820px', textAlign: 'center' }}>
          <p style={{ fontFamily: F.sans, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(20px, 2.4vw, 36px)', color: PD.black, margin: 0, lineHeight: 1.3 }}>
            What if coloring your hair wasn't about hiding age but about celebrating your identity?
          </p>
        </div>
        <div style={{ width: '1.5px', height: '40px', background: '#0D0D0D' }} />
      </div>

      {/* ── BIG DASHED CONTAINER: logo → SWOT ── */}
      <div style={{
        ...fadeUp(visible, 0.08),
        border: '1.5px dashed #0D0D0D',
        borderRadius: '32px',
        maxWidth: '1100px',
        margin: '0 auto 80px',
        overflow: 'hidden',
      }}>

        {/* Logo + tagline + body */}
        <div style={{ textAlign: 'center', padding: '48px 60px 32px' }}>
          <img src="/paradyes-logo.png" alt="Paradyes" style={{ height: '52px', width: 'auto', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '15px', letterSpacing: '0.05em', color: PD.black, margin: '0 0 20px' }}>
            India's First Semi - permanent hair color brand
          </p>
          <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: 'clamp(14px, 1.2vw, 18px)', lineHeight: 1.7, color: PD.black, margin: '0 auto', maxWidth: '620px' }}>
            Paradyes leads a movement of fearless self-expression, empowering the new generation to experiment with bold, vibrant DIY hair colors.
          </p>
        </div>

        {/* Characters banner — full width */}
        <img src="/paradyes-image1.png" alt="Paradyes brand characters" style={{ width: '100%', height: 'auto', display: 'block' }} />

        {/* Inner content with padding */}
        <div style={{ padding: '60px 60px 60px' }}>

          {/* TARGET AUDIENCE */}
          <h2 style={{ ...sectionHead, marginTop: 0 }}>Target Audience</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '980px', margin: '0 auto 80px' }}>
            <img src="/paradyes-group84.png" alt="Demographic segmentation" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} />
            <img src="/paradyes-group85.png" alt="Geographic segmentation" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} />
            <img src="/paradyes-group88.png" alt="Psychographic segmentation" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} />
            <img src="/paradyes-group91.png" alt="Behavioural segmentation" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} />
          </div>

          {/* 6 PS OF MARKETING */}
          <h2 style={{ ...sectionHead }}><span style={{ fontFamily: F.sans, fontWeight: 700 }}>6 </span>Ps of Marketing</h2>
          <div style={{ maxWidth: '980px', margin: '0 auto 80px' }}>
            <img src="/paradyes-diagram5.png" alt="6 Ps of Marketing" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* PRODUCT JOURNEY */}
          <h2 style={{ ...sectionHead }}>Product Journey</h2>
          <div style={{ margin: '0 auto 80px' }}>
            <img src="/paradyes-diagram6.png" alt="Product journey timeline" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* BRAND PERFORMANCE METRICS */}
          <h2 style={{ ...sectionHead }}>Brand Performance Metrics <span style={{ fontFamily: F.sans }}>*</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '980px', margin: '0 auto 16px' }}>
            <img src="/paradyes-group108.png" alt="27.5% Growth Rate" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <img src="/paradyes-group109.png" alt="70-75% Gross Margin" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <img src="/paradyes-group110.png" alt="21.8% EBITDA" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <p style={{ fontFamily: F.sans, fontSize: '13px', color: PD.muted, textAlign: 'center', margin: '0 0 80px' }}>
            * As highlighted by Paradyes during Shark Tank India 2023
          </p>

          {/* SWOT */}
          <div style={{ maxWidth: '980px', margin: '0 auto 0' }}>
            <img src="/paradyes-diagram7.png" alt="SWOT Analysis" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

        </div>
      </div>

      {/* Closing note — outside dashed box */}
      <p style={{ ...fadeUp(visible, 0.54), fontFamily: F.sans, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(14px, 1.2vw, 18px)', color: PD.black, textAlign: 'center', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7 }}>
        An exploration of Paradyes reveals how the brand balances creative expression with commercial strategy to shape its place in India's contemporary beauty market.
      </p>

    </section>
  );
}

// ─── ANSOFF / RESEARCH SECTION ────────────────────────────────────────────────
function AnsoffSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      {/* Row 1: Understanding Product Development */}
      <div style={{
        ...fadeUp(visible, 0),
        display: 'flex', alignItems: 'center', gap: '60px',
        maxWidth: '1100px', margin: '0 auto 100px',
      }}>
        <div style={{ flex: '0 0 44%' }}>
          <h2 style={{ fontFamily: F.display, fontWeight: 400, fontSize: 'clamp(24px, 2.6vw, 40px)', color: PD.black, margin: '0 0 28px 0', lineHeight: 1.2 }}>
            Understanding Product Development
          </h2>
          <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.7, color: PD.black, margin: 0 }}>
            <strong>Ansoff Matrix model</strong> is a strategic tool that helps businesses identify growth opportunities by analyzing their existing and new products in existing or new markets.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img src="/paradyes-illustration1.png" alt="Ansoff Matrix illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      {/* Row 2: Understanding Product Development of Paradyes + diagram */}
      <h2 style={{
        ...fadeUp(visible, 0.08),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 40px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 48px 0',
      }}>Understanding Product Development of Paradyes</h2>
      <div style={{ ...fadeUp(visible, 0.14), maxWidth: '1000px', margin: '0 auto 100px' }}>
        <img src="/paradyes-diagram8.png" alt="Ansoff Matrix for Paradyes" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* Row 3: Problem Statement */}
      <h2 style={{
        ...fadeUp(visible, 0.2),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 40px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 32px 0',
      }}>Problem Statement</h2>
      <p style={{
        ...fadeUp(visible, 0.24),
        fontFamily: F.sans, fontWeight: 400,
        fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.7,
        color: PD.black, textAlign: 'center',
        maxWidth: '720px', margin: '0 auto 100px',
      }}>
        To explore how Birds of Paradyes can expand its offerings and strengthen its position in the hair color market by understanding user needs, brand perception, and unmet opportunities.
      </p>

      {/* Row 4: Research Objectives */}
      <h2 style={{
        ...fadeUp(visible, 0.28),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 40px)',
        color: PD.gold, textAlign: 'center', margin: '0 0 56px 0',
      }}>Research Objectives</h2>
      <div style={{
        ...fadeUp(visible, 0.32),
        display: 'flex', justifyContent: 'center', gap: '24px',
        flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto',
      }}>
        {[
          'Understanding\nConsumer Behavior',
          'Awareness &\nPerception of Paradyes',
          'Purchase Motivation\n& Barriers',
          'Product Experience',
          'Target Audience\nProfiling',
        ].map((label) => (
          <div key={label} style={{
            width: '180px', height: '180px', borderRadius: '50%',
            border: `2px solid ${PD.pink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '16px',
            boxSizing: 'border-box',
          }}>
            <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: '14px', lineHeight: 1.5, color: PD.black, margin: 0, whiteSpace: 'pre-line' }}>
              {label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── SURVEY / RESEARCH METHODS SECTION ───────────────────────────────────────
function SurveySection() {
  const [ref, visible] = useFadeIn();

  const sH = {
    fontFamily: F.display, fontWeight: 400,
    fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
    textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 48px 0',
  };
  const body = {
    fontFamily: F.sans, fontWeight: 400,
    fontSize: 'clamp(13px, 1vw, 15px)', color: PD.black,
    lineHeight: 1.65, margin: '0 0 24px',
  };
  const HDash = ({ mt = 48, mb = 48 }) => (
    <div style={{ borderTop: '1.5px dashed rgba(13,13,13,0.35)', margin: `${mt}px 0 ${mb}px` }} />
  );

  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      {/* ── Research Methods Used ── */}
      <h2 style={{ ...fadeUp(visible, 0), ...sH }}>Research Methods Used</h2>
      <div style={{
        ...fadeUp(visible, 0.05),
        display: 'flex', justifyContent: 'center', gap: '16px',
        flexWrap: 'wrap', margin: '0 0 80px',
      }}>
        {['Surveys', 'Interviews', 'Affinity Mapping', 'Opportunity Mapping'].map(m => (
          <div key={m} style={{
            fontFamily: F.sans, fontSize: 'clamp(13px, 1.1vw, 15px)',
            border: `1.5px solid ${PD.black}`, borderRadius: '9999px',
            padding: '10px 28px', color: PD.black,
          }}>{m}</div>
        ))}
      </div>

      {/* ── Survey Results heading ── */}
      <h2 style={{ ...fadeUp(visible, 0.08), ...sH }}>
        Survey Results <span style={{ fontFamily: F.sans }}>*</span>
      </h2>

      {/* ── Survey results — single PNG ── */}
      <div style={{ ...fadeUp(visible, 0.12), display: 'flex', justifyContent: 'center' }}>
        <img
          src="/paradyes-surveyresult.png"
          alt="Survey Results — Preferences and Pricing Trends in Hair Coloring Services"
          style={{ width: '75%', height: 'auto', display: 'block' }}
        />
      </div>

    </section>
  );
}

// ─── INTERVIEW INSIGHTS + AFFINITY MAPPING SECTION ───────────────────────────
function InterviewSection() {
  const [ref, visible] = useFadeIn();

  const insights = [
    ['Quantity was very less in a package for normal hair length', 'Fear of skin reactions, dirty and bleached clothes', 'Difficult to see the back if you have short hair'],
    ['Vibrancy is not enough of colour', 'Not sure how to apply it evenly', 'Don\'t have all tools (gloves, brush etc.)', 'Never colored my hair at home'],
    ['Fear of chemical burns and extreme damage from bleaching on my own', 'It didn\'t work as per instructions', 'Not knowing how it will turn out on my original hair colour'],
    ['How to find another person to help you', 'I\'ve never done hair colour', 'Fear of messing it up', 'Sectioning hair to apply bleach and or color evenly the first time around'],
  ];

  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      {/* Interview Insights */}
      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
        textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 56px',
      }}>Interview Insights</h2>

      <div style={{ ...fadeUp(visible, 0.08), display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '120px' }}>
        {insights.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '20px' }}>
            {row.map((text) => (
              <div key={text} style={{
                flex: 1,
                border: '1.5px solid #6BAED6',
                borderRadius: '16px',
                padding: '24px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{
                  fontFamily: F.sans, fontStyle: 'italic', fontWeight: 400,
                  fontSize: 'clamp(13px, 1.05vw, 16px)', color: PD.black,
                  lineHeight: 1.6, textAlign: 'center', margin: 0,
                }}>{text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Affinity Mapping */}
      <h2 style={{
        ...fadeUp(visible, 0.16),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
        textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 64px',
      }}>Affinity Mapping</h2>

      <div style={{ ...fadeUp(visible, 0.22) }}>
        <img
          src="/paradyes-affinitymap.png"
          alt="Affinity Mapping diagram"
          style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </div>

    </section>
  );
}

// ─── USER PAIN POINTS + OPPORTUNITY MAPPING SECTION ──────────────────────────
function PainPointsSection() {
  const [ref, visible] = useFadeIn();

  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      {/* User Pain Points */}
      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
        textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 56px',
      }}>User Pain Points</h2>

      {/* Three illustration cards — single PNG */}
      <div style={{ ...fadeUp(visible, 0.08), marginBottom: '100px' }}>
        <img
          src="/paradyes-illustrations2.png"
          alt="User Pain Points: The Color Confusion, The Fear of Messing It Up, The Quantity Dilemma"
          style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Opportunity Mapping + Why Home Salon Service — two columns */}
      <div style={{
        ...fadeUp(visible, 0.16),
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left: Opportunity Mapping */}
        <div>
          <h2 style={{
            fontFamily: F.display, fontWeight: 400,
            fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
            letterSpacing: '0.04em', margin: '0 0 40px', textAlign: 'center',
          }}>Opportunity Mapping</h2>
          <img
            src="/paradyes-diagram9.png"
            alt="Opportunity Mapping 2x2 matrix"
            style={{ width: '80%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Right: Why Home Salon Service? */}
        <div style={{ paddingTop: '8px' }}>
          <h2 style={{
            fontFamily: F.display, fontWeight: 400,
            fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
            letterSpacing: '0.04em', margin: '0 0 40px',
          }}>Why Home Salon Service?</h2>
          <p style={{
            fontFamily: F.sans, fontWeight: 400,
            fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.75,
            color: PD.black, margin: 0,
          }}>
            We chose the Home Salon Service opportunity as it bridges users' need for professional assurance with Paradyes' vision of self-expression, offering a convenient, confidence-driven experience that enhances trust, loyalty, and business growth.
          </p>
        </div>

      </div>

    </section>
  );
}

// ─── CUSTOMER PERSONA SECTION ─────────────────────────────────────────────────
function PersonaSection() {
  const [ref, visible] = useFadeIn();

  const personas = [
    {
      img: '/paradyes-cp1.png',
      border: '#E1018D',
      about: 'Aanya, 22, is a college student from Pune who enjoys experimenting with her style but has never colored her hair before. She finds Paradyes exciting and approachable but feels hesitant to try it herself without guidance.',
      needs: [
        'Wants to experiment safely with minimal hair damage.',
        'Needs simple, beginner-friendly instructions.',
        'Seeks reassurance that the shade will complement her natural hair color.',
      ],
      pain: [
        'Unsure how the color will look on her hair.',
        'Fear of making a mistake during application.',
        'Hesitant to try coloring at home without help.',
      ],
    },
    {
      img: '/paradyes-cp2.png',
      border: '#4B7BE5',
      about: "Aarav, 24, is a musician from Mumbai who likes standing out but has never dyed his hair before. He's intrigued by Paradyes' bold colors but intimidated by the application process. He doesn't want to risk a messy outcome before a performance or event.",
      needs: [
        'Wants to express creativity through hair color.',
        'Needs a quick, foolproof way to color at home.',
        'Seeks confidence that the shade will suit darker hair tones.',
      ],
      pain: [
        "Doesn't know how to apply evenly without assistance.",
        'Afraid of ruining his natural hair texture.',
        'Unsure how the color will appear on his base tone.',
      ],
    },
    {
      img: '/paradyes-cp4.png',
      border: '#7B3FA0',
      about: 'Neha, 27, is a marketing executive from Delhi who has tried temporary color before. She enjoys switching up her look occasionally but wants her purchase to be efficient and long-lasting.',
      needs: [
        'Wants enough product for her shoulder-length hair.',
        'Needs clarity on how much color to use for complete coverage.',
        'Seeks value for money and consistency in results.',
      ],
      pain: [
        'Finds the product quantity insufficient.',
        'Unsure if one jar is enough.',
        'Dislikes unpredictability in color outcome.',
      ],
    },
  ];

  const label = { fontFamily: F.sans, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(13px, 1vw, 15px)', color: PD.black, margin: '0 0 10px' };
  const bullet = { fontFamily: F.sans, fontWeight: 400, fontSize: 'clamp(13px, 1vw, 15px)', color: PD.black, lineHeight: 1.65, margin: '0 0 6px', paddingLeft: '14px', position: 'relative' };

  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
        textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 64px',
      }}>Customer Persona</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'center' }}>
        {personas.map(({ img, border, about, needs, pain }, i) => (
          <div key={i} style={{
            ...fadeUp(visible, 0.08 + i * 0.1),
            display: 'flex', gap: '40px', alignItems: 'stretch',
            border: `1.5px solid ${border}`, borderRadius: '20px',
            padding: '24px', maxWidth: '860px',
          }}>
            {/* Left: photo card PNG — centered vertically */}
            <div style={{ flexShrink: 0, width: '260px', display: 'flex', alignItems: 'center' }}>
              <img src={img} alt="" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '14px' }} />
            </div>

            {/* Right: text content */}
            <div style={{ paddingTop: '8px', flex: 1 }}>
              <p style={label}>About</p>
              <p style={{ fontFamily: F.sans, fontSize: 'clamp(13px, 1vw, 15px)', color: PD.black, lineHeight: 1.7, margin: '0 0 24px' }}>{about}</p>

              <p style={label}>Needs & Goals</p>
              <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none' }}>
                {needs.map(n => (
                  <li key={n} style={{ ...bullet, display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px', paddingLeft: 0 }}>
                    <span style={{ color: border, flexShrink: 0, marginTop: '2px' }}>•</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>

              <p style={label}>Pain Points</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {pain.map(p => (
                  <li key={p} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px', fontFamily: F.sans, fontSize: 'clamp(13px, 1vw, 15px)', color: PD.black, lineHeight: 1.65 }}>
                    <span style={{ color: border, flexShrink: 0, marginTop: '2px' }}>•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── NEED STATEMENT + SERVICE BLUEPRINT SECTION ───────────────────────────────
function BlueprintSection() {
  const [ref, visible] = useFadeIn();

  const centeredHead = (delay) => ({
    ...fadeUp(visible, delay),
    fontFamily: F.display, fontWeight: 400,
    fontSize: 'clamp(22px, 2.4vw, 38px)', color: PD.gold,
    textAlign: 'center', letterSpacing: '0.04em', margin: '0 0 32px',
  });

  const centeredBody = (delay) => ({
    ...fadeUp(visible, delay),
    fontFamily: F.sans, fontWeight: 400,
    fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.75,
    color: PD.black, textAlign: 'center',
    maxWidth: '640px', margin: '0 auto',
  });

  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px' }}>

      {/* Need Statement */}
      <h2 style={centeredHead(0)}>Need Statement</h2>
      <p style={centeredBody(0.06)}>
        Busy urban consumers need an easy and time-efficient way to achieve professional-quality hair coloring at home, offering salon-like comfort and results without the hassle of visiting a salon.
      </p>

      {/* Implementation Strategy */}
      <h2 style={{ ...centeredHead(0.12), marginTop: '100px' }}>Implementation Strategy</h2>
      <p style={centeredBody(0.18)}>
        Paradyes introduces an <em>at-home professional hair coloring service</em> that brings salon-like expertise, comfort, and personalized color consultation directly to busy urban consumers.
      </p>

      {/* Collab logos */}
      <div style={{ ...fadeUp(visible, 0.22), display: 'flex', justifyContent: 'center', margin: '64px 0 100px' }}>
        <img src="/paradyes-collab.png" alt="Paradyes × Urban Company" style={{ width: '320px', height: 'auto', display: 'block' }} />
      </div>

      {/* Service Blueprint */}
      <h2 style={centeredHead(0.26)}>Service Blueprint</h2>
      <p style={{ ...centeredBody(0.3), marginBottom: '56px' }}>
        The blueprint reveals how the collaboration balances Paradyes' creative color identity with Urban Company's service reliability. Ensuring a seamless and joyful experience across both digital and physical touchpoints.
      </p>
      <div style={{ ...fadeUp(visible, 0.34) }}>
        <img src="/paradyes-blueprint.png" alt="Service Blueprint" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* Touchpoints */}
      <h2 style={{ ...centeredHead(0.38), marginTop: '100px' }}>Touchpoints</h2>
      <div style={{ ...fadeUp(visible, 0.42) }}>
        <img src="/paradyes-touchpoints.png" alt="Touchpoints" style={{ width: '75%', height: 'auto', display: 'block', margin: '0 auto' }} />
      </div>

    </section>
  );
}


// ─── IMPLEMENTATION HEADING ───────────────────────────────────────────────────
function ImplementationSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: PD.white, padding: '100px 80px 60px', textAlign: 'center' }}>
      <h2 style={{
        ...fadeUp(visible, 0),
        fontFamily: F.display, fontWeight: 400,
        fontSize: 'clamp(24px, 2.6vw, 42px)',
        color: PD.gold, margin: '0 0 64px',
      }}>Implementation of the solution</h2>
      <div style={{ ...fadeUp(visible, 0.1), display: 'flex', justifyContent: 'center' }}>
        <img
          src="/paradyes-implementationstrategy.png"
          alt="Implementation strategy"
          style={{ width: '85%', height: 'auto', display: 'block' }}
        />
      </div>
      <p style={{
        ...fadeUp(visible, 0.2),
        fontFamily: F.sans, fontWeight: 400,
        fontSize: '22px', lineHeight: 1.5,
        color: PD.black, textAlign: 'center',
        maxWidth: '860px', margin: '80px auto 0',
      }}>
        A collaboration between Urban Company and Paradyes could boost sales for both brands by addressing key user pain point, eliminating concerns about <em>mess, product quantity, and choosing the wrong hair color.</em>
      </p>
      <div style={{ ...fadeUp(visible, 0.3), marginTop: '80px' }}>
        <img
          src="/paradyes-mockup.png"
          alt="Paradyes mockup — Transforming Products into Service Experiences"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </section>
  );
}

// ─── CLOSING SECTION ──────────────────────────────────────────────────────────
function ClosingSection() {
  const [ref, visible] = useFadeIn();
  return (
    <section ref={ref} style={{ background: PD.yellow, padding: '100px 80px' }}>
      <p style={{
        ...fadeUp(visible, 0),
        fontFamily: F.sans, fontWeight: 400,
        fontSize: '20px', lineHeight: 1.7,
        color: PD.black, textAlign: 'center',
        maxWidth: '780px', margin: '0 auto 60px',
      }}>
        This project allowed us to understand how <strong>research-led design can shape strategy and innovation</strong>. It reinforced that design is not a linear process but an evolving dialogue between user needs, brand identity, and real-world constraints.
      </p>
      <p style={{
        ...fadeUp(visible, 0.1),
        fontFamily: F.sans, fontWeight: 400,
        fontSize: '20px', lineHeight: 1.7,
        color: PD.black, textAlign: 'center',
        maxWidth: '780px', margin: '0 auto 60px',
      }}>
        As we continue refining the app experience, our focus remains on crafting an expressive yet seamless service that celebrates individuality while ensuring ease and confidence at every touchpoint.
      </p>
      <p style={{
        ...fadeUp(visible, 0.2),
        fontFamily: F.sans, fontWeight: 400, fontStyle: 'italic',
        fontSize: '22px', color: PD.black, textAlign: 'center', margin: 0,
      }}>Thank You!</p>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ParadyesPage() {
  useGlobalSetup();
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <OverviewSection />
      <IndustrySection />
      <BrandSection />
      <AnsoffSection />
      <SurveySection />
      <InterviewSection />
      <PainPointsSection />
      <PersonaSection />
      <BlueprintSection />
      <ImplementationSection />
      <ClosingSection />
    </>
  );
}
