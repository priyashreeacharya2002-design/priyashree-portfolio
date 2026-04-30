import { useEffect } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  @font-face { font-family: 'Agate'; src: url('/fonts/ember/Agate-Bold-Italic.ttf') format('truetype'); font-weight: 700; font-style: italic; }
  @font-face { font-family: 'QTAgate'; src: url('/fonts/ember/QTAgateType-Bold.otf') format('opentype'); font-weight: 700; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-SemiBold.ttf') format('truetype'); font-weight: 600; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-Light.ttf') format('truetype'); font-weight: 300; font-style: normal; }
  @font-face { font-family: 'Work Sans'; src: url('/fonts/ember/WorkSans-Italic-VariableFont_wght.ttf') format('truetype'); font-weight: 400; font-style: italic; }
  @font-face { font-family: 'Sprat'; src: url('/fonts/ember/Sprat-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
  @font-face { font-family: 'Sprat'; src: url('/fonts/ember/Sprat-Bold.otf') format('opentype'); font-weight: 700; font-style: normal; }
`;

const EM = {
  cream:  '#fffff1',
  orange: '#f28c32',
  purple: '#503554',
  body:   '#21211f',
};

function useGlobalSetup() {
  useEffect(() => {
    if (!document.querySelector('style[data-ember-cursor]')) {
      const s = document.createElement('style');
      s.setAttribute('data-ember-cursor', '');
      s.textContent = `body.ember-page, body.ember-page *, body.ember-page *::before, body.ember-page *::after { cursor: default !important; }`;
      document.head.appendChild(s);
    }
    document.body.classList.add('ember-page');
    const prev = document.body.style.cssText;
    document.body.style.cursor = 'default';
    return () => {
      document.body.style.cssText = prev;
      document.body.classList.remove('ember-page');
    };
  }, []);
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{
      width: '100%',
      height: '50vh',
      backgroundImage: 'url(/projects/ember/hero-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src="/projects/ember/ember-logo.gif"
        alt="Ember logo"
        style={{ width: 'clamp(154px, 19.6vw, 294px)', height: 'auto', display: 'block', margin: '0 auto', position: 'relative', left: '3%' }}
      />
    </section>
  );
}

// ─── PROJECT OVERVIEW + DESIGN PROCESS ───────────────────────────────────────
function OverviewSection() {
  const phases = [
    {
      label: 'Market Study',
      items: ['Market Segment', 'Market Landscape', 'Competitor Analysis', 'SWOT Analysis'],
    },
    {
      label: 'Brand Strategy',
      items: ['Brand Positioning', 'Brand Story', 'Brand Values', 'Target Audience'],
    },
    {
      label: 'Visual Identity',
      items: ['Logo Design', 'Typography', 'Colour', 'Print Media and Ads'],
    },
    {
      label: 'User Experience',
      items: ['User Persona', 'Card Sorting', 'Information Architecture', 'User Interface'],
    },
  ];

  return (
    <section style={{ background: EM.cream, padding: '72px 0 96px', textAlign: 'center' }}>
      <style>{FONTS}</style>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Agate', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 700,
        fontSize: '13px',
        color: EM.orange,
        maxWidth: '480px',
        margin: '0 auto 120px',
        lineHeight: 1.5,
        padding: '0 24px',
      }}>
        A mental wellness brand and app designed for young professionals
        to build mental strength, productivity, and emotional resilience.
      </p>

      {/* Project Overview heading */}
      <h2 style={{
        fontFamily: "'QTAgate', Georgia, serif",
        fontWeight: 700,
        fontSize: '28px',
        color: EM.purple,
        margin: '0 0 56px',
        letterSpacing: '0.01em',
      }}>
        Project Overview
      </h2>

      {/* Body */}
      <p style={{
        fontFamily: "'Work Sans', Arial, sans-serif",
        fontWeight: 400,
        fontSize: '15px',
        color: EM.body,
        maxWidth: '620px',
        margin: '0 auto 130px',
        lineHeight: 1.75,
        padding: '0 24px',
        textAlign: 'center',
      }}>
        To design a mental wellness brand and app that repositions mental health from
        being associated with weakness or recovery to being seen as a foundation for growth
        and strength. The goal is to create a solution that empowers young professionals to
        build mental resilience and emotional well-being through thoughtful design,
        accessible tools, and a positive brand narrative.
      </p>

      {/* Design Process heading */}
      <h2 style={{
        fontFamily: "'QTAgate', Georgia, serif",
        fontWeight: 700,
        fontSize: '32px',
        color: EM.purple,
        margin: '0 0 72px',
        letterSpacing: '0.01em',
      }}>
        Design Process
      </h2>

      {/* Timeline */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 40px' }}>

        {/* Phase labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '10px' }}>
          {phases.map((p) => (
            <div key={p.label} style={{
              fontFamily: "'Work Sans', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: EM.orange,
              textAlign: 'center',
            }}>
              {p.label}
            </div>
          ))}
        </div>

        {/* Dot + line */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '12.5%',
            right: '12.5%',
            height: '1px',
            background: EM.purple,
            transform: 'translateY(-50%)',
          }} />
          {phases.map((p) => (
            <div key={p.label} style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: EM.purple }} />
            </div>
          ))}
        </div>

        {/* Sub-items */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 8px' }}>
          {phases.map((p) => (
            <div key={p.label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {p.items.map((item) => (
                <div key={item} style={{
                  fontFamily: "'Work Sans', Arial, sans-serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '13px',
                  color: EM.body,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MARKET SEGMENT ───────────────────────────────────────────────────────────
function MarketSegmentSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const O = ({ children }) => (
    <span style={{ color: EM.orange, fontWeight: 700 }}>{children}</span>
  );

  const SectionTitle = ({ title, citation }) => (
    <div style={{ marginBottom: '36px' }}>
      <div style={{ fontFamily: QT, fontWeight: 700, fontSize: '16px', color: EM.body, marginBottom: '4px' }}>{title}</div>
      <div style={{ fontFamily: WS, fontStyle: 'italic', fontSize: '12px', color: EM.body }}>{citation}</div>
    </div>
  );

  const Divider = () => (
    <div style={{ height: '1px', background: '#ddd0b8', margin: '48px 0' }} />
  );

  // Each item = icon + caption, rendered in a 4-col grid cell
  const Item = ({ src, alt, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '84px', height: '84px', borderRadius: '12px',
        background: 'rgba(80,53,84,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={src} alt={alt} style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
      </div>
      <p style={{
        fontFamily: WS, fontSize: '13px', color: EM.body,
        textAlign: 'center', lineHeight: 1.55, margin: 0, maxWidth: '160px',
      }}>
        {children}
      </p>
    </div>
  );

  return (
    <section style={{ background: EM.cream, padding: '72px 80px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '28px',
        color: EM.purple, textAlign: 'center', margin: '0 0 10px', letterSpacing: '0.01em',
      }}>
        Market Segment
      </h2>
      <p style={{
        fontFamily: AG, fontStyle: 'italic', fontWeight: 700,
        fontSize: '15px', color: EM.orange, textAlign: 'center', margin: '0 0 56px',
      }}>
        Why Mental Health Segment?
      </p>

      {/* ── Global Health Crisis ── */}
      <SectionTitle
        title="Global Health Crisis"
        citation="World Health Organization (Fact Sheet on Depression 2017, Mental disorder 2025, Suicide 2021)"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 24px' }}>
        <Item src="/projects/ember/icons/three.png" alt="1 in 3">
          Mental illness causes <O>1/3</O> of adult health-related disabilities globally.
        </Item>
        <Item src="/projects/ember/icons/statistics.png" alt="Silent pandemic">
          Labeled the 21st century's <O>silent pandemic</O> with massive social and economic impact.
        </Item>
        <Item src="/projects/ember/icons/suicide.png" alt="Suicide rate">
          Suicide is the <O>2nd leading cause of death</O> among 15–29-year-olds.
        </Item>
        <Item src="/projects/ember/icons/people.png" alt="350 million">
          <O>350 million</O> people experience depression annually.
        </Item>
      </div>

      <Divider />

      {/* ── Productivity & Economic Burden ── */}
      <SectionTitle
        title="Productivity & Economic Burden"
        citation="World Health Organization (2017), Deloitte (2022)"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 24px', maxWidth: '75%', margin: '0 auto' }}>
        <Item src="/projects/ember/icons/report.png" alt="Productivity loss">
          Depression causes a <O>$1 trillion</O> global productivity loss annually.
        </Item>
        <Item src="/projects/ember/icons/loss.png" alt="India loss">
          In India alone, mental health issues are projected to cause a <O>$1.03 trillion loss</O> (2012–2030).
        </Item>
        <Item src="/projects/ember/icons/resilience.png" alt="14 billion">
          Deloitte India reports a <O>$14 billion loss</O> due to poor mental health at work.
        </Item>
      </div>

      <Divider />

      {/* ── Workplace Impact ── */}
      <SectionTitle
        title="Workplace Impact"
        citation="A survey by Deloitte in India (2022)"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 24px' }}>
        <Item src="/projects/ember/icons/fear.png" alt="Workplace stress">
          <O>47% cite workplace stress</O> as a key mental health factor.
        </Item>
        <Item src="/projects/ember/icons/bipolar.png" alt="Mental health issues">
          <O>80%</O> faced mental health issues (2020–2021)
        </Item>
        <Item src="/projects/ember/icons/stigma.png" alt="Stigma">
          <O>39%</O> didn't seek help due to <O>stigma</O>
        </Item>
        <Item src="/projects/ember/icons/resign.png" alt="Resigned">
          29% took time off, <O>20% resigned</O>
        </Item>
      </div>

    </section>
  );
}

// ─── MARKET LANDSCAPE ─────────────────────────────────────────────────────────
function MarketLandscapeSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const cards = [
    {
      title: 'Market Value',
      isValue: true,
      desc: '$4.5B+ and growing rapidly.',
    },
    {
      title: 'Digital Growth',
      icon: '/projects/ember/icons/internet-marketing.png',
      desc: 'Rise of mental wellness apps and platforms post-pandemic.',
    },
    {
      title: 'Cost',
      icon: '/projects/ember/icons/decrease.png',
      desc: 'Projected loss of $1.03 trillion by 2030 due to untreated mental health issues.',
    },
    {
      title: 'Stigma',
      icon: '/projects/ember/icons/stigma2.png',
      desc: 'High social stigma prevents people from seeking help.',
    },
    {
      title: 'Gap',
      icon: '/projects/ember/icons/demand.png',
      desc: 'Massive demand-supply mismatch—only 0.75 psychiatrists per 100,000 people.',
    },
  ];

  return (
    <section style={{ background: EM.cream, padding: '72px 60px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '28px',
        color: EM.purple, textAlign: 'center', margin: '0 0 10px', letterSpacing: '0.01em',
      }}>
        Market Landscape
      </h2>
      <p style={{
        fontFamily: AG, fontStyle: 'italic', fontWeight: 700,
        fontSize: '15px', color: EM.orange, textAlign: 'center', margin: '0 0 56px',
      }}>
        Inside Mental Health Scenario
      </p>

      {/* 5 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0 16px', marginBottom: '64px' }}>
        {cards.map((card) => (
          <div key={card.title} style={{
            border: `1.5px solid rgba(80,53,84,0.25)`,
            borderRadius: '16px',
            padding: '20px 16px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minHeight: '280px',
          }}>
            {/* Card title */}
            <div style={{
              fontFamily: QT, fontWeight: 700, fontSize: '14px',
              color: EM.body, marginBottom: '24px',
            }}>
              {card.title}
            </div>

            {/* Icon or big value */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {card.isValue ? (
                <img
                  src="/projects/ember/icons/4-5b.png"
                  alt="$4.5B+"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              ) : (
                <img
                  src={card.icon}
                  alt={card.title}
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                />
              )}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: WS, fontSize: '12px', color: EM.body,
              textAlign: 'center', lineHeight: 1.6, margin: '20px 0 0', width: '100%',
            }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Opportunity */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '22px',
          color: EM.body, margin: '0 0 20px', letterSpacing: '0.01em',
        }}>
          Opportunity
        </h3>
        <p style={{
          fontFamily: WS, fontSize: '15px', color: EM.body,
          lineHeight: 1.7, margin: 0,
        }}>
          Need for accessible, growth-oriented, stigma-free mental wellness tools.
        </p>
      </div>
    </section>
  );
}

// ─── COMPETITOR ANALYSIS ──────────────────────────────────────────────────────
function CompetitorAnalysisSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const SubHeading = ({ children }) => (
    <p style={{
      fontFamily: WS, fontWeight: 400, fontSize: '18px',
      color: EM.body, textAlign: 'center', margin: '0 0 32px',
      letterSpacing: '0.01em',
    }}>
      {children}
    </p>
  );

  return (
    <section style={{ background: EM.cream, padding: '72px 40px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '28px',
        color: EM.purple, textAlign: 'center', margin: '0 0 10px', letterSpacing: '0.01em',
      }}>
        Understanding Competitor brands
      </h2>
      <p style={{
        fontFamily: AG, fontStyle: 'italic', fontWeight: 700,
        fontSize: '15px', color: EM.orange, textAlign: 'center', margin: '0 0 56px',
      }}>
        From the lens of Brand Identity Prism
      </p>

      {/* Major Global Brands */}
      <SubHeading>Major Global Brands</SubHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '56px' }}>
        <img src="/projects/ember/prism-calm.png" alt="Calm Brand Identity Prism" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <img src="/projects/ember/prism-headspace.png" alt="Headspace Brand Identity Prism" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* Major Indian Brands */}
      <SubHeading>Major Indian Brands</SubHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        <img src="/projects/ember/prism-kaha.png" alt="Kaha Mind Brand Identity Prism" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <img src="/projects/ember/prism-amaha.png" alt="Amaha Brand Identity Prism" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <img src="/projects/ember/prism-mindpeers.png" alt="Mindpeers Brand Identity Prism" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </section>
  );
}

// ─── COMPETITOR TABLE ──────────────────────────────────────────────────────────
function CompetitorTableSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  const brands = [
    { name: 'CALM',       logo: '/projects/ember/logo-calm.png' },
    { name: 'HEADSPACE',  logo: '/projects/ember/logo-headspace.png' },
    { name: 'AMAHA',      logo: '/projects/ember/logo-amaha.png' },
    { name: 'KAHA MIND',  logo: '/projects/ember/logo-kaha.png' },
    { name: 'MINDPEERS',  logo: '/projects/ember/logo-mindpeers.png' },
  ];

  // G = green dot, R = red dot  [calm, headspace, amaha, kaha, mindpeers]
  const rows = [
    { feature: 'Meditation',          dots: ['G','G','R','R','R'] },
    { feature: 'Therapy',             dots: ['R','R','G','G','G'] },
    { feature: 'Mental Fitness',      dots: ['R','R','R','R','G'] },
    { feature: 'Positive Psychology', dots: ['R','R','R','R','R'] },
    { feature: 'Productivity',        dots: ['R','R','R','R','G'] },
    { feature: 'Mood Tracking',       dots: ['R','R','G','G','G'] },
    { feature: 'Journaling',          dots: ['R','R','G','R','G'] },
    { feature: 'Guided Sessions',     dots: ['G','G','G','G','G'] },
    { feature: 'AI Insights',         dots: ['R','R','R','G','G'] },
    { feature: 'Sleep Tools',         dots: ['G','G','R','R','R'] },
    { feature: 'Community',           dots: ['R','R','G','R','G'] },
    { feature: 'Soothing Tone',       dots: ['G','G','R','R','R'] },
    { feature: 'Clinical Tone',       dots: ['R','R','G','G','R'] },
    { feature: 'Empowering Tone',     dots: ['R','R','R','R','G'] },
  ];

  const GREEN = '#5cb85c';
  const RED   = '#e05c5c';

  const Dot = ({ color }) => (
    <span style={{
      display: 'inline-block',
      width: 14, height: 14,
      borderRadius: '50%',
      background: color,
    }} />
  );

  const borderColor = `${EM.orange}88`;
  const cellBorder  = `1px solid ${borderColor}`;

  const cellStyle = {
    padding: '12px 8px',
    textAlign: 'center',
    borderRight: cellBorder,
    borderBottom: cellBorder,
    verticalAlign: 'middle',
  };

  const featureCellStyle = {
    ...cellStyle,
    textAlign: 'left',
    paddingLeft: '20px',
    fontFamily: WS,
    fontSize: '13px',
    color: EM.body,
    fontWeight: 400,
    minWidth: '160px',
  };

  return (
    <section style={{ background: EM.cream, padding: '72px 60px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '32px',
        color: EM.body, textAlign: 'center', margin: '0 0 48px', letterSpacing: '0.01em',
      }}>
        Competitor analysis
      </h2>

      {/* Table wrapper */}
      <div style={{
        border: `1.5px solid ${EM.orange}`,
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '64px',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
        }}>
          {/* Header */}
          <thead>
            <tr>
              {/* Empty first cell */}
              <th style={{
                ...cellStyle,
                borderTop: 'none',
                borderLeft: 'none',
                background: 'transparent',
                width: '22%',
              }} />
              {brands.map((b) => (
                <th key={b.name} style={{
                  ...cellStyle,
                  borderTop: 'none',
                  background: 'transparent',
                  fontFamily: WS,
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: EM.body,
                  padding: '20px 8px 16px',
                }}>
                  <img
                    src={b.logo}
                    alt={b.name}
                    style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto 10px' }}
                  />
                  {b.name}
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature}>
                <td style={{
                  ...featureCellStyle,
                  borderLeft: 'none',
                  borderBottom: i === rows.length - 1 ? 'none' : cellBorder,
                }}>
                  {row.feature}
                </td>
                {row.dots.map((dot, j) => (
                  <td key={j} style={{
                    ...cellStyle,
                    borderRight: j === row.dots.length - 1 ? 'none' : cellBorder,
                    borderBottom: i === rows.length - 1 ? 'none' : cellBorder,
                  }}>
                    <Dot color={dot === 'G' ? GREEN : RED} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '26px',
          color: EM.body, margin: '0 0 24px', letterSpacing: '0.01em',
        }}>
          Insights
        </h3>
        <p style={{
          fontFamily: WS, fontSize: '14px', color: EM.body,
          lineHeight: 1.75, margin: 0,
        }}>
          Insights from the Brand Identity Prism and Competitor analysis revealed a market gap.
          Most wellness brands address depression, anxiety, or focus on meditation and sleep.
          Few cater to individuals seeking better productivity, balance, and emotional resilience.{' '}
          <span style={{ color: EM.orange }}>
            There's a need for a brand that builds mental strength proactively, not reactively.
          </span>
        </p>
      </div>

    </section>
  );
}

// ─── SWOT ANALYSIS ────────────────────────────────────────────────────────────
function SwotSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  const headers = ['STRENGTH', 'WEAKNESS', 'OPPORTUNITY', 'THREAT'];

  const rows = [
    {
      logo: '/projects/ember/logo-calm.png',
      alt: 'Calm',
      strength: 'Strong brand recognition, Diverse content, User-friendly app',
      weakness: 'High subscription cost',
      opportunity: 'Global expansion, Partnerships',
      threat: 'Intense competition, Free alternatives',
    },
    {
      logo: '/projects/ember/logo-headspace.png',
      alt: 'Headspace',
      strength: 'Friendly branding, Accessible content, Focus on beginners',
      weakness: 'Limited personalization',
      opportunity: 'Corporate wellness programs, New collaborations',
      threat: 'Market saturation, Competitive pricing',
    },
    {
      logo: '/projects/ember/logo-kaha.png',
      alt: 'Kaha Mind',
      strength: 'Personalized therapy, Professional guidance, Inclusive branding',
      weakness: 'Limited awareness',
      opportunity: 'Expanding user base, Collaboration with corporates',
      threat: 'Stigma around therapy, Growing competition',
    },
    {
      logo: '/projects/ember/logo-mindpeers.png',
      alt: 'Mindpeers',
      strength: 'AI-driven wellness tools, Affordable services, Comprehensive mental health solutions.',
      weakness: 'Niche audience, Limited awareness',
      opportunity: 'Broader accessibility, Corporate partnerships',
      threat: 'Market competition, Brand differentiation',
    },
    {
      logo: '/projects/ember/logo-amaha.png',
      alt: 'Amaha',
      strength: 'Comprehensive services, Inclusive approach, Strong clinical foundation',
      weakness: 'Limited global recognition',
      opportunity: 'Partnerships with corporates, Growth in teletherapy',
      threat: 'Competitive market, User retention challenges',
    },
  ];

  const borderColor = `${EM.orange}88`;
  const cellBorder  = `1px solid ${borderColor}`;

  const headerCellStyle = {
    padding: '16px 14px',
    textAlign: 'center',
    borderRight: cellBorder,
    borderBottom: cellBorder,
    fontFamily: WS,
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.08em',
    color: EM.body,
  };

  const dataCellStyle = {
    padding: '20px 14px',
    textAlign: 'center',
    borderRight: cellBorder,
    fontFamily: WS,
    fontSize: '13px',
    color: EM.body,
    lineHeight: 1.6,
    fontWeight: 400,
    verticalAlign: 'middle',
  };

  return (
    <section style={{ background: EM.cream, padding: '72px 60px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '32px',
        color: EM.body, textAlign: 'center', margin: '0 0 48px', letterSpacing: '0.01em',
      }}>
        SWOT Analysis
      </h2>

      {/* Table */}
      <div style={{
        border: `1.5px solid ${EM.orange}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {/* Empty logo header cell */}
              <th style={{
                ...headerCellStyle,
                borderLeft: 'none',
                borderTop: 'none',
                width: '18%',
              }} />
              {headers.map((h, i) => (
                <th key={h} style={{
                  ...headerCellStyle,
                  borderTop: 'none',
                  borderRight: i === headers.length - 1 ? 'none' : cellBorder,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isLast = i === rows.length - 1;
              const rowBorderBottom = isLast ? 'none' : cellBorder;
              return (
                <tr key={row.alt}>
                  {/* Logo cell */}
                  <td style={{
                    ...dataCellStyle,
                    borderLeft: 'none',
                    borderBottom: rowBorderBottom,
                    padding: '20px 16px',
                  }}>
                    <img
                      src={row.logo}
                      alt={row.alt}
                      style={{ height: '52px', width: 'auto', maxWidth: '130px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                    />
                  </td>
                  <td style={{ ...dataCellStyle, borderBottom: rowBorderBottom }}>{row.strength}</td>
                  <td style={{ ...dataCellStyle, borderBottom: rowBorderBottom }}>{row.weakness}</td>
                  <td style={{ ...dataCellStyle, borderBottom: rowBorderBottom }}>{row.opportunity}</td>
                  <td style={{ ...dataCellStyle, borderRight: 'none', borderBottom: rowBorderBottom }}>{row.threat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </section>
  );
}

// ─── BRAND POSITIONING MAP ────────────────────────────────────────────────────
function BrandPositioningSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  // Each logo: left/top as % of chart container
  const logos = [
    { src: '/projects/ember/logo-kaha.png',      alt: 'Kaha Mind',  left: '27%', top: '20%', w: 70  },
    { src: '/projects/ember/logo-amaha.png',      alt: 'Amaha',      left: '70%', top: '18%', w: 100 },
    { src: '/projects/ember/logo-headspace.png',  alt: 'Headspace',  left: '35%', top: '56%', w: 100 },
    { src: '/projects/ember/logo-mindpeers.png',  alt: 'Mindpeers',  left: '55%', top: '60%', w: 56  },
    { src: '/projects/ember/logo-calm.png',       alt: 'Calm',       left: '40%', top: '70%', w: 54  },
  ];

  const axisLabel = (text, style) => (
    <span style={{
      fontFamily: WS, fontSize: '13px', color: EM.body,
      lineHeight: 1.3, textAlign: 'center',
      position: 'absolute', ...style,
    }}>
      {text}
    </span>
  );

  return (
    <section style={{ background: EM.cream, padding: '72px 60px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '32px',
        color: EM.body, textAlign: 'center', margin: '0 0 56px', letterSpacing: '0.01em',
      }}>
        Brand Positioning Map
      </h2>

      {/* Map container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto 72px',
        paddingTop: '58%', /* aspect ratio */
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>

          {/* Vertical axis line */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '8%', bottom: '8%',
            width: '1px',
            background: EM.body,
            transform: 'translateX(-50%)',
          }} />

          {/* Horizontal axis line */}
          <div style={{
            position: 'absolute',
            top: '46%', left: '2%', right: '2%',
            height: '1px',
            background: EM.body,
            transform: 'translateY(-50%)',
          }} />

          {/* Axis labels */}
          {axisLabel('Clinical service', { top: '5%', left: '50%', transform: 'translateX(-50%)' })}
          {axisLabel('Self-care tools',  { bottom: '5%', left: '50%', transform: 'translateX(-50%)' })}
          {axisLabel('Holistic/\nWellness-Focused', {
            top: '44%', left: '0%',
            whiteSpace: 'pre-line', textAlign: 'right',
            width: '120px', transform: 'translateY(-50%)',
          })}
          {axisLabel('Evidence-Based/\nTherapy-Focused', {
            top: '44%', right: '0%',
            whiteSpace: 'pre-line', textAlign: 'left',
            width: '130px', transform: 'translateY(-50%)',
          })}

          {/* Brand logos */}
          {logos.map((l) => (
            <div key={l.alt} style={{
              position: 'absolute',
              left: l.left, top: l.top,
              transform: 'translate(-50%, -50%)',
            }}>
              <img src={l.src} alt={l.alt} style={{ width: l.w, height: 'auto', display: 'block' }} />
            </div>
          ))}

          {/* Ember logo + label */}
          <div style={{
            position: 'absolute',
            left: '72%', top: '68%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <img
              src="/projects/ember/logo-ember-orange.png"
              alt="Ember"
              style={{ width: 64, height: 'auto', display: 'block', margin: '0 auto 4px' }}
            />
            <p style={{
              fontFamily: WS, fontSize: '11px', color: EM.body,
              margin: '2px 0 0', lineHeight: 1.4, maxWidth: '110px',
            }}>
              ember
            </p>
            <p style={{
              fontFamily: WS, fontSize: '11px', color: EM.body,
              margin: '2px 0 0', lineHeight: 1.4, maxWidth: '110px',
            }}>
              (Self-care tool which is<br />backed by Therapy)
            </p>
          </div>

        </div>
      </div>

      {/* Insights */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '26px',
          color: EM.body, margin: '0 0 24px', letterSpacing: '0.01em',
        }}>
          Insights
        </h3>
        <p style={{
          fontFamily: WS, fontSize: '14px', color: EM.body,
          lineHeight: 1.75, margin: 0,
        }}>
          Insights from the Brand Identity Prism and Competitor analysis revealed a market gap.
          Most wellness brands address depression, anxiety, or focus on meditation and sleep.
          Few cater to individuals seeking better productivity, balance, and emotional resilience.{' '}
          <span style={{ color: EM.orange }}>
            There's a need for a brand that builds mental strength proactively, not reactively.
          </span>
        </p>
      </div>

    </section>
  );
}

// ─── BRAND STORY ──────────────────────────────────────────────────────────────
function BrandStorySection() {
  const WS  = "'Work Sans', Arial, sans-serif";
  const QT  = "'QTAgate', Georgia, serif";
  const AG  = "'Agate', Georgia, serif";

  const gradientBar = 'linear-gradient(to right, #5c1a00, #a03000, #c85a10, #e07818, #f0a020)';

  return (
    <section style={{ background: EM.cream, position: 'relative', overflow: 'hidden' }}>

      {/* Top gradient bar */}
      <div style={{ width: '100%', height: '48px', background: gradientBar }} />

      {/* Content */}
      <div style={{ padding: '64px 72px 72px' }}>

        {/* Heading */}
        <h2 style={{ margin: '0 0 48px', lineHeight: 1.1 }}>
          <span style={{
            fontFamily: QT, fontWeight: 700, fontSize: '60px',
            color: EM.purple, letterSpacing: '0.01em',
          }}>
            The Brand{' '}
          </span>
          <span style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '60px',
            color: EM.purple,
          }}>
            Story
          </span>
        </h2>

        {/* First paragraph — left half, italic */}
        <p style={{
          fontFamily: WS, fontStyle: 'italic', fontSize: '15px',
          color: EM.body, lineHeight: 1.8,
          maxWidth: '52%', margin: '0 0 48px',
        }}>
          Mental health has long been misunderstood, often viewed as a weakness to hide rather than a strength to harness.
          In a world that demands performance, there's little support for building the mindset that sustains it.
          Most wellness tools focus on soothing or fixing, not on growing. People are left navigating burnout, anxiety,
          and self-doubt without practical tools that empower lasting change.
        </p>

        {/* Centre callout */}
        <p style={{
          fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '26px',
          color: EM.orange, textAlign: 'center', margin: '0 0 48px', letterSpacing: '0.02em',
        }}>
          Ember is created to change that
        </p>

        {/* Second paragraph — right half, italic */}
        <p style={{
          fontFamily: WS, fontStyle: 'italic', fontSize: '15px',
          color: EM.body, lineHeight: 1.8,
          maxWidth: '52%', marginLeft: 'auto', marginBottom: 0,
        }}>
          Rooted in positive psychology, Ember helps individuals build mental strength, not just to cope, but to thrive.
          We offer a path where productivity and self-care coexist, where growth is a daily practice, and where mental
          resilience becomes a way of life. Ember is for those who want more than calm—they want clarity, direction,
          and confidence. It's not about being perfect. It's about being powerful, in your own way.
        </p>

      </div>

      {/* Bottom gradient bar */}
      <div style={{ width: '100%', height: '48px', background: gradientBar }} />

    </section>
  );
}

// ─── PURPOSE / VISION / MISSION ───────────────────────────────────────────────
function PurposeSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  const items = [
    {
      label: 'Purpose',
      text: 'To empower individuals to recognize and harness their mental strengths, fostering confidence and enhancing productivity in every aspect of life.',
    },
    {
      label: 'Vision',
      text: 'To become the go-to platform for individuals seeking mental strength, resilience, and clarity to thrive in a fast-paced world.',
    },
    {
      label: 'Mission',
      text: "To empower individuals with accessible, strength-based mental wellness tools and support systems that build confidence, resilience, and personal growth—enabling them to perform, adapt, and thrive in today\u2019s demanding world.",
    },
  ];

  const gradientBar = 'linear-gradient(to right, #5c1a00, #a03000, #c85a10, #e07818, #f0a020)';

  return (
    <section style={{ background: EM.cream }}>

      {/* Content */}
      <div style={{ padding: '80px 120px 80px' }}>
        {items.map((item) => (
          <div key={item.label} style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '0 48px',
            marginBottom: '72px',
          }}>
            <h2 style={{
              fontFamily: QT, fontWeight: 700, fontSize: '48px',
              color: EM.purple, margin: 0, lineHeight: 1.1,
              letterSpacing: '0.01em',
            }}>
              {item.label}
            </h2>
            <p style={{
              fontFamily: WS, fontSize: '17px', color: EM.body,
              lineHeight: 1.75, margin: 0,
            }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom gradient bar */}
      <div style={{ width: '100%', height: '48px', background: gradientBar }} />

    </section>
  );
}

// ─── BRAND VALUES ─────────────────────────────────────────────────────────────
function BrandValuesSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const gradientBar = 'linear-gradient(to right, #5c1a00, #a03000, #c85a10, #e07818, #f0a020)';

  const ValueCard = ({ title, text }) => (
    <div style={{ textAlign: 'center', padding: '0 16px' }}>
      <p style={{
        fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
        fontSize: '22px', color: EM.orange,
        margin: '0 0 20px', letterSpacing: '0.01em',
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: WS, fontStyle: 'italic', fontSize: '15px',
        color: EM.body, lineHeight: 1.75, margin: 0,
      }}>
        {text}
      </p>
    </div>
  );

  return (
    <section style={{ background: EM.cream }}>
      <div style={{ padding: '72px 72px 80px' }}>

        {/* Heading */}
        <h2 style={{ margin: '0 0 64px', lineHeight: 1.1 }}>
          <span style={{
            fontFamily: QT, fontWeight: 700, fontSize: '56px',
            color: EM.purple, letterSpacing: '0.01em',
          }}>
            Brand{' '}
          </span>
          <span style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '56px',
            color: EM.orange,
          }}>
            Values
          </span>
        </h2>

        {/* Row 1 — 3 columns */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px 32px', marginBottom: '64px',
        }}>
          <ValueCard
            title="Empowerment"
            text="To equip individuals to recognize their inner strengths and take charge of their mental well-being with confidence"
          />
          <ValueCard
            title="Strength"
            text="Redefining strength as self-awareness, emotional resilience, and the courage to grow—quiet but powerful."
          />
          <ValueCard
            title="Growth & Flourishing"
            text="We believe in nurturing continuous self-improvement—helping individuals not just to cope, but to truly thrive."
          />
        </div>

        {/* Row 2 — 2 columns centered */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '48px 32px',
          maxWidth: '66%', margin: '0 auto',
        }}>
          <ValueCard
            title="Accessibility"
            text="Making mental wellness inclusive and stigma-free by providing affordable, relatable tools for all."
          />
          <ValueCard
            title="Positive Psychology"
            text="Approach is rooted in positive psychology—focusing on what's strong, not just what's wrong."
          />
        </div>

      </div>

    </section>
  );
}

// ─── BRAND PERSONALITY + TONE + VOICE ─────────────────────────────────────────
function BrandPersonalitySection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const traits = [
    { n: '1.', name: 'Supportive',  text: 'Acts as a trusted ally, offering encouragement and celebrating progress.' },
    { n: '2.', name: 'Confident',   text: 'Projects quiet assurance, helping users trust their own strength.' },
    { n: '3.', name: 'Empathetic',  text: 'Listens deeply, validating struggles without judgment.' },
    { n: '4.', name: 'Optimistic',  text: 'Focuses on growth, reframing challenges as opportunities.' },
  ];

  const borderColor = `${EM.orange}88`;

  return (
    <section style={{ background: EM.cream }}>

      {/* ── TOP: Brand Personality ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', minHeight: '520px' }}>

        {/* Left: orange panel + photo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            background: EM.orange,
            padding: '36px 36px 32px',
            flex: '0 0 auto',
          }}>
            <h2 style={{ margin: 0, lineHeight: 1.05 }}>
              <span style={{ fontFamily: QT, fontWeight: 700, fontSize: '48px', color: '#fff', display: 'block' }}>
                Brand
              </span>
              <span style={{ fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '48px', color: '#fff' }}>
                Personality
              </span>
            </h2>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <img
              src="/projects/ember/chess-mirror.png"
              alt="Chess mirror reflection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Right: 4 traits */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'stretch',
          borderTop: `1px solid ${borderColor}`,
        }}>
          {traits.map((t, i) => (
            <div key={t.name} style={{
              padding: '28px 48px',
              borderBottom: `1px solid ${borderColor}`,
              flex: 1,
            }}>
              <p style={{
                fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
                fontSize: '16px', color: EM.orange, margin: '0 0 10px',
              }}>
                {t.n} {t.name}
              </p>
              <p style={{
                fontFamily: WS, fontSize: '14px', color: EM.body,
                lineHeight: 1.7, margin: 0,
              }}>
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Tone Principles + Brand Voice ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '58% 42%', minHeight: '480px' }}>

        {/* Left: Tone Principles + table */}
        <div style={{ padding: '56px 48px 56px 56px' }}>
          <h3 style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
            fontSize: '26px', color: EM.orange, margin: '0 0 28px',
          }}>
            Tone Principles
          </h3>
          <ul style={{
            fontFamily: WS, fontSize: '14px', color: EM.body,
            lineHeight: 1.8, margin: '0 0 36px', paddingLeft: '20px',
          }}>
            <li>Bold but grounding → "Rest is strategy, not weakness."</li>
            <li>Empowering, not preachy → "You're building strength—one step at a time."</li>
            <li>Action-oriented → "Track your energy, not just your tasks."</li>
          </ul>

          {/* Do's / Don'ts table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${EM.orange}` }}>
            <thead>
              <tr>
                <th style={{
                  padding: '16px 20px', textAlign: 'center',
                  borderRight: `1px solid ${EM.orange}`,
                  borderBottom: `1px solid ${EM.orange}`,
                  fontFamily: WS, fontWeight: 600, fontSize: '14px', color: EM.orange,
                }}>
                  Do's
                </th>
                <th style={{
                  padding: '16px 20px', textAlign: 'center',
                  borderBottom: `1px solid ${EM.orange}`,
                  fontFamily: WS, fontWeight: 600, fontSize: '14px', color: EM.orange,
                }}>
                  Dont's
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['"Progress > perfection."', '"You should be doing more."'],
                ['"Your overthinking is strategic insight."', '"Just stop worrying."'],
              ].map(([dos, donts], i) => (
                <tr key={i}>
                  <td style={{
                    padding: '24px 20px', textAlign: 'center',
                    borderRight: `1px solid ${EM.orange}`,
                    borderBottom: i === 0 ? `1px solid ${EM.orange}` : 'none',
                    fontFamily: WS, fontSize: '13px', color: EM.body, lineHeight: 1.5,
                  }}>
                    {dos}
                  </td>
                  <td style={{
                    padding: '24px 20px', textAlign: 'center',
                    borderBottom: i === 0 ? `1px solid ${EM.orange}` : 'none',
                    fontFamily: WS, fontSize: '13px', color: EM.body, lineHeight: 1.5,
                  }}>
                    {donts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Brand Voice — full-height photo with text overlaid */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="/projects/ember/tone-knob.png"
            alt="Tone knob"
            style={{ width: '70%', height: 'auto', display: 'block', marginLeft: 'auto' }}
          />
          <div style={{
            position: 'absolute', top: '32px', right: '36px',
            textAlign: 'right',
          }}>
            <span style={{ fontFamily: QT, fontWeight: 700, fontSize: '52px', color: EM.purple, display: 'block', lineHeight: 1.05 }}>
              Brand
            </span>
            <span style={{ fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '52px', color: '#fff', lineHeight: 1.05 }}>
              Voice
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── VISUAL IDENTITY ──────────────────────────────────────────────────────────
function VisualIdentitySection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const Pill = ({ children }) => (
    <div style={{
      border: `1.5px solid ${EM.orange}`,
      borderRadius: '10px',
      padding: '12px 28px',
      fontFamily: WS,
      fontSize: '14px',
      color: EM.body,
      textAlign: 'center',
      background: EM.cream,
    }}>
      {children}
    </div>
  );

  return (
    <section style={{ background: EM.cream, padding: '52px 72px 0' }}>

      {/* Heading */}
      <h2 style={{ margin: '0 0 40px', lineHeight: 1.05 }}>
        <span style={{
          fontFamily: QT, fontWeight: 700, fontSize: '52px',
          color: EM.purple, letterSpacing: '0.01em',
        }}>
          Visual{' '}
        </span>
        <span style={{
          fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '52px',
          color: EM.orange,
        }}>
          Identity
        </span>
      </h2>

      {/* Logo Iteration layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', alignItems: 'center', paddingBottom: '56px' }}>

        {/* Left: diagram */}
        <div>
          {/* Logo Iteration label — centered between keywords and noun */}
          <p style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
            fontSize: '15px', color: EM.orange,
            textAlign: 'center', margin: '0 0 28px',
            paddingLeft: '80px',
          }}>
            Logo Iteration
          </p>

          {/* Keywords + Noun diagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>

            {/* Keywords column */}
            <div style={{ flex: '0 0 auto', width: '180px' }}>
              <p style={{
                fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
                fontSize: '16px', color: EM.purple,
                margin: '0 0 16px', textAlign: 'center',
              }}>
                Keywords
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Pill>Strength</Pill>
                <Pill>Flourish</Pill>
                <Pill>Glow</Pill>
              </div>
            </div>

            {/* Bracket connector */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 0 16px' }}>
              {/* The ] bracket: top, bottom and right side borders */}
              <div style={{
                width: '28px',
                height: '108px',
                borderTop: `1.5px solid ${EM.body}`,
                borderBottom: `1.5px solid ${EM.body}`,
                borderRight: `1.5px solid ${EM.body}`,
                flexShrink: 0,
              }} />
              {/* Short horizontal line */}
              <div style={{
                width: '20px', height: '1.5px',
                background: EM.body, flexShrink: 0,
              }} />
            </div>

            {/* Noun column */}
            <div style={{ flex: 1, marginTop: '24px' }}>
              <p style={{
                fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
                fontSize: '16px', color: EM.purple,
                margin: '0 0 16px', textAlign: 'center',
              }}>
                Noun
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Pill>Spark</Pill>
                <Pill>Flame</Pill>
              </div>
            </div>

          </div>
        </div>

        {/* Right: sketch image, slightly rotated like paper on a desk */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="/projects/ember/logo-sketch.png"
            alt="Logo iteration sketches"
            style={{
              width: '72%',
              height: 'auto',
              display: 'block',
              transform: 'rotate(5deg)',
              filter: 'drop-shadow(3px 5px 10px rgba(0,0,0,0.18))',
            }}
          />
        </div>

      </div>

      {/* Bottom divider */}
      <div style={{ height: '1.5px', background: EM.orange, margin: '0 -72px' }} />

    </section>
  );
}

// ─── PRIMARY LOGO ─────────────────────────────────────────────────────────────
function PrimaryLogoSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const components = [
    { img: '/projects/ember/logo-comp1.png', label: 'Sheltered Overhang' },
    { img: '/projects/ember/logo-comp2.png', label: 'Inner spark or potential' },
    { img: '/projects/ember/logo-comp3.png', label: 'Flame- Symbol of Strength' },
    { img: '/projects/ember/logo-final.png', label: 'Final Logo' },
  ];

  return (
    <section style={{ background: EM.cream, padding: '64px 80px 80px' }}>

      {/* ── Primary Logo ── */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '36px',
        color: EM.purple, textAlign: 'center', margin: '0 0 48px',
        letterSpacing: '0.02em',
      }}>
        Primary Logo
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: '0 16px', alignItems: 'center', marginBottom: '64px' }}>

        {/* Left: logo with wordmark (new image includes both) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
          <img
            src="/projects/ember/emberlogo.png"
            alt="Ember logo"
            style={{ width: '220px', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Right: description with left border */}
        <div style={{
          borderLeft: `2px solid ${EM.orange}`,
          paddingLeft: '28px',
        }}>
          <p style={{
            fontFamily: WS, fontSize: '14px', color: EM.body,
            lineHeight: 1.8, margin: 0,
          }}>
            The Ember logomark integrates five interlocking circles derived from the golden ratio,
            representing harmony, balance, and intentional growth. These circles embody five pillars
            of mental strength—growth, resilience, awareness, productivity, and positive psychology.
            The fluid curves and unified form reflect Ember's focus on inner strength and flourishing
            through a grounded, supportive, and empowering approach.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: `${EM.orange}66`, margin: '0 0 64px' }} />

      {/* ── Logo Components ── */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '40px',
        color: EM.purple, textAlign: 'center', margin: '0 0 56px',
        letterSpacing: '0.02em',
      }}>
        Logo Components
      </h2>

      {/* Components row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0', maxWidth: '900px', margin: '0 auto',
      }}>
        {components.map((c, i) => (
          <>
            <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <img
                src={c.img}
                alt={c.label}
                style={{ width: '100%', maxWidth: '160px', height: 'auto', display: 'block', marginBottom: '16px' }}
              />
              <p style={{
                fontFamily: WS, fontSize: '13px', color: EM.body,
                textAlign: 'center', margin: 0, lineHeight: 1.4,
              }}>
                {c.label}
              </p>
            </div>
            {i < components.length - 1 && (
              <div key={`sep-${i}`} style={{
                fontFamily: WS, fontSize: '20px', color: EM.body,
                padding: '0 8px', marginBottom: '32px', flexShrink: 0,
              }}>
                {i === components.length - 2 ? '=' : '+'}
              </div>
            )}
          </>
        ))}
      </div>

    </section>
  );
}

// ─── LOGO CONSTRUCTION ────────────────────────────────────────────────────────
function LogoConstructionSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  return (
    <section style={{ background: EM.cream, padding: '0 0 0' }}>

      {/* Top divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      <div style={{ padding: '56px 80px 64px' }}>

        {/* Heading */}
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '48px',
          color: EM.purple, textAlign: 'center', margin: '0 0 48px',
          letterSpacing: '0.02em',
        }}>
          Logo Construction
        </h2>

        {/* Image with text overlaid */}
        <div style={{ position: 'relative' }}>

          {/* Full-width construction diagram */}
          <img
            src="/projects/ember/logo-construction.png"
            alt="Logo construction diagram"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Left overlay: Grid & Circle Framework */}
          <div style={{
            position: 'absolute',
            top: '28%',
            left: '0',
            width: '20%',
          }}>
            <p style={{
              fontFamily: WS, fontStyle: 'italic', fontSize: '13px',
              color: EM.body, margin: '0 0 10px', fontWeight: 400,
            }}>
              Grid &amp; Circle Framework
            </p>
            <p style={{
              fontFamily: WS, fontSize: '12px', color: EM.body,
              lineHeight: 1.7, margin: 0,
            }}>
              Five key circles, derived from the Fibonacci spiral within a golden rectangle,
              form the base structure. These circles determine anchor points and guide the
              curvature of the logo.
            </p>
          </div>

          {/* Right overlay: Form Development */}
          <div style={{
            position: 'absolute',
            top: '52%',
            right: '0',
            width: '20%',
          }}>
            <p style={{
              fontFamily: WS, fontStyle: 'italic', fontSize: '13px',
              color: EM.body, margin: '0 0 10px', fontWeight: 400,
            }}>
              Form Development
            </p>
            <p style={{
              fontFamily: WS, fontSize: '12px', color: EM.body,
              lineHeight: 1.7, margin: '0 0 16px',
            }}>
              Curves of the symbol are drawn from the arcs of these circles, ensuring smooth
              transitions and geometric consistency. The crescent and inner star shape follow
              this circular logic.
            </p>
            <p style={{
              fontFamily: WS, fontSize: '12px', color: EM.body,
              lineHeight: 1.7, margin: 0,
            }}>
              The final form is clean, cohesive, and proportionate —<br />
              achieving visual harmony through<br />
              mathematical precision.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

    </section>
  );
}

