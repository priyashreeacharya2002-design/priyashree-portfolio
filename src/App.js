import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CarbonCountPage from './CarbonCountPage';
import ParadyesPage from './ParadyesPage';
import BunavPage from './BunavPage';
import EmberPage from './EmberPage';
import AnvayaPage from './AnvayaPage';
import FerrariPage from './FerrariPage';
import * as THREE from 'three';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const COLORS = {
  bg: '#0D0C0A',
  bgAlt: '#0F0E0C',
  surface: '#141412',
  textPrimary: '#EDEAE3',
  textSecondary: '#6B6860',
  textMuted: '#58564f',
  textVeryMuted: '#444240',
  accent: '#D81060',
  border: 'rgba(255,255,255,0.08)',
};

const THINKER_ASCII = `
              _...._
           .-'      '-.
          /  ,-~~~~-.  \\
         /  / .-~~-. \\  \\
        |  | ( o  o ) |  |
        |  |  \\ -- /  |  |
        |  |  ,\`--',  |  |
         \\ | / ,--. \\ | /
          \\|/ / ,-, \\ \\|/
           |  | | | |  |
           |,-' | | '-,|
          /|    | |    |\\
         / |  ,-' '-.  | \\
        /  | /       \\ |  \\
       /  /|/   ,-.   \\|\\  \\
      /  / /   /   \\   \\ \\  \\
     /  / /   | ,-. |   \\ \\  \\
    /  / /    |/   \\|    \\ \\  \\
   /  / /     /     \\     \\ \\  \\
  /  / /     /  ,-.  \\     \\ \\  \\
 /  / /  ,--/ ,'   '. \\--,  \\ \\  \\
|  / / ,' / //       \\\\ \\ '.  \\ \\ |
|  | | |  ///    O    \\\\\\ |  |  | ||
|  | | | ///           \\\\| |  |  | ||
|  \\ \\ \\///             \\/ /  /  / /|
|   \\ \\ \\/     ,--,     / / /  / / |
\\    \\ \\ \\    /    \\   / / /  / /  /
 \\    \\ \\ \\  /      \\ / / /  / /  /
  \\    \\ \\ \\/   ,--, V / /  / /  /
   \\    \\ \\ \\  /    \\/ / /  / /  /
    \\    \\ '-\\/      / / '--' /  /
     \\    \\   \\     / /      /  /
      \\    \\   '---' /      /  /
       \\    \\       /    ,-'  /
        \\    '-----'   ,'    /
         \\            /     /
          \\          / ,---'
           \\        / /
            \\      / /
             \\    / /
              \\  / /
    ,-----------\\/ /----------,
   /             \\/            \\
  /  . ' . ' . '  ' . ' . ' .  \\
 /                               \\
/   . ' . ' . ' . ' . ' . ' . '  \\
\\________________________________/
  \\                            /
   \\........................../ `;

const ROTATING_WORDS = [
  'idea',
  'question',
  'system',
  'experience',
  'design',
];

const PROJECTS = [
  {
    id: 'bunav',
    name: 'BUNAV',
    categoryLabel: 'Product Design',
    type: 'App Design & UX',
    description: 'A parenting app designed to support families through the journey of raising children with intention.',
    color: '#1a1915',
    accent: '#8B7355',
    image: '/bunav.png',
    url: '/work/bunav',
  },
  {
    id: 'carbon-count',
    name: 'CARBON COUNT',
    categoryLabel: 'Interaction Design',
    type: 'UX & Service Design',
    description: 'A retail technology concept that makes carbon footprint visible at the point of purchase.',
    color: '#131210',
    accent: '#6B5B4E',
    image: '/carbon-counts.png',
    url: '/work/carbon-count',
  },
  {
    id: 'paradyes',
    name: 'PARADYES',
    categoryLabel: 'UX Case Study',
    type: 'Branding & Visual System',
    description: 'The project is about design thinking, from research to actionable product and brand strategy.',
    color: '#111009',
    accent: '#7A6B5A',
    image: '/paradyes.png',
    url: '/work/paradyes',
  },
  {
    id: 'ember',
    name: 'EMBER',
    categoryLabel: 'Brand Identity & UX',
    type: 'App Design & UX',
    description: 'A mental health app built around warmth and continuity — a gentle space for daily emotional check-ins.',
    color: '#141310',
    accent: '#5C5248',
    image: '/ember.png',
    url: '/work/ember',
  },
  {
    id: 'ferrari-ar',
    name: 'FERRARI AR',
    categoryLabel: 'AR Experience Design',
    type: 'Interaction Design',
    description: 'An augmented reality experience that brings the Ferrari brand to life through immersive spatial design.',
    color: '#110a08',
    accent: '#7A3020',
    image: '/ferrari-ar.png',
    url: '/work/ferrari-ar',
  },
  {
    id: 'anvaya',
    name: 'ANVAYA',
    categoryLabel: 'Brand Identity',
    type: 'Branding & Visual System',
    description: 'A brand identity project rooted in cultural continuity and contemporary design sensibility.',
    color: '#0e0e0c',
    accent: '#5C6B4E',
    image: '/anvaya.png',
    url: '/work/anvaya',
  },
];

