import React from 'react';

const CAB = "'Cabinet Grotesk', sans-serif";

const C = {
  darkTeal:   '#1b3d35',
  brightTeal: '#00a896',
  coral:      '#e07868',
  bubbleBg:   '#fef5cf',
  creamBg:    '#fef9cc',
  caption:    '#c49a8a',
  body:       '#1a1a1a',
  bg:         '#fff',
};

export default function AnvayaPage() {
  return (
    <>
      <style>{`
        @font-face { font-family: 'Cabinet Grotesk'; src: url('/fonts/anvaya/CabinetGrotesk-Thin.otf');       font-weight: 100; }
        @font-face { font-family: 'Cabinet Grotesk'; src: url('/fonts/anvaya/CabinetGrotesk-Extralight.otf'); font-weight: 200; }
        @font-face { font-family: 'Cabinet Grotesk'; src: url('/fonts/anvaya/CabinetGrotesk-Light.otf');      font-weight: 300; }
        @font-face { font-family: 'Cabinet Grotesk'; src: url('/fonts/anvaya/CabinetGrotesk-Regular.otf');    font-weight: 400; }
        @font-face { font-family: 'Cabinet Grotesk'; src: url('/fonts/anvaya/CabinetGrotesk-Medium.otf');     font-weight: 500; }
      `}</style>

      <div style={{ background: '#fff' }}>

        {/* ── 1. Hero Video ── */}
        <div style={{ width: '100%', lineHeight: 0 }}>
          <video src="/projects/anvaya/hero.mp4" autoPlay muted loop playsInline
            style={{ width: '100%', display: 'block' }} />
        </div>

        {/* ── 2. Reality of Skincare Today ── */}
        <div style={{ background: C.bg, padding: '72px 5% 80px', fontFamily: CAB }}>
          <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', alignItems: 'start' }}>

            <div>
              <h2 style={{ fontFamily: CAB, fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 500, color: C.darkTeal, marginBottom: '48px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                The Reality of Skincare Today
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ width: '65%' }}>
                  <div style={{ background: C.bubbleBg, borderRadius: '12px 12px 12px 0', padding: '16px 24px 20px' }}>
                    <p style={{ fontFamily: CAB, fontSize: 'clamp(13px, 1.2vw, 18px)', fontWeight: 400, lineHeight: 1.6, margin: 0, color: C.body }}>
                      <span style={{ fontWeight: 500 }}>75%</span> of people self-assess their skin type<br />and most get it wrong.
                    </p>
                  </div>
                  <div style={{ width: 0, height: 0, borderRight: '16px solid ' + C.bubbleBg, borderBottom: '14px solid transparent' }} />
                </div>
                <div style={{ width: '60%', marginLeft: 'auto', marginRight: '6%' }}>
                  <div style={{ background: C.bubbleBg, borderRadius: '12px 12px 0 12px', padding: '16px 24px 20px', textAlign: 'center' }}>
                    <p style={{ fontFamily: CAB, fontSize: 'clamp(13px, 1.2vw, 18px)', fontWeight: 400, lineHeight: 1.6, margin: 0, color: C.body }}>
                      <span style={{ fontWeight: 500 }}>35%</span> feel confused at the<br />point of purchase
                    </p>
                  </div>
                  <div style={{ width: 0, height: 0, borderLeft: '16px solid ' + C.bubbleBg, borderBottom: '14px solid transparent', marginLeft: 'auto' }} />
                </div>
                <div style={{ width: '65%' }}>
                  <div style={{ background: C.bubbleBg, borderRadius: '12px 12px 12px 0', padding: '16px 24px 20px' }}>
                    <p style={{ fontFamily: CAB, fontSize: 'clamp(13px, 1.2vw, 18px)', fontWeight: 400, lineHeight: 1.6, margin: 0, color: C.body }}>
                      <span style={{ fontWeight: 500 }}>42%</span> of skincare sales happen online<br />because the in-store experience fails them
                    </p>
                  </div>
                  <div style={{ width: 0, height: 0, borderRight: '16px solid ' + C.bubbleBg, borderBottom: '14px solid transparent' }} />
                </div>
              </div>
              <p style={{ fontFamily: CAB, fontSize: 'clamp(22px, 2.8vw, 42px)', fontWeight: 500, color: C.brightTeal, lineHeight: 1.2, letterSpacing: '-0.01em', marginTop: '52px', marginBottom: 0 }}>
                Too many products. Too little guidance.<br />Too much guesswork.
              </p>
            </div>

            <div style={{ paddingLeft: '5%', paddingTop: '4px' }}>
              <img src="/projects/anvaya/reality-photo.jpg" alt="Woman looking at skincare shelves" style={{ width: '100%', display: 'block' }} />
              <p style={{ fontFamily: CAB, fontSize: 'clamp(11px, 0.9vw, 14px)', fontStyle: 'italic', fontWeight: 400, color: C.caption, marginTop: '10px', textAlign: 'center' }}>
                The shelves are full. The answers aren't.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. Market Trends ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '46% 54%', fontFamily: CAB }}>
          <div style={{ background: C.bg, padding: '60px 5% 48px', overflow: 'hidden' }}>
            <p style={{ fontFamily: CAB, fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '4px' }}>Skincare</p>
            <h2 style={{ fontFamily: CAB, fontWeight: 500, fontSize: 'clamp(32px, 4vw, 60px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '32px' }}>
              Market Trends
            </h2>
            <img src="/projects/anvaya/market-trends-photo.jpg" alt="Woman with face mask"
              style={{ width: '100%', display: 'block', maxHeight: '520px', objectFit: 'cover', objectPosition: 'center top' }} />
            <p style={{ fontFamily: CAB, fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55, marginTop: '20px' }}>
              Skincare is shifting toward <span style={{ fontWeight: 500 }}>customization, wellness, and tech-driven solutions.</span>
            </p>
          </div>
          <div style={{ background: C.creamBg, padding: '60px 6% 48px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
            <div>
              <p style={{ fontFamily: CAB, fontWeight: 500, fontSize: 'clamp(44px, 5.5vw, 80px)', color: C.coral, lineHeight: 1, marginBottom: '10px' }}>75%</p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55, marginBottom: '4px' }}>
                75% of households now purchase three or fewer skincare products, reflecting preference for minimal routines
              </p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(11px, 0.95vw, 15px)', color: C.coral }}>- Global Cosmetic Industry</p>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', marginTop: '28px' }} />
            </div>
            <div>
              <p style={{ fontFamily: CAB, fontWeight: 500, fontSize: 'clamp(44px, 5.5vw, 80px)', color: C.coral, lineHeight: 1, marginBottom: '10px' }}>40%</p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55, marginBottom: '4px' }}>
                Over 40% of the skincare sector's revenue is driven by personalized and smart products that use diagnostic tech, AI customization, or app-connected tools.
              </p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(11px, 0.95vw, 15px)', color: C.coral }}>- FutureMarketInsights</p>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', marginTop: '28px' }} />
            </div>
            <div>
              <p style={{ fontFamily: CAB, fontWeight: 500, fontSize: 'clamp(44px, 5.5vw, 80px)', color: C.coral, lineHeight: 1, marginBottom: '10px' }}>42%</p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55, marginBottom: '4px' }}>
                Online channels account for about 42% of all Indian skincare sales
              </p>
              <p style={{ fontFamily: CAB, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(11px, 0.95vw, 15px)', color: C.coral }}>- GlobeNewswire</p>
            </div>
          </div>
        </div>

        {/* ── 4. Market Size ── */}
        <div>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(260px, 35vw, 420px)', overflow: 'hidden' }}>
            <img src="/projects/anvaya/market-size-bg.png" alt="Market size"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontFamily: CAB }}>
            <div style={{ background: C.bg, padding: '52px 6% 52px' }}>
              <p style={{ fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)', color: '#aaa', marginBottom: '36px' }}>01</p>
              <p style={{ fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 38px)', color: C.body, lineHeight: 1.15, marginBottom: '18px' }}>$193 billion</p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '24px' }}>
                The global skincare market is projected to reach <span style={{ fontWeight: 500 }}>$122–$193 billion</span> by 2025.
              </p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(10px, 0.85vw, 13px)', color: '#ccc', letterSpacing: '0.05em' }}>fmi</p>
            </div>
            <div style={{ background: C.bg, padding: '52px 6% 52px', borderLeft: '1px solid #efefef' }}>
              <p style={{ fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)', color: '#aaa', marginBottom: '36px' }}>02</p>
              <p style={{ fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 38px)', color: C.body, lineHeight: 1.15, marginBottom: '18px' }}>$432.1 billion</p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '24px' }}>
                By 2035, the skincare industry is expected to grow to <span style={{ fontWeight: 500 }}>$432.1 billion.</span>
              </p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(10px, 0.85vw, 13px)', color: '#ccc', letterSpacing: '0.05em' }}>fmi</p>
            </div>
            <div style={{ background: C.creamBg, padding: '52px 6% 52px', borderLeft: '1px solid #e8e4b8' }}>
              <p style={{ fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)', color: '#aaa', marginBottom: '36px' }}>03</p>
              <p style={{ fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 38px)', color: C.body, lineHeight: 1.15, marginBottom: '18px' }}>$10.5 billion</p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '24px' }}>
                The Indian skincare market is estimated to be worth around USD 8.4 to 10.5 billion in 2025.
              </p>
              <p style={{ fontWeight: 400, fontSize: 'clamp(10px, 0.85vw, 13px)', color: '#ccc', letterSpacing: '0.05em' }}>statista</p>
            </div>
          </div>
        </div>

        {/* ── 5. Types of Research ── */}
        <div style={{ background: C.bg, padding: '64px 5% 72px', fontFamily: CAB }}>

          <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '6px' }}>Research Methodology</p>
          <h2 style={{ fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 56px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Types of Research
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>

            {[
              { title: 'Survey',           bg: '#b2ddd4', text: '20 participants, age 18–30 Skin behavior, trust in AI, product confusion' },
              { title: 'Interviews',       bg: '#f5c5b8', text: '2–3 in-depth conversations Hiral (user), dermatologist (expert)' },
              { title: 'Field Study',      bg: '#fef9cc', text: 'Nykaa, Sephora observation Shelf layout, staff interaction, decision moments' },
              { title: 'Competitor Audit', bg: '#f5c5b8', text: 'The Ordinary, Ravel Where they help, where they fail' },
            ].map(({ title, bg, text }) => (
              <div key={title} style={{ background: bg, padding: '28px 24px 40px', borderRadius: '4px' }}>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '20px', lineHeight: 1.2 }}>{title}</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}

          </div>

          <p style={{ fontWeight: 500, fontSize: 'clamp(18px, 2.2vw, 34px)', color: C.brightTeal, textAlign: 'center', lineHeight: 1.35, maxWidth: '820px', margin: '0 auto' }}>
            Patterns clustered around one theme, people don't lack options, they lack guidance.
          </p>

        </div>

        {/* ── 6. Research Framework & Methodology ── */}
        <div style={{ background: C.bg, padding: '64px 5% 0', fontFamily: CAB }}>
          <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '6px' }}>Research Methodology</p>
          <h2 style={{ fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 54px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Research Framework &amp; Methodology
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: CAB }}>

          {/* Top-left: Research Objectives */}
          <div style={{ background: C.creamBg, padding: '40px 5% 40px', borderRight: '1px dashed #c8c49a', borderBottom: '1px dashed #c8c49a' }}>
            <p style={{ fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 22px)', color: C.body, marginBottom: '24px' }}>Research Objectives</p>
            {[
              ['how people currently approach', 'Understand ', ' skincare.'],
              ['Identify gaps in knowledge', '', ' about skin type and ingredients.'],
              ['Observe frustration points', '', ' in buying skincare products.'],
              ['Assess trust in AI-based skin analysis', '', ' and willingness to try a personalised kiosk.'],
              ['routines, concerns', 'Explore ', ', and sources of skincare information.'],
            ].map(([bold, pre, post], i) => (
              <p key={i} style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '10px' }}>
                · {pre}<span style={{ fontWeight: 500 }}>{bold}</span>{post}
              </p>
            ))}
          </div>

          {/* Top-right: Method */}
          <div style={{ background: C.creamBg, padding: '40px 5% 40px', borderBottom: '1px dashed #c8c49a' }}>
            <p style={{ fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 22px)', color: C.body, marginBottom: '24px' }}>Method</p>
            {[
              ['Online survey', ' (Google Forms)'],
              ['interviews', 'Semi-structured '],
              [null, 'Competitor analysis (ingredient-first brands, personalised skincare brands)'],
              ['Trend study', ' on skincare and beauty tech'],
              ['Observations', ' at retail stores (Nykaa, Sephora)'],
            ].map(([bold, text], i) => (
              <p key={i} style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '14px' }}>
                · {bold ? (i === 1 ? <>{text}<span style={{ fontWeight: 500 }}>{bold}</span></> : <><span style={{ fontWeight: 500 }}>{bold}</span>{text}</>) : text}
              </p>
            ))}
          </div>

          {/* Bottom-left: Sample Size */}
          <div style={{ background: C.creamBg, padding: '40px 5% 56px', borderRight: '1px dashed #c8c49a' }}>
            <p style={{ fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 22px)', color: C.body, marginBottom: '24px' }}>Sample Size</p>
            {[
              ['20 participants', ' (survey)'],
              ['18–30', 'Age group: '],
              ['beginners and regular users', 'Mix of skincare '],
              ['2–3 user interviews', 'Additional ', ' for deeper insights'],
            ].map(([bold, pre, post], i) => (
              <p key={i} style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '10px' }}>
                · {pre}<span style={{ fontWeight: 500 }}>{bold}</span>{post || ''}
              </p>
            ))}
          </div>

          {/* Bottom-right: Approach */}
          <div style={{ background: C.creamBg, padding: '40px 5% 56px' }}>
            <p style={{ fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 22px)', color: C.body, marginBottom: '24px' }}>Approach</p>
            {[
              ['Clustered patterns', ' from surveys and interviews'],
              ['pain points', 'Identified recurring '],
              ['opportunity areas', 'Mapped insights to '],
              ['Validated findings', ' with market trends'],
            ].map(([bold, pre, post], i) => (
              <p key={i} style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65, marginBottom: '10px' }}>
                · {pre}<span style={{ fontWeight: 500 }}>{bold}</span>{post || ''}
              </p>
            ))}
          </div>

        </div>

        {/* ── 7. Product Category — Skincare ── */}
        <div>
          {/* Hero */}
          <div style={{ position: 'relative', width: '100%', height: 'clamp(260px, 35vw, 420px)', overflow: 'hidden' }}>
            <img src="/projects/anvaya/product-category-bg.jpg" alt="Product category"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />

          </div>

          {/* 3-column cream */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontFamily: CAB }}>
            {[
              { num: '01', title: 'Intent',    text: 'To offer personalized, tech-aided skincare in a gentle, wellness-focused way.' },
              { num: '02', title: 'Market',    text: 'Modern skincare products that merge technology with customization.' },
              { num: '03', title: 'Customer',  text: 'Young urban consumers seeking simple, reliable, and personalized skincare solutions.' },
            ].map(({ num, title, text }, i) => (
              <div key={num} style={{
                background: C.creamBg,
                padding: '52px 6% 64px',
                borderRight: i < 2 ? '1px solid #e8e4b0' : 'none',
              }}>
                <p style={{ fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)', color: '#999', marginBottom: '36px' }}>{num}</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(20px, 2.2vw, 34px)', color: C.body, lineHeight: 1.2, marginBottom: '20px' }}>{title}</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 8. The Ordinary's Audit ── */}
        <div style={{ background: C.bg, fontFamily: CAB }}>

          {/* Header */}
          <div style={{ padding: '64px 5% 48px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '6px' }}>Secondary Research</p>
            <h2 style={{ fontWeight: 400, fontSize: 'clamp(26px, 3.6vw, 54px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
              The Ordinary's Audit
            </h2>

            {/* 3 columns — text */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>1. Ingredient Glossary</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>A detailed, structured library that explains actives, benefits, and usage</p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>2. The Periodic Fable</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>campaign reinforces a strong commitment to transparency by calling out misleading beauty buzzwords.</p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>3. Regimen Builder</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>A guided tool that suggests routines based on user inputs, offering some level of personalisation.</p>
              </div>
            </div>
          </div>

          {/* Teal band with cards */}
          <div style={{ lineHeight: 0 }}>
            <img src="/projects/anvaya/audit-band.jpg" alt="The Ordinary audit cards" style={{ width: '100%', display: 'block' }} />
          </div>


        </div>

        {/* ── 9. The Ordinary's Audit — Frictions & Opportunities ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: CAB }}>

          {/* Left — white */}
          <div style={{ background: C.bg, padding: '64px 6% 64px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 24px)', color: C.body, marginBottom: '20px' }}>Frictions</p>
            <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '32px' }} />

            {[
              ['01', 'Chemical-heavy titles ', 'confuse beginners.'],
              ['02', 'High Fear of ',          'Misuse'],
              ['03', 'System is ingredient-first, ', 'not concern-first.'],
            ].map(([num, pre, bold]) => (
              <div key={num}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', alignItems: 'baseline', padding: '20px 0' }}>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body }}>{num}</p>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55 }}>
                    {pre}<span style={{ fontWeight: 500 }}>{bold}</span>
                  </p>
                </div>
                <div style={{ borderBottom: '1px solid #1a1a1a' }} />
              </div>
            ))}
          </div>

          {/* Right — cream */}
          <div style={{ background: C.creamBg, padding: '64px 6% 64px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 24px)', color: C.body, marginBottom: '20px' }}>Opportunities</p>
            <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '32px' }} />

            {[
              'Translate every active and routine into simple, user-friendly terms.',
              'Automatic conflict warnings and “safe for beginners” indicators.',
              'Start with the user’s skin issue, not chemicals.',
            ].map((text, i) => (
              <div key={i}>
                <div style={{ padding: '20px 0' }}>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55 }}>{text}</p>
                </div>
                <div style={{ borderBottom: '1px solid #1a1a1a' }} />
              </div>
            ))}
          </div>

        </div>

        {/* ── 10. Ravel's Audit ── */}
        <div style={{ background: C.bg, fontFamily: CAB }}>

          {/* Header */}
          <div style={{ padding: '64px 5% 48px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '6px' }}>Secondary Research</p>
            <h2 style={{ fontWeight: 400, fontSize: 'clamp(26px, 3.6vw, 54px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
              Ravel's Audit
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>1. Personalisation Through Quiz</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>A detailed quiz to understand skin type, concerns, lifestyle, and goals</p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>2. 3-Step Custom Treatment</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>A simplified starter set, for beginners who are new to skincare.</p>
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, marginBottom: '16px' }}>3. Accessible Pricing</p>
                <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.05vw, 16px)', color: C.body, lineHeight: 1.65 }}>The base custom skincare routine starts at ₹ 499</p>
              </div>
            </div>
          </div>

          {/* Teal band */}
          <div style={{ lineHeight: 0 }}>
            <img src="/projects/anvaya/ravel-band.jpg" alt="Ravel audit" style={{ width: '100%', display: 'block' }} />
          </div>

        </div>

        {/* ── 11. Ravel's Audit — Frictions & Opportunities ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: CAB }}>

          {/* Left — white */}
          <div style={{ background: C.bg, padding: '64px 6% 64px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 24px)', color: C.body, marginBottom: '20px' }}>Frictions</p>
            <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '32px' }} />
            {[
              ['01', 'Long quiz, ', 'unclear reasoning', ' behind ingredient choices.'],
              ['02', '', 'Missing warnings', ' on actives strength or interactions.'],
              ['03', '', 'Delays or unclear communication', ' can frustrate customers.'],
            ].map(([num, pre, bold, post]) => (
              <div key={num}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', alignItems: 'baseline', padding: '20px 0' }}>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body }}>{num}</p>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55 }}>
                    {pre}<span style={{ fontWeight: 500 }}>{bold}</span>{post}
                  </p>
                </div>
                <div style={{ borderBottom: '1px solid #1a1a1a' }} />
              </div>
            ))}
          </div>

          {/* Right — cream */}
          <div style={{ background: C.creamBg, padding: '64px 6% 64px' }}>
            <p style={{ fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 24px)', color: C.body, marginBottom: '20px' }}>Opportunities</p>
            <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '32px' }} />
            {[
              'Add simple “what it does” tooltips',
              'Auto-detect ingredient conflicts. Give frequency and strength recommendations.',
              '30-day check-in to adjust formulas if needed.',
            ].map((text, i) => (
              <div key={i}>
                <div style={{ padding: '20px 0' }}>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.55 }}>{text}</p>
                </div>
                <div style={{ borderBottom: '1px solid #1a1a1a' }} />
              </div>
            ))}
          </div>

        </div>

        {/* ── 12. Competitors Audit — Positioning Map ── */}
        <div style={{ background: C.bg, padding: '64px 5% 80px', fontFamily: CAB }}>

          <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1vw, 16px)', color: C.coral, marginBottom: '6px' }}>Brand Positioning Map</p>
          <h2 style={{ fontWeight: 400, fontSize: 'clamp(26px, 3.6vw, 54px)', color: C.body, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Competitors Audit
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>

            {/* Left — speech bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

              {[
                { brand: <><span style={{ fontSize: '0.55em', display: 'block', fontWeight: 400 }}>The</span><span style={{ fontWeight: 500 }}>Ordinary.</span></>, quote: '"Ingredient-first language creates fear, not confidence"' },
                { brand: <span style={{ fontSize: '1.3em', letterSpacing: '-0.03em' }}>Ravel</span>, quote: '"Long quiz, no ingredient transparency, no follow-up"' },
                { brand: <span style={{ fontWeight: 400 }}>(Retail)</span>, quote: '"Heavy merchandising, no real decision support"' },
              ].map(({ brand, quote }, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'flex-start', gap: '16px' }}>
                  <p style={{ fontWeight: 400, fontSize: 'clamp(14px, 1.3vw, 20px)', color: C.body, textAlign: 'right', paddingTop: '16px', lineHeight: 1.2 }}>{brand}</p>
                  <div style={{ position: 'relative' }}>
                    <div style={{ background: C.bubbleBg, borderRadius: '12px 12px 12px 0', padding: '20px 24px' }}>
                      <p style={{ fontWeight: 400, fontSize: 'clamp(12px, 1.1vw, 17px)', color: C.body, lineHeight: 1.6 }}>{quote}</p>
                    </div>
                    <div style={{ width: 0, height: 0, borderRight: '16px solid ' + C.bubbleBg, borderBottom: '14px solid transparent' }} />
                  </div>
                </div>
              ))}

            </div>

            {/* Right — positioning map */}
            <div style={{ width: '100%' }}>
              <img src="/projects/anvaya/positioning-map.png" alt="Brand positioning map" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>


        {/* ── Slides 13–41 ── */}
        {[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].map(n => (
          <div key={n} style={{ lineHeight: 0 }}>
            <img src={`/projects/anvaya/slide-${n}.png`} alt={`Slide ${n}`} style={{ width: '100%', display: 'block' }} />
          </div>
        ))}

        {/* ── Slide 42 – Kiosk Demo Video ── */}
        <div style={{ background: 'radial-gradient(ellipse at center, #7ecece 0%, #00a89e 100%)', padding: '5% 7%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video src="/projects/anvaya/kiosk-demo.mov" autoPlay muted loop playsInline
            style={{ width: '100%', maxWidth: '1100px', display: 'block', borderRadius: '16px', boxShadow: '0 8px 48px rgba(0,0,0,0.18)' }} />
        </div>

        {/* ── Slides 43–58 ── */}
        {[43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58].map(n => (
          <div key={n} style={{ lineHeight: 0 }}>
            <img src={`/projects/anvaya/slide-${n}.png`} alt={`Slide ${n}`} style={{ width: '100%', display: 'block' }} />
          </div>
        ))}

      </div>
    </>
  );
}