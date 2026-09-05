import { useEffect, useRef, useState } from "react";
import { analyzeContent } from "./utils/api";
import "./index.css";
import "./finish.css";

const modes = {
  text: {
    label: "Text",
    title: "TruthLens Text Verification",
    description:
      "Paste a message, article, or claim and understand the signals behind it.",
    accept: "",
    limits: "Paste up to 10,000 characters",
    action: "Analyze Text",
  },
  image: {
    label: "Image",
    title: "TruthLens Image Verification",
    description:
      "Review an image for manipulation signals, metadata anomalies, and extracted text.",
    accept: "image/png,image/jpeg,image/webp",
    limits: "JPG, PNG, or WEBP up to 15 MB",
    action: "Analyze Image",
  },
  video: {
    label: "Video",
    title: "TruthLens Video Verification",
    description:
      "Inspect sampled frames for suspicious visual and temporal signals.",
    accept: "video/mp4,video/quicktime,video/webm,video/x-msvideo",
    limits: "MP4, MOV, WEBM, or AVI up to 50 MB",
    action: "Analyze Video",
  },
  audio: {
    label: "Audio",
    title: "TruthLens Audio Verification",
    description:
      "Review a voice recording for synthetic speech and manipulation indicators.",
    accept: "audio/mpeg,audio/wav,audio/x-m4a,audio/ogg",
    limits: "MP3, WAV, M4A, or OGG up to 20 MB",
    action: "Analyze Audio",
  },
};
const faqs = [
  [
    "What is TruthLens AI?",
    "TruthLens provides an automated assessment of text, images, video, and audio based on signals returned by its analysis pipeline.",
  ],
  [
    "Can TruthLens guarantee authenticity?",
    "No. Results are an automated assessment, not a guarantee. Use the explanation and evidence as one input in your decision.",
  ],
  [
    "What happens to uploaded files?",
    "Files are sent to the configured analysis backend for processing. Storage and retention follow the backend deployment configuration.",
  ],
  [
    "How does the Trust Score work?",
    "The score is calculated by the backend from the findings detected for the submitted content. It is not a fabricated accuracy percentage.",
  ],
];

const pageForPath = (pathname) => {
  const modality = pathname.match(
    /^\/verify\/(text|image|video|audio)\/?$/,
  )?.[1];
  if (modality) return { page: "verify", modality };
  if (pathname === "/about") return { page: "about" };
  if (pathname === "/pricing") return { page: "pricing" };
  if (pathname === "/faq") return { page: "faq" };
  return { page: "home" };
};

function Brand() {
  return (
    <a className="brand" href="/">
      <span className="brand-mark">◎</span>
      <span>
        TruthLens <b>AI</b>
      </span>
    </a>
  );
}

