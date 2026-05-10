import React from 'react';

export default function FerrariPage() {
  return (
    <>
      <div style={{ background: '#000' }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ lineHeight: 0 }}>
            <img src={`/projects/ferrari/slide-${n}.png`} alt={`Slide ${n}`} style={{ width: '100%', display: 'block' }} />
          </div>
        ))}
      </div>
    </>
  );
}
