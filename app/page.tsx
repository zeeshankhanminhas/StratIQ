"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Mail,
  Menu,
  Minus,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const navItems = ["About", "Services", "Testimonials", "Team", "Pricing"];

const services = [
  {
    label: "Market intelligence",
    title: "See the market clearly",
    summary: "Evidence-led research that separates durable opportunity from attractive noise.",
    detail:
      "We examine demand, category movement, competitors, customer behaviour and commercial signals. The result is a shared evidence base that shows what is known, what remains uncertain and where deeper investigation will change the decision.",
    tone: "signal",
  },
  {
    label: "Strategic direction",
    title: "Choose a defensible route",
    summary: "Structured options, explicit trade-offs and recommendations built for real constraints.",
    detail:
      "We turn evidence into credible strategic choices, test the assumptions behind each route and make risk visible. Leaders leave with a concise decision brief, a clear recommendation and the confidence to explain why it is the right move.",
    tone: "direction",
  },
  {
    label: "Growth execution",
    title: "Carry clarity into action",
    summary: "Sequenced execution that links positioning, channels and measurement to the decision.",
    detail:
      "We translate the selected direction into accountable work: positioning, digital presence, campaigns, marketplaces, ownership and measurement. Every activity has a reason to exist and a signal that tells us whether it is working.",
    tone: "growth",
  },
];

const approach = [
  {
    number: "01",
    title: "Frame the decision",
    copy: "Define the outcome, constraints, assumptions and evidence required before research begins.",
    icon: Search,
  },
  {
    number: "02",
    title: "Build the evidence",
    copy: "Connect market, customer, competitor and performance signals into one structured view.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Move with intent",
    copy: "Select the strongest practical route and turn it into accountable, measurable action.",
    icon: Target,
  },
];

const testimonials = [
  {
    quote:
      "Strat IQ gave us a way to separate what we believed from what the market was actually telling us. The final decision felt sharper, faster and much easier to defend.",
    name: "Amelia Hart",
    role: "Managing Director, Northline",
    initials: "AH",
  },
  {
    quote:
      "The work did not end with a presentation. Every recommendation had an owner, a sequence and a measurable signal, which changed the quality of execution immediately.",
    name: "Daniel Okoro",
    role: "Growth Lead, Verity Works",
    initials: "DO",
  },
  {
    quote:
      "They found the question beneath the question. That clarity stopped us spending against the wrong problem and gave the team a route everyone could support.",
    name: "Maya Chen",
    role: "Founder, Common Thread",
    initials: "MC",
  },
  {
    quote:
      "The combination of commercial realism and investigative depth was rare. We understood the risks without losing momentum or ambition.",
    name: "Oliver Grant",
    role: "Strategy Director, Axis Group",
    initials: "OG",
  },
];

const team = [
  ["ZM", "Zeeshan Minhas", "Strategy & growth"],
  ["AR", "Amina Rahman", "Market intelligence"],
  ["JT", "James Turner", "Commercial research"],
  ["SK", "Sofia Khan", "Execution & insight"],
];