const DIGESTS = [
  {
    id: 1,
    title: 'Barriers to Identity: Aadhaar Case Study',
    subtitle: 'An investigation into how India\'s national ID system creates exclusion — and what design could do differently.',
    tag: 'Research',
    readTime: '6 min read',
    image: '/aadhaar.png',
    url: 'https://medium.com/@priyashreeacharya2002/barriers-to-identity-aadhaar-case-study-04af72112890',
  },
  {
    id: 2,
    title: 'Melt the Weight of Expectations: Visual Design',
    subtitle: 'A visual exploration of academic pressure and the quiet weight students carry.',
    tag: 'Visual Design',
    readTime: '5 min read',
    image: '/melt.png',
    url: 'https://medium.com/@priyashreeacharya2002/melt-the-weight-of-expectations-visual-design-6464dff5f085',
  },
  {
    id: 3,
    title: 'Designing for Engagement: A Behavioral Intervention for Blue-Collar Workers at Swiggy',
    subtitle: 'How behavioral design principles can improve engagement and motivation for delivery partners.',
    tag: 'Behavioral Design',
    readTime: '7 min read',
    image: '',
    url: 'https://medium.com/@priyashreeacharya2002/designing-for-engagement-a-behavioral-intervention-for-blue-collar-workers-at-swiggy-a6a98383865f',
  },
  {
    id: 4,
    title: 'Nidra — UI/UX Design',
    subtitle: 'A sleep and wellness app designed to help users build healthier bedtime routines.',
    tag: 'UI/UX Design',
    readTime: '',
    image: '',
    url: 'https://www.behance.net/gallery/243816955/Nidra-UIUX-Design',
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

function LogoLink({ logoStyle }) {
  const navigate = useNavigate();
  return (
    <a
      href="/"
      style={logoStyle}
      onClick={e => {
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      P
    </a>
  );
}

function Nav() {
  const scrolled = useScrolled();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    fontFamily: "'Blackletter', cursive",
    fontSize: '31px',
    color: '#D81060',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: 1,
  };

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'BLOG', href: '#sandbox' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <nav style={navStyle}>
      <LogoLink logoStyle={logoStyle} />

      {/* Desktop nav links */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
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
      )}

      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#B0ADA6',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            lineHeight: 1,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(13,12,10,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '48px',
        }}>
          {navLinks.map((link, i) => (
            <NavLink
              key={link.label}
              link={link}
              isHovered={hoveredLink === i}
              onHover={() => setHoveredLink(i)}
              onLeave={() => setHoveredLink(null)}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

function NavLink({ link, isHovered, onHover, onLeave, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPageLink = !link.href.startsWith('#');
  const isOnHome = location.pathname === '/';

  return (
    <a
      href={link.href}
      style={{
        fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 400,
        fontSize: '11px',
        letterSpacing: '0.08em',
        textDecoration: 'none',
        color: isHovered ? '#D81060' : '#B0ADA6',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={e => {
        e.preventDefault();
        if (onClick) onClick();
        if (isPageLink) {
          navigate(link.href);
        } else if (isOnHome) {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
          setTimeout(() => {
            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }}
    >
      {link.label}
    </a>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────


function PrismBg() {
  const canvasRef = useRef(null);
  const threeRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Three.js pyramid ───────────────────────────────────────────────────
    const threeCanvas = threeRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, alpha: true, antialias: true });
    renderer.setSize(320, 320);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.1, 4);

    const geo  = new THREE.ConeGeometry(1, 1.6, 4, 1);
    geo.rotateY(Math.PI / 4);
    const mat  = new THREE.MeshPhysicalMaterial({
      color:              0xffffff,
      transmission:       0.92,
      roughness:          0,
      metalness:          0,
      ior:                2.4,
      thickness:          2,
      transparent:        true,
      opacity:            0.18,
      clearcoat:          1.0,
      clearcoatRoughness: 0.0,
      reflectivity:       1.0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Core edges — bright
    const edgesGeo = new THREE.EdgesGeometry(geo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xddeeff, opacity: 0.92, transparent: true });
    const edges    = new THREE.LineSegments(edgesGeo, edgesMat);
    scene.add(edges);

    // Glow edge layer 1 — close halo, cyan tint
    const glowGeo1 = new THREE.EdgesGeometry(new THREE.ConeGeometry(1.014, 1.622, 4, 1));
    glowGeo1.rotateY(Math.PI / 4);
    const glowMat1 = new THREE.LineBasicMaterial({ color: 0x88ccff, opacity: 0.18, transparent: true });
    const glowEdges1 = new THREE.LineSegments(glowGeo1, glowMat1);
    scene.add(glowEdges1);

    // Glow edge layer 2 — wide soft bloom, blue-violet
    const glowGeo2 = new THREE.EdgesGeometry(new THREE.ConeGeometry(1.035, 1.656, 4, 1));
    glowGeo2.rotateY(Math.PI / 4);
    const glowMat2 = new THREE.LineBasicMaterial({ color: 0x6677ff, opacity: 0.07, transparent: true });
    const glowEdges2 = new THREE.LineSegments(glowGeo2, glowMat2);
    scene.add(glowEdges2);

    const R3 = Math.SQRT2 / 3;
    const CY = -0.8 / 3;
    const FACES = [
      { normal: new THREE.Vector3( 1, 0,  0), centroid: new THREE.Vector3( R3, CY,   0) },
      { normal: new THREE.Vector3( 0, 0,  1), centroid: new THREE.Vector3(  0, CY,  R3) },
      { normal: new THREE.Vector3(-1, 0,  0), centroid: new THREE.Vector3(-R3, CY,   0) },
      { normal: new THREE.Vector3( 0, 0, -1), centroid: new THREE.Vector3(  0, CY, -R3) },
    ];

    // Key light — strong specular on left face
    const dirLight = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight.position.set(-3, 1, 2);
    scene.add(dirLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // Spot — top highlight
    const spotLight = new THREE.SpotLight(0xffffff, 4);
    spotLight.position.set(-3, 4, 3);
    spotLight.angle    = 0.3;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // Inner glow
    const innerLight = new THREE.PointLight(0xaaddff, 0.6);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    // Specular fill — creates reflection hotspot on front-right face
    const specLight1 = new THREE.PointLight(0xffffff, 5, 6);
    specLight1.position.set(-1.2, 1.8, 1.6);
    scene.add(specLight1);

    // Cool rim light — blue-white reflection on back edge
    const specLight2 = new THREE.PointLight(0xaabbff, 3, 5);
    specLight2.position.set(1.8, 0.6, 1.2);
    scene.add(specLight2);

    // Warm under-bounce — subtle warm reflection from below
    const specLight3 = new THREE.PointLight(0xffeedd, 1.5, 4);
    specLight3.position.set(0, -1.5, 1.5);
    scene.add(specLight3);

    const fresnelGeo = new THREE.ConeGeometry(1.02, 1.632, 4, 1);
    fresnelGeo.rotateY(Math.PI / 4);
    const fresnelMat = new THREE.MeshBasicMaterial({
      color:       0xffffff,
      side:        THREE.BackSide,
      transparent: true,
      opacity:     0.08,
    });
    const fresnelMesh = new THREE.Mesh(fresnelGeo, fresnelMat);
    scene.add(fresnelMesh);

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    let mx = W * 0.35, my = H * 0.42;
    let rayAlpha = 0;
    let animFrame;
    let isVisible = true;
    const visObs = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0 });
    visObs.observe(canvas);

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener('mousemove', onMove);

    function seg(ax,ay,bx,by,cx,cy,dx,dy) {
      const d = (dy-cy)*(bx-ax)-(dx-cx)*(by-ay);
      if (Math.abs(d)<1e-8) return null;
      const t = ((dx-cx)*(ay-cy)-(dy-cy)*(ax-cx))/d;
      const u = ((bx-ax)*(ay-cy)-(by-ay)*(ax-cx))/d;
      if (t>=0&&t<=1&&u>=0&&u<=1) return {x:ax+t*(bx-ax),y:ay+t*(by-ay),t,u};
      return null;
    }

    function volumetricBeam(ox,oy,tx,ty) {
      if (!isFinite(ox)||!isFinite(oy)||!isFinite(tx)||!isFinite(ty)) return;
      const dx=tx-ox, dy=ty-oy;
      const angle=Math.atan2(dy,dx);
      const N=18;
      ctx.save();
      ctx.globalCompositeOperation='screen';
      const passes=[
        [ 14,  5,  0.09 ],
      ];
      passes.forEach(([rl, rp, alpha]) => {
        for (let i=0; i<N; i++) {
          const t=i/(N-1);
          const bx=ox+dx*t, by=oy+dy*t;
          let s=1;
          if (i<20)    s=1+(19-i)*0.5/19;
          if (i>=N-20) s=1-((i-(N-20))/19)*0.6;
          s=Math.max(0.15,s);
          const erl=rl*s, erp=rp*s;
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(angle);
          ctx.scale(1, erp/erl);
          const grd=ctx.createRadialGradient(0,0,0, 0,0,erl);
          grd.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grd.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.arc(0, 0, erl, 0, Math.PI*2);
          ctx.fillStyle=grd;
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.restore();
    }

    function drawSparkle(sx,sy) {
      const long=10, short=1.5;
      ctx.save();
      ctx.fillStyle='#ffffff';
      ctx.beginPath();
      for (let i=0;i<8;i++) {
        const a=i*Math.PI/4 - Math.PI/2;
        const r=i%2===0 ? long : short;
        const x=sx+Math.cos(a)*r, y=sy+Math.sin(a)*r;
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    const RAYS = [
      [  7,   255,  30,   0],
      [  4.5, 255, 120,   0],
      [  2,   230, 255,   0],
      [  0,     0, 255,  60],
      [ -2,     0,  80, 255],
      [ -4.5,  60,   0, 200],
      [ -7,   140,   0, 255],
    ];

    function spectrumRay(ex, ey, angleDeg, r, g, b) {
      if (!isFinite(ex)||!isFinite(ey)) return;
      const a  = angleDeg * Math.PI / 180;
      const ca = Math.cos(a), sa = Math.sin(a);
      const px = -sa, py = ca;
      const reach = W - ex + 300;
      const fx = ex + ca*reach, fy = ey + sa*reach;
      const nearHW = 4, farHW = 48;
      const passes = [
        [0.10,  0.02],
        [0.40,  0.10],
      ];
      passes.forEach(([a0, a1]) => {
        const grd = ctx.createLinearGradient(ex, ey, fx, fy);
        grd.addColorStop(0, `rgba(${r},${g},${b},${a0})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},${a1})`);
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.moveTo(ex + px*nearHW, ey + py*nearHW);
        ctx.lineTo(ex - px*nearHW, ey - py*nearHW);
        ctx.lineTo(fx - px*farHW,  fy - py*farHW);
        ctx.lineTo(fx + px*farHW,  fy + py*farHW);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      });
    }

    let lastTs = 0;
    function tick(ts) {
      animFrame = requestAnimationFrame(tick);
      if (!isVisible || ts - lastTs < 33) return; // pause off-screen, cap to ~30 fps
      lastTs = ts;
      ctx.clearRect(0,0,W,H);

      const pcx = W * 0.63, pcy = H * 0.30;
      const PW = 120, PH = 100;
      const top = [pcx,        pcy - PH/2];
      const bl  = [pcx - PW/2, pcy + PH/2];
      const br  = [pcx + PW/2, pcy + PH/2];

      const originX = 50, originY = 90;
      const dirX = mx - originX || 1;
      const dirY = my - originY;
      const mag  = Math.sqrt(dirX*dirX+dirY*dirY)||1;
      const far  = W*4;
      const bx2  = originX+(dirX/mag)*far;
      const by2  = originY+(dirY/mag)*far;

      const hitL = seg(originX,originY,bx2,by2, top[0],top[1],bl[0],bl[1]);
      const hitR = seg(originX,originY,bx2,by2, top[0],top[1],br[0],br[1]);
      const hitB = seg(originX,originY,bx2,by2, bl[0],bl[1],br[0],br[1]);

      const hits = [hitL,hitR,hitB].filter(Boolean).sort((a,b)=>a.t-b.t);
      const entry = hits[0]||null, exit = hits[1]||null;
      const isHit = hits.length >= 2;

      if (isHit) rayAlpha = Math.min(1, rayAlpha+0.055);
      else        rayAlpha = Math.max(0, rayAlpha-0.038);

      mesh.updateMatrixWorld();
      const mw = mesh.matrixWorld;
      let maxLeft = -Infinity, maxRight = -Infinity;
      let entryFace = FACES[2], exitFace = FACES[0];
      FACES.forEach(f => {
        const wn = f.normal.clone().transformDirection(mw);
        const dotL = -wn.x;
        const dotR =  wn.x;
        if (dotL > maxLeft)  { maxLeft  = dotL; entryFace = f; }
        if (dotR > maxRight) { maxRight = dotR; exitFace  = f; }
      });

      const _ec = entryFace.centroid.clone().applyMatrix4(mw);
      _ec.project(camera);
      const entryPx = { x: W * 0.63 + _ec.x * 160, y: H * 0.30 - _ec.y * 160 };

      const _xc = exitFace.centroid.clone().applyMatrix4(mw);
      _xc.project(camera);
      const exitPx  = { x: W * 0.63 + _xc.x * 160, y: H * 0.30 - _xc.y * 160 };

      const beamEndX = isHit ? entryPx.x : Math.min(mx, top[0]-10);
      const beamEndY = isHit ? entryPx.y : my;
      volumetricBeam(originX, originY, beamEndX, beamEndY);

      mesh.rotation.y        += 0.004;
      edges.rotation.y       += 0.004;
      glowEdges1.rotation.y  += 0.004;
      glowEdges2.rotation.y  += 0.004;
      fresnelMesh.rotation.y += 0.004;
      renderer.render(scene, camera);

      if (rayAlpha > 0) {
        const ex = exitPx.x, ey = exitPx.y;
        ctx.globalAlpha = rayAlpha;
        RAYS.forEach(([deg,r,g,b]) => spectrumRay(ex, ey, deg, r, g, b));

        if (isFinite(ex) && isFinite(ey)) {
          const topA = -7 * Math.PI/180, botA = 7 * Math.PI/180;
          const reach = W - ex + 300;
          const fxT = ex + Math.cos(topA)*reach, fyT = ey + Math.sin(topA)*reach;
          const fxB = ex + Math.cos(botA)*reach, fyB = ey + Math.sin(botA)*reach;
          const hslGrd = ctx.createLinearGradient(fxT, fyT, fxB, fyB);
          hslGrd.addColorStop(0,    'hsla(270,100%,55%,0.15)');
          hslGrd.addColorStop(0.17, 'hsla(240,100%,55%,0.15)');
          hslGrd.addColorStop(0.33, 'hsla(210,100%,55%,0.15)');
          hslGrd.addColorStop(0.5,  'hsla(120,100%,50%,0.15)');
          hslGrd.addColorStop(0.67, 'hsla(60,100%,50%,0.15)');
          hslGrd.addColorStop(0.83, 'hsla(30,100%,50%,0.15)');
          hslGrd.addColorStop(1,    'hsla(0,100%,50%,0.15)');
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.beginPath();
          ctx.moveTo(ex, ey - 3); ctx.lineTo(ex, ey + 3);
          ctx.lineTo(fxB, fyB);   ctx.lineTo(fxT, fyT);
          ctx.closePath();
          ctx.fillStyle = hslGrd; ctx.fill();
          ctx.restore();
        }

        ctx.globalAlpha = 1;
        ctx.save();
        ctx.beginPath(); ctx.arc(ex,ey,3.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        ctx.fill();
        ctx.restore();
      }

      if (isHit) drawSparkle(entryPx.x, entryPx.y);
    }

    animFrame = requestAnimationFrame(tick);
    const onResize = () => {
      W=canvas.offsetWidth; H=canvas.offsetHeight;
      canvas.width=W; canvas.height=H;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      visObs.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
      display: window.innerWidth < 768 ? 'none' : 'block'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',filter:'blur(4px)',willChange:'transform'}}/>
      <canvas ref={threeRef} width={320} height={320} style={{
        position:'absolute',
        left:'63%', top:'30%',
        transform:'translate(-50%,-50%)',
        pointerEvents:'none',
      }}/>
    </div>
  );
}

function Hero() {
  const [prismHovered, setPrismHovered] = useState(false);
  const heroRef = useRef(null);
  const slotRef = useRef(null);
  const wordInnerRef = useRef(null);
  const currentIdxRef = useRef(0);

  function measureWord(text) {
    const ghost = document.createElement('span');
    const fs = slotRef.current
      ? getComputedStyle(slotRef.current.parentElement).fontSize
      : '52px';
    ghost.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-family:'Apple Garamond',Georgia,serif;font-style:italic;font-size:${fs};font-weight:300;letter-spacing:-0.01em`;
    ghost.textContent = text;
    document.body.appendChild(ghost);
    const w = ghost.offsetWidth;
    ghost.remove();
    return w;
  }

  useEffect(() => {
    if (slotRef.current) {
      slotRef.current.style.width = measureWord(ROTATING_WORDS[0]) + 'px';
    }
    const interval = setInterval(() => {
      const next = (currentIdxRef.current + 1) % ROTATING_WORDS.length;
      if (wordInnerRef.current) wordInnerRef.current.className = 'word-slot-inner exit';
      setTimeout(() => {
        if (slotRef.current) slotRef.current.style.width = measureWord(ROTATING_WORDS[next]) + 'px';
        if (wordInnerRef.current) {
          wordInnerRef.current.textContent = ROTATING_WORDS[next];
          wordInnerRef.current.className = 'word-slot-inner enter';
        }
        currentIdxRef.current = next;
      }, 320);
    }, 2600);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Proximity-based hover: check if mouse is within ~180px of prism centre
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const prismCx = rect.left + rect.width  * 0.63;
      const prismCy = rect.top  + rect.height * 0.30;
      const dx = e.clientX - prismCx;
      const dy = e.clientY - prismCy;
      setPrismHovered(Math.sqrt(dx * dx + dy * dy) < 180);
    };
    const onLeave = () => setPrismHovered(false);
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
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
      {/* Background image — full cover, grayscale by default, colour on prism hover */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 0,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 33%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 33%)',
      }}>
        <img
          src="/serene-floral-staircase.png"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: prismHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            opacity: 0.7,
            transition: 'filter 1.2s ease',
          }}
        />
      </div>

      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 20%, rgba(201,185,154,0.04) 0%, transparent 60%)',
      }} />

      {/* Three.js prism + 2D beam overlay */}
      <PrismBg />

      {/* Atmospheric light rays */}
      <LightRays />

      {/* Coordinates */}


      {/* Main hero text */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading row — text left, button top-right */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '32px',
          marginBottom: '48px',
        }}>
          <div style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontWeight: 300,
            lineHeight: 1.08,
            fontSize: 'clamp(40px, 6.5vw, 88px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.03em',
          }}>
            It starts with a spark,<br />
            and becomes{' '}
            {/* Iridescent word slot */}
            <span
              ref={slotRef}
              style={{
                display: 'inline-block',
                position: 'relative',
                verticalAlign: 'bottom',
                minWidth: '10px',
                transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <span
                ref={wordInnerRef}
                className="word-slot-inner enter"
              >
                {ROTATING_WORDS[0]}
              </span>
            </span>
          </div>

          {/* Button — bottom-right, aligned with end of text */}
          <div style={{ flexShrink: 0, paddingBottom: '4px' }}>
            <CTAButton href="#contact">Taking up projects ↗</CTAButton>
          </div>
        </div>

        {/* Tagline row */}
        <div style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: '32px',
        }}>
          <p style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: 'rgba(255,255,255,0.82)',
            maxWidth: '420px',
            lineHeight: 1.65,
            margin: 0,
            letterSpacing: '0.005em',
          }}>
            Hey I'm Priyashree Acharya — User Experience Designer.<br />I study people, then design for them.
          </p>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .word-slot-inner {
          display: inline-block;
          white-space: nowrap;
          font-family: 'Apple Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: -0.01em;
          color: #ffffff;
          text-shadow: 0 0 18px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(210,225,255,0.08), 0 0 140px rgba(200,215,255,0.05);
          will-change: transform, opacity;
        }
        .word-slot-inner.enter {
          animation: wordIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .word-slot-inner.exit {
          animation: wordOut 0.32s cubic-bezier(0.4,0,1,1) forwards;
        }
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(60%) skewY(4deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0) skewY(0deg); }
          to   { opacity: 0; transform: translateY(-50%) skewY(-3deg); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @media (max-width: 768px) { .adam-ascii-bg { display: none !important; } }
      `}</style>
    </section>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function SectionLabel({ children, color }) {
  return (
    <div style={{
      fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontWeight: 400,
      fontSize: '10px',
      letterSpacing: '0.12em',
      color: color || COLORS.textSecondary,
      marginBottom: '32px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span style={{ color: COLORS.accent, fontWeight: 400 }}>/</span>
      {children}
    </div>
  );
}

function CTAButton({ href, children, filled = false }) {
  return (
    <a
      href={href}
      className={filled ? 'iridescent-btn' : 'frosted-btn'}
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

// White bloom glow word — same effect as "her" in About section
function GlowWord({ children }) {
  return (
    <em style={{
      fontStyle: 'italic',
      fontWeight: 'inherit',
      color: '#ffffff',
      textShadow: '0 0 18px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(210,225,255,0.08), 0 0 140px rgba(200,215,255,0.05)',
    }}>
      {children}
    </em>
  );
}

function IridescentWord({ children }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, #5dcaa5, #a78bfa, #7dd3fc, #f0abfc, #5dcaa5)',
      backgroundSize: '300% 100%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      fontStyle: 'italic',
      animation: 'shimmer 4s linear infinite',
      display: 'inline',
    }}>
      {children}
    </span>
  );
}

// Subtle light ray overlay for atmosphere
function LightRays() {
  const rays = [
    { left: '36%', top: '0',   rotate: '-9deg',  h: '55%', w: '90px',  op: 0.032 },
    { left: '54%', top: '8%',  rotate: '13deg',  h: '40%', w: '60px',  op: 0.022 },
    { left: '66%', top: '2%',  rotate: '-4deg',  h: '48%', w: '40px',  op: 0.018 },
  ];
  return (
    <>
      {rays.map((r, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: r.left, top: r.top,
          width: r.w, height: r.h,
          background: `linear-gradient(to bottom, rgba(255,255,255,${r.op}), transparent)`,
          transform: `rotate(${r.rotate}) translateX(-50%)`,
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(6px)',
          animation: `rayFade ${4 + i * 1.5}s ease-in-out infinite`,
        }} />
      ))}
    </>
  );
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>SELECTED WORKS</SectionLabel>
            <h2 style={{
              fontFamily: "'Apple Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Design for Purpose, <GlowWord>Emotions</GlowWord> and Solutions
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px',
          maxWidth: '960px',
          margin: '0 auto',
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
  const navigate = useNavigate();
  const isInternal = project.url.startsWith('/');

  return (
    <a
      href={project.url}
      target={isInternal ? '_self' : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
      onClick={isInternal ? (e) => { e.preventDefault(); navigate(project.url); } : undefined}
      style={{
        ...fadeUp(visible, delay),
        background: hovered ? COLORS.surface : COLORS.bg,
        cursor: 'pointer',
        transition: 'background 0.4s ease, opacity 0.8s ease, transform 0.8s ease',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
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
        {project.image ? (
          <img src={project.image} alt={project.name} loading="lazy" style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center', display: 'block',
            filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transition: 'filter 0.5s ease',
          }} />
        ) : (
          <div style={{
            width: '80px', height: '80px',
            border: `1px solid ${project.accent}`,
            opacity: hovered ? 0.4 : 0.15,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transform: hovered ? 'rotate(45deg) scale(1.1)' : 'rotate(45deg)',
          }} />
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: '24px 28px 28px', flex: 1, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: '22px',
            color: hovered ? COLORS.accent : COLORS.textPrimary,
            margin: 0,
            letterSpacing: '-0.01em',
            transition: 'color 0.3s ease',
          }}>
            {project.name}
          </h3>
          <span style={{
            fontSize: '14px',
            color: hovered ? COLORS.accent : COLORS.textMuted,
            transition: 'color 0.3s ease, transform 0.3s ease',
            display: 'inline-block',
            transform: hovered ? 'translate(3px, -3px)' : 'translate(0,0)',
          }}>↗</span>
        </div>
        <span style={{
          fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: COLORS.textSecondary,
          display: 'block',
          marginBottom: '12px',
        }}>
          {project.categoryLabel}
        </span>
        <p style={{
          fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: '12px',
          color: COLORS.textMuted,
          margin: 0,
          lineHeight: 1.7,
          opacity: 1,
          transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
        }}>
          {project.description}
        </p>
      </div>
    </a>
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px', gap: '20px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>ANNOTATIONS</SectionLabel>
            <h2 style={{
              fontFamily: "'Apple Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Some <GlowWord>reflections</GlowWord> worth noting.
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
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
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => article.url && window.open(article.url, '_blank')}
    >
      {/* Cover image */}
      <div style={{
        width: '100%',
        height: '320px',
        flexShrink: 0,
        overflow: 'hidden',
        background: '#1a1915',
        position: 'relative',
      }}>
        {article.image ? (
          <img src={article.image} alt={article.title} loading="lazy" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#1a1915' }} />
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: '#111',
        padding: '20px 20px 22px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        height: '110px',
        boxSizing: 'border-box',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: COLORS.textPrimary,
            margin: '0 0 6px',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {article.title}
          </h3>
          <p style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: '12px',
            color: COLORS.textSecondary,
            margin: 0,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {article.subtitle}
          </p>
        </div>
        <button style={{
          flexShrink: 0,
          background: 'transparent',
          border: `1px solid ${COLORS.border}`,
          color: COLORS.textSecondary,
          fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '11px',
          letterSpacing: '0.06em',
          padding: '6px 14px',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          borderColor: hovered ? COLORS.accent : COLORS.border,
          color: hovered ? COLORS.accent : COLORS.textSecondary,
        }}>
          Read
        </button>
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function SkillCircle({ label }) {
  const [hovered, setHovered] = useState(false);
  const size = 160;
  const r = (size / 2) - 1;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Static base border */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
      </svg>

      {/* Animated trim-path stroke with glow */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: hovered ? 1 : 0, transition: 'opacity 0.15s ease' }}>
        <defs>
          <filter id="circle-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          filter="url(#circle-glow)"
          strokeDasharray={circumference}
          strokeDashoffset={hovered ? 0 : circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: hovered ? 'stroke-dashoffset 0.55s ease' : 'none' }}
        />
      </svg>

      {/* Text */}
      <span style={{
        fontFamily: "'Apple Garamond', Georgia, serif",
        fontWeight: 300,
        fontSize: '15px',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.5,
        whiteSpace: 'pre-line',
        padding: '0 12px',
        position: 'relative',
        zIndex: 1,
        transition: 'text-shadow 0.3s ease',
        textShadow: hovered
          ? '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.4)'
          : 'none',
      }}>
        {label}
      </span>
    </div>
  );
}

const TOOLS = ['Figma', 'Framer', 'React', 'After Effects', 'Premiere', 'Illustrator', 'Photoshop', 'Miro', 'Notion', 'Webflow'];

function CabinetSection() {
  const [ref, visible] = useFadeIn();

  const skillGroups = [
    { label: 'Research', skills: ['UserTesting', 'Google Forms', 'Perplexity'] },
    { label: 'Design and Prototyping', skills: ['Figma', 'Protopie', 'Framer', 'Lottie'] },
    { label: 'Thinking and Systems', skills: ['Miro', 'FigJam', 'Notion'] },
    { label: 'AI Tools', skills: ['ChatGPT', 'Claude', 'Midjourney', 'Galileo AI', 'Uizard'] },
  ];

  const education = [
    {
      initials: 'NID',
      degree: 'M.Des Design for Retail Experience',
      institution: 'National Institute of Design',
      years: '2024 – 26',
    },
    {
      initials: 'DU',
      degree: 'B.A. Psychology Honours',
      institution: 'Daulat Ram College, University of Delhi',
      years: '2020 – 23',
    },
    {
      initials: 'SA',
      degree: 'Graphic Design Diploma',
      institution: 'Sri Aurobindo Centre for Arts and Creativity',
      years: '2022 – 23',
    },
  ];

  const labelStyle = {
    fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '10px',
    fontWeight: 400,
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    marginBottom: '10px',
  };

  const bodyTextStyle = {
    fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(13px, 1.3vw, 15px)',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.75,
    letterSpacing: '0.005em',
    margin: 0,
  };

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: '#0b0a09',
        padding: '120px 40px 160px',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Centred heading above columns */}
        <div style={{ ...fadeUp(visible, 0), textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            About{' '}
            <em style={{
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#ffffff',
              textShadow: '0 0 18px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(210,225,255,0.08), 0 0 140px rgba(200,215,255,0.05)',
            }}>Her</em>
          </h2>
          <p style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            color: '#D81060',
            margin: '24px 0 0 0',
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
          }}>
            "I don't just design how things look. I design how they feel, behave, and stay with you"
          </p>
        </div>

        <div className="about-grid">

          {/* ── Left column: photo + education ── */}
          <div style={{ ...fadeUp(visible, 0), display: 'flex', flexDirection: 'column', gap: '56px' }}>

            {/* Portrait */}
            <img
              src="/Priyashreeweb.png"
              alt="Priyashree Acharya"
              loading="lazy"
              style={{
                width: '80%',
                borderRadius: '8px',
                display: 'block',
                filter: 'grayscale(100%)',
                objectFit: 'cover',
              }}
            />

          </div>

          {/* ── Right column: text content ── */}
          <div style={{ ...fadeUp(visible, 0.1), display: 'flex', flexDirection: 'column', gap: '36px', justifyContent: 'center', alignSelf: 'center' }}>

            {/* Subline */}
            <p style={{
              fontFamily: "'Apple Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
            }}>
              Hey! I am Priyashree Acharya
            </p>

            {/* Body paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                'I\'m an experience designer working at the intersection of human behaviour and design. With a background in psychology and a deep curiosity for how people think, feel, and act, I design experiences that are intuitive, intentional, and emotionally aware.',
                'I started with people long before I started with pixels. Understanding behaviour came first, why someone hesitates, what they avoid, what they feel but don\'t express. That lens still shapes how I approach every brief, not as an aesthetic problem, but as a human one.',
                'Over time, design became the way I act on that understanding. A way to translate insight into something tangible, something people can move through, not just look at.',
                'I ask more questions than most. I don\'t settle early, and I don\'t treat rigour as optional. Because the work I care about isn\'t just about making things work, it\'s about changing how something is experienced.',
              ].map((para, i) => (
                <p key={i} style={bodyTextStyle}>{para}</p>
              ))}
            </div>

          </div>
        </div>

        {/* My Journey section */}
        <div style={{ ...fadeUp(visible, 0.2), textAlign: 'center', marginTop: '120px' }}>
          <h2 style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 56px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            My <em style={{ fontStyle: 'italic' }}>journey so far</em>
          </h2>
        </div>

        {/* Education 3-column grid */}
        <div style={{
          ...fadeUp(visible, 0.25),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px',
          marginTop: '72px',
          textAlign: 'center',
        }}>
          {[
            {
              degree: 'Psychology Honours',
              institution: 'Daulat Ram College\nUniversity of Delhi',
              years: '2020 – 23',
              logo: '/du-logo.png',
            },
            {
              degree: 'Graphic Design Diploma',
              institution: 'Sri Aurobindo Centre\nfor Arts and Creativity',
              years: '2022 – 23',
              logo: '/sacac-logo.png',
            },
            {
              degree: 'Design for Retail Experience',
              institution: 'National Institute\nof Design',
              years: '2024 – 26',
              logo: '/nid-logo-new.png',
            },
          ].map((ed, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {/* Institution logo */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img src={ed.logo} alt={ed.institution} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Degree */}
              <div style={{
                fontFamily: "'Apple Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '14px',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.4,
              }}>
                {ed.degree}
              </div>
              {/* Institution + year */}
              <div style={{
                fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                whiteSpace: 'pre-line',
              }}>
                {ed.institution}{'\n'}{ed.years}
              </div>
            </div>
          ))}
        </div>

        {/* What do I bring to the table */}
        <div style={{ ...fadeUp(visible, 0.3), textAlign: 'center', marginTop: '120px' }}>
          <h2 style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 56px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            What do I bring to <em style={{ fontStyle: 'italic' }}>the table</em>
          </h2>
        </div>

        {/* Skill circles */}
        <div style={{
          ...fadeUp(visible, 0.35),
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '64px',
          flexWrap: 'wrap',
        }}>
          {['Behavioural\nInsight', 'Storytelling', 'Visual\nDesign', 'Design\nThinking'].map((label, i) => (
            <SkillCircle key={i} label={label} />
          ))}
        </div>

      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── SANDBOX ─────────────────────────────────────────────────────────────────

function SandboxSection() {
  const [ref, visible] = useFadeIn();

  const experiments = [
    {
      label: 'Why concrete words stick and abstract ones don\'t',
      sub: 'Concrete word pairs hit 100% recall. Abstract ones dropped to 74.99% — how you say something changes whether people remember it.',
      tags: ['Paivio word pair list', 'Dual coding theory', 'Recall experiment'],
      url: 'https://docs.google.com/document/d/1cBzh3825bv5bK9d0H_P7jH_wmcmwiG1W-YG6cgBuiLI/edit',
    },
    {
      label: 'When colour fights the brain',
      sub: 'When visual information contradicts meaning, the brain slows and errors increase — a window into attention and automaticity.',
      tags: ['Stroop Test', 'Reaction time', 'Cognitive interference'],
      url: 'https://docs.google.com/document/d/1UnFdGajhx_QwbaVNGQN9HmtscaTfl-zR/edit?usp=sharing&ouid=117923889145803854754&rtpof=true&sd=true',
    },
    {
      label: 'Body image, filters and how we see ourselves',
      sub: '112 college students surveyed. 30% of females wanted to change their weight. 25% of males wanted to change nothing.',
      tags: ['Self-constructed questionnaire', 'Content analysis', 'Thematic analysis'],
      url: 'https://docs.google.com/document/d/1t7qYf1MzJk0FyOVRZphU1ASELNXKTSzCrhCaoMp4pfM/edit',
    },
    {
      label: 'Why age makes you care more about the planet',
      sub: '81 people, 3 age groups. Feeling connected to nature predicts eco-behaviour — middle adults were significantly more pro-environmental than adolescents.',
      tags: ['Nature connectedness scale', 'Ecological behavior', 'Correlation & ANOVA'],
      url: 'https://docs.google.com/document/d/1JjNFQxrIB3tctIh6h7j01euwegBWw-LdHQtHGh0aAOA/edit',
    },
    {
      label: 'What others see in you that you can\'t',
      sub: 'I ranked creativity 10th. Everyone I asked ranked it 1st or 2nd. A 7-day intervention on my lowest strength raised my flourishing score from 48 to 51.',
      tags: ['VIA Inventory of Strengths', 'Flourishing Scale', 'ABA intervention'],
      url: 'https://docs.google.com/document/d/1Q1Vk7zJyXcGL5CsnOIF8c88ZaHpFHp-wUbUNSgzMhws/edit',
    },
    {
      label: 'How we reason through impossible choices',
      sub: 'How people reason through moral dilemmas — from rule-following to principled thinking — when two values can\'t both be upheld.',
      tags: ['Kohlberg\'s theory', 'Moral reasoning', 'Stage-based assessment'],
      url: 'https://docs.google.com/document/d/1GAecQEpSJQoTQPgun8-uhQGbF8zL4RXs/edit',
    },
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px', gap: '20px' }}>
          <div style={fadeUp(visible, 0)}>
            <SectionLabel>BACKGROUND CHECK</SectionLabel>
            <h2 style={{
              fontFamily: "'Apple Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: COLORS.textPrimary,
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              What was I doing <GlowWord>before</GlowWord> design?
            </h2>
          </div>
          <div style={fadeUp(visible, 0.15)}>
            <p style={{
              fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              color: COLORS.textSecondary,
              lineHeight: 1.8,
              margin: 0,
            }}>
              Design shaped by behavioral psychology and real conversations. Understanding people is where it begins.
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
  const cardRef = useRef(null);
  const [perimeter, setPerimeter] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const el = entry.target;
      setPerimeter(2 * (el.offsetWidth + el.offsetHeight));
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
    <div
      ref={cardRef}
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
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trim path stroke border */}
      {perimeter > 0 && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="stroke-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect
            x="1"
            y="1"
            width="99%"
            height="99%"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.6"
            filter="url(#stroke-glow)"
            strokeDasharray={perimeter}
            strokeDashoffset={hovered ? 0 : perimeter}
            style={{
              transition: hovered ? 'stroke-dashoffset 0.5s ease' : 'none',
            }}
          />
        </svg>
      )}
      <div style={{
        width: '24px',
        height: '1px',
        background: hovered ? COLORS.accent : COLORS.textVeryMuted,
        transition: 'background 0.3s ease, width 0.3s ease',
        ...(hovered ? { width: '40px' } : {}),
      }} />
      <h3 style={{
        fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 300,
        fontSize: '18px',
        color: hovered ? COLORS.textPrimary : '#918e87',
        margin: 0,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
        transition: 'color 0.3s ease',
      }}>
        {exp.label}
      </h3>
      <p style={{
        fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 300,
        fontSize: '11px',
        color: hovered ? '#7a7870' : COLORS.textMuted,
        margin: 0,
        letterSpacing: '0.05em',
        lineHeight: 1.6,
        transition: 'color 0.3s ease',
      }}>
        {exp.sub}
      </p>
      {exp.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {exp.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '10px',
              letterSpacing: '0.04em',
              color: hovered ? 'rgba(255,255,255,0.75)' : COLORS.textMuted,
              border: `1px solid ${COLORS.border}`,
              padding: '3px 10px',
              transition: 'color 0.3s ease',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    </a>
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
        background: '#0b0a09',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Forest portal background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}>
        <img
          src="/ethereal-forest-portal.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: 0.55,
          }}
        />
      </div>

      {/* Big CTA */}
      <div style={{
        padding: '120px 80px 80px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left — label + heading */}
        <div style={{ ...fadeUp(visible, 0), textAlign: 'left' }}>
          <SectionLabel color="rgba(255,255,255,0.5)">LET'S CONNECT</SectionLabel>
          <h2 style={{
            fontFamily: "'Apple Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(56px, 10vw, 130px)',
            color: COLORS.textPrimary,
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            <GlowWord>Create</GlowWord><br />
            Together?
          </h2>
        </div>

        {/* Right — button + email + linkedin */}
        <div style={{ ...fadeUp(visible, 0.2), display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <CTAButton href="mailto:Priyashree@nid.edu">GET TALKING</CTAButton>
          <a
            href="mailto:Priyashree@nid.edu"
            style={{
              fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: emailHovered ? '#ffffff' : 'rgba(255,255,255,0.6)',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            Priyashree@nid.edu
          </a>
          <a
            href="https://www.linkedin.com/in/priyashree02/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={{
        padding: '48px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '32px',
      }}>
        {/* Name + copyright */}
        <div>
          <div style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300,
            fontSize: '16px',
            color: '#ffffff',
            marginBottom: '6px',
            letterSpacing: '0.02em',
          }}>
            Priyashree Acharya
</div>
          <div style={{
            fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
          }}>
            © 2026
          </div>
        </div>

        {/* Vibecoded */}
        <div style={{
          fontFamily: "'Apple Garamond', Georgia, serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.04em',
          textShadow: '0 0 18px rgba(255,255,255,0.4), 0 0 40px rgba(200,210,255,0.2)',
        }}>
          Vibecoded with love
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
        fontFamily: "'Neue Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '9px',
        letterSpacing: '0.12em',
        color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
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

// ─── SPLASH SCREEN ───────────────────────────────────────────────────────────

const GREETINGS = [
  { word: 'Hello',       lang: 'English'  },
  { word: 'नमस्ते',      lang: 'Hindi'    },
  { word: 'ನಮಸ್ಕಾರ',    lang: 'Kannada'  },
  { word: 'வணக்கம்',    lang: 'Tamil'    },
  { word: 'নমস্কার',     lang: 'Bengali'  },
  { word: 'سلام',        lang: 'Arabic'   },
  { word: 'Hallo',       lang: 'German'   },
  { word: 'Bonjour',     lang: 'French'   },
];

const HOLD = 220;   // ms each greeting is fully visible
const XFADE = 120;  // ms fade transition

function SplashScreen({ onDone }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let current = 0;
    const timers = [];

    const showNext = () => {
      // Fade out current
      setVisible(false);
      timers.push(setTimeout(() => {
        current += 1;
        if (current < GREETINGS.length) {
          setIndex(current);
          setVisible(true);
          timers.push(setTimeout(showNext, HOLD));
        } else {
          // All done — fade out whole screen
          setFading(true);
          setTimeout(onDone, 600);
        }
      }, XFADE));
    };

    timers.push(setTimeout(showNext, HOLD));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const { word, lang } = GREETINGS[index];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      {/* Greeting word */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${XFADE}ms ease`,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Apple Garamond', Georgia, serif",
          fontWeight: 400,
          fontSize: 'clamp(31px, 6vw, 67px)',
          color: '#fff',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {word}
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

function StarCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(-20deg)`;
          rafRef.current = null;
        });
      }
    };

    const CLICKABLE = 'a, button, [role="button"], input, label, select, textarea, [tabindex]';

    const onOver = (e) => {
      if (e.target.closest(CLICKABLE)) {
        el.style.animation = 'starPulse 0.6s ease-in-out infinite';
      }
    };

    const onOut = (e) => {
      if (e.target.closest(CLICKABLE)) {
        el.style.animation = 'none';
        el.style.fontSize  = '18px';
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={cursorRef} style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 99999,
      fontSize: '18px',
      color: '#ffffff',
      transform: 'translate(-100px, -100px) translate(-50%, -50%) rotate(-20deg)',
      userSelect: 'none',
      lineHeight: 1,
      left: 0,
      top: 0,
      willChange: 'transform',
    }}>✦</div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function useGlobalSetup() {
  useEffect(() => {
    const existing = document.querySelector('link[data-portfolio-fonts]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-portfolio-fonts', 'true');
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap';
      document.head.appendChild(link);
    }
    const existingFont = document.querySelector('style[data-blackletter]');
    if (!existingFont) {
      const style = document.createElement('style');
      style.setAttribute('data-blackletter', 'true');
      style.textContent = `
        @font-face {
          font-family: 'Blackletter';
          src: url('/BLACEB__.TTF') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `;
      document.head.appendChild(style);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = COLORS.bg;
    document.body.style.overflowX = 'hidden';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);
}

function HomePage() {
  useGlobalSetup();
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('splashSeen')
  );
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem('splashSeen')
  );
  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem('splashSeen', 'true');
    setShowSplash(false);
    setSplashDone(true);
  }, []);

  return (
    <>
      <StarCursor />
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <div style={{
        background: COLORS.bg,
        minHeight: '100vh',
        visibility: splashDone ? 'visible' : 'hidden',
      }}>
        <Nav />
        <Hero />
        <WorkSection />
        <DigestsSection />
        <SandboxSection />
        <ContactSection />
      </div>
    </>
  );
}

function AboutPage() {
  useGlobalSetup();
  return (
    <>
      <StarCursor />
      <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
        <Nav />
        <CabinetSection />
        <ContactSection />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/carbon-count" element={<CarbonCountPage />} />
        <Route path="/work/paradyes" element={<ParadyesPage />} />
        <Route path="/work/bunav" element={<BunavPage />} />
        <Route path="/work/ember" element={<EmberPage />} />
        <Route path="/work/anvaya" element={<AnvayaPage />} />
        <Route path="/work/ferrari-ar" element={<FerrariPage />} />
      </Routes>
    </BrowserRouter>
  );
}
