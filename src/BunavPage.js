import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const BN = {
  orange:  '#EE5923',
  pink:    '#F281A8',
  blue:    '#0081AA',
  yellow:  '#F9A11B',
  teal:    '#006457',
  grey:    '#DDDCDC',
  bg:      '#FDFAF5',
  bgWarm:  '#FDF6EE',
  black:   '#1A1A1A',
  muted:   '#6B6B6B',
  border:  'rgba(26,26,26,0.12)',
};

const F = {
  display: "'Filson Pro', 'Georgia', serif",
  body:    "'Filson Pro', 'Georgia', serif",
  deva:    "'Mukta', sans-serif",
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
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };
}

function useGlobalSetup() {
  useEffect(() => {
    if (!document.querySelector('style[data-bunav-cursor]')) {
      const style = document.createElement('style');
      style.setAttribute('data-bunav-cursor', '');
      style.textContent = `body.bunav-page, body.bunav-page *, body.bunav-page *::before, body.bunav-page *::after { cursor: default !important; }`;
      document.head.appendChild(style);
    }
    document.body.classList.add('bunav-page');
    if (!document.querySelector('link[data-bunav-fonts]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap';
      link.setAttribute('data-bunav-fonts', '');
      document.head.appendChild(link);
    }
    const prev = document.body.style.cssText;
    document.body.style.background = BN.bg;
    document.body.style.cursor = 'default';
    return () => {
      document.body.style.cssText = prev;
      document.body.classList.remove('bunav-page');
    };
  }, []);
}

const FI = "'Inter', sans-serif";

// ─── S1: HERO ─────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ width: '100%', background: '#EDECEA', lineHeight: 0 }}>
      <img
        src="/projects/bunav/hero.jpg"
        alt="Bunav — Your Inner Child, Their Guide"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </section>
  );
}

