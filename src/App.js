import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

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
    fontFamily: "'Blackletter', cursive",
    fontSize: '31px',
    color: '#f8f6f2',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: 1,
  };

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'PLAY', href: '#sandbox' },
    { label: 'ABOUT', href: '#about' },
  ];

  return (
    <nav style={navStyle}>
      <a href="#" style={logoStyle} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        P
      </a>
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
    </nav>
  );
}

function NavLink({ link, isHovered, onHover, onLeave }) {
  return (
    <a
      href={link.href}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: '15px',
        letterSpacing: '0.14em',
        textDecoration: 'none',
        color: isHovered ? COLORS.textPrimary : '#B0ADA6',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
    >
      {link.label}
    </a>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

const HAND_RAMP = [' ',' ',' ','.','.','.',',',',','`',"'",'`',',',':',';','+','i','!','t','f','l','J','C','Y','X','Z','O','0','w','M','W','B','#','$','@'];

function indicesToText(cur, cols, rows) {
  const lines = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) line += HAND_RAMP[cur[r * cols + c]];
    lines.push(line);
  }
  return lines.join('\n');
}

function CreationOfAdamBg() {
  const [leftDisplay, setLeftDisplay] = useState('');
  const [rightDisplay, setRightDisplay] = useState('');
  const lRef = useRef(null); // { base, cur, cols, rows }
  const rRef = useRef(null);

  useEffect(() => {
    const charW = 5.5, charH = 10.35;
    const targetH = window.innerHeight * 0.677;

    function loadHand(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const natW = img.naturalWidth, natH = img.naturalHeight;
          const rows = Math.floor(targetH / charH);
          const cols = Math.floor(rows * (natW / natH) * (charH / charW));
          const off = document.createElement('canvas');
          off.width = natW * 2; off.height = natH * 2;
          const ctx = off.getContext('2d');
          ctx.drawImage(img, 0, 0, off.width, off.height);
          const data = ctx.getImageData(0, 0, off.width, off.height).data;
          const iw = off.width, ih = off.height;
          const sx = iw / cols, sy = ih / rows;
          const base = new Uint8Array(cols * rows);
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              let rS=0,gS=0,bS=0,n=0;
              for (let dy=0;dy<3;dy++) for (let dx=0;dx<3;dx++) {
                const px=Math.min(Math.floor(col*sx)+dx,iw-1);
                const py=Math.min(Math.floor(row*sy)+dy,ih-1);
                const i=(py*iw+px)*4;
                rS+=data[i];gS+=data[i+1];bS+=data[i+2];n++;
              }
              const lum=rS/n*0.299+gS/n*0.587+bS/n*0.114;
              if (lum>242) { base[row*cols+col]=0; }
              else {
                const d=(242-lum)/242;
                const t=d<0.5?2*d*d:1-Math.pow(-2*d+2,2)/2;
                base[row*cols+col]=Math.max(1,Math.min(HAND_RAMP.length-1,Math.floor(Math.pow(t,0.55)*(HAND_RAMP.length-1))));
              }
            }
          }
          resolve({ base, cur: new Uint8Array(base), cols, rows });
        };
        img.src = src;
      });
    }

    let interval;
    Promise.all([loadHand('/leftside.png'), loadHand('/rightside.png')])
      .then(([left, right]) => {
        lRef.current = left;
        rRef.current = right;
        setLeftDisplay(indicesToText(left.cur, left.cols, left.rows));
        setRightDisplay(indicesToText(right.cur, right.cols, right.rows));

        // Character morphing: each tick, ~2% of visible chars step ±1 in the ramp,
        // with a pull back toward their original value so they shimmer in place.
        interval = setInterval(() => {
          [lRef, rRef].forEach((ref, side) => {
            const d = ref.current;
            if (!d) return;
            const { base, cur, cols, rows } = d;
            const total = cols * rows;
            const changes = Math.floor(total * 0.02);
            for (let i = 0; i < changes; i++) {
              const pos = Math.floor(Math.random() * total);
              if (base[pos] === 0) continue; // skip background
              const diff = cur[pos] - base[pos];
              // Weight toward returning to base; allow ±3 drift max
              const r = Math.random();
              if (Math.abs(diff) >= 3) {
                // Force step back toward base
                cur[pos] += diff > 0 ? -1 : 1;
              } else if (r < 0.45) {
                // Pull toward base
                if (diff !== 0) cur[pos] += diff > 0 ? -1 : 1;
              } else if (r < 0.70) {
                // Drift away from base
                const step = Math.random() < 0.5 ? 1 : -1;
                const next = cur[pos] + step;
                if (next >= 1 && next < HAND_RAMP.length) cur[pos] = next;
              }
              // else ~30%: stay unchanged
            }
            const text = indicesToText(cur, cols, rows);
            if (side === 0) setLeftDisplay(text);
            else setRightDisplay(text);
          });
        }, 110);
      });

    return () => clearInterval(interval);
  }, []);

  const base = {
    position: 'absolute',
    top: '50%',
    margin: 0, padding: 0,
    fontFamily: 'monospace',
    fontSize: '9px',
    lineHeight: '1.15',
    color: 'rgba(255,255,255,0.32)',
    overflow: 'hidden',
    whiteSpace: 'pre',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 0,
  };

  return (
    <>
      <style>{`
        @keyframes reachRight {
          0%,100% { transform: translateY(-50%) translateX(0px);   opacity: 0.85; }
          50%      { transform: translateY(-50%) translateX(48px);  opacity: 1;    }
        }
        @keyframes reachLeft {
          0%,100% { transform: translateY(-50%) translateX(0px);   opacity: 0.85; }
          50%      { transform: translateY(-50%) translateX(-48px); opacity: 1;    }
        }
      `}</style>
      <pre className="adam-ascii-bg" style={{
        ...base, left: '-48px',
        animation: 'reachRight 10s ease-in-out infinite',
      }}>{leftDisplay}</pre>
      <pre className="adam-ascii-bg" style={{
        ...base, right: '-48px',
        animation: 'reachLeft 10s ease-in-out infinite',
      }}>{rightDisplay}</pre>
    </>
  );
}

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
      color:        0xffffff,
      transmission: 0.95,
      roughness:    0,
      metalness:    0,
      ior:          2.4,
      thickness:    2,
      transparent:  true,
      opacity:      0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const edgesGeo = new THREE.EdgesGeometry(geo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.7, transparent: true });
    const edges    = new THREE.LineSegments(edgesGeo, edgesMat);
    scene.add(edges);

    // All 4 face normals + centroids in mesh-local space (after geo.rotateY(π/4)):
    //   base vertices: (±√2/2, -0.8, ±√2/2)  apex: (0, 0.8, 0)
    //   centroid x or z = √2/3 ≈ 0.4714,  centroid y = -0.8/3
    const R3 = Math.SQRT2 / 3;   // ≈ 0.4714
    const CY = -0.8 / 3;
    const FACES = [
      { normal: new THREE.Vector3( 1, 0,  0), centroid: new THREE.Vector3( R3, CY,   0) }, // +X right
      { normal: new THREE.Vector3( 0, 0,  1), centroid: new THREE.Vector3(  0, CY,  R3) }, // +Z back
      { normal: new THREE.Vector3(-1, 0,  0), centroid: new THREE.Vector3(-R3, CY,   0) }, // -X left
      { normal: new THREE.Vector3( 0, 0, -1), centroid: new THREE.Vector3(  0, CY, -R3) }, // -Z front
    ];

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(-3, 1, 2);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // ── 2. SpotLight — specular hot-spot top-left ───────────────────────
    const spotLight = new THREE.SpotLight(0xffffff, 3);
    spotLight.position.set(-3, 4, 3);
    spotLight.angle    = 0.3;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // ── 3. PointLight inside prism — internal glow ─────────────────────
    const innerLight = new THREE.PointLight(0xaaddff, 0.4);
    innerLight.position.set(0, 0, 0);
    scene.add(innerLight);

    // ── 4. Fresnel rim — slightly larger cone, back-face, white glow ───
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

    // ── 5. Base reflection plane ────────────────────────────────────────
    const basePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 2.4),
      new THREE.MeshStandardMaterial({
        color:       0xffffff,
        metalness:   0.9,
        roughness:   0.1,
        transparent: true,
        opacity:     0.15,
      })
    );
    basePlane.rotation.x = -Math.PI / 2;
    basePlane.position.y = -0.82;   // just below pyramid base
    scene.add(basePlane);

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    let mx = W * 0.35, my = H * 0.42;
    let rayAlpha = 0;
    let animFrame;

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
      const N=80;

      ctx.save();
      ctx.globalCompositeOperation='screen';

      // origin light source — wide elliptical glow behind everything
      ctx.save();
      ctx.translate(ox,oy); ctx.rotate(angle); ctx.scale(1, 200/300);
      const srcGrd=ctx.createRadialGradient(0,0,0, 0,0,300);
      srcGrd.addColorStop(0,'rgba(255,255,255,0.12)');
      srcGrd.addColorStop(1,'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(0,0,300,0,Math.PI*2);
      ctx.fillStyle=srcGrd; ctx.fill();
      ctx.restore();

      // [half-length along beam, half-width perp to beam, alpha]
      const passes=[
        [110, 45,  0.012], // 220×90
        [ 50, 20,  0.025], // 100×40
        [ 14,  5,  0.09 ], // 28×10
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
      // 4-pointed star only — no halo circle
      const long=10, short=1.5;
      ctx.save();
      ctx.shadowBlur=50; ctx.shadowColor='white'; ctx.fillStyle='#ffffff';
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

    // Angles offset from centre (deg), colours [r,g,b]
    // 15° total fan
    const RAYS = [
      [  7,   255,  30,   0],  // red
      [  4.5, 255, 120,   0],  // orange
      [  2,   230, 255,   0],  // yellow
      [  0,     0, 255,  60],  // green
      [ -2,     0,  80, 255],  // blue
      [ -4.5,  60,   0, 200],  // indigo
      [ -7,   140,   0, 255],  // violet
    ];

    function spectrumRay(ex, ey, angleDeg, r, g, b) {
      if (!isFinite(ex)||!isFinite(ey)) return;
      const a  = angleDeg * Math.PI / 180;
      const ca = Math.cos(a), sa = Math.sin(a);
      const px = -sa, py = ca;
      const reach = W - ex + 300;
      const fx = ex + ca*reach, fy = ey + sa*reach;
      const nearHW = 3, farHW = 28;

      // [opacity-at-origin, opacity-at-edge, shadowBlur]
      const passes = [
        [0.04,  0.01, 150],  // outer feather
        [0.10,  0.02,  80],  // mid feather
        [0.35,  0.07,  25],  // body
        [0.40,  0.10,  25],  // bright core
      ];

      passes.forEach(([a0, a1, sBl]) => {
        const grd = ctx.createLinearGradient(ex, ey, fx, fy);
        grd.addColorStop(0, `rgba(${r},${g},${b},${a0})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},${a1})`);
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.shadowBlur  = sBl;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
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

    function tick() {
      animFrame = requestAnimationFrame(tick);
      ctx.clearRect(0,0,W,H);

      const pcx = W/2 + 60, pcy = H/2;
      const PW = 120, PH = 100;
      const top = [pcx,        pcy - PH/2];
      const bl  = [pcx - PW/2, pcy + PH/2];
      const br  = [pcx + PW/2, pcy + PH/2];

      // Beam: from left edge at 35% height toward cursor
      const originY = H * 0.35;
      const dirX = mx || 1;
      const dirY = my - originY;
      const mag  = Math.sqrt(dirX*dirX+dirY*dirY)||1;
      const far  = W*4;
      const bx2  = (dirX/mag)*far;
      const by2  = originY+(dirY/mag)*far;

      const hitL = seg(0,originY,bx2,by2, top[0],top[1],bl[0],bl[1]);
      const hitR = seg(0,originY,bx2,by2, top[0],top[1],br[0],br[1]);
      const hitB = seg(0,originY,bx2,by2, bl[0],bl[1],br[0],br[1]);

      const hits = [hitL,hitR,hitB].filter(Boolean).sort((a,b)=>a.t-b.t);
      const entry = hits[0]||null, exit = hits[1]||null;
      const isHit = hits.length >= 2;

      if (isHit) rayAlpha = Math.min(1, rayAlpha+0.055);
      else        rayAlpha = Math.max(0, rayAlpha-0.038);

      // ── Dynamic face selection: find which face points most left/right ──
      mesh.updateMatrixWorld();
      const mw = mesh.matrixWorld;
      let maxLeft = -Infinity, maxRight = -Infinity;
      let entryFace = FACES[2], exitFace = FACES[0]; // fallback
      FACES.forEach(f => {
        const wn = f.normal.clone().transformDirection(mw);
        const dotL = -wn.x; // dot with (-1,0,0)
        const dotR =  wn.x; // dot with (+1,0,0)
        if (dotL > maxLeft)  { maxLeft  = dotL; entryFace = f; }
        if (dotR > maxRight) { maxRight = dotR; exitFace  = f; }
      });

      // Project the active face centroids to main-canvas pixel coords
      const _ec = entryFace.centroid.clone().applyMatrix4(mw);
      _ec.project(camera);
      const entryPx = { x: W/2 + 60 + _ec.x * 160, y: H/2 - _ec.y * 160 };

      const _xc = exitFace.centroid.clone().applyMatrix4(mw);
      _xc.project(camera);
      const exitPx  = { x: W/2 + 60 + _xc.x * 160, y: H/2 - _xc.y * 160 };

      // Beam terminates on projected left face surface when hitting
      const beamEndX = isHit ? entryPx.x : Math.min(mx, top[0]-10);
      const beamEndY = isHit ? entryPx.y : my;
      volumetricBeam(0, originY, beamEndX, beamEndY);

      // ── Three.js pyramid (slow Y rotation each frame) ──────────────────
      mesh.rotation.y        += 0.004;
      edges.rotation.y       += 0.004;
      fresnelMesh.rotation.y += 0.004;
      renderer.render(scene, camera);

      // Spectrum rays from projected right face surface
      if (rayAlpha > 0) {
        const ex = exitPx.x, ey = exitPx.y;
        ctx.globalAlpha = rayAlpha;
        RAYS.forEach(([deg,r,g,b]) => spectrumRay(ex, ey, deg, r, g, b));

        // unifying blend pass — single trapezoid with smooth HSL rainbow
        if (isFinite(ex) && isFinite(ey)) {
          const topA = -7 * Math.PI/180, botA = 7 * Math.PI/180;
          const reach = W - ex + 300;
          const fxT = ex + Math.cos(topA)*reach, fyT = ey + Math.sin(topA)*reach;
          const fxB = ex + Math.cos(botA)*reach, fyB = ey + Math.sin(botA)*reach;
          const hslGrd = ctx.createLinearGradient(fxT, fyT, fxB, fyB);
          // violet→red top-to-bottom through full spectrum
          hslGrd.addColorStop(0,    'hsla(270,100%,55%,0.15)');
          hslGrd.addColorStop(0.17, 'hsla(240,100%,55%,0.15)');
          hslGrd.addColorStop(0.33, 'hsla(210,100%,55%,0.15)');
          hslGrd.addColorStop(0.5,  'hsla(120,100%,50%,0.15)');
          hslGrd.addColorStop(0.67, 'hsla(60,100%,50%,0.15)');
          hslGrd.addColorStop(0.83, 'hsla(30,100%,50%,0.15)');
          hslGrd.addColorStop(1,    'hsla(0,100%,50%,0.15)');
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.shadowBlur = 60; ctx.shadowColor = 'white';
          ctx.beginPath();
          ctx.moveTo(ex, ey - 3); ctx.lineTo(ex, ey + 3);
          ctx.lineTo(fxB, fyB);   ctx.lineTo(fxT, fyT);
          ctx.closePath();
          ctx.fillStyle = hslGrd; ctx.fill();
          ctx.restore();
        }

        ctx.globalAlpha = 1;
        // exit sparkle
        ctx.save();
        ctx.beginPath(); ctx.arc(ex,ey,3.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        ctx.shadowBlur=16; ctx.shadowColor='white'; ctx.fill();
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
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,
      display: window.innerWidth < 768 ? 'none' : 'block'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',filter:'blur(1.5px)'}}/>
      <canvas ref={threeRef} width={320} height={320} style={{
        position:'absolute',
        left:'calc(50% + 60px)', top:'50%',
        transform:'translate(-50%,-50%)',
        pointerEvents:'none',
      }}/>
    </div>
  );
}

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
      {/* Background image — anchored to bottom, behind everything */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '65%',
        pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.6,
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.85) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 20%, rgba(201,185,154,0.04) 0%, transparent 60%)',
      }} />

      {/* Three.js prism + 2D beam overlay */}
      <PrismBg />

      {/* Coordinates */}


      {/* Main hero text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          lineHeight: 0.9,
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            color: COLORS.textPrimary,
            letterSpacing: '-0.02em',
          }}>
            Multi—
          </div>
          <div style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
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
            fontSize: 'clamp(36px, 6vw, 80px)',
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
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 24px 8px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 0 24px rgba(201,185,154,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                fontStyle: 'italic',
                color: COLORS.textPrimary,
                minWidth: '280px',
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
        @media (max-width: 768px) { .adam-ascii-bg { display: none !important; } }
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
        fontSize: '12px',
        letterSpacing: '0.08em',
        color: hovered ? COLORS.bg : COLORS.textPrimary,
        background: hovered
          ? COLORS.accent
          : filled
          ? 'rgba(201,185,154,0.15)'
          : 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '14px 32px',
        borderRadius: '100px',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 0 20px rgba(201,185,154,0.25)'
          : '0 0 0px transparent',
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
            <SectionLabel>ANNOTATIONS</SectionLabel>
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
              Thoughts on behaviour, design and everything I'm still figuring out.
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
              Field notes across research — self-reflections on projects that finished and ones that didn't.
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
            Priyashree Acharya
</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            color: COLORS.textVeryMuted,
            letterSpacing: '0.1em',
          }}>
            © 2026 — All rights reserved
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

// ─── SPLASH SCREEN ───────────────────────────────────────────────────────────

const SPLASH_LABELS = [
  'Observing…',
  'Questioning…',
  'Synthesising…',
  'Reframing…',
  'Designing…',
  'Done.',
];

function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [barTransition, setBarTransition] = useState('none');
  const [labelIndex, setLabelIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers = [];

    // "Loading wonder…" shows immediately (labelIndex starts at 0)

    // Stage 1 — Crawl: 0% → 50% over 2800ms ease-out
    timers.push(setTimeout(() => {
      setBarTransition('width 2800ms ease-out');
      setProgress(50);
    }, 50));

    // Label 1 — "Questioning…"
    timers.push(setTimeout(() => setLabelIndex(1), 1120));

    // Label 2 — "Synthesising…"
    timers.push(setTimeout(() => setLabelIndex(2), 2240));

    // Stage 2 — Pick up: 50% → 80% over 1200ms ease-in-out
    timers.push(setTimeout(() => {
      setBarTransition('width 1200ms ease-in-out');
      setProgress(80);
    }, 2860));

    // Label 3 — "Reframing…" midway through stage 2
    timers.push(setTimeout(() => setLabelIndex(3), 3460));

    // Stage 3 — Pause: hold at 80% for 900ms
    timers.push(setTimeout(() => {
      setBarTransition('none');
      setLabelIndex(4); // "Designing…"
    }, 4060));

    // Stage 4 — Sprint: 80% → 100% over 600ms ease-in
    timers.push(setTimeout(() => {
      setBarTransition('width 600ms ease-in');
      setProgress(100);
    }, 4960));

    // Label 5 — "Done." when sprint fires
    timers.push(setTimeout(() => setLabelIndex(5), 4960));

    // Fade out 300ms after hitting 100%
    timers.push(setTimeout(() => {
      setFading(true);
      setTimeout(onDone, 600);
    }, 5860));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

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
      {/* Progress bar */}
      <div style={{
        width: '560px',
        height: '2px',
        background: 'rgba(255,255,255,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${progress}%`,
          background: '#fff',
          transition: barTransition,
        }} />
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '22px',
        letterSpacing: '0.1em',
        color: '#fff',
        textTransform: 'uppercase',
        marginTop: '32px',
      }}>
        {SPLASH_LABELS[labelIndex]}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
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

  useEffect(() => {
    // Inject Google Fonts
    const existing = document.querySelector('link[data-portfolio-fonts]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-portfolio-fonts', 'true');
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap';
      document.head.appendChild(link);
    }

    // Inject local Blackletter font
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

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
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
        <CabinetSection />
        <SandboxSection />
        <ContactSection />
      </div>
    </>
  );
}
