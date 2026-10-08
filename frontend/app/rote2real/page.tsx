import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Check,
  FileText,
  Layers3,
  LineChart,
  Lightbulb,
  ListChecks,
  MonitorCheck,
  NotebookPen,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import styles from "./landing.module.css";

const tracks = [
  { name: "Generative AI", icon: Sparkles, description: "Turn useful AI ideas into practical experiments." },
  { name: "Frontend", icon: MonitorCheck, description: "Make clear, usable interfaces people can try." },
  { name: "Backend", icon: Layers3, description: "Build the logic and systems behind an idea." },
  { name: "Full-Stack", icon: Rocket, description: "Connect the experience from screen to server." },
  { name: "Product Management", icon: Target, description: "Find a real problem and shape a thoughtful solution." },
];

const stages = [
  { days: "DAYS 01–05", title: "Start with a real problem", copy: "Explore your interests, spot a problem worth solving, and make a plan you can actually start." },
  { days: "DAYS 06–10", title: "Make your first version", copy: "Experiment with ideas and tools. Build a small first version, then learn from what happens." },
  { days: "DAYS 11–15", title: "Improve it with purpose", copy: "Solve the rough edges, ask better questions, and make your work easier for someone else to understand." },
  { days: "DAYS 16–20", title: "Show what you can do", copy: "Finish your micro-build, document your decisions, and demonstrate the evidence behind it." },
];

const steps = [
  { label: "Learn", copy: "Get a short brief and the context you need.", icon: BookOpenText },
  { label: "Build", copy: "Try it yourself. Make, test, and solve.", icon: Lightbulb },
  { label: "Document", copy: "Capture what you made and what you learned.", icon: NotebookPen },
  { label: "Demonstrate", copy: "Show evidence of your work, not just attendance.", icon: MonitorCheck },
  { label: "Track progress", copy: "See your consistency and growth across 20 days.", icon: LineChart },
];

