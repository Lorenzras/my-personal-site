'use client';

import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { contact, ideas, pipeline, process, profile, projects, securityChecks, services } from '@/content/site';
import MaskPreview from './MaskPreview';
import { Reveal, SectionHead } from './Shell';

const EASE = [0.22, 1, 0.36, 1];
const stagger = (i) => ({ duration: 0.6, delay: i * 0.08, ease: EASE });

export function MaskingTeaser() {
  return (
    <section className="block split">
      <div>
        <SectionHead
          kicker="AI INTEGRATION · 個人情報マスキング"
          title="Personal data, masked before it leaves."
          body="Names, addresses, phone numbers and My Number are found by AI and blacked out automatically. A person checks the result, so nothing is shared by mistake."
        />
        <Reveal delay={0.1}>
          <a className="btn ghost" href="/masking/">Open the masking demo →</a>
        </Reveal>
      </div>
      <Reveal delay={0.15}>
        <MaskPreview />
      </Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="block">
      <SectionHead kicker="WHAT I BUILD · サービス" title="Four things, done properly." />
      <div className="services">
        {services.map((s, i) => (
          <motion.article
            key={s.id}
            className={`service service-${s.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={stagger(i)}
          >
            <p className="jp">{s.jp}</p>
            <h3>{s.title}</h3>
            <p className="muted">{s.body}</p>
            <ul className="points">
              {s.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const popIn = { hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { ease: EASE, duration: 0.6 } } };

function Link({ i }) {
  return (
    <motion.div className="link" variants={fadeIn}>
      <span className="packet" style={{ animationDelay: `${i * 0.4}s` }} />
    </motion.div>
  );
}

function Node({ step }) {
  return (
    <motion.div className={`node node-${step.id}`} variants={popIn}>
      <strong>{step.label}</strong>
      <span>{step.sub}</span>
    </motion.div>
  );
}

// kintone → Lambda → Bedrock → kintone, with a packet travelling along each
// link. Consecutive `aws` steps are grouped inside a dashed account boundary.
export function Pipeline() {
  const groups = [];
  pipeline.steps.forEach((s) => {
    const last = groups[groups.length - 1];
    if (s.aws && last?.aws) last.steps.push(s);
    else groups.push({ aws: !!s.aws, steps: [s] });
  });
  let n = 0;
  return (
    <section className="block">
      <SectionHead kicker="AWS BEDROCK · 仕組み" title={pipeline.title} body={pipeline.body} />
      <motion.div
        className="pipeline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        variants={{ show: { transition: { staggerChildren: 0.3 } } }}
      >
        {groups.map((g, gi) => {
          const nodes = g.steps.map((s, si) => (
            <Fragment key={s.id}>
              {si > 0 && <Link i={n++} />}
              <Node step={s} />
            </Fragment>
          ));
          return (
            <Fragment key={gi}>
              {gi > 0 && <Link i={n++} />}
              {g.aws ? (
                <motion.div className="aws-boundary" variants={{ ...fadeIn, show: { opacity: 1, transition: { staggerChildren: 0.3 } } }}>
                  <span className="aws-label">🔒 Your AWS account</span>
                  {nodes}
                </motion.div>
              ) : nodes}
            </Fragment>
          );
        })}
      </motion.div>
    </section>
  );
}

export function Security() {
  return (
    <section className="block split">
      <SectionHead
        kicker="SECURITY BASICS · 基本対策"
        title="The boring basics, never skipped."
        body="Most incidents don’t come from clever attacks. They come from a leaked token or an app with too much access. Every project ships with these checked."
      />
      <ul className="checks">
        {securityChecks.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={stagger(i)}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              />
            </svg>
            {c}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function Ideas() {
  return (
    <section className="block">
      <SectionHead
        kicker="MORE INTEGRATIONS · 連携アイデア"
        title="Other chores AI can take off your plate."
        body="Built on the same Bedrock + kintone foundation. Ask about any of these."
      />
      <div className="ideas">
        {ideas.map((idea, i) => (
          <motion.article
            key={idea.title}
            className="idea"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={stagger(i)}
          >
            {idea.suggested && <span className="badge" title="Proposed idea. Confirm or delete in content/site.js">Proposed</span>}
            <h3>{idea.title}</h3>
            <p className="muted">{idea.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// A vertical timeline whose line fills as you scroll through it.
export function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="block">
      <SectionHead kicker="HOW WE WORK · 進め方" title="Small steps, visible early." />
      <ol ref={ref} className="process">
        <motion.span className="process-line" style={{ scaleY: fill }} />
        {process.map((p, i) => (
          <Reveal as="li" key={p.title} delay={0.05} y={20}>
            <span className="step-dot">{i + 1}</span>
            <h3>{p.title}</h3>
            <p className="muted">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Projects() {
  return (
    <section id="work" className="block">
      <SectionHead kicker="WORK · 実績" title="Things I’ve built." />
      <div className="projects">
        {projects.map((p, i) => {
          const Tag = p.link ? motion.a : motion.div;
          return (
            <Tag
              key={p.title}
              href={p.link}
              className={`project${p.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={stagger(i)}
            >
              <h3>{p.title}</h3>
              <p className="muted">{p.description}</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              {p.link && <span className="text-link">{p.linkLabel || 'GitHub'} →</span>}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="block contact">
      <Reveal>
        <p className="kicker">{contact.kicker}</p>
        <h2>{contact.title}</h2>
        <p className="lead">{contact.body}</p>
        <div className="actions center">
          <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn ghost" href={profile.github}>GitHub</a>
        </div>
        <p className="meta">{profile.languages} · {profile.location}</p>
      </Reveal>
    </section>
  );
}
