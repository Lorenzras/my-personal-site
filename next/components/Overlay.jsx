'use client';

import { profile, stations, projects, sections } from '@/content/site';

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
        <p className="kicker">{profile.kicker}</p>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="tagline">{profile.tagline}</p>
        <p className="tagline-jp">{profile.taglineJp}</p>
        <p className="muted">{profile.intro}</p>
        <p className="hint">{profile.hint}</p>
      </Section>

      {stations.map((s, i) => (
        <Section key={s.id}>
          <p className="kicker" style={{ color: s.color }}>
            STATION {String(i + 1).padStart(2, '0')} · {s.jp}
          </p>
          <h2>{s.label}</h2>
          <p className="action" style={{ color: s.color }}>{s.action}</p>
          <p className="muted">{s.blurb}</p>
          <ul className="chips">
            {s.items.map((item) => (
              <li key={item} style={{ borderColor: s.color }}>{item}</li>
            ))}
          </ul>
        </Section>
      ))}

      <Section align="right" className="showroom">
        <p className="kicker">{sections.showroom.kicker}</p>
        <h2>{sections.showroom.title}</h2>
        <p className="muted">{sections.showroom.body}</p>
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
        <p className="kicker" style={{ color: '#34d399' }}>{sections.contact.kicker}</p>
        <h2>{sections.contact.title}</h2>
        <p className="muted">{sections.contact.body}</p>
        <div className="actions">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="muted small">{profile.location} · {sections.contact.signoff}</p>
      </Section>
    </main>
  );
}