export default function Rote2RealLandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href="/rote2real" aria-label="Rote2Real home">
            <span className={styles.brandMark}>R<span>2</span></span>
            <span className={styles.brandName}>rote<span>2</span>real<small>BY BRAIN TRAIN</small></span>
          </Link>
          <nav className={styles.navLinks} aria-label="Main navigation">
            <a href="#journey">The journey</a>
            <a href="#tracks">Tracks</a>
            <a href="#outcomes">What you get</a>
          </nav>
          <Link className={styles.navCta} href="/rote2real/register">
            Register Now <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><span /> A 20-DAY PRACTICAL STUDENT PROGRAM</p>
              <h1>Learn it.<br /><span>Make it real.</span></h1>
              <p className={styles.heroLead}>
                Rote2Real is a 20-day student program designed to turn ideas into real work. Each day brings a practical challenge, a chance to build, and proof of progress that students can genuinely show to the world.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/rote2real/register">
                  Register Now <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a className={styles.textButton} href="#journey">Explore the 20 days <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className={styles.heroNotes}>
                <span><Check size={14} aria-hidden="true" /> Built by doing</span>
                <span><Check size={14} aria-hidden="true" /> Evidence over attendance</span>
                <span><Check size={14} aria-hidden="true" /> Limited to 50 students</span>
              </div>
            </div>

            <div className={styles.showcase} aria-label="Illustration of a student's progress and work evidence">
              <div className={styles.showcaseTop}>
                <span className={styles.liveDot} /> YOUR WORK, MADE VISIBLE
                <span className={styles.moreButton}>···</span>
              </div>
              <div className={styles.progressBlock}>
                <div className={styles.progressHeading}><div><span className={styles.mutedLabel}>YOUR MICRO-BUILD</span><h2>A more useful study planner</h2></div><span className={styles.dayBadge}>DAY 08 / 20</span></div>
                <div className={styles.progressTrack}><span /></div>
                <div className={styles.progressCaption}><span>8 days completed</span><span>Keep building</span></div>
              </div>
              <div className={styles.evidenceCard}>
                <div className={styles.fileIcon}><FileText size={19} aria-hidden="true" /></div>
                <div className={styles.evidenceInfo}><strong>First working prototype</strong><span>Build evidence · Day 08</span></div>
                <span className={styles.evidenceCheck}><Check size={15} aria-hidden="true" /></span>
              </div>
              <div className={styles.evidenceCard}>
                <div className={`${styles.fileIcon} ${styles.noteIcon}`}><NotebookPen size={19} aria-hidden="true" /></div>
                <div className={styles.evidenceInfo}><strong>What I changed and why</strong><span>Build notes · Day 07</span></div>
                <span className={styles.evidenceCheck}><Check size={15} aria-hidden="true" /></span>
              </div>
              <div className={styles.showcaseBottom}><span><span className={styles.avatar}>S</span> YOUR LEARNING, NOT JUST YOUR LOGIN</span><ArrowUpRight size={16} aria-hidden="true" /></div>
            </div>
          </div>
          <div className={styles.heroFoot}><span>LEARN</span><i /><span>BUILD</span><i /><span>DOCUMENT</span><i /><span>DEMONSTRATE</span><i /><span>TRACK</span></div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.sectionInner}>
            <div className={styles.introLead}>
              <p className={styles.sectionEyebrow}>WHAT IS ROTE2REAL?</p>
              <h2>A student-first 20-day practical program.<br /><span>Learning by doing, not by watching.</span></h2>
            </div>
            <p className={styles.introText}>Rote2Real makes learning active. It is a student-first 20-day program where you take on daily practical challenges, work with preparation PDFs, build through available courses and tracks, and keep evidence of your growth. By day 20, you do not just learn theory—you have real work, clear progress, and a stronger story to share.</p>
          </div>
          <div className={styles.stepsRow}>
            {steps.map((step, index) => (
              <article className={styles.step} key={step.label}>
                <div className={styles.stepTop}><step.icon size={19} strokeWidth={1.8} aria-hidden="true" /><span>0{index + 1}</span></div>
                <h3>{step.label}</h3><p>{step.copy}</p>
                {index < steps.length - 1 && <ArrowRight className={styles.stepArrow} size={17} aria-hidden="true" />}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.journeySection} id="journey">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.sectionEyebrow}>SMALL STEPS. REAL MOMENTUM.</p><h2>20 days, one thing at a time.</h2></div>
              <p>Each challenge is a practical next step, not another long lecture. Students build, reflect, and keep moving forward through a guided 20-day journey that turns learning into action.</p>
            </div>
            <div className={styles.journeyGrid}>
              {stages.map((stage, index) => (
                <article className={styles.journeyCard} key={stage.days}>
                  <span className={styles.dayRange}>{stage.days}</span>
                  <span className={styles.stageNumber}>0{index + 1}</span>
                  <h3>{stage.title}</h3><p>{stage.copy}</p>
                  <span className={styles.cardRule} />
                </article>
              ))}
            </div>
            <div className={styles.prepNote}>
              <div className={styles.prepIcon}><BookOpenText size={20} aria-hidden="true" /></div>
              <div><strong>You’ll have a clear starting point.</strong><p>Before the daily challenges begin, students receive preparation material in PDF format so they arrive with context, direction, and the tools to begin building with confidence.</p></div>
              <span className={styles.prepTag}>PREP BEFORE DAY 01</span>
            </div>
          </div>
        </section>

        <section className={styles.tracksSection} id="tracks">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.sectionEyebrow}>CHOOSE A DIRECTION</p><h2>Build skills that fit your future.</h2></div>
              <p>Choose from the available courses and tracks that match your interest, from AI to product thinking and full-stack work. The goal is the same: learn by making something real and useful.</p>
            </div>
            <div className={styles.trackGrid}>
              {tracks.map((track, index) => (
                <article className={styles.trackCard} key={track.name}>
                  <span className={styles.trackIndex}>0{index + 1}</span>
                  <div className={styles.trackIcon}><track.icon size={21} strokeWidth={1.8} aria-hidden="true" /></div>
                  <h3>{track.name}</h3><p>{track.description}</p>
                  <ArrowUpRight className={styles.trackArrow} size={17} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.outcomesSection} id="outcomes">
          <div className={styles.sectionInner}>
            <div className={styles.outcomesHeading}><p className={styles.sectionEyebrow}>LEAVE WITH SOMETHING TO SHOW</p><h2>Progress you can point to.</h2><p>Make your effort visible, your learning easier to explain, and your next step clearer.</p></div>
            <div className={styles.outcomeGrid}>
              <article className={styles.outcomeCard}>
                <div className={styles.outcomeIcon}><BriefcaseBusiness size={21} aria-hidden="true" /></div>
                <p className={styles.outcomeKicker}>YOUR WORK, COLLECTED</p><h3>A portfolio built from doing.</h3>
                <p>Keep the artifacts, decisions, experiments, and notes from your journey together. Your work becomes a starting portfolio you can share and build on.</p>
                <div className={styles.portfolioPreview}><span className={styles.previewDot} /><span>micro-build / study-planner</span><span className={styles.previewType}>PROJECT</span><span className={styles.previewDot} /><span>evidence / prototype-v1</span><span className={styles.previewType}>BUILD</span><span className={styles.previewDot} /><span>notes / what-i-learned</span><span className={styles.previewType}>REFLECTION</span></div>
              </article>
              <article className={`${styles.outcomeCard} ${styles.reportCard}`}>
                <div className={styles.outcomeIcon}><ListChecks size={21} aria-hidden="true" /></div>
                <p className={styles.outcomeKicker}>YOUR GROWTH, REFLECTED</p><h3>A final capability report.</h3>
                <p>See a summary of your completion, submitted evidence, and achievement across the program. Use it to reflect on what you can do and where to go next.</p>
                <div className={styles.reportPreview}><span className={styles.reportSeal}><Check size={21} aria-hidden="true" /></span><div><strong>20-day capability report</strong><span>Progress · Evidence · Achievement</span></div><ArrowUpRight size={17} aria-hidden="true" /></div>
              </article>
            </div>
            <div className={styles.opportunityNote}><BriefcaseBusiness size={20} aria-hidden="true" /><p><strong>Where could it lead?</strong> Students can showcase their best work to companies and teams for possible internship opportunities. This is a chance to be noticed, but it is not guaranteed and depends on performance, readiness, and company fit.</p></div>
          </div>
        </section>

        <section className={styles.simpleSection}>
          <div className={styles.sectionInner}>
            <div className={styles.simpleHeading}><p className={styles.sectionEyebrow}>NO MYSTERY. JUST MAKE PROGRESS.</p><h2>Here’s how it works.</h2></div>
            <div className={styles.simpleSteps}>
              <article><span>01</span><h3>Choose your track</h3><p>Start with the area you want to explore and build in.</p></article>
              <article><span>02</span><h3>Get ready</h3><p>Read your preparation PDF and understand the challenge ahead.</p></article>
              <article><span>03</span><h3>Take on daily builds</h3><p>Try the challenge, solve problems, and document your work.</p></article>
              <article><span>04</span><h3>Show your progress</h3><p>Submit evidence, track your journey, and review your report.</p></article>
            </div>
            <div className={styles.opportunityNote} style={{ marginTop: "24px" }}>
              <Lightbulb size={20} aria-hidden="true" />
              <p><strong>Student-first message:</strong> You are not just participating in a course—you are building confidence, practical experience, and a portfolio of work that reflects what you can do.</p>
            </div>
          </div>
        </section>

        <section className={styles.simpleSection}>
          <div className={styles.sectionInner}>
            <div className={styles.simpleHeading}><p className={styles.sectionEyebrow}>ABOUT BRAIN TRAIN CONSULTANCY</p><h2>Built for learning that leads to action.</h2></div>
            <div className={styles.opportunityNote}>
              <BriefcaseBusiness size={20} aria-hidden="true" />
              <p>Brain Train Consultancy helps students and professionals turn learning into practical capability. Explore more about the organization at <a href="https://www.braintrainllp.in/" target="_blank" rel="noreferrer">https://www.braintrainllp.in/</a>.</p>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaInner}>
            <div><p className={styles.sectionEyebrow}>YOUR NEXT STEP STARTS HERE</p><h2>Ready to turn learning<br />into something real?</h2><p>Registration is limited to the first 50 students.</p></div>
            <Link className={styles.primaryButton} href="/rote2real/register">Register Now <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className={styles.finalCtaMark}>R<span>2</span>R</div>
        </section>
      </main>

      <footer className={styles.footer}><Link className={styles.footerBrand} href="/rote2real">Rote2Real <span>by Brain Train</span></Link><p>Less memorizing. More making.</p><Link href="/rote2real/register">Register Now <ArrowRight size={14} aria-hidden="true" /></Link></footer>
    </div>
  );
}