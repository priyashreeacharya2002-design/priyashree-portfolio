export default function ComingSoon() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0C0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      textAlign: 'center',
      padding: '40px 24px',
      cursor: 'default',
    }}>
      {/* Heading */}
      <h1 style={{
        color: '#EDEAE3',
        fontSize: 'clamp(28px, 5vw, 52px)',
        fontWeight: 300,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        margin: '0 0 20px',
      }}>
        Something new<br />is taking shape.
      </h1>

      {/* Subtext */}
      <p style={{
        color: '#6B6860',
        fontSize: 'clamp(14px, 2vw, 17px)',
        fontWeight: 400,
        lineHeight: 1.65,
        maxWidth: '420px',
        margin: '0 0 48px',
      }}>
        The portfolio is being updated with new case studies and work.
        Check back soon — it'll be worth it.
      </p>

      {/* Divider */}
      <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '40px' }} />

      {/* Contact */}
      <a
        href="mailto:priyashree.a@nid.edu"
        style={{
          color: '#EDEAE3',
          fontSize: '13px',
          letterSpacing: '0.1em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          opacity: 0.5,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.target.style.opacity = 1}
        onMouseLeave={e => e.target.style.opacity = 0.5}
      >
        priyashree.a@nid.edu
      </a>
    </div>
  );
}
