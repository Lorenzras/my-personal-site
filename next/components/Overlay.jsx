'use client';

import { profile, stations, projects } from '@/content/site';

function Section({ children, align = 'left', className = '' }) {
  return (
    <section className={`section section-${align} ${className}`}>
      <div className="panel">{children}</div>
    </section>
  );
}

export default function Overlay({ onSelect }) {
  return (
    <main className="overlay">
      <Section className="hero">
        <p className="kicker">LENZLAB · AUTOMATION FACTORY</p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="tagline">{profile.tagline}</p>
        <p className="muted">{profile.intro}</p>
        <p className="hint">Scroll to start the line ↓</p>
      </Section>

      {stations.map((s, i) => (
        <Section key={s.id}>
          <p className="kicker" style={{ color: s.color }}>
            STATION {String(i + 1).padStart(2, '0')}
          </p>
          <h2>{s.label}</h2>
          <p className="muted">{s.blurb}</p>
          <ul className="chips">
            {s.items.map((item) => (
              <li key={item} style={{ borderColor: s.color }}>{item}</li>
            ))}
          </ul>
        </Section>
      ))}

      <Section align="right" className="showroom">
        <p className="kicker">SHOWROOM</p>
        <h2>Finished products</h2>
        <p className="muted">Click a pedestal or a card to inspect it.</p>
        <div className="cards">
          {projects.map((p) => (
            <button type="button" key={p.title} className="card" onClick={() => onSelect(p)}>
              <strong>{p.title}</strong>
              <span>{p.tags.join(' · ')}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section align="right">
        <p className="kicker" style={{ color: '#34d399' }}>SHIPPING DOCK</p>
        <h2>Got a process that should run itself?</h2>
        <p className="muted">
          Tell me about the problem you are trying to solve. I&apos;d love to listen and see how I can help.
        </p>
        <div className="actions">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="muted small">{profile.location}</p>
      </Section>
    </main>
  );
}
