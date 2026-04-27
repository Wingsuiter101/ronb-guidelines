import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, Home,
  Type, Image as ImageIcon, Video, ShieldCheck,
  Award, AlertTriangle, Layers, FileText
} from 'lucide-react';
import './App.css';

// ─── Motion Presets ──────────────────────────────────────────────────────────
const slide: any = {
  enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 28 } },
  exit: (d: number) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: .22 } }),
};

const up: any = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', damping: 22, stiffness: 160, delay: i * 0.07 },
  }),
};

// Shorthand motion block
const M = ({ i = 0, tag = 'div', children, ...rest }: any) => {
  const Tag = (motion as any)[tag];
  return <Tag custom={i} variants={up} initial="hidden" animate="show" {...rest}>{children}</Tag>;
};

// ─── Custom Cursor ──────────────────────────────────────────────────────────
const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor" />;
};

// ─── App Shell ───────────────────────────────────────────────────────────────
const TOTAL = 12;

const App: React.FC = () => {
  const [[page, dir], setPage] = useState([0, 0]);

  const go = (d: number) => {
    const next = page + d;
    if (next >= 0 && next < TOTAL) setPage([next, d]);
  };

  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [page]);

  const slides = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];
  const SlideEl = slides[page];

  return (
    <div className="deck">
      <Cursor />
      <div className="progress" style={{ width: `${((page + 1) / TOTAL) * 100}%` }} />
      <img src="./logo.PNG" alt="RONB" className="logo" />
      <span className="counter">{String(page + 1).padStart(2, '0')} / {TOTAL}</span>

      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div key={page} custom={dir} variants={slide}
          initial="enter" animate="center" exit="exit"
          className="slide">
          <SlideEl />
        </motion.div>
      </AnimatePresence>

      <div className="nav">
        <button className="nav-btn" onClick={() => go(0 - page)} disabled={page === 0} aria-label="Home"><Home size={18} /></button>
        <button className="nav-btn" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous"><ArrowLeft size={18} /></button>
        <button className="nav-btn" onClick={() => go(1)} disabled={page === TOTAL - 1} aria-label="Next"><ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

// ─── SLIDE 1 — COVER ────────────────────────────────────────────────────────
const S1 = () => (
  <div className="s1">
    <div className="s1-left">
      <M i={0} style={{ marginBottom: '2rem' }}>
        <img src="./logo.PNG" alt="RONB" style={{ height: '96px', objectFit: 'contain', objectPosition: 'left' }} />
      </M>
      <M i={1}><span className="tag">Content Guidelines</span></M>
      <M i={2} tag="h1" style={{ marginTop: '1.5rem' }}>
        RONB<br /><span className="red">Content</span><br />Guidelines
      </M>
      <M i={3} className="s1-sub">
        Simple rules for smoother approvals and better campaign performance. Follow these to keep content clear, safe, and audience-friendly.
      </M>
    </div>
    <div className="s1-right">
      <span className="s1-bg-number">01</span>
      <M i={3}>
        <img src="./Cover (2).jpeg" alt="" className="s1-cover-img" />
      </M>
    </div>
  </div>
);

// ─── SLIDE 2 — OVERVIEW ──────────────────────────────────────────────────────
const overview = [
  { n: '01', title: 'Caption Guidelines', desc: 'Write short, clear, platform-friendly captions.', icon: <Type size={22} /> },
  { n: '02', title: 'Photo Guidelines',   desc: 'Choose clean, natural, professional visuals.',     icon: <ImageIcon size={22} /> },
  { n: '03', title: 'Video Guidelines',   desc: 'Keep videos clear, safe, and easy to approve.',    icon: <Video size={22} /> },
  { n: '04', title: 'Why It Matters',     desc: 'Protect performance, trust, and credibility.',     icon: <ShieldCheck size={22} /> },
];
const S2 = () => (
  <div className="s2">
    <M i={0}><span className="tag">Overview</span></M>
    <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1rem' }}>What This Covers</M>
    <div className="s2-grid">
      {overview.map((o, i) => (
        <M key={i} i={i + 2} className="s2-item">
          <div className="s2-num">{o.n}</div>
          <div style={{ color: 'var(--red)', marginBottom: '.5rem' }}>{o.icon}</div>
          <div className="s2-title">{o.title}</div>
          <div className="s2-desc">{o.desc}</div>
        </M>
      ))}
    </div>
  </div>
);

// ─── SLIDE 3 — CAPTION DO / AVOID ───────────────────────────────────────────
const S3 = () => (
  <div className="split-slide">
    {/* DO — dark side */}
    <div className="split-half dark-half">
      <M i={0}><span className="tag">1. Caption Guidelines</span></M>
      <M i={1} className="split-heading" style={{ marginTop: '1.5rem' }}>Keep It Short, Clear & Relevant</M>
      <M i={2} className="split-list">
        {['Short and easy to understand', 'Simple, natural language', 'Professional and respectful tone', 'Caption matches the visual', 'Focus on value and information', 'Shortened URLs for links'].map((t, i) => (
          <div key={i} className="split-list-item">
            <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
            <span>{t}</span>
          </div>
        ))}
      </M>
    </div>
    {/* AVOID — red side */}
    <div className="split-half red-half">
      <M i={3} className="split-label">Avoid</M>
      <M i={4} className="split-heading">What to Leave Out</M>
      <M i={5} className="split-list">
        {['Overly long story-style captions', 'Misleading or exaggerated claims', 'Sensitive or controversial topics', 'Overly promotional messaging', 'Using "RONB" as an unofficial promo code'].map((t, i) => (
          <div key={i} className="split-list-item">
            <XCircle size={18} style={{ color: 'rgba(255,255,255,.7)', flexShrink: 0, marginTop: 2 }} />
            <span style={{ opacity: .9 }}>{t}</span>
          </div>
        ))}
      </M>
    </div>
  </div>
);

// ─── SLIDE 4 — RESTRICTED WORDS ─────────────────────────────────────────────
const words = ['scam', 'fraud', 'kids', 'child', 'free money', 'win', 'giveaways', 'casino', 'gambling', 'Apple products', 'religious references'];
const S4 = () => (
  <div className="s4">
    <div>
      <M i={0}><span className="tag">1. Caption Restrictions</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Words to Avoid</M>
      <M i={2} className="muted" style={{ marginTop: '1rem', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
        The following words increase the risk of content restrictions or removal. Avoid them in captions.
      </M>
    </div>
    <M i={3} className="word-cloud">
      {words.map((w, i) => <span key={i} className="word-chip">{w}</span>)}
    </M>
    <M i={4} className="s4-note">
      <AlertTriangle size={32} style={{ color: 'var(--red)', flexShrink: 0 }} />
      <div>
        <p style={{ fontWeight: 700, marginBottom: '.5rem', fontSize: '1.1rem' }}>Promo Code Note</p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '.95rem' }}>
          Only use <strong style={{ color: 'var(--red)' }}>"RONB"</strong> as a promo code if we are your official partner. Otherwise, place it in the comments — not the caption.
        </p>
      </div>
    </M>
  </div>
);

// ─── SLIDE 5 — EXECUTION PIPELINE ───────────────────────────────────────────
const pipelineSteps = [
  { label: 'You Share',     desc: 'Drop your draft caption. Include context or visual assets.',             icon: <Type size={20} /> },
  { label: 'We Review',    desc: 'Scanned for tone, accuracy, and platform policies.',                       icon: <ShieldCheck size={20} /> },
  { label: 'Optimize',     desc: 'Minor rewrites for clarity, engagement, and algorithm reach.',             icon: <Layers size={20} /> },
  { label: 'Verify',       desc: 'Final version shared with you. Factual accuracy always preserved.',        icon: <FileText size={20} /> },
  { label: 'Publish',      desc: 'You approve → we post. Nothing goes live without your sign-off.',          icon: <CheckCircle2 size={20} /> },
];
const S5 = () => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="s5">
      <M i={0}><span className="tag">1. Review Process</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Execution Pipeline</M>
      <M i={2} className="muted" style={{ marginTop: '.75rem', fontSize: '1rem' }}>
        Click any stage to expand details.
      </M>
      <div className="s5-steps">
        {pipelineSteps.map((s, i) => (
          <motion.div
            key={i}
            className={`s5-step ${active === i ? 'active' : active !== null ? 'inactive' : ''}`}
            onClick={() => setActive(active === i ? null : i)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 + 0.2 }}
          >
            <span className="s5-step-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="s5-step-title">{s.label}</div>
              <AnimatePresence>
                {active === i && (
                  <motion.div className="s5-step-desc"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: .25 }}>
                    {s.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="s5-step-icon">{s.icon}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── SLIDE 6 — PHOTO GUIDELINES ─────────────────────────────────────────────
const S6 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="s6">
      <div className="s6-left">
        <M i={0}><span className="tag">2. Photo Guidelines</span></M>
        
        {/* DO SECTION */}
        <M i={1} className="s6-heading" style={{ marginTop: '1.5rem' }}>Clean, Natural, Professional</M>
        <M i={2} className="s6-list" style={{ marginTop: '1.5rem' }}>
          {['Clear and high-quality', 'Natural and realistic', 'Simple and uncluttered', 'Let the caption carry extra info'].map((t, i) => (
            <div key={i} className="s6-list-item">
              <CheckCircle2 size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
              <span>{t}</span>
            </div>
          ))}
        </M>

        <div className="line" style={{ margin: '3rem 0' }} />

        {/* AVOID SECTION */}
        <M i={3} className="split-label" style={{ color: 'var(--red)' }}>Avoid</M>
        <M i={4} className="s6-heading" style={{ marginTop: '.5rem', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>What Doesn't Work</M>
        <M i={5} className="s6-list" style={{ marginTop: '1.5rem' }}>
          {['Infographic-style or text-heavy images', 'Heavy design elements or filters', 'Cluttered or overly edited visuals', 'Artificial or promotional-looking layouts'].map((t, i) => (
            <div key={i} className="s6-list-item">
              <XCircle size={18} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
              <span style={{ opacity: .9 }}>{t}</span>
            </div>
          ))}
        </M>

        <M i={6} className="mobile-only" style={{ marginTop: '2.5rem' }}>
          <button className="view-btn" onClick={() => setModalOpen(true)}>
            <ImageIcon size={18} /> View Example Photo
          </button>
        </M>
      </div>
      
      <div className="s6-right desktop-only">
        <M i={7} className="s6-img-wrapper" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
          <img src="./good-photo.png" alt="Clean photo example" className="s6-cover-img" />
          <div className="s6-hover-overlay">
            <span>Example of a good product promotion photo</span>
          </div>
        </M>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
            <motion.div className="modal-inner" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <img src="./good-photo.png" alt="Example" className="modal-img" />
                <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.5px', textAlign: 'center' }}>Example of a good product promotion photo</span>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}><XCircle size={32} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── SLIDE 7 — PHOTO RESTRICTIONS ───────────────────────────────────────────
const photoRows = [
  { title: 'Children or Babies',        desc: 'Avoid featuring children or babies in promotional content.' },
  { title: 'Sensitive Visuals',          desc: 'No fire, weapons, blood, accidents, fights, or distressing scenes.' },
  { title: 'Religious Imagery',          desc: 'No religious symbols, worship visuals, rituals, or figures.' },
  { title: 'Restricted Text on Images',  desc: 'No "win", "giveaway", "free money", or Apple product mentions on images.' },
];
const S7 = () => (
  <div className="s7">
    <div>
      <M i={0}><span className="tag">2. Photo Restrictions</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Visuals to Avoid</M>
    </div>
    <div className="s7-list">
      {photoRows.map((r, i) => (
        <M key={i} i={i + 2} className="s7-row">
          <span className="s7-idx">0{i + 1}</span>
          <div>
            <div className="s7-row-title">{r.title}</div>
            <div className="s7-row-desc">{r.desc}</div>
          </div>
        </M>
      ))}
    </div>
  </div>
);

// ─── SLIDE 8 — VIDEO GUIDELINES ─────────────────────────────────────────────
const S8 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="s8">
      <div className="s8-left">
        <M i={0}><span className="tag">3. Video Guidelines</span></M>
        <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Short, Clean & Professional</M>
        <M i={2}>
          <div className="duration-badge">
            <Video size={24} />
            <div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', opacity: .75, textTransform: 'uppercase' }}>Recommended Duration</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1 }}>30–40 sec</div>
            </div>
          </div>
        </M>
        <M i={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {['Keep it professional and clean', 'Clear and easy-to-follow message', 'Minimal motion graphics', 'Suggest background music (RONB team edits)'].map((t, i) => (
              <div key={i} className="split-list-item">
                <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 'clamp(.9rem, 1.2vw, 1.05rem)' }}>{t}</span>
              </div>
            ))}
          </div>
        </M>
        <M i={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {['Overly long videos', 'Heavy motion graphics', 'Sensitive or harmful topics', 'Misleading or exaggerated claims'].map((t, i) => (
              <div key={i} className="split-list-item">
                <XCircle size={16} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 'clamp(.9rem, 1.2vw, 1.05rem)', color: 'var(--muted)' }}>{t}</span>
              </div>
            ))}
          </div>
        </M>

        <M i={5} className="mobile-only" style={{ marginTop: '1.5rem' }}>
          <button className="view-btn" onClick={() => setModalOpen(true)}>
            <Video size={18} /> Watch Example Video
          </button>
        </M>
      </div>
      <div className="s8-right desktop-only">
        <M i={6}>
          <div className="phone-mock" style={{ display: 'block' }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
              <source src="./Fone-pay-video.webm" type="video/webm" />
              <source src="./Fone-pay-video.mp4" type="video/mp4" />
            </video>
          </div>
        </M>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
            <motion.div className="modal-inner" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <div className="phone-mock" style={{ display: 'block' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src="./Fone-pay-video.webm" type="video/webm" />
                  <source src="./Fone-pay-video.mp4" type="video/mp4" />
                </video>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}><XCircle size={32} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── SLIDE 9 — VIDEO RESTRICTIONS ───────────────────────────────────────────
const S9 = () => (
  <div className="s9">
    <div className="s9-left">
      <M i={0}><span className="tag">3. Video Restrictions</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>What to Avoid in Videos</M>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {['Sensitive or violent visuals', 'Children on screen', 'Religious symbols or figures', 'Harmful or illegal activities', 'QR codes', 'Words like "win" or "free money"'].map((t, i) => (
          <M key={i} i={i + 2} style={{ display: 'flex', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
            <XCircle size={18} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 'clamp(.9rem, 1.3vw, 1.05rem)', lineHeight: 1.6 }}>{t}</span>
          </M>
        ))}
      </div>
    </div>
    <div className="s9-right">
      <AlertTriangle size={56} style={{ opacity: .7, marginBottom: '1rem' }} />
      <M i={8} tag="h3" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-1px' }}>
        Editing Note
      </M>
      <M i={9} style={{ fontSize: '1.1rem', lineHeight: 1.75, opacity: .88 }}>
        Clean, simple, and direct videos consistently outperform content with too many effects, claims, or visual distractions.
      </M>
    </div>
  </div>
);

// ─── SLIDE 10 — WHY IT MATTERS ───────────────────────────────────────────────
const whyCells = [
  'Reach a wider audience',
  'Avoid content being restricted or removed',
  'Maintain platform health and credibility',
  'Align with platform policies',
  'Keep content safe and audience-friendly',
  'Build trust and reduce negative feedback',
  'Deliver consistent campaign results',
];
const S10 = () => (
  <div className="s10">
    <div className="s10-left">
      <M i={0}><span className="tag">4. Why It Matters</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Why We<br/>Follow These<br/>Guidelines</M>
      <M i={2} style={{ marginTop: '2rem' }}>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--red)', lineHeight: 1, letterSpacing: '-4px' }}>7</div>
        <div style={{ fontSize: '.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginTop: '.25rem' }}>Reasons that matter</div>
      </M>
    </div>
    <div className="s10-right">
      {whyCells.map((t, i) => (
        <motion.div key={i} className="s10-row"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 + 0.15, type: 'spring', damping: 22, stiffness: 160 }}
        >
          <span className="s10-row-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="s10-row-text">{t}</span>
          <CheckCircle2 size={16} style={{ color: 'var(--red)', flexShrink: 0, opacity: 0.5 }} />
        </motion.div>
      ))}
    </div>
  </div>
);

// ─── SLIDE 11 — FINAL CHECKLIST ──────────────────────────────────────────────
const checkCols = [
  {
    icon: <Type size={28} />, label: 'Caption',
    items: ['Short, clear, and relevant?', 'Friendly and professional tone?', 'Restricted words avoided?', 'Promo codes placed correctly?', 'Links shortened?'],
  },
  {
    icon: <ImageIcon size={28} />, label: 'Photo',
    items: ['Clean and natural?', 'Free from heavy design or infographics?', 'Avoids sensitive visuals, children, religious imagery?'],
  },
  {
    icon: <Video size={28} />, label: 'Video',
    items: ['Within 30–40 seconds?', 'Clean and professional?', 'Avoids restricted visuals, QR codes, sensitive topics?'],
  },
];
const S11 = () => (
  <div className="s11">
    <div>
      <M i={0}><span className="tag">Final Checklist</span></M>
      <M i={1} tag="h2" className="h-xl" style={{ marginTop: '1.5rem' }}>Before Sharing with RONB</M>
    </div>
    <div className="s11-cols">
      {checkCols.map((col, i) => (
        <M key={i} i={i + 2} className="s11-col">
          <div className="s11-col-header">
            <span style={{ color: 'var(--red)' }}>{col.icon}</span>
            <span className="s11-title">{col.label}</span>
          </div>
          {col.items.map((t, j) => (
            <div key={j} className="s11-item">
              <CheckCircle2 size={16} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
              <span>{t}</span>
            </div>
          ))}
        </M>
      ))}
    </div>
  </div>
);

// ─── SLIDE 12 — CLOSING ──────────────────────────────────────────────────────
const S12 = () => (
  <div className="s12">
    <div className="s12-bg" />
    <M i={0}><Award size={56} style={{ color: 'var(--red)' }} /></M>
    <M i={1} tag="h1">Thank<br />You</M>
    <div className="s12-rule" />
    <M i={2} className="s12-tagline">
      Following these guidelines helps us create content that is safer, clearer, and more effective for your brand.
    </M>
    <M i={3} style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 700, color: 'var(--muted)' }}>
      Better content. Smoother approvals. <span style={{ color: 'var(--red)' }}>Stronger results.</span>
    </M>
  </div>
);

export default App;