// ─── LOGO VARIATION ───────────────────────────────────────────────────────────
function LogoVariationSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  const variations = [
    {
      img: '/projects/ember/logo-final.png',
      label: 'Logomark',
      imgStyle: { width: '160px' },
    },
    {
      img: '/projects/ember/logo-vertical.png',
      label: 'Logomark and Logotype\nVertical',
      imgStyle: { width: '180px' },
    },
    {
      img: '/projects/ember/logo-horizontal.png',
      label: 'Logomark and Logotype\nHorizontal',
      imgStyle: { width: '300px' },
    },
  ];

  return (
    <section style={{ background: EM.cream, padding: '72px 80px 80px' }}>

      {/* Heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '40px',
        color: EM.purple, textAlign: 'center', margin: '0 0 64px',
        letterSpacing: '0.02em',
      }}>
        Logo Variation
      </h2>

      {/* Three variations */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0 32px', alignItems: 'flex-end',
      }}>
        {variations.map((v) => (
          <div key={v.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: '200px', marginBottom: '32px',
            }}>
              <img
                src={v.img}
                alt={v.label}
                style={{ ...v.imgStyle, height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{
              fontFamily: WS, fontStyle: 'italic', fontSize: '14px',
              color: EM.body, textAlign: 'center', margin: 0,
              whiteSpace: 'pre-line', lineHeight: 1.5,
            }}>
              {v.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── LOGO LOCKUP ──────────────────────────────────────────────────────────────
function LogoLockupSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";

  const ratioLabel = (text, style) => (
    <span style={{
      fontFamily: WS, fontSize: '36px', fontWeight: 300,
      color: '#b0b0b0', lineHeight: 1, ...style,
    }}>
      {text}
    </span>
  );

  return (
    <section style={{ background: EM.cream }}>

      {/* Top divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Logo Lockup ── */}
      <div style={{ padding: '56px 80px 64px' }}>
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '36px',
          color: EM.purple, margin: '0 0 48px', letterSpacing: '0.02em',
        }}>
          Logo Lockup
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '0 48px', alignItems: 'start' }}>

          {/* Left: horizontal lockup */}
          <div>
            <img
              src="/projects/ember/logo-lockup-horizontal.png"
              alt="Horizontal logo lockup"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Right: vertical lockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/projects/ember/logo-lockup-vertical.png"
              alt="Vertical logo lockup"
              style={{ width: '72%', height: 'auto', display: 'block' }}
            />
          </div>

        </div>
      </div>

      {/* Middle divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Logo Usage ── */}
      <div style={{ padding: '56px 80px 80px', display: 'grid', gridTemplateColumns: '50% 50%', gap: '0 48px', alignItems: 'start' }}>

        {/* Left: spacing diagram */}
        <img
          src="/projects/ember/logo-usage-spacing.png"
          alt="Logo usage spacing diagram"
          style={{ width: '85%', height: 'auto', display: 'block' }}
        />

        {/* Right: heading + description */}
        <div style={{ paddingTop: '16px' }}>
          <h2 style={{
            fontFamily: QT, fontWeight: 700, fontSize: '36px',
            color: EM.purple, margin: '0 0 28px', letterSpacing: '0.02em',
          }}>
            Logo Usage
          </h2>
          <p style={{
            fontFamily: WS, fontStyle: 'italic', fontSize: '13px',
            color: EM.body, lineHeight: 1.8, margin: 0,
          }}>
            To ensure clarity and visual balance in layouts, maintain clear space around the
            logo equivalent to the height of the circular core element in the logomark. This
            spacing preserves its integrity and ensures legibility across applications.
          </p>
        </div>

      </div>

    </section>
  );
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────
function TypographySection() {
  const QT  = "'QTAgate', Georgia, serif";
  const INT = "'Inter', 'Work Sans', Arial, sans-serif";
  const SP  = "'Sprat', Georgia, serif";

  const typescaleRows = [
    { tag: 'h1',    px: '47.78px', text: 'Brown jars prevented the mixture from',               size: 47.78, weight: 700 },
    { tag: 'h2',    px: '39.81px', text: 'Brown jars prevented the mixture from',               size: 39.81, weight: 700 },
    { tag: 'h3',    px: '33.18px', text: 'Brown jars prevented the mixture from freezing too',  size: 33.18, weight: 700 },
    { tag: 'h4',    px: '27.65px', text: 'Brown jars prevented the mixture from freezing too quickly', size: 27.65, weight: 700 },
    { tag: 'h5',    px: '23.04px', text: 'Brown jars prevented the mixture from freezing too quickly', size: 23.04, weight: 700 },
    { tag: 'h6',    px: '19.2px',  text: 'Brown jars prevented the mixture from freezing too quickly', size: 19.2,  weight: 700 },
    { tag: 'p',     px: '16px',    text: 'Brown jars prevented the mixture from freezing too quickly', size: 16,    weight: 400, highlight: true },
    { tag: 'small', px: '13.33px', text: 'Brown jars prevented the mixture from freezing too quickly', size: 13.33, weight: 400 },
    { tag: '',      px: '11.11px', text: 'Brown jars prevented the mixture from freezing too quickly', size: 11.11, weight: 400 },
  ];

  const gray = '#999';

  return (
    <section style={{ background: EM.cream }}>

      {/* Top divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Typography heading ── */}
      <div style={{ padding: '56px 80px 0' }}>
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '40px',
          color: EM.purple, textAlign: 'center', margin: '0 0 56px',
          letterSpacing: '0.02em',
        }}>
          Typography
        </h2>

        {/* Primary — Sprat */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <p style={{ fontFamily: INT, fontStyle: 'italic', fontSize: '13px', color: gray, margin: '0 0 4px' }}>Primary</p>
            <p style={{ fontFamily: INT, fontSize: '15px', color: EM.body, margin: 0, fontWeight: 400 }}>Sprat</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{
              fontFamily: SP, fontWeight: 400, fontSize: '220px',
              color: EM.purple, lineHeight: 0.85, display: 'block',
              letterSpacing: '-0.02em',
            }}>
              Aa
            </span>
          </div>
        </div>

        {/* Secondary — Inter */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'center', marginBottom: '64px' }}>
          <div>
            <p style={{ fontFamily: INT, fontStyle: 'italic', fontSize: '13px', color: gray, margin: '0 0 4px' }}>Secondary</p>
            <p style={{ fontFamily: INT, fontSize: '15px', color: EM.body, margin: 0, fontWeight: 400 }}>Inter</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{
              fontFamily: INT, fontWeight: 400, fontSize: '36px',
              color: EM.body, margin: 0, lineHeight: 1.4,
              letterSpacing: '0.01em', textAlign: 'center',
            }}>
              AaBbCcDdEeFfGgHhIiJjKkLlMmNnO<br />
              oPpQqRrSsTtUuVvWwXxYyZz
            </p>
          </div>
        </div>
      </div>

      {/* Middle divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Typescale ── */}
      <div style={{ padding: '56px 80px 80px' }}>
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '44px',
          color: EM.purple, margin: '0 0 16px', letterSpacing: '0.02em',
        }}>
          Typescale
        </h2>
        <p style={{
          fontFamily: INT, fontStyle: 'italic', fontSize: '14px',
          color: '#888', margin: '0 0 36px',
        }}>
          1.200 Minor Third Typescale to standardise typography across different collaterail
        </p>

        {/* Table container — centered, not full width */}
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '24px 32px 20px',
          maxWidth: '820px',
          margin: '0 auto',
        }}>
          {/* Header: REM PX PT */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', paddingLeft: '120px' }}>
            {['REM', 'PX', 'PT'].map((unit) => (
              <span key={unit} style={{
                fontFamily: INT, fontSize: '11px', fontWeight: 400,
                color: unit === 'PX' ? '#333' : '#aaa',
                background: unit === 'PX' ? '#e8e8e8' : 'transparent',
                borderRadius: '3px', padding: '2px 6px',
                letterSpacing: '0.05em',
              }}>
                {unit}
              </span>
            ))}
          </div>

          {/* Rows */}
          {typescaleRows.map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '48px 72px 1fr',
              alignItems: 'baseline',
              gap: '0 0',
              padding: '6px 8px',
              background: row.highlight ? '#f4f4f4' : 'transparent',
              borderRadius: row.highlight ? '4px' : '0',
              marginBottom: '2px',
            }}>
              {/* Tag */}
              <span style={{
                fontFamily: INT, fontSize: '12px', color: '#aaa',
                textAlign: 'right', paddingRight: '16px', fontWeight: 400,
              }}>
                {row.tag}
              </span>
              {/* Size */}
              <span style={{
                fontFamily: INT, fontSize: '12px', color: '#aaa',
                textAlign: 'right', paddingRight: '20px', fontWeight: 400,
                whiteSpace: 'nowrap',
              }}>
                {row.px}
              </span>
              {/* Sample text */}
              <span style={{
                fontFamily: INT,
                fontSize: `${row.size}px`,
                fontWeight: row.weight,
                color: '#2d2d2d',
                lineHeight: 1.15,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'block',
              }}>
                {row.text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

// ─── COLOUR ───────────────────────────────────────────────────────────────────
function ColourSection() {
  const QT  = "'QTAgate', Georgia, serif";
  const WS  = "'Work Sans', Arial, sans-serif";

  const Swatch = ({ bg, rgb, hex, lightText = true }) => (
    <div style={{
      background: bg,
      padding: '14px 16px',
      position: 'relative',
      height: '160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <span style={{
        fontFamily: WS, fontSize: '12px',
        color: lightText ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)',
        fontWeight: 400,
      }}>
        {rgb}
      </span>
      <span style={{
        fontFamily: WS, fontSize: '12px',
        color: lightText ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)',
        fontWeight: 400,
        textAlign: 'right',
      }}>
        {hex}
      </span>
    </div>
  );

  return (
    <section style={{ background: EM.cream }}>

      {/* Top divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Colour Inspiration ── */}
      <div style={{ padding: '56px 80px 64px' }}>
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '40px',
          color: EM.purple, textAlign: 'center', margin: '0 0 40px',
          letterSpacing: '0.02em',
        }}>
          Colour Inspiration
        </h2>
        <img
          src="/projects/ember/colour-inspiration.png"
          alt="Colour inspiration — sunset, fire, sand"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Middle divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

      {/* ── Colour Palette ── */}
      <div style={{ padding: '56px 80px 72px' }}>
        <h2 style={{
          fontFamily: QT, fontWeight: 700, fontSize: '36px',
          color: EM.purple, margin: '0 0 36px', letterSpacing: '0.02em',
        }}>
          Colour Palette
        </h2>

        {/* Top row: orange + purple */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
          <Swatch bg="#F28526" rgb="R=242 G=134 B=38" hex="#F28526" lightText={true} />
          <Swatch bg="#503554" rgb="R=80 G=53 B=84"   hex="#503554" lightText={true} />
        </div>

        {/* Bottom row: yellow full width */}
        <Swatch bg="#fec900" rgb="R=254 G=201 B=0" hex="#fec900" lightText={false} />
      </div>

      {/* Bottom divider */}
      <div style={{ height: '1px', background: `${EM.orange}88`, margin: '0 80px' }} />

    </section>
  );
}

