// Server-rendered copy of the motion `Reveal` (initial -> whileInView): the
// markup matches what motion renders on the server, and the small client
// <RevealObserver> in the layout plays it in (and back out) with the same
// duration, delay, easing and viewport amount. No motion/React code ships for it.
export function Reveal({ children, delay = 0, y = 32, amount = 0.2, duration = 0.6, className, as: Tag = 'div' }) {
  return (
    <Tag
      className={className}
      data-reveal=""
      data-y={y}
      data-delay={delay}
      data-amount={amount}
      data-duration={duration}
      style={{ opacity: 0, transform: `translateY(${y}px)` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ kicker, title, body }) {
  return (
    <Reveal className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {body && <p className="lead">{body}</p>}
    </Reveal>
  );
}