function Header({ route, navigate }) {
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const go = (path) => {
    setMenu(false);
    setMobile(false);
    navigate(path);
  };
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => go("/")}>Home</button>
          <div className="verify-menu" ref={ref}>
            <button
              className={route.page === "verify" ? "nav-active" : ""}
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
            >
              Verify <span>⌄</span>
            </button>
            {menu && (
              <div className="verify-dropdown">
                {Object.entries(modes).map(([key, mode]) => (
                  <button key={key} onClick={() => go(`/verify/${key}`)}>
                    <i>◎</i>
                    <span>
                      <strong>{mode.label} Verification</strong>
                      <small>{mode.description}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              go("/");
              setTimeout(
                () =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" }),
                40,
              );
            }}
          >
            How It Works
          </button>
          <button onClick={() => go("/about")}>About</button>
          <button onClick={() => go("/pricing")}>Pricing</button>
          <button onClick={() => go("/faq")}>FAQ</button>
        </nav>
        <div className="nav-actions">
          <button
            className="sign-in"
            onClick={() =>
              document
                .getElementById("verify")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Sign In
          </button>
          <button
            className="button primary nav-cta"
            onClick={() => go("/verify/image")}
          >
            Start Verifying <span>→</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="mobile-nav container">
          {[
            "/",
            "/verify/text",
            "/verify/image",
            "/verify/video",
            "/verify/audio",
            "/about",
            "/pricing",
            "/faq",
          ].map((path) => (
            <button key={path} onClick={() => go(path)}>
              {path === "/"
                ? "Home"
                : path.startsWith("/verify")
                  ? `${modes[path.split("/").pop()].label} Verification`
                  : path
                      .slice(1)
                      .replace(/^./, (letter) => letter.toUpperCase())}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>See through the lies.</p>
          <small>Automated assessment for a clearer digital world.</small>
        </div>
        <div>
          <h3>Product</h3>
          {Object.entries(modes).map(([key, mode]) => (
            <button key={key} onClick={() => navigate(`/verify/${key}`)}>
              {mode.label} Verification
            </button>
          ))}
        </div>
        <div>
          <h3>Explore</h3>
          <button onClick={() => navigate("/")}>How It Works</button>
          <button onClick={() => navigate("/about")}>About TruthLens</button>
          <button onClick={() => navigate("/faq")}>FAQ</button>
        </div>
        <div>
          <h3>Legal</h3>
          <button>Privacy</button>
          <button>Terms</button>
          <small>Results are assessments, not guarantees.</small>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 TruthLens AI</span>
        <span>Built for more informed decisions.</span>
      </div>
    </footer>
  );
}

function FAQ() {
  const [active, setActive] = useState(null);
  return (
    <section className="faq container" id="faq">
      <div className="heading center">
        <span className="eyebrow">Questions, answered</span>
        <h2>What to know before you verify.</h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <div className="faq-item" key={question}>
            <button
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
            >
              <span>{question}</span>
              <b>{active === index ? "−" : "+"}</b>
            </button>
            {active === index && <p>{answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Visual({ modality }) {
  if (modality === "audio")
    return (
      <div className="audio-art">
        {Array.from({ length: 11 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    );
  if (modality === "text")
    return (
      <div className="text-art">
        <strong>
          CLAIM
          <br />
          <em>OR</em>
          <br />
          CONTEXT?
        </strong>
        <span />
      </div>
    );
  return (
    <div className="media-art">
      <img
        src={
          modality === "video"
            ? "/images/video-call.png"
            : "/images/hero-home.png"
        }
        alt="Illustrative verification scenario"
      />
      <div>
        <b>◎ {modality === "video" ? "Look between frames" : "Look closer"}</b>
        <small>Illustrative example</small>
      </div>
    </div>
  );
}

function Uploader({ mode, file, setFile, setError }) {
  const input = useRef(null);
  const limits = { image: 15, video: 50, audio: 20 };
  const [preview, setPreview] = useState("");
  const choose = (candidate) => {
    if (!candidate) return;
    if (!candidate.size) {
      setError("That file is empty. Choose another file.");
      return;
    }
    if (limits[mode] && candidate.size > limits[mode] * 1024 * 1024) {
      setError(`This file is larger than the ${limits[mode]} MB limit.`);
      return;
    }
    if (
      modes[mode].accept &&
      candidate.type &&
      !modes[mode].accept.split(",").some((type) => candidate.type === type)
    ) {
      setError(`Choose a supported ${mode} file.`);
      return;
    }
    setFile(candidate);
    setError("");
  };
  useEffect(() => {
    if (!file || mode === "text") {
      setPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, mode]);
  return (
    <div
      className={`uploader ${file ? "selected" : ""}`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        choose(event.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={input}
        hidden
        type="file"
        accept={modes[mode].accept}
        onChange={(event) => choose(event.target.files?.[0])}
      />
      {file && preview && mode === "image" && (
        <img
          className="file-preview"
          src={preview}
          alt="Selected upload preview"
        />
      )}
      {file && preview && mode === "video" && (
        <video className="file-preview" src={preview} controls muted />
      )}
      {file && preview && mode === "audio" && (
        <audio className="audio-preview" src={preview} controls />
      )}
      {!file && (
        <button type="button" onClick={() => input.current?.click()}>
          <span className="upload-mark">◎</span>
          <strong>Drop your {mode} here</strong>
          <span>or click to browse your device</span>
        </button>
      )}
      {file && (
        <div className="file-ready">
          <strong>{file.name}</strong>
          <span>{(file.size / 1024 / 1024).toFixed(1)} MB ready to scan</span>
        </div>
      )}
      <small>{modes[mode].limits}</small>
      {file && (
        <button type="button" className="remove" onClick={() => setFile(null)}>
          Remove
        </button>
      )}
    </div>
  );
}

function Score({ value }) {
  const score = Math.round(value || 0);
  return (
    <div className="score" style={{ "--angle": `${score * 3.6}deg` }}>
      <div>
        <strong>{score}</strong>
        <span>Trust Score</span>
      </div>
    </div>
  );
}
function Result({ result, reset }) {
  const extracted = result.extracted_text ? (
    <div>
      <strong>Extracted text</strong>
      <p>{result.extracted_text}</p>
    </div>
  ) : null;
  const claims =
    result.claims_verified !== null && result.claims_verified !== undefined ? (
      <div>
        <strong>Claim review</strong>
        <p>
          {result.claims_verified} claims supported,{" "}
          {result.claims_flagged || 0} flagged.
        </p>
      </div>
    ) : null;
  const frames =
    result.total_frames !== null && result.total_frames !== undefined ? (
      <div>
        <strong>Frame sampling</strong>
        <p>
          {result.total_frames} frames reviewed, {result.deepfake_frames || 0}{" "}
          flagged for closer inspection.
        </p>
      </div>
    ) : null;
  return (
    <section className="result" id="verification-result">
      <div className="result-top">
        <div>
          <span className="eyebrow">Analysis complete</span>
          <h2>
            {result.is_authentic
              ? "Likely authentic"
              : "Suspicious indicators found"}
          </h2>
          <p>{result.summary}</p>
        </div>
        <Score value={result.trust_score} />
      </div>
      <div className="result-meta">
        <span className={`risk ${result.risk_level}`}>
          {result.risk_level} risk
        </span>
        <span>{result.content_type} assessment</span>
        <span>{Math.round(result.processing_time_ms)} ms processing</span>
      </div>
      <div className="result-grid">
        <div>
          <span className="eyebrow">Why this result?</span>
          <h3>{result.explanation}</h3>
          <p className="muted">
            TruthLens reports signals from its automated analysis pipeline.
            Review them alongside the original context before making a decision.
          </p>
        </div>
        <div>
          <span className="eyebrow">Findings</span>
          {(result.details || []).map((detail, index) => (
            <article className="finding" key={`${detail.category}-${index}`}>
              <i>◎</i>
              <div>
                <strong>{detail.category}</strong>
                <span className={`severity ${detail.severity}`}>
                  {detail.severity}
                </span>
                <p>{detail.finding}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {(extracted || claims || frames) && (
        <div className="result-details">
          <span className="eyebrow">Extracted information</span>
          {extracted}
          {claims}
          {frames}
        </div>
      )}
      <button className="button secondary" onClick={reset}>
        Verify another item <span>→</span>
      </button>
    </section>
  );
}

function Verifier({ modality, navigate }) {
  const mode = modes[modality];
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const ready = modality === "text" ? text.trim() : file;
  useEffect(() => {
    setFile(null);
    setText("");
    setResult(null);
    setError("");
    setStatus("idle");
  }, [modality]);
  const submit = async (event) => {
    event.preventDefault();
    if (!ready || status === "analyzing") return;
    setStatus("analyzing");
    setError("");
    try {
      setResult(
        await analyzeContent(
          modality === "text" ? text.trim() : file,
          modality,
        ),
      );
      setStatus("success");
      setTimeout(
        () =>
          document
            .getElementById("verification-result")
            ?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    } catch (requestError) {
      setStatus("error");
      setError(requestError.message || "The analysis service is unavailable.");
    }
  };
  const reset = () => {
    setFile(null);
    setText("");
    setResult(null);
    setError("");
    setStatus("idle");
    document
      .getElementById("verify-workspace")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="page-enter">
      <section className="verifier-header container">
        <span className="eyebrow">Multimodal content verification</span>
        <h1>{mode.title}</h1>
        <p>{mode.description}</p>
        <div className="tabs" role="tablist">
          {Object.entries(modes).map(([key, value]) => (
            <button
              key={key}
              className={key === modality ? "active" : ""}
              aria-selected={key === modality}
              onClick={() => navigate(`/verify/${key}`)}
            >
              {value.label}
            </button>
          ))}
        </div>
      </section>
      <section className="workspace container" id="verify-workspace">
        <form className="verify-layout" onSubmit={submit}>
          <div className="verify-panel">
            {modality === "text" ? (
              <div className="text-input">
                <textarea
                  maxLength="10000"
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    setError("");
                  }}
                  placeholder="Paste a message, article, or claim to understand its signals..."
                  aria-label="Text to verify"
                />
                <div>
                  <span>{text.length.toLocaleString()} characters</span>
                  <span>
                    {text.trim() ? text.trim().split(/\s+/).length : 0} words
                  </span>
                </div>
              </div>
            ) : (
              <Uploader
                mode={modality}
                file={file}
                setFile={setFile}
                setError={setError}
              />
            )}
            <div className="review">
              <span className="avatars">
                <img src="/images/public-information.png" alt="" />
                <img src="/images/workshop.png" alt="" />
                <img src="/images/hero-home.png" alt="" />
              </span>
              <span>Designed for clear, explainable verification</span>
            </div>
            <button
              className="button primary analyze"
              disabled={!ready || status === "analyzing"}
            >
              {status === "analyzing" ? (
                <>
                  <span className="spinner" />
                  Analyzing your content...
                </>
              ) : (
                <>
                  {mode.action} <span>→</span>
                </>
              )}
            </button>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
          </div>
          <Visual modality={modality} />
        </form>
        {result && <Result result={result} reset={reset} />}
      </section>
      <section className="signal-band">
        <div className="container">
          <span className="eyebrow">The TruthLens approach</span>
          <h2>Signals, not sensationalism.</h2>
          <p>
            Every result brings together an assessment, risk level, explanation,
            and the findings returned by the actual analyzer.
          </p>
        </div>
      </section>
      <FAQ />
    </div>
  );
}

const examples = [
  [
    "/images/sample_news.jpg",
    "News and public video",
    "Review context before sharing a public clip.",
  ],
  [
    "/images/sample_finance.jpg",
    "Document and presentation",
    "Inspect content that asks you to act.",
  ],
  [
    "/images/sample_videocall.jpg",
    "Video call and voice",
    "Pause when a familiar face feels unfamiliar.",
  ],
];
function ExampleCarousel() {
  const [active, setActive] = useState(0);
  const visible = [0, 1, 2].map(
    (offset) => examples[(active + offset) % examples.length],
  );
  return (
    <section className="examples container">
      <div className="example-heading">
        <div>
          <span className="eyebrow">Example scenarios</span>
          <h2>Built for the moments you pause.</h2>
        </div>
        <div className="carousel-buttons">
          <button
            onClick={() =>
              setActive((active + examples.length - 1) % examples.length)
            }
            aria-label="Previous example"
          >
            ←
          </button>
          <button
            onClick={() => setActive((active + 1) % examples.length)}
            aria-label="Next example"
          >
            →
          </button>
        </div>
      </div>
      <div className="example-grid">
        {visible.map(([image, title, description], index) => (
          <article key={`${image}-${index}`}>
            <div className="example-image">
              <img src={image} alt="" />
              <span>Example</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="example-dots">
        {examples.map((_, index) => (
          <i key={index} className={index === active ? "active" : ""} />
        ))}
      </div>
    </section>
  );
}

function Home({ navigate }) {
  return (
    <div className="page-enter">
      <section className="hero container">
        <div>
          <span className="eyebrow">
            <i className="focus-dot" /> Multimodal content verification
          </span>
          <h1>
            See through
            <br />
            <em>the lies.</em>
          </h1>
          <p>
            Verify text, images, videos, and audio with one calm, explainable
            workflow. Understand the signals before you trust or share.
          </p>
          <div className="hero-actions">
            <button
              className="button primary"
              onClick={() => navigate("/verify/image")}
            >
              Start Verification <span>→</span>
            </button>
            <small>
              Automated assessment
              <br />
              with human-readable context
            </small>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/hero-home.png"
            alt="Person reviewing digital content"
          />
          <span className="tag left">
            <b>Suspicious?</b>Look closer
          </span>
          <span className="tag right">
            <b>Authentic?</b>Understand why
          </span>
          <div className="focus-frame" />
        </div>
      </section>
      <section className="capabilities container" id="verify">
        <div className="heading">
          <span className="eyebrow">Four ways to verify</span>
          <h2>One lens for a noisy digital world.</h2>
        </div>
        <div className="capability-grid">
          {Object.entries(modes).map(([key, mode]) => (
            <button
              className="capability"
              key={key}
              onClick={() => navigate(`/verify/${key}`)}
            >
              <span className="capability-icon">◎</span>
              <span>
                <h3>{mode.label} Verification</h3>
                <p>{mode.description}</p>
              </span>
              <b>→</b>
            </button>
          ))}
        </div>
      </section>
      <section className="editorial container">
        <div className="editorial-image">
          <img
            src="/images/public-information.png"
            alt="Person reviewing information on a phone"
          />
          <b>Pause before you pass it on.</b>
        </div>
        <div>
          <span className="eyebrow">A clearer second opinion</span>
          <h2>When content looks convincing, context matters.</h2>
          <p>
            TruthLens turns technical findings into a result you can actually
            read. Slow down, inspect the details, and decide what to do next.
          </p>
          <button
            className="text-link"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See how it works <span>→</span>
          </button>
        </div>
      </section>
      <section className="how container" id="how-it-works">
        <div>
          <span className="eyebrow">How TruthLens works</span>
          <h2>Verify in a few simple steps.</h2>
          {[
            [
              "01",
              "Upload your content",
              "Choose an image, video, voice recording, or paste text.",
            ],
            [
              "02",
              "Run the analysis",
              "The matching backend analyzer checks the content for signals.",
            ],
            [
              "03",
              "Review the result",
              "See the score, risk level, explanation, and evidence.",
            ],
          ].map(([number, title, body]) => (
            <div className="step" key={number}>
              <b>{number}</b>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="how-visual">
          <div className="orbit">◎</div>
          <b>Result found</b>
          <small>Make a more informed decision.</small>
        </div>
      </section>
      <section className="quote container">
        <span className="eyebrow">Built for clarity</span>
        <blockquote>
          “The most useful result is not just a label. It is knowing what made
          the system pause.”
        </blockquote>
        <p>TruthLens AI · Explainable content verification</p>
      </section>
      <FAQ />
      <section className="final container">
        <span className="eyebrow">Start with what you have</span>
        <h2>Ready to verify something?</h2>
        <p>Check your text, image, video, or audio with TruthLens AI.</p>
        <button
          className="button primary"
          onClick={() => navigate("/verify/image")}
        >
          Start Verification <span>→</span>
        </button>
      </section>
    </div>
  );
}

function SimplePage({ page, navigate }) {
  if (page === "faq")
    return (
      <div className="simple container">
        <span className="eyebrow">TruthLens AI</span>
        <h1>
          Frequently asked
          <br />
          <em>questions.</em>
        </h1>
        <FAQ />
      </div>
    );
  if (page === "pricing")
    return (
      <div className="simple container">
        <span className="eyebrow">TruthLens AI</span>
        <h1>
          Simple access to
          <br />
          <em>clearer decisions.</em>
        </h1>
        <p className="lede">
          TruthLens is currently presented as a working verification experience.
          Pricing and account plans are not enabled in this deployment.
        </p>
        <button
          className="button primary"
          onClick={() => navigate("/verify/image")}
        >
          Try a verification <span>→</span>
        </button>
      </div>
    );
  return (
    <div className="simple container">
      <span className="eyebrow">About TruthLens AI</span>
      <h1>
        Make digital content
        <br />
        <em>easier to understand.</em>
      </h1>
      <p className="lede">
        Synthetic media is becoming easier to create while verification is
        becoming harder. TruthLens brings multiple analysis methods into one
        understandable workflow.
      </p>
      <div className="about-quote">
        How can we make uncertain content easier to inspect, question, and
        understand?
      </div>
      <img
        className="about-image"
        src="/images/workshop.png"
        alt="People discussing digital information"
      />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() =>
    pageForPath(window.location.pathname),
  );
  const navigate = (path) => {
    const url = new URL(path, window.location.origin);
    window.history.pushState({}, "", `${url.pathname}${url.hash}`);
    setRoute(pageForPath(url.pathname));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const pop = () => setRoute(pageForPath(window.location.pathname));
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    document.title =
      route.page === "verify"
        ? `TruthLens AI — ${modes[route.modality].label} Verification`
        : route.page === "home"
          ? "TruthLens AI — Multimodal Content Verification"
          : `TruthLens AI — ${route.page[0].toUpperCase()}${route.page.slice(1)}`;
  }, [route]);
  return (
    <div className="site-shell">
      <Header route={route} navigate={navigate} />
      <main>
        {route.page === "home" && (
          <>
            <Home navigate={navigate} />
            <ExampleCarousel />
          </>
        )}
        {route.page === "verify" && (
          <Verifier modality={route.modality} navigate={navigate} />
        )}
        {route.page !== "home" && route.page !== "verify" && (
          <SimplePage page={route.page} navigate={navigate} />
        )}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