// ─── VISUALS ──────────────────────────────────────────────────────────────────
function VisualsSection() {
  const QT = "'QTAgate', Georgia, serif";

  return (
    <section style={{ background: EM.cream, padding: '56px 80px 72px' }}>
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '48px',
        color: EM.purple, margin: '0 0 36px',
        textAlign: 'center', letterSpacing: '0.02em',
      }}>
        Visuals
      </h2>
      <img
        src="/projects/ember/visuals.png"
        alt="Ember visual moodboard"
        style={{ width: '100%', display: 'block', borderRadius: '4px' }}
      />
    </section>
  );
}

// ─── PRINT MEDIA ──────────────────────────────────────────────────────────────
function PrintMediaSection() {
  const QT = "'QTAgate', Georgia, serif";

  return (
    <section style={{ background: EM.cream, padding: '56px 80px 72px' }}>
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '48px',
        color: EM.purple, margin: '0 0 40px',
        textAlign: 'center', letterSpacing: '0.02em',
      }}>
        Print Media
      </h2>

      {/* Top row: journal + notebook side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <img
          src="/projects/ember/print-journal.png"
          alt="Ember journal mockup"
          style={{ width: '100%', display: 'block', borderRadius: '4px' }}
        />
        <img
          src="/projects/ember/print-notebook.png"
          alt="Ember notebook mockup"
          style={{ width: '100%', display: 'block', borderRadius: '4px' }}
        />
      </div>

      {/* Bottom row: business card centered */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="/projects/ember/print-card.png"
          alt="Ember business card mockup"
          style={{ width: '58%', display: 'block', borderRadius: '4px' }}
        />
      </div>
    </section>
  );
}