const plans = [
  {
    name: "Decision Sprint",
    description: "For a focused commercial question that needs evidence and direction quickly.",
    price: "£2,400",
    period: "fixed engagement",
    features: ["Decision framing workshop", "Focused market investigation", "Options and risk analysis", "Executive decision brief"],
  },
  {
    name: "Growth Programme",
    description: "For organisations moving from market understanding into a sequenced growth plan.",
    price: "£4,800",
    period: "from / programme",
    featured: true,
    features: ["Market and customer intelligence", "Strategic direction", "90-day execution roadmap", "Leadership working sessions"],
  },
  {
    name: "Advisory Partner",
    description: "For leadership teams that need continuing intelligence, challenge and momentum.",
    price: "Custom",
    period: "monthly advisory",
    features: ["Monthly intelligence review", "Decision support on demand", "Execution scorecard", "Quarterly strategy reset"],
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RollingLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rolling-link ${className}`}>
      <span className="rolling-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

function DotLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="dot-label">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function AbstractVisual({ variant, label }: { variant: string; label: string }) {
  return (
    <div className={`abstract-visual visual-${variant}`} role="img" aria-label={label}>
      <span className="visual-caption">{label}</span>
      <i className="shape shape-a" />
      <i className="shape shape-b" />
      <i className="shape shape-c" />
      <i className="shape shape-d" />
    </div>
  );
}

function ParallaxPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  return (
    <div className={`parallax-panel ${className}`} ref={ref}>
      <motion.div className="parallax-inner" style={{ y: reduced ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formState, setFormState] = useState<"idle" | "error" | "success">("idle");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("is-locked", videoOpen || menuOpen);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
    };
  }, [menuOpen, videoOpen]);

  const nextTestimonial = () => setTestimonialIndex((current) => (current + 1) % testimonials.length);
  const previousTestimonial = () =>
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length);

  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email.includes("@") || message.length < 12) {
      setFormState("error");
      return;
    }

    const subject = encodeURIComponent(`Strat IQ enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:hello@stratiq.example?subject=${subject}&body=${body}`;
    setFormState("success");
    form.reset();
  };

  return (
    <main id="top">
      <header className="site-header" id="Navbar">
        <a className="brand" href="#top" aria-label="Strat IQ home">
          <span aria-hidden="true" />
          Strat IQ
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              <RollingLink>{item}</RollingLink>
            </a>
          ))}
        </nav>

        <a className="header-cta button-shell" href="#Contact">
          <span className="button-icon">
            <ArrowRight size={18} />
          </span>
          <RollingLink>Start a conversation</RollingLink>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              id="mobile-menu"
              aria-label="Mobile navigation"
              initial={reduced ? false : { opacity: 0, y: -16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
            >
              {navItems.map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
                  {item}
                  <ArrowUpRight size={20} />
                </a>
              ))}
              <a href="#Contact" onClick={() => setMenuOpen(false)}>
                Start a conversation
                <ArrowUpRight size={20} />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-geometry" aria-hidden="true">
          <i className="hero-line line-one" />
          <i className="hero-line line-two" />
          <i className="hero-block block-yellow" />
          <i className="hero-block block-grey" />
        </div>

        <div className="hero-content page-wrap">
          <motion.div
            className="hero-title"
            id="hero-title"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <h1>
              <span className="hero-line-muted">Better questions.</span>
              <span>Clearer decisions.</span>
            </h1>
          </motion.div>

          <div className="hero-aside">
            <motion.p
              className="hero-support"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
            >
              We help organisations understand markets, evaluate opportunities and move important commercial decisions from uncertainty to action.
            </motion.p>

            <motion.a
              className="hero-cta button-shell"
              href="#Contact"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.28 }}
            >
              <span className="button-icon"><ArrowRight size={18} /></span>
              <RollingLink>Start with your question</RollingLink>
            </motion.a>
          </div>
        </div>
      </section>

      <section className="featured-media page-wrap" aria-label="Featured Strat IQ introduction">
        <ParallaxPanel className="media-frame">
          <div
            className="editorial-image"
            role="img"
            aria-label="A senior strategy team reviewing market evidence around a worktable"
          />
        </ParallaxPanel>

        <button className="play-control" type="button" onClick={() => setVideoOpen(true)}>
          <span className="play-icon">
            <Play size={18} fill="currentColor" />
          </span>
          <RollingLink>Play our approach</RollingLink>
        </button>

        <a className="media-cta" href="#Services">
          <RollingLink>Explore our services</RollingLink>
          <ArrowRight size={18} />
        </a>
      </section>

      <section className="about section" id="About">
        <div className="page-wrap intro-grid">
          <Reveal>
            <DotLabel>Just to clarify</DotLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>We turn complex commercial questions into evidence, direction and action leaders can defend.</h2>
          </Reveal>
        </div>

        <div className="logo-marquee" aria-label="Selected client placeholders">
          <div className="marquee-track">
            {["Northline", "Horizon", "Verity", "Axis", "Foundry", "Nova", "Northline", "Horizon", "Verity", "Axis", "Foundry", "Nova"].map(
              (logo, index) => (
                <span key={`${logo}-${index}`}>{logo}</span>
              ),
            )}
          </div>
        </div>

        <div className="page-wrap about-notes">
          <Reveal>
            <p className="note-title">Clarity before commitment</p>
            <p>We investigate the market, customer, competition and internal reality before recommending where time and money should move.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="note-title">Action after insight</p>
            <p>Every engagement finishes with a decision, an accountable roadmap and the measures that show whether the route is working.</p>
          </Reveal>
        </div>
      </section>

      <section className="services section" id="Services">
        <div className="page-wrap intro-grid">
          <Reveal>
            <DotLabel>Our services</DotLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>From understanding the market to implementing the next move, every service exists to improve a decision.</h2>
          </Reveal>
        </div>

        <div className="page-wrap services-layout">
          <Reveal className="service-visual-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={reduced ? false : { opacity: 0, scale: 0.985 }}
                animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.42 }}
              >
                <AbstractVisual variant={services[activeService].tone} label={services[activeService].label} />
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <div className="service-list">
            {services.map((service, index) => {
              const open = activeService === index;
              return (
                <article className={`service-item ${open ? "is-open" : ""}`} key={service.label}>
                  <button
                    type="button"
                    className="service-trigger"
                    aria-expanded={open}
                    aria-controls={`service-panel-${index}`}
                    onClick={() => setActiveService(index)}
                  >
                    <span>{service.label}</span>
                    <span className="service-toggle" aria-hidden="true">
                      {open ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="service-panel"
                        id={`service-panel-${index}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={reduced ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3>{service.title}</h3>
                        <p className="service-summary">{service.summary}</p>
                        <p>{service.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="image-cta page-wrap">
        <ParallaxPanel className="image-cta-panel">
          <AbstractVisual variant="field" label="Market evidence in motion" />
          <div className="image-cta-overlay">
            <Reveal>
              <h2>See the pattern.<br />Change the outcome.</h2>
            </Reveal>
            <a className="light-button" href="#Contact">
              <span className="button-icon"><ArrowRight size={18} /></span>
              <RollingLink>Start with the question</RollingLink>
            </a>
          </div>
        </ParallaxPanel>
      </section>

      <section className="approach section">
        <div className="page-wrap intro-grid">
          <Reveal><DotLabel>Our approach</DotLabel></Reveal>
          <Reveal delay={0.08}>
            <h2>A disciplined path from uncertainty to action, with no black box between research and recommendation.</h2>
          </Reveal>
        </div>

        <div className="page-wrap approach-grid">
          {approach.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="approach-item" delay={index * 0.08} key={item.number}>
                <span className="approach-number">{item.number}</span>
                <Icon className="approach-icon" size={52} strokeWidth={1.25} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="split-story section">
        <div className="page-wrap split-grid">
          <ParallaxPanel className="split-visual">
            <AbstractVisual variant="brief" label="Decision brief / evidence map" />
          </ParallaxPanel>
          <div className="split-copy">
            <Reveal>
              <h2>Make assumptions visible before they become expensive.</h2>
            </Reveal>
            <div className="split-notes">
              <Reveal delay={0.06}>
                <p className="note-title">Evidence that connects</p>
                <p>We bring fragmented market, customer and performance signals into one view, so the team works from the same reality.</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="note-title">Risk that can be discussed</p>
                <p>Uncertainty is documented, tested and translated into choices rather than hidden behind confident language.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="split-story section split-reverse">
        <div className="page-wrap split-grid">
          <div className="split-copy">
            <Reveal>
              <h2>Build a strategy that survives contact with execution.</h2>
            </Reveal>
            <div className="split-notes">
              <Reveal delay={0.06}>
                <p className="note-title">A route, not a wish list</p>
                <p>The plan is sequenced around constraints, capacity and the few moves most likely to change commercial performance.</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="note-title">Signals, not theatre</p>
                <p>Measures are agreed before activity begins, so teams can learn, adapt and stop work that is not earning its place.</p>
              </Reveal>
            </div>
          </div>
          <ParallaxPanel className="split-visual">
            <AbstractVisual variant="roadmap" label="Growth roadmap / next 90 days" />
          </ParallaxPanel>
        </div>
      </section>

      <section className="statistics section">
        <div className="page-wrap intro-grid">
          <Reveal><DotLabel>By the numbers</DotLabel></Reveal>
          <Reveal delay={0.08}>
            <h2>A small intelligence practice built around senior attention, focused work and measurable movement.</h2>
          </Reveal>
        </div>

        <div className="page-wrap stats-grid">
          {[
            ["01", "Senior team on every engagement"],
            ["15+", "Markets and categories investigated"],
            ["32", "Decision briefs delivered"],
            ["14", "Growth roadmaps activated this year"],
          ].map(([value, label], index) => (
            <Reveal className="stat-item" delay={index * 0.06} key={label}>
              <span>{value}</span>
              <p>{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="testimonials section" id="Testimonials">
        <div className="page-wrap intro-grid">
          <Reveal><DotLabel>Our clients say</DotLabel></Reveal>
          <Reveal delay={0.08}>
            <h2>Clarity is useful only when it helps people make, explain and execute a better decision.</h2>
          </Reveal>
        </div>

        <div className="page-wrap testimonial-shell" role="region" aria-label="Client testimonials">
          <div className="testimonial-viewport">
            <motion.div
              className="testimonial-track"
              animate={reduced ? undefined : { x: `${-testimonialIndex * 100}%` }}
              style={reduced ? { transform: `translateX(${-testimonialIndex * 100}%)` } : undefined}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) nextTestimonial();
                if (info.offset.x > 60) previousTestimonial();
              }}
            >
              {testimonials.map((testimonial, index) => (
                <article className="testimonial-card" key={testimonial.name} aria-hidden={testimonialIndex !== index}>
                  <Sparkles size={28} strokeWidth={1.35} />
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <div className="client-meta">
                    <span className="client-avatar">{testimonial.initials}</span>
                    <p><strong>{testimonial.name}</strong><small>{testimonial.role}</small></p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="slider-controls">
            <p><span>{String(testimonialIndex + 1).padStart(2, "0")}</span> / {String(testimonials.length).padStart(2, "0")}</p>
            <div>
              <button type="button" aria-label="Previous testimonial" onClick={previousTestimonial}><ChevronLeft /></button>
              <button type="button" aria-label="Next testimonial" onClick={nextTestimonial}><ChevronRight /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="team section" id="Team">
        <div className="page-wrap team-intro">
          <Reveal><DotLabel>Meet us</DotLabel><p className="display-label">Team</p></Reveal>
          <Reveal delay={0.08}><h2>Senior thinkers who move comfortably between evidence, strategy and action.</h2></Reveal>
          <Reveal delay={0.12}><p>Every engagement stays close to the people doing the thinking. The team shown here uses placeholder names and roles until the final Strat IQ roster is confirmed.</p></Reveal>
        </div>

        <div className="page-wrap team-grid">
          {team.map(([initials, name, role], index) => (
            <Reveal className="team-card" delay={index * 0.06} key={name}>
              <div className={`portrait portrait-${index + 1}`} role="img" aria-label={`Portrait placeholder for ${name}`}>
                <span>{initials}</span>
                <a href={`mailto:${name.toLowerCase().replaceAll(" ", ".")}@stratiq.example`} aria-label={`Email ${name}`}><Mail size={19} /></a>
              </div>
              <p><strong>{name}</strong><small>{role}</small></p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pricing section" id="Pricing">
        <div className="page-wrap intro-grid">
          <Reveal><DotLabel>Pricing</DotLabel></Reveal>
          <Reveal delay={0.08}>
            <h2>Clear starting points for different decisions, with final scope shaped around the evidence required.</h2>
          </Reveal>
        </div>

        <div className="page-wrap pricing-grid">
          {plans.map((plan, index) => (
            <Reveal className={`pricing-card ${plan.featured ? "is-featured" : ""}`} delay={index * 0.08} key={plan.name}>
              <div className="pricing-top">
                <span className="plan-index">0{index + 1}</span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="price"><strong>{plan.price}</strong><small>{plan.period}</small></div>
              <a href="#Contact"><RollingLink>Discuss this engagement</RollingLink><ArrowRight size={18} /></a>
              <details className="included" open={plan.featured}>
                <summary>What is included?<Plus size={17} aria-hidden="true" /></summary>
                <ul>{plan.features.map((feature) => <li key={feature}><span />{feature}</li>)}</ul>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact section" id="Contact">
        <div className="page-wrap intro-grid">
          <Reveal><DotLabel>Contact</DotLabel></Reveal>
          <Reveal delay={0.08}><h2>Bring us the decision you need to make. We will begin by clarifying the question.</h2></Reveal>
        </div>

        <div className="page-wrap contact-layout">
          <Reveal className="contact-aside">
            <p>Tell us what is changing, what feels uncertain and what has to happen next. The details here are placeholders until the final contact channel is connected.</p>
            <a href="mailto:hello@stratiq.example">hello@stratiq.example <ArrowUpRight size={18} /></a>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact-form" onSubmit={handleContact} noValidate>
              <label><span>Your name</span><input type="text" name="name" autoComplete="name" placeholder="Name" /></label>
              <label><span>Your email</span><input type="email" name="email" autoComplete="email" placeholder="Email address" /></label>
              <label><span>Your message</span><textarea name="message" rows={5} placeholder="What decision are you trying to make?" /></label>
              <button className="submit-button" type="submit">
                <span className="button-icon"><ArrowRight size={18} /></span>
                <RollingLink>Get in touch</RollingLink>
              </button>
              <div className="form-status" aria-live="polite">
                {formState === "error" && <p className="form-error">Please add your name, a valid email and at least a short description of the decision.</p>}
                {formState === "success" && <p className="form-success">Your email application should now open with the enquiry prepared.</p>}
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-wrap footer-top">
          <p>© 2026 Strat IQ</p>
          <a href="#top"><RollingLink>Back to top</RollingLink><ArrowRight size={17} /></a>
        </div>
        <div className="page-wrap footer-main">
          <a className="brand footer-brand" href="#top"><span aria-hidden="true" />Strat IQ</a>
          <div className="footer-links"><a href="#About">About</a><a href="#Services">Services</a><a href="#Contact">Contact</a></div>
          <div className="footer-links"><a href="#">Privacy</a><a href="#">Terms</a><span>All rights reserved</span></div>
        </div>
      </footer>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Strat IQ approach film"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setVideoOpen(false);
            }}
          >
            <motion.div className="video-dialog" initial={reduced ? false : { scale: 0.97 }} animate={reduced ? undefined : { scale: 1 }}>
              <button type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}><X /></button>
              <div className="video-placeholder">
                <span><Play size={24} fill="currentColor" /></span>
                <p>Strat IQ approach film</p>
                <small>Video content placeholder</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