// ─── S2: PROJECT OVERVIEW ─────────────────────────────────────────────────────
function ProjectOverviewSection() {
  const teal = '#006457';
  const grey = '#9A9896';
  const dark = '#1C1C1A';
  const mutedLabel = '#ADADAD';

  return (
    <section style={{ background: '#F5F4F0', fontFamily: FI, position: 'relative' }}>
      {/* teal top bar */}
      <div style={{ height: '8px', background: teal, width: '100%' }} />

      {/* nav row */}
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400, letterSpacing: '0.01em' }}>About the Project</span>
      </div>

      {/* main content */}
      <div style={{ padding: '48px 72px 0' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(32px, 3.6vw, 52px)', color: dark, margin: '0 0 40px', letterSpacing: '-0.01em' }}>
          Project Overview
        </h2>

        <p style={{ fontFamily: FI, fontSize: 'clamp(20px, 2.2vw, 34px)', lineHeight: 1.45, color: grey, margin: 0, maxWidth: '1100px' }}>
          Bunav is a parent–child relationship app that turns parents' childhood memories into meaningful activities for their children. Rooted in the{' '}
          <span style={{ color: teal, fontWeight: 400 }}>idea of the </span>
          <em style={{ color: teal, fontStyle: 'italic' }}>inner child</em>
          <span style={{ color: grey }}>, it helps parents reconnect with their past, reflect on early experiences, and pass on lessons through </span>
          <em style={{ color: dark, fontStyle: 'italic' }}>play, exploration, and reflection.</em>
          <span style={{ color: dark }}> Strengthening bonds and supporting holistic growth.</span>
        </p>
      </div>

      {/* metadata row */}
      <div style={{ display: 'flex', gap: '80px', padding: '64px 72px 0', maxWidth: '900px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ fontFamily: FI, fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: mutedLabel, textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: '2px' }}>Focus Area</span>
          <p style={{ fontFamily: FI, fontSize: '14px', color: grey, fontStyle: 'italic', lineHeight: 1.55, margin: 0, maxWidth: '220px' }}>
            Early childhood development (ECD) → physical, emotional, cognitive, social, creative well-being.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span style={{ fontFamily: FI, fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: mutedLabel, textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: '2px' }}>Key Intent</span>
          <p style={{ fontFamily: FI, fontSize: '14px', color: grey, fontStyle: 'italic', lineHeight: 1.55, margin: 0, maxWidth: '220px' }}>
            Create awareness + motivation + action that shifts mindsets and behaviors.
          </p>
        </div>
      </div>

      <div style={{ height: '48px' }} />
    </section>
  );
}

// ─── S3: PROJECT GOAL ─────────────────────────────────────────────────────────
function ProjectGoalSection() {
  const teal = '#006457';
  const dark = '#1C1C1A';
  const grey = '#5A5A58';
  const mutedLabel = '#ADADAD';

  const goals = [
    { n: '01', title: 'Reconnect',
      body: <>Encouraging parents to reconnect with their <strong>inner child.</strong></> },
    { n: '04', title: 'Engage',
      body: <>Creating enjoyable and <strong>habit-forming interactions</strong> between parents and children.</> },
    { n: '02', title: 'Translate',
      body: <>Transforming parents&apos; <strong>memories into meaningful activities</strong> for their children.</> },
    { n: '05', title: 'Preserve',
      body: <><strong>Passing down</strong> stories, traditions, and generational values.</> },
    { n: '03', title: 'Develop',
      body: <>Fostering cognitive, motor, and socio-emotional <strong>growth in children.</strong></> },
    { n: '06', title: 'Access',
      body: <>Making early childhood development learning joyful and easy to <strong>integrate into daily life.</strong></> },
  ];

  return (
    <section style={{ background: '#F8F7F3', fontFamily: FI }}>
      {/* pink top bar */}
      <div style={{ height: '8px', background: '#F281A8', width: '100%' }} />

      {/* nav row */}
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>Design Goal</span>
      </div>

      {/* heading */}
      <div style={{ padding: '40px 72px 0' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(28px, 3vw, 48px)', color: dark, margin: 0, letterSpacing: '-0.01em' }}>
          Project Goal
        </h2>
      </div>

      {/* 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', padding: '56px 72px 0', maxWidth: '1200px' }}>
        {goals.map((g) => (
          <div key={g.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '0 80px 48px 0' }}>
            {/* circle */}
            <div style={{
              width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%',
              border: `1.5px solid ${teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FI, fontSize: '13px', fontWeight: 500, color: teal, lineHeight: 1,
            }}>
              {g.n}
            </div>
            {/* text */}
            <div>
              <div style={{ fontFamily: FI, fontSize: 'clamp(18px, 1.8vw, 26px)', fontWeight: 400, color: dark, marginBottom: '6px' }}>{g.title}</div>
              <div style={{ fontFamily: FI, fontSize: '14px', color: grey, lineHeight: 1.55 }}>{g.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '48px' }} />
    </section>
  );
}

// ─── S4: RELATIONSHIP DESIGN ──────────────────────────────────────────────────
function RelationshipDesignSection() {
  const teal  = '#006457';
  const dark  = '#1C1C1A';
  const grey  = '#9A9896';
  const orange = '#EE5923';
  const bg    = '#F5F4F0';
  const inter = 'Inter, sans-serif';
  const mid   = '#4A4A48';

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: teal, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>About the Project</span>
      </div>

      <svg viewBox="0 0 1400 780" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* ── Title ── */}
        <text x="110" y="155" fontFamily={inter} fontSize="58" fontWeight="700" fill={dark}>Parent-Child</text>
        <text x="110" y="220" fontFamily={inter} fontSize="58" fontWeight="400" fill={grey}>Relationship</text>
        <text x="110" y="285" fontFamily={inter} fontSize="58" fontWeight="400" fill={grey}>Design</text>

        {/* ── Large connecting ring ── */}
        <circle cx="800" cy="390" r="258" fill="none" stroke="#C8C8C8" strokeWidth="1.2" />

        {/* ── Horizontal dashed divider ── */}
        <line x1="0" y1="390" x2="1400" y2="390" stroke="#C8C8C8" strokeWidth="1" strokeDasharray="6,5" />

        {/* ── Side labels ── */}
        <text x="1385" y="380" fontFamily={inter} fontSize="19" fontWeight="300" fill={dark} textAnchor="end">Desired Outcome</text>
        <text x="1385" y="412" fontFamily={inter} fontSize="19" fontWeight="300" fill={dark} textAnchor="end">Deeper Consideration</text>

        {/* ── Center italic quote ── */}
        <text fontFamily={inter} fontSize="15.5" fontStyle="italic" fill={grey} textAnchor="middle">
          <tspan x="800" y="328">Through reconnecting with their</tspan>
          <tspan x="800" dy="23"><tspan fontWeight="700" fill={mid}>Inner Child</tspan>, parents nurture</tspan>
          <tspan x="800" dy="23">themselves and build deeper,</tspan>
          <tspan x="800" dy="23"><tspan fontWeight="700" fill={mid}>mindful bonds</tspan> with their children</tspan>
          <tspan x="800" dy="23">—this is <tspan fontWeight="700" fill={mid}>the heart of Bunav.</tspan></tspan>
        </text>

        {/* ── Bonding — top ── */}
        <circle cx="800" cy="132" r="66" fill={bg} stroke={dark} strokeWidth="1.5" />
        <text x="800" y="132" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Bonding</text>

        {/* ── Parents — left ── */}
        <circle cx="542" cy="390" r="80" fill={bg} stroke={dark} strokeWidth="1.5" />
        <text x="542" y="390" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Parents</text>

        {/* ── Child — right ── */}
        <circle cx="1058" cy="390" r="80" fill={bg} stroke={dark} strokeWidth="1.5" />
        <text x="1058" y="390" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Child</text>

        {/* ── Memory — lower left ── */}
        <circle cx="617" cy="572" r="65" fill={bg} stroke={dark} strokeWidth="1.5" />
        <text x="617" y="572" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Memory</text>

        {/* ── Reflection — lower right ── */}
        <circle cx="983" cy="572" r="65" fill={bg} stroke={dark} strokeWidth="1.5" />
        <text x="983" y="572" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Reflection</text>

        {/* ── Inner Child — bottom, orange ── */}
        <circle cx="800" cy="648" r="72" fill={bg} stroke={orange} strokeWidth="2.5" />
        <text x="800" y="648" fontFamily={inter} fontSize="19" fill={dark} textAnchor="middle" dominantBaseline="middle">Inner Child</text>
      </svg>

      <div style={{ height: '40px' }} />
    </section>
  );
}

// ─── S5: INSPIRATION QUOTE ────────────────────────────────────────────────────
function InspirationSection() {
  const blue = '#0081AA';
  const grey = '#9A9896';
  const bg   = '#F5F4F0';

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: BN.yellow, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>Inspiration</span>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '120px 100px 140px', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: FI, fontSize: 'clamp(24px, 2.8vw, 44px)', fontWeight: 400,
          color: blue, lineHeight: 1.45, margin: '0 0 36px', maxWidth: '1100px',
        }}>
          "So much of the healing of our world begins in healing the{' '}
          <em style={{ fontStyle: 'italic' }}>inner child</em>{' '}
          who rarely, if ever, got to come out and play."
        </p>
        <span style={{
          fontFamily: FI, fontSize: '13px', fontWeight: 500,
          letterSpacing: '0.14em', color: grey, textTransform: 'uppercase',
        }}>
          — Vince Gowmon
        </span>
      </div>
    </section>
  );
}

// ─── S6: SECONDARY RESEARCH ───────────────────────────────────────────────────
function SecondaryResearchSection() {
  const yellow = '#F9A11B';
  const dark   = '#1C1C1A';
  const grey   = '#7A7A78';
  const bg     = '#F5F4F0';

  const findings = [
    {
      n: '01',
      body: <>"Early childhood experiences from <strong>birth to age 8</strong> affect the development of the brain's architecture, which provides the <strong>foundation for all future learning, behavior and health</strong>."</>,
      logo: '/projects/bunav/logos/nc-dept.png',
      label: 'NC Department of Health and Human Services',
    },
    {
      n: '02',
      body: <>"It is important to convey the relevant messages in ways that can be <strong>understood</strong> and consistently acted upon."</>,
      logo: '/projects/bunav/logos/nber.png',
      label: 'National Bureau of Economic Research',
    },
    {
      n: '03',
      body: <>"Early childhood education (ECE) plays a vital role in children's development. It provides a <strong>strong foundation for later academic, social, and emotional growth</strong>."</>,
      logo: '/projects/bunav/logos/apu.png',
      label: 'American Public University',
    },
    {
      n: '04',
      body: <>"In this way, the integration of <strong>AI into the early childhood field</strong> not only helps professionals by improving efficiency but also opens doors to <strong>more personalized learning experiences</strong> that can make a meaningful difference in the lives of all children."</>,
      logo: '/projects/bunav/logos/zero-to-three.png',
      label: 'Zero to Three',
    },
    {
      n: '05',
      body: <>"Extending public investment to cover the crucial <strong>five-year window</strong> would add significant value to children's development, leveraging a brief but vital period to ensure all children lead happy, healthy lives."</>,
      logo: '/projects/bunav/logos/uwa.png',
      label: 'University of Western Australia',
    },
  ];

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: yellow, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>Secondary Research</span>
      </div>

      <div style={{ padding: '40px 72px 0' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 700, fontSize: 'clamp(26px, 2.8vw, 44px)', color: dark, margin: '0 4px 0', letterSpacing: '-0.01em', display: 'inline' }}>
          Early Childhood Development
        </h2>
        <br />
        <span style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(26px, 2.8vw, 44px)', color: yellow, letterSpacing: '-0.01em' }}>
          Secondary Research
        </span>
      </div>

      {/* 5-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0 24px', padding: '48px 72px 0' }}>
        {findings.map((f) => (
          <div key={f.n} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* circle number */}
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: `1.5px solid ${yellow}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: FI, fontSize: '13px', fontWeight: 500, color: yellow,
              marginBottom: '24px',
            }}>
              {f.n}
            </div>
            {/* quote */}
            <p style={{ fontFamily: FI, fontSize: '13px', color: grey, lineHeight: 1.6, margin: '0 0 32px', flexGrow: 1 }}>
              {f.body}
            </p>
            {/* logo */}
            <img src={f.logo} alt={f.label} style={{ height: '48px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '12px' }} />
            {/* source label */}
            <p style={{ fontFamily: FI, fontSize: '11px', color: grey, fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>{f.label}</p>
          </div>
        ))}
      </div>

      <div style={{ height: '60px' }} />
    </section>
  );
}

// ─── S7: PRIMARY RESEARCH ─────────────────────────────────────────────────────
function PrimaryResearchSection() {
  const pink = '#F281A8';
  const dark = '#1C1C1A';
  const grey = '#7A7A78';
  const bg   = '#F5F4F0';

  const interviews = [
    {
      quote: '"I want to make sure I spend quality time with my son, even though my work keeps me busy."',
      insight: 'Parents need tools that help them connect meaningfully with their children in limited time.',
      photo: '/projects/bunav/urvashi.png',
      name: 'Urvashi Yadav',
      age: 'Age 30',
      role: 'Sr. Pathologist at\nShivani Diagnostics',
      location: 'Indore, Madhya Pradesh',
    },
    {
      quote: "\u201cFormal schooling isn\u2019t enough for a child\u2019s holistic growth.\u201d",
      insight: 'Caregivers and educators value approaches that go beyond academics to nurture emotional, cognitive, and social development.',
      photo: '/projects/bunav/marnie.png',
      name: 'Marnie Batkhar',
      age: 'Age 46',
      role: 'Founder, Administrator and\nTeacher at Happy Feet School',
      location: 'Shillong, Meghalaya',
    },
    {
      quote: '"True independence comes from passing skills across generations, with technology helping parents nurture that growth."',
      insight: 'Parents value tools that let them guide children toward self-reliance while staying meaningfully connected.',
      photo: '/projects/bunav/vikas.png',
      name: 'Vikas Nimare',
      age: 'Age 35',
      role: 'Sub Divisional Officer\nat MPWRD',
      location: 'Rajgarh, Madhya Pradesh',
    },
  ];

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: pink, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>Primary Research</span>
      </div>

      <div style={{ padding: '36px 72px 0' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(28px, 3vw, 48px)', color: dark, margin: 0, letterSpacing: '-0.01em' }}>
          Key Insights
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 40px', padding: '48px 72px 0' }}>
        {interviews.map((p) => (
          <div key={p.name} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* text block — fixed height so photos align */}
            <div style={{ minHeight: '220px' }}>
              <p style={{ fontFamily: FI, fontSize: '15px', fontWeight: 700, color: dark, lineHeight: 1.5, margin: '0 0 16px' }}>
                {p.quote}
              </p>
              <p style={{ fontFamily: FI, fontSize: '14px', color: grey, lineHeight: 1.6, margin: 0 }}>
                <em>Insight:</em> {p.insight}
              </p>
            </div>
            {/* photo */}
            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'center top', display: 'block', margin: '24px 0 12px' }} />
            {/* name + age */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontFamily: FI, fontSize: '13px', fontStyle: 'italic', color: dark }}>{p.name}</span>
              <span style={{ fontFamily: FI, fontSize: '13px', fontWeight: 600, color: dark }}>{p.age}</span>
            </div>
            {/* role */}
            <p style={{ fontFamily: FI, fontSize: '13px', color: dark, textAlign: 'right', lineHeight: 1.45, margin: '0 0 4px', whiteSpace: 'pre-line' }}>{p.role}</p>
            {/* location */}
            <p style={{ fontFamily: FI, fontSize: '12px', color: grey, textAlign: 'right', margin: 0 }}>{p.location}</p>
          </div>
        ))}
      </div>

      <div style={{ height: '60px' }} />
    </section>
  );
}

// ─── S8: TARGET AUDIENCE ──────────────────────────────────────────────────────
function TargetAudienceSection() {
  const blue  = '#0081AA';
  const dark  = '#1C1C1A';
  const grey  = '#9A9896';
  const bg    = '#F5F4F0';

  const bullets = [
    "Want to be present and involved in their child's growth, but often lack time.",
    "Curious about their child's development",
    'Seek guidance, want reassurance that they\'re "doing it right."',
  ];

  const tags = ['Multitaskers', 'Nurturers', 'Protectors', 'Guides', 'Connectors'];

  return (
    <section style={{ background: bg, fontFamily: FI, display: 'flex', minHeight: '600px' }}>
      {/* Left — full-bleed photo */}
      <div style={{ width: '34%', minWidth: '34%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', background: blue, zIndex: 2 }} />
        <img
          src="/projects/bunav/target-audience.png"
          alt="Mother and daughter"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Right — content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 72px 48px 56px', position: 'relative' }}>
        {/* blue top bar (right side) */}
        <div style={{ height: '8px', background: blue, margin: '0 -72px 0 -56px' }} />

        <div style={{ padding: '28px 0 0' }}>
          <span style={{ fontSize: '13px', color: grey }}>Target Audience</span>
        </div>

        <h2 style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(24px, 2.4vw, 38px)', color: dark, margin: '28px 0 32px', letterSpacing: '-0.01em' }}>
          Target Audience
        </h2>

        <p style={{ fontFamily: FI, fontSize: 'clamp(18px, 2vw, 30px)', fontWeight: 400, color: grey, lineHeight: 1.4, margin: '0 0 80px' }}>
          <strong style={{ color: blue }}>Parents and caregivers</strong>{' '}of children in the early years (3–8 years).
        </p>

        {/* bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '3px', minWidth: '3px', background: blue, alignSelf: 'stretch', borderRadius: '2px' }} />
              <p style={{ fontFamily: FI, fontSize: '15px', color: grey, lineHeight: 1.55, margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>

        {/* tags */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontFamily: FI, fontSize: '14px', color: '#fff',
              background: blue, borderRadius: '9999px',
              padding: '8px 22px', fontWeight: 400,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── S9: USER PERSONA ─────────────────────────────────────────────────────────
function UserPersonaSection() {
  const yellow = '#F9A11B';
  const blue   = '#0081AA';
  const dark   = '#1C1C1A';
  const grey   = '#7A7A78';
  const bg     = '#F5F4F0';

  const Label = ({ text }) => (
    <div style={{ fontFamily: FI, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: dark, marginBottom: '8px' }}>{text}</div>
  );
  const UL = ({ items }) => (
    <ul style={{ margin: 0, paddingLeft: '16px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '3px' }}>{item}</li>
      ))}
    </ul>
  );

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: yellow, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey }}>User Research</span>
      </div>
      <div style={{ padding: '28px 72px 32px' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(28px, 3vw, 48px)', color: dark, margin: 0 }}>User Persona</h2>
      </div>

      {/* Main layout: left half (photo + info) | right half (needs/challenges/opportunities) */}
      <div style={{ display: 'flex', gap: '48px', padding: '0 72px' }}>

        {/* LEFT: photo + info */}
        <div style={{ display: 'flex', gap: '28px', flex: '0 0 46%' }}>
          <img src="/projects/bunav/rajesh.png" alt="Rajesh Sharma"
            style={{ width: '190px', minWidth: '190px', height: '460px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '12px', display: 'block' }} />
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <Label text="NAME" />
              <div style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.55 }}>Rajesh Sharma (38 years, Middle-class, IT professional in Pune)</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Label text="KEY ATTRIBUTES" />
              <UL items={[
                'Caring, practical, but often busy with work',
                "Values education and wants to be more involved in his child's growth",
                'Nostalgic about his own childhood games and cultural traditions.',
              ]} />
            </div>
            <div>
              <Label text="SHORT DESCRIPTION" />
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}><strong>Background:</strong> Works in IT, long hours, limited time for family activities.</li>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}><strong>Personality:</strong> Responsible, rational, emotionally reserved, but loves bonding moments with his child.</li>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65 }}><strong>Learning Style:</strong> Enjoys structured guidance and prefers tools that simplify parenting.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: needs + challenges row, then opportunities */}
        <div style={{ flex: 1 }}>
          {/* Row 1: NEEDS | CHALLENGES */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px', marginBottom: '32px' }}>
            <div>
              <Label text="NEEDS" />
              <UL items={[
                'Simple, time-efficient ways to engage with child',
                'Activities that connect family time with cultural values',
                'Support in balancing work and parenting',
              ]} />
            </div>
            <div>
              <Label text="CHALLENGES" />
              <UL items={[
                'Limited free time',
                'Finds it hard to come up with creative activities',
                'Feels disconnected when relying only on academic-focused interactions',
              ]} />
            </div>
          </div>

          {/* Row 2: OPPORTUNITIES spanning full right */}
          <div>
            <Label text="OPPORTUNITIES" />
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              {[
                ['Quick Memory Prompts', 'Enables him to recall stories/experiences quickly'],
                ['Skill-Based Activities', 'Converts his memories into meaningful play'],
                ['Cultural Story Archive', 'Lets him share values without needing much prep'],
                ['Bonding Activities', 'Strengthens emotional connection with child'],
              ].map(([bold, rest]) => (
                <li key={bold} style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}>
                  <strong>{bold}</strong> → {rest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quote — aligned to right column */}
      <div style={{ display: 'flex', gap: '48px', padding: '8px 72px 48px' }}>
        <div style={{ flex: '0 0 46%' }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: FI, fontSize: '15px', fontStyle: 'italic', fontWeight: 600, color: blue, lineHeight: 1.6, margin: 0 }}>
            "I want to give my child more than just studies, something from my own childhood, but I need easy ways to do it."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── S10: USER PERSONA 2 ──────────────────────────────────────────────────────
function UserPersona2Section() {
  const pink   = '#F281A8';
  const dark   = '#1C1C1A';
  const grey   = '#7A7A78';
  const bg     = '#F5F4F0';

  const Label = ({ text }) => (
    <div style={{ fontFamily: FI, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: dark, marginBottom: '8px' }}>{text}</div>
  );
  const UL = ({ items }) => (
    <ul style={{ margin: 0, paddingLeft: '16px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '3px' }}>{item}</li>
      ))}
    </ul>
  );

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      <div style={{ height: '8px', background: pink, width: '100%' }} />
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey }}>User Research</span>
      </div>
      <div style={{ padding: '28px 72px 32px' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(28px, 3vw, 48px)', color: dark, margin: 0 }}>User Persona</h2>
      </div>

      <div style={{ display: 'flex', gap: '48px', padding: '0 72px' }}>
        {/* LEFT: photo + info */}
        <div style={{ display: 'flex', gap: '28px', flex: '0 0 46%' }}>
          <img src="/projects/bunav/anjali.png" alt="Anjali Verma"
            style={{ width: '190px', minWidth: '190px', height: '460px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '12px', display: 'block' }} />
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <Label text="NAME" />
              <div style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.55 }}>Anjali Verma (35 years, Upper-middle-class, Teacher in Delhi)</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Label text="KEY ATTRIBUTES" />
              <UL items={[
                'Nurturing, reflective, and detail-oriented',
                'Enjoys storytelling and passing down family traditions',
                'Seeks creative and emotionally rich ways to connect with her child',
              ]} />
            </div>
            <div>
              <Label text="SHORT DESCRIPTION" />
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}><strong>Background:</strong> School teacher, manages work and home; values holistic child development.</li>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}><strong>Personality:</strong> Empathetic, expressive, enjoys nostalgia and family bonding.</li>
                <li style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65 }}><strong>Learning Style:</strong> Prefers interactive, story-driven learning with emotional depth.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: needs + challenges, then opportunities */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px', marginBottom: '32px' }}>
            <div>
              <Label text="NEEDS" />
              <UL items={[
                'Prompts that spark emotional memories',
                "Activities that foster her child's creativity and social-emotional growth",
                'Ways to preserve family stories for future generations',
              ]} />
            </div>
            <div>
              <Label text="CHALLENGES" />
              <UL items={[
                'Sometimes feels repetitive with daily play/learning routines',
                'Balancing nurturing with discipline',
                'Needs fresh, inspiring activities to keep child engaged',
              ]} />
            </div>
          </div>
          <div>
            <Label text="OPPORTUNITIES" />
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              {[
                ['Memory-to-Activity Conversion', 'Turns her stories into fun, skill-building activities'],
                ['Emotional Bonding Prompts', 'Encourages reflective, heartfelt conversations'],
                ['Generational Values Feature', 'Helps her pass down cultural stories seamlessly'],
                ['Creative Play Ideas', 'Keeps child engaged in joyful learning'],
              ].map(([bold, rest]) => (
                <li key={bold} style={{ fontFamily: FI, fontSize: '13px', color: dark, lineHeight: 1.65, marginBottom: '4px' }}>
                  <strong>{bold}</strong> → {rest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div style={{ display: 'flex', gap: '48px', padding: '8px 72px 48px' }}>
        <div style={{ flex: '0 0 46%' }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: FI, fontSize: '15px', fontStyle: 'italic', fontWeight: 600, color: pink, lineHeight: 1.6, margin: 0 }}>
            "I want my child to feel the same warmth and stories I grew up with, but in a way that fits today's world."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── S11: KEY CONSIDERATIONS ──────────────────────────────────────────────────
function KeyConsiderationsSection() {
  const blue  = '#0081AA';
  const dark  = '#1C1C1A';
  const grey  = '#6B6B6B';
  const bg    = '#F5F4F0';

  const left = [
    {
      n: '01',
      title: 'Utility',
      body: <>Translates memories into <strong>skill-building activities</strong> for children, provides journaling to track progress, and an Explore page to learn more.</>,
    },
    {
      n: '02',
      title: 'Impact',
      body: <>Educates parents on <strong>early childhood development</strong> and its importance through a curated Explore page.</>,
    },
    {
      n: '03',
      title: 'Accessible',
      body: <>A <strong>digital platform</strong> that's available to all, with an easy, playful, and comfortable UI.</>,
    },
  ];

  const right = [
    {
      n: '04',
      title: 'Innovation',
      body: <>Enables healing and connection to the <strong>Inner Child</strong> by reliving memories, <strong>bringing the concept into a practical, digital reality.</strong></>,
    },
    {
      n: '05',
      title: 'Emotional Quotient',
      body: <>Fosters nostalgia, <strong>meaningful bonding</strong>, spending quality time together, and creating new shared memories.</>,
    },
    {
      n: '06',
      title: 'Reality of Production',
      body: <>Technically and economically feasible using <strong>existing app frameworks and digital distribution.</strong></>,
    },
  ];

  return (
    <section style={{ background: bg, fontFamily: FI }}>
      {/* blue top bar */}
      <div style={{ height: '8px', background: blue, width: '100%' }} />

      {/* nav row */}
      <div style={{ padding: '28px 72px 0' }}>
        <span style={{ fontSize: '13px', color: grey, fontWeight: 400 }}>Our Focus</span>
      </div>

      {/* heading */}
      <div style={{ padding: '36px 72px 0' }}>
        <h2 style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(28px, 3vw, 48px)', color: dark, margin: 0, letterSpacing: '-0.01em' }}>
          Key Considerations
        </h2>
      </div>

      {/* 3-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0 40px', padding: '0 72px 72px', alignItems: 'center' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {left.map((item) => (
            <div key={item.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', minWidth: '48px', borderRadius: '50%',
                border: `1.5px solid ${blue}`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: FI, fontSize: '13px', fontWeight: 500, color: blue,
              }}>
                {item.n}
              </div>
              <div>
                <div style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(20px, 2vw, 28px)', color: dark, marginBottom: '8px' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: FI, fontSize: '14px', color: grey, lineHeight: 1.6, maxWidth: '300px' }}>
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center — hexagon image */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/projects/bunav/hexagon.png"
            alt="Key Considerations hexagon"
            style={{ width: 'clamp(320px, 32vw, 480px)', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {right.map((item) => (
            <div key={item.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', minWidth: '48px', borderRadius: '50%',
                border: `1.5px solid ${blue}`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: FI, fontSize: '13px', fontWeight: 500, color: blue,
              }}>
                {item.n}
              </div>
              <div>
                <div style={{ fontFamily: FI, fontWeight: 400, fontSize: 'clamp(20px, 2vw, 28px)', color: dark, marginBottom: '8px' }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: FI, fontSize: '14px', color: grey, lineHeight: 1.6, maxWidth: '300px' }}>
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BunavPage() {
  useGlobalSetup();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: F.body, background: BN.bg, minHeight: '100vh', color: BN.black }}>
      <HeroSection />
      <ProjectOverviewSection />
      <ProjectGoalSection />
      <RelationshipDesignSection />
      <InspirationSection />
      <SecondaryResearchSection />
      <PrimaryResearchSection />
      <TargetAudienceSection />
      <UserPersonaSection />
      <UserPersona2Section />
      <KeyConsiderationsSection />
    </div>
  );
}