// ─── ADVERTISEMENT ────────────────────────────────────────────────────────────
function AdvertisementSection() {
  const QT = "'QTAgate', Georgia, serif";

  return (
    <section style={{ background: EM.cream, padding: '56px 80px 72px' }}>
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '48px',
        color: EM.purple, margin: '0 0 40px',
        textAlign: 'center', letterSpacing: '0.02em',
      }}>
        Advertisement
      </h2>

      {/* Top row: NYC billboard (left ~62%) + phone on orange (right ~38%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '62fr 38fr', gap: '12px', marginBottom: '12px' }}>
        <img
          src="/projects/ember/ad-billboard.png"
          alt="Ember billboard advertisement"
          style={{ width: '100%', display: 'block', borderRadius: '4px', objectFit: 'cover' }}
        />
        <img
          src="/projects/ember/ad-phone.png"
          alt="Ember phone advertisement"
          style={{ width: '100%', display: 'block', borderRadius: '4px', objectFit: 'cover' }}
        />
      </div>

      {/* Bottom row: full-width street billboard */}
      <img
        src="/projects/ember/ad-street.png"
        alt="Ember street billboard"
        style={{ width: '100%', display: 'block', borderRadius: '4px' }}
      />
    </section>
  );
}

// ─── USER PERSONA ─────────────────────────────────────────────────────────────
function UserPersonaSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const bg = '#fffff1';
  const labelStyle = {
    fontFamily: WS,
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#1a1a1a',
    marginBottom: '0.5em',
    textTransform: 'uppercase',
  };
  const bodyStyle = {
    fontFamily: WS,
    fontSize: '0.9rem',
    color: '#2a2a2a',
    lineHeight: 1.6,
    margin: '0 0 1.4em 0',
  };
  const bulletStyle = {
    fontFamily: WS,
    fontSize: '0.9rem',
    color: '#2a2a2a',
    lineHeight: 1.6,
    paddingLeft: '1.2em',
    margin: '0.25em 0',
  };

  return (
    <section style={{ background: bg, padding: '3.5rem 4rem 4rem' }}>
      {/* Title */}
      <h2 style={{
        fontFamily: QT,
        fontSize: '3rem',
        fontWeight: 400,
        color: '#3b1a5a',
        textAlign: 'center',
        margin: '0 0 2.5rem',
        letterSpacing: '0.02em',
      }}>
        User Persona
      </h2>

      {/* Main layout: left photo col + right content */}
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

        {/* Left: photo + bio */}
        <div style={{ flexShrink: 0, width: '280px' }}>
          <img
            src="/projects/ember/persona-ananya.png"
            alt="Ananya Sharma"
            style={{ width: '100%', borderRadius: '12px', display: 'block', marginBottom: '1rem' }}
          />
          <p style={{ fontFamily: WS, fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 0.8em' }}>
            Ananya Sharma
          </p>
          <p style={{ fontFamily: WS, fontSize: '0.88rem', color: '#2a2a2a', lineHeight: 1.7, margin: 0 }}>
            Age: 28<br />
            Job Title: Marketing Specialist / Aspiring Content Creator<br />
            Status: Single<br />
            Location: Bangalore, India
          </p>
        </div>

        {/* Right: content */}
        <div style={{ flex: 1 }}>
          {/* ABOUT — full width */}
          <p style={labelStyle}>About</p>
          <p style={bodyStyle}>
            Ananya is a high-achieving professional torn between corporate success and her passion project.
            Despite her ambition, chronic overwhelm leaves her feeling stuck in cycles of guilt, comparison,
            and exhaustion.
          </p>

          {/* Two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 3rem' }}>

            {/* Left sub-column */}
            <div>
              <p style={labelStyle}>Pain Points</p>
              <ul style={{ margin: '0 0 1.4em', padding: 0, listStyle: 'disc' }}>
                <li style={bulletStyle}>Trapped in "time guilt" between work and side hustle</li>
                <li style={bulletStyle}>Constantly compares herself to peers ("Why can't I keep up?")</li>
                <li style={bulletStyle}>Wastes energy fighting self-perceived "laziness"</li>
              </ul>

              <p style={labelStyle}>Goals</p>
              <ul style={{ margin: '0 0 1.4em', padding: 0, listStyle: 'disc' }}>
                <li style={bulletStyle}>Launch her lifestyle blog without burning out</li>
                <li style={bulletStyle}>Redefine productivity on her own terms</li>
                <li style={bulletStyle}>Silence her inner critic</li>
              </ul>

              <p style={labelStyle}>Needs</p>
              <ul style={{ margin: '0 0 1.4em', padding: 0, listStyle: 'disc' }}>
                <li style={bulletStyle}>A system that values energy over hustle</li>
                <li style={bulletStyle}>Proof her multitasking mind is an asset</li>
              </ul>
            </div>

            {/* Right sub-column */}
            <div>
              <p style={labelStyle}>Current Feelings</p>
              <p style={bodyStyle}>Overwhelmed, Guilty and Stuck</p>

              <p style={labelStyle}>Motivation</p>
              <p style={bodyStyle}>Achievement, Growth and Freedom</p>

              <p style={labelStyle}>Personality</p>
              <p style={bodyStyle}>Creative, Ambitious, Introverted-extrovert, Perfectionist, Self-doubting</p>

              <p style={labelStyle}>Brand Promise</p>
              <p style={bodyStyle}>
                "Productivity isn't about becoming someone new—it's about weaponizing who you already are."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TARGET AUDIENCE ──────────────────────────────────────────────────────────
function TargetAudienceSection() {
  const WS = "'Work Sans', Arial, sans-serif";
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  const gradientBar = 'linear-gradient(to right, #5c1a00, #a03000, #c85a10, #e07818, #f0a020)';

  const personas = [
    {
      img: '/projects/ember/persona-khushi.png',
      name: 'Khushi Patel',
      role: 'The Self-Help Enthusiast',
      age: '25–40',
      motivation: '"I want to optimize my mind."',
      behavior: [
        'Consumes productivity podcasts/books (Atomic Habits, Huberman Lab)',
        'Skeptical of therapy but open to "mental fitness" tools',
      ],
      painPoints: [
        'Overwhelmed by conflicting advice ("Should I meditate or hustle more?")',
      ],
    },
    {
      img: '/projects/ember/persona-karan.png',
      name: 'Karan Arora',
      role: 'The Anxious Achiever',
      age: '18–25',
      motivation: '"I need to prove myself without falling apart."',
      behavior: [
        'Uses StudyTok/FinTok for "how to adult" hacks',
        'Secretly fears they\'re not as capable as peers',
      ],
      painPoints: [
        'No framework to handle failure (e.g., internship rejections)',
      ],
    },
    {
      img: '/projects/ember/persona-vedika.png',
      name: 'Vedika Sharma',
      role: 'The Hustle-Culture Survivor',
      age: '22–35',
      motivation: '"I want success without burnout."',
      behavior: [
        'Has quit 2+ productivity apps for being guilt-inducing',
        'Follows "anti-hustle" influencers but still feels behind',
      ],
      painPoints: [
        'Guilt when resting ("Am I being lazy?")',
        'Confuses busyness with productivity',
      ],
    },
  ];

  const Label = ({ children }) => (
    <p style={{
      fontFamily: WS, fontStyle: 'italic', fontSize: '13px',
      color: EM.body, margin: '14px 0 4px', lineHeight: 1.4,
    }}>
      {children}
    </p>
  );

  const BulletList = ({ items }) => (
    <ul style={{
      fontFamily: WS, fontSize: '13px', color: EM.body,
      lineHeight: 1.6, margin: 0, paddingLeft: '18px',
    }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );

  return (
    <section style={{ background: EM.cream }}>

      {/* Header gradient band with title */}
      <div style={{
        background: gradientBar,
        padding: '36px 56px 40px',
      }}>
        <h2 style={{ margin: 0, lineHeight: 1.05 }}>
          <span style={{
            fontFamily: QT, fontWeight: 700, fontSize: '64px',
            color: '#fff', letterSpacing: '0.01em',
          }}>
            Target{' '}
          </span>
          <span style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic', fontSize: '64px',
            color: '#fff',
          }}>
            Audience
          </span>
        </h2>
      </div>

      {/* Core Demographic + Geographic two-column */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0 48px', padding: '56px 72px 48px',
      }}>
        {/* Left: Core Demographic */}
        <div>
          <p style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
            fontSize: '15px', color: EM.orange, margin: '0 0 16px',
          }}>
            Core Demographic
          </p>
          <ul style={{
            fontFamily: WS, fontSize: '14px', color: EM.body,
            lineHeight: 1.75, margin: 0, paddingLeft: '20px',
          }}>
            <li>Age: 18–40 years</li>
            <li>Psychographic: Self-improvement focused, productivity-driven, wary of clinical labels</li>
            <li>Tech-Savviness: High (comfortable with apps, podcasts, digital communities)</li>
          </ul>
        </div>

        {/* Right: Geographic & Economic Profile */}
        <div>
          <p style={{
            fontFamily: AG, fontWeight: 700, fontStyle: 'italic',
            fontSize: '15px', color: EM.orange, margin: '0 0 16px',
          }}>
            Geographic &amp; Economic Profile
          </p>
          <ul style={{
            fontFamily: WS, fontSize: '14px', color: EM.body,
            lineHeight: 1.75, margin: 0, paddingLeft: '20px',
          }}>
            <li>Location: Urban (access to tech, cost of living)</li>
            <li>Income groups:
              <ul style={{ paddingLeft: '18px', margin: '4px 0 0' }}>
                <li>Students: Limited budget but will splurge on "life-changing" tools</li>
                <li>Professionals: Mid-to-high income (may expense via employer wellness benefits)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Audience Segments heading */}
      <h2 style={{
        fontFamily: QT, fontWeight: 700, fontSize: '52px',
        color: EM.body, textAlign: 'center', margin: '0 0 48px',
        letterSpacing: '0.01em',
      }}>
        Audience Segments
      </h2>

      {/* Persona cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0 24px', padding: '0 56px 80px',
      }}>
        {personas.map((p) => (
          <div key={p.name} style={{
            border: `1.5px solid ${EM.orange}`,
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Photo */}
            <div style={{ height: '240px', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={p.img}
                alt={p.name}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  display: 'block',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '20px 20px 24px', flex: 1 }}>
              <p style={{
                fontFamily: WS, fontWeight: 700, fontSize: '15px',
                color: EM.body, margin: '0 0 2px',
              }}>
                {p.name}
              </p>
              <p style={{
                fontFamily: WS, fontWeight: 700, fontSize: '14px',
                color: EM.orange, margin: '0 0 14px',
              }}>
                {p.role}
              </p>

              <p style={{
                fontFamily: WS, fontSize: '13px', color: EM.body,
                margin: '0 0 4px', lineHeight: 1.5,
              }}>
                Age: {p.age}
              </p>

              <Label>Motivation</Label>
              <p style={{
                fontFamily: WS, fontSize: '13px', color: EM.body,
                margin: '0', lineHeight: 1.6,
              }}>
                {p.motivation}
              </p>

              <Label>Behavior</Label>
              <BulletList items={p.behavior} />

              <Label>Pain Points</Label>
              <BulletList items={p.painPoints} />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── APPLICATION DESIGN ───────────────────────────────────────────────────────
function AppDesignSection() {
  const QT = "'QTAgate', Georgia, serif";
  const AG = "'Agate', Georgia, serif";

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <img
        src="/projects/ember/app-design-phone.png"
        alt="Ember app design"
        style={{ width: '100%', display: 'block' }}
      />
      <div style={{
        position: 'absolute',
        top: '13%',
        left: '5%',
      }}>
        <h2 style={{
          fontFamily: QT,
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          fontWeight: 400,
          color: '#fff',
          margin: 0,
          letterSpacing: '0.01em',
        }}>
          Application Design
        </h2>
        <p style={{
          fontFamily: "'Work Sans', Arial, sans-serif",
          fontSize: 'clamp(0.85rem, 1.6vw, 1.3rem)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.85)',
          margin: '0.3em 0 0 1.5em',
          letterSpacing: '0.02em',
        }}>
          Extending the Brand into a Experience
        </p>
      </div>
    </section>
  );
}

// ─── EMPATHY MAP ──────────────────────────────────────────────────────────────
function EmpathyMapSection() {
  const QT = "'QTAgate', Georgia, serif";
  const WS = "'Work Sans', Arial, sans-serif";
  const bg = '#fffff1';
  const orange = '#f28c32';

  const cardBase = {
    background: '#fff',
    borderRadius: '6px',
    padding: '0.9rem 1rem',
    boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
    fontSize: '0.83rem',
    color: '#2a2a2a',
    lineHeight: 1.55,
  };
  const saysCard = { ...cardBase, fontFamily: QT, fontStyle: 'italic' };
  const doesCard = { ...cardBase, fontFamily: WS, fontStyle: 'italic' };

  const qlabel = {
    fontFamily: WS,
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#1a1a1a',
    textAlign: 'center',
    margin: 0,
  };

  const colL = { padding: '1.5rem 2rem 1.5rem 1.5rem', borderRight: `2px solid ${orange}` };
  const colR = { padding: '1.5rem 1.5rem 1.5rem 2rem' };
  const row3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' };
  const row2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' };

  return (
    <section style={{ background: bg, padding: '4rem 3rem 5rem' }}>
      <h2 style={{ fontFamily: QT, fontSize: '3rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 3rem' }}>
        Empathy Map
      </h2>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* TOP HALF: SAYS | THINKS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 0 }}>
          {/* SAYS */}
          <div style={colL}>
            <p style={{ ...qlabel, marginBottom: '1.2rem' }}>Says</p>
            <div style={row3}>
              <div style={saysCard}>"I want to feel in control again."</div>
              <div style={saysCard}>"I don't want an app that reminds me of my anxiety; I want something that helps me grow."</div>
              <div style={saysCard}>"I'm just stressed, it's normal."</div>
            </div>
            <div style={row2}>
              <div style={saysCard}>"I wish I could manage my emotions better."</div>
              <div style={saysCard}>"I need something that keeps me grounded and motivated."</div>
            </div>
          </div>

          {/* THINKS */}
          <div style={colR}>
            <p style={{ ...qlabel, marginBottom: '1.2rem' }}>Thinks</p>
            <div style={row3}>
              <div style={saysCard}>"I wish there was a space that felt personal, safe, and positive."</div>
              <div style={saysCard}>"If it's easy and feels natural, maybe I'll actually stick to it."</div>
              <div style={saysCard}>"Maybe self-improvement can feel empowering instead of exhausting."</div>
            </div>
            <div style={row2}>
              <div style={saysCard}>"I want to understand myself, but I don't know how."</div>
              <div style={saysCard}>"If I focus on my strengths, I can handle challenges better."</div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL ORANGE LINE + CENTER CIRCLE */}
        <div style={{ position: 'relative', height: '2px', background: orange }}>
          <img
            src="/projects/ember/persona-ananya.png"
            alt="Ananya"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 10%',
              border: '3px solid #f5f2e8',
              zIndex: 2,
            }}
          />
        </div>

        {/* BOTTOM HALF: DOES | FEELS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 0 }}>
          {/* DOES */}
          <div style={{ ...colL, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={row3}>
              <div style={doesCard}>Tries various productivity tools but gets overwhelmed by their intensity.</div>
              <div style={doesCard}>Reads self-help or psychology content for motivation.</div>
              <div style={doesCard}>Seeks systems that align emotional wellbeing with daily routines.</div>
            </div>
            <div style={{ ...row3, marginBottom: '1.5rem' }}>
              <div style={doesCard}>Takes short mindfulness breaks or listens to motivational podcasts</div>
            </div>
            <p style={{ ...qlabel, marginTop: 'auto' }}>Does</p>
          </div>

          {/* FEELS */}
          <div style={{ ...colR, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={row3}>
              <div style={doesCard}>Driven yet emotionally drained by constant pressure to perform.</div>
              <div style={doesCard}>Calmer when focusing on growth, not perfection.</div>
              <div style={doesCard}>Relieved when routines feel human, not robotic.</div>
            </div>
            <div style={{ ...row3, marginBottom: '1.5rem' }}>
              <div style={doesCard}>Conflicted between ambition and mental exhaustion.</div>
            </div>
            <p style={{ ...qlabel, marginTop: 'auto' }}>Feels</p>
          </div>
        </div>

        {/* Divider line */}
        <div style={{ width: '380px', margin: '3rem auto 0', height: '1px', background: '#bbb' }} />
      </div>

      {/* HMW text */}
      <div style={{ maxWidth: '780px', margin: '3.5rem auto 0', textAlign: 'center' }}>
        <p style={{ fontFamily: QT, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, lineHeight: 1.35, color: '#2a2a2a', margin: 0 }}>
          How might we{' '}
          <em style={{ color: orange, fontStyle: 'italic' }}>
            help individuals build mental strength by reframing productivity through the lens of positive psychology?
          </em>
        </p>
      </div>

      {/* Bottom divider */}
      <div style={{ width: '380px', margin: '3.5rem auto 0', height: '1px', background: '#bbb' }} />
    </section>
  );
}

// ─── CARD SORTING ─────────────────────────────────────────────────────────────
function CardSortingSection() {
  const QT = "'QTAgate', Georgia, serif";
  const WS = "'Work Sans', Arial, sans-serif";
  const orange = '#f28c32';
  const bg = '#fffff1';
  const dark = '#21211f';

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: '0 2.5rem',
    padding: '2rem 0',
    borderTop: '1px solid #d8d4c4',
    alignItems: 'start',
  };
  const labelStyle = {
    fontFamily: WS,
    fontSize: '0.9rem',
    fontWeight: 700,
    color: orange,
    margin: 0,
    paddingTop: '2px',
  };
  const bodyStyle = {
    fontFamily: WS,
    fontSize: '0.9rem',
    color: dark,
    lineHeight: 1.65,
    margin: 0,
  };
  const subLabelStyle = {
    fontFamily: WS,
    fontSize: '0.9rem',
    fontWeight: 700,
    color: dark,
    margin: '0 0 0.15em',
  };

  const SolidCard = ({ children }) => (
    <div style={{
      background: orange,
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      fontFamily: WS,
      fontSize: '0.88rem',
      fontWeight: 600,
      color: '#fff',
      textAlign: 'center',
    }}>{children}</div>
  );

  const OutlineCard = ({ children }) => (
    <div style={{
      border: `2px solid ${orange}`,
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      fontFamily: WS,
      fontSize: '0.88rem',
      color: orange,
      textAlign: 'center',
      background: 'transparent',
    }}>{children}</div>
  );

  const Empty = () => <div />;

  return (
    <section style={{ background: bg, padding: '4.5rem 4rem 5rem' }}>
      {/* Title */}
      <h2 style={{ fontFamily: QT, fontSize: '3rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 0.4rem' }}>
        Card Sorting
      </h2>
      <p style={{ fontFamily: WS, fontSize: '1.05rem', fontStyle: 'italic', color: orange, textAlign: 'center', margin: '0 0 3rem' }}>
        Understanding User Mental Models
      </p>

      {/* Content rows */}
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Objective */}
        <div style={rowStyle}>
          <p style={labelStyle}>Objective</p>
          <p style={bodyStyle}>
            To understand how <em>potential users</em> naturally categorize features and content within Ember, helping shape an intuitive information architecture and navigation system.
          </p>
        </div>

        {/* Process */}
        <div style={rowStyle}>
          <p style={labelStyle}>Process</p>
          <div>
            <p style={subLabelStyle}>Method</p>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>Open card sorting (participants could create their own groups).</p>
            <p style={subLabelStyle}>Participants</p>
            <p style={{ ...bodyStyle, marginBottom: '1rem' }}>5–6 potential users (students and young professionals) interested in mindfulness, productivity, and emotional wellbeing.</p>
            <p style={subLabelStyle}>Task</p>
            <p style={bodyStyle}>
              Participants were given cards representing potential app features such as: Home, Strength Assessment, Flourish Sessions, Podcasts, Journal, Community, Progress Tracker, Notifications, Settings, Support, Saved Sessions, Voice Journaling, etc.<br />
              They were asked to group these based on what made sense to them and label each group in their own words.
            </p>
          </div>
        </div>

        {/* Observations */}
        <div style={rowStyle}>
          <p style={labelStyle}>Observations</p>
          <ul style={{ ...bodyStyle, paddingLeft: '1.1rem', margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>Most participants grouped <strong>Assessment, Strengths, and Progress Tracker</strong> together under themes like "Growth," "Self-Discovery," or "Know Yourself."</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Flourish Sessions, Podcasts, and Guided Exercises</strong> were often grouped under "Activities" or "Practice."</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Journal and Voice Journaling</strong> consistently formed their own category, often named "Reflection" or "My Space."</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Community</strong> was sometimes kept separate, while a few linked it with "Motivation" or "Inspiration."</li>
            <li><strong>Support, Settings, and Notifications</strong> were seen as secondary or utility features.</li>
          </ul>
        </div>
      </div>

      {/* Card grid */}
      <div style={{ maxWidth: '900px', margin: '3.5rem auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem' }}>
        {/* Row 1: headers */}
        <SolidCard>Home</SolidCard>
        <SolidCard>Strength</SolidCard>
        <SolidCard>Flourish</SolidCard>
        <SolidCard>Profile</SolidCard>

        {/* Row 2 */}
        <OutlineCard>Today's Quote</OutlineCard>
        <OutlineCard>Strength test</OutlineCard>
        <OutlineCard>Sessions</OutlineCard>
        <OutlineCard>Strengths</OutlineCard>

        {/* Row 3 */}
        <OutlineCard>Courses</OutlineCard>
        <OutlineCard>Courses</OutlineCard>
        <OutlineCard>Workshops</OutlineCard>
        <OutlineCard>Bio</OutlineCard>

        {/* Row 4 */}
        <OutlineCard>Meditation</OutlineCard>
        <OutlineCard>Podcasts/Read</OutlineCard>
        <Empty />
        <OutlineCard>Growth Log</OutlineCard>

        {/* Row 5 */}
        <OutlineCard>Sessions</OutlineCard>
        <Empty />
        <Empty />
        <OutlineCard>Edit Profile</OutlineCard>
      </div>
    </section>
  );
}

// ─── INFORMATION ARCHITECTURE ─────────────────────────────────────────────────
function InfoArchSection() {
  const QT = "'QTAgate', Georgia, serif";
  const WS = "'Work Sans', Arial, sans-serif";
  const orange = '#f28c32';

  const solidBoxStyle = {
    background: orange,
    borderRadius: '10px',
    padding: '0.6rem 1.2rem',
    color: '#fff',
    fontFamily: WS,
    fontSize: '0.88rem',
    fontWeight: 600,
    textAlign: 'center',
    display: 'inline-block',
  };

  const outlineBoxStyle = {
    border: `2px solid ${orange}`,
    borderRadius: '10px',
    padding: '0.55rem 0.9rem',
    color: orange,
    fontFamily: WS,
    fontSize: '0.85rem',
    textAlign: 'center',
    background: 'transparent',
    width: '100%',
    boxSizing: 'border-box',
  };

  const Group = ({ children }) => (
    <div style={{ marginLeft: '20px', borderLeft: `2px solid ${orange}` }}>
      {children}
    </div>
  );

  const Item = ({ label, children }) => (
    <div style={{ marginTop: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ width: '20px', height: '2px', background: orange, marginTop: '18px', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={outlineBoxStyle}>{label}</div>
          {children && <Group>{children}</Group>}
        </div>
      </div>
    </div>
  );

  const Root = ({ label, children }) => (
    <div style={{ marginBottom: '3rem' }}>
      <div style={solidBoxStyle}>{label}</div>
      {children && <Group>{children}</Group>}
    </div>
  );

  return (
    <section style={{ background: '#fffff1', padding: '4rem 3rem 5rem' }}>
      <h2 style={{ fontFamily: QT, fontSize: '3rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 3.5rem' }}>
        Information Architecture
      </h2>

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* Column 1: Splash Screen + Profile */}
        <div>
          <Root label="Splash Screen">
            <Item label="Onboarding" />
            <Item label="Sign Up / Login" />
          </Root>
          <Root label="Profile">
            <Item label="Top Strength" />
            <Item label="Bio" />
            <Item label="Growth Log">
              <Item label="History" />
            </Item>
            <Item label="Settings">
              <Item label="Edit Profile" />
              <Item label="Payment Method" />
            </Item>
          </Root>
        </div>

        {/* Column 2: Homepage + Flourish Session */}
        <div>
          <Root label="Homepage">
            <Item label="Quote of the Day" />
            <Item label="Current Course" />
            <Item label="Daily Meditation" />
            <Item label="Flourish Sessions (Quick Access)" />
          </Root>
          <Root label="Flourish Session">
            <Item label="Workshops">
              <Item label="Ongoing Sessions" />
              <Item label="Upcoming Workshops" />
            </Item>
            <Item label="Saved Sessions" />
          </Root>
        </div>

        {/* Column 3: Strength Zone */}
        <div>
          <Root label="Strength Zone">
            <Item label="Take Strength Assessment">
              <Item label="Question Flow" />
              <Item label="Results: Top 5 Strengths" />
              <Item label="Strength Awareness (Details)" />
            </Item>
            <Item label="Courses">
              <Item label="Units" />
              <Item label="Podcasts/Reads" />
            </Item>
          </Root>
        </div>

      </div>
    </section>
  );
}

// ─── WIREFRAMING ──────────────────────────────────────────────────────────────
function WireframingSection() {
  const QT = "'QTAgate', Georgia, serif";
  return (
    <section style={{ background: '#fffff1', padding: '4rem 3rem 5rem' }}>
      <h2 style={{ fontFamily: QT, fontSize: '3rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 3rem' }}>
        Wireframing
      </h2>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <img src="/projects/ember/wireframe-onboarding.png" alt="Onboarding wireframes" style={{ width: '100%', display: 'block' }} />
        <img src="/projects/ember/wireframe-strength.png" alt="Strength Zone wireframes" style={{ width: '100%', display: 'block' }} />
        <img src="/projects/ember/wireframe-bottom.png" alt="Homepage, Flourish, Profile wireframes" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingSection() {
  const QT = "'QTAgate', Georgia, serif";
  const WS = "'Work Sans', Arial, sans-serif";
  const orange = '#f28c32';

  const labels = ['Splash Screen', 'Onboarding I', 'Onboarding II', 'Onboarding III', 'Sign Up'];

  return (
    <section style={{ background: '#fffff1', padding: '4.5rem 3rem 4rem' }}>
      {/* Title */}
      <h2 style={{ fontFamily: QT, fontSize: '3.2rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 1.2rem' }}>
        Onboarding
      </h2>
      {/* Subtitle */}
      <p style={{ fontFamily: WS, fontSize: '1rem', color: '#21211f', textAlign: 'center', margin: '0 0 3rem', maxWidth: '780px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
        Starts with an animated splash screen, followed by context-setting screens that introduce Ember before sign-up.
      </p>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Screens image */}
        <img
          src="/projects/ember/onboarding-screens.png"
          alt="Onboarding screens"
          style={{ width: '100%', display: 'block' }}
        />

      </div>
    </section>
  );
}

// ─── APP SCREENS ──────────────────────────────────────────────────────────────
function AppScreensSection() {
  const screens = [
    { src: '/projects/ember/screen-homepage.png', alt: 'Homepage' },
    { src: '/projects/ember/screen-strength.png', alt: 'Strength Zone' },
    { src: '/projects/ember/screen-profile.png', alt: 'Profile' },
    { src: '/projects/ember/screen-flourish.png', alt: 'Flourish with Ember' },
    { src: '/projects/ember/screen-closing.png', alt: 'Closing screen' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
      {screens.map(({ src, alt }) => (
        <img key={src} src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      ))}
    </div>
  );
}

// ─── REFLECTION ───────────────────────────────────────────────────────────────
function ReflectionSection() {
  const QT = "'QTAgate', Georgia, serif";
  const WS = "'Work Sans', Arial, sans-serif";
  return (
    <section style={{ background: '#fff', padding: '5rem 3rem 4rem' }}>
      <h2 style={{ fontFamily: QT, fontSize: '3rem', fontWeight: 400, color: '#3b1a5a', textAlign: 'center', margin: '0 0 2rem' }}>
        Reflection
      </h2>
      <p style={{ fontFamily: WS, fontSize: '1.15rem', color: '#1a1a1a', textAlign: 'center', lineHeight: 1.75, maxWidth: '760px', margin: '0 auto 3.5rem' }}>
        In this project, I learned how to identify gaps in the market and develop a cohesive brand strategy around them. The focus was on reshaping the narrative around mental health, shifting it from being seen merely as a survival tool to <em>positioning</em> it as a means to truly thrive in life. Through this process, I explored how design and branding can drive positive change by reframing perspectives and promoting emotional resilience.
      </p>
      <div style={{ width: '420px', height: '1px', background: '#ccc', margin: '0 auto' }} />
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function EmberPage() {
  useGlobalSetup();

  return (
    <div>
      <HeroSection />
      <OverviewSection />
      <MarketSegmentSection />
      <MarketLandscapeSection />
      <CompetitorAnalysisSection />
      <CompetitorTableSection />
      <SwotSection />
      <BrandPositioningSection />
      <BrandStorySection />
      <PurposeSection />
      <BrandValuesSection />
      <BrandPersonalitySection />
      <TargetAudienceSection />
      <VisualIdentitySection />
      <PrimaryLogoSection />
      <LogoConstructionSection />
      <LogoVariationSection />
      <LogoLockupSection />
      <TypographySection />
      <ColourSection />
      <VisualsSection />
      <PrintMediaSection />
      <AdvertisementSection />
      <AppDesignSection />
      <UserPersonaSection />
      <EmpathyMapSection />
      <CardSortingSection />
      <InfoArchSection />
      <WireframingSection />
      <OnboardingSection />
      <AppScreensSection />
      <ReflectionSection />
    </div>
  );
}
