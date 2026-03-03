import { useState, useEffect } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCaHjrezZLcSuKf-MlbyD9kenOb3PFLHfVWt2QxDMwFW0uYbTo_Q2FWXLkxJ2cBvch/exec";

export default function SonderWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch(APPS_SCRIPT_URL)
      .then((r) => r.json())
      .then((data) => { if (data.success) setCount(data.count); })
      .catch(() => setCount(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitted || loading) return;

    setLoading(true);
    setError("");

    const payload = {
      email,
      localTime: new Date().toLocaleString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "Direct",
      userAgent: navigator.userAgent,
      country: "Unknown",
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setCount((c) => (c !== null ? c + 1 : 1));
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .s-hero   { opacity:0; animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) 0.1s forwards; }
        .s-def    { opacity:0; animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) 0.35s forwards; }
        .s-div    { opacity:0; animation: fadeIn 1s ease 0.65s forwards; }
        .s-tag    { opacity:0; animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) 0.8s forwards; }
        .s-sub    { opacity:0; animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) 1s forwards; }
        .s-form   { opacity:0; animation: fadeUp 1.1s cubic-bezier(.22,1,.36,1) 1.2s forwards; }
        .s-footer { opacity:0; animation: fadeIn 2s ease 1.8s forwards; }
        .s-ok     { animation: scaleIn 0.5s cubic-bezier(.22,1,.36,1) forwards; }

        .sonder-root {
          background: #0a0a0a; min-height: 100vh; width: 100%;
          position: relative; overflow: hidden;
        }
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px;
        }
        .vignette {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%);
        }
        .ambient {
          position: fixed; top: 50%; left: 50%; transform: translate(-50%,-62%);
          width: 700px; height: 700px; pointer-events: none; z-index: 0;
          background: radial-gradient(circle, rgba(201,168,108,0.065) 0%, transparent 68%);
        }
        .page {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 5rem 1.5rem 6rem;
        }
        .word {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(5rem, 18vw, 10rem);
          font-weight: 300; color: #c9a86c;
          line-height: 1; letter-spacing: -0.02em; text-align: center;
          text-shadow: 0 0 80px rgba(201,168,108,0.22), 0 0 140px rgba(201,168,108,0.1);
        }
        .definition {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          color: rgba(255,255,255,0.52);
          text-align: center; line-height: 1.65;
          max-width: 360px; letter-spacing: 0.01em; margin-top: 1rem;
        }
        .divider {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a86c, transparent);
          margin: 1.8rem auto 0;
        }
        .tagline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic; font-weight: 400;
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          color: rgba(255,255,255,0.88);
          text-align: center; line-height: 1.6;
          max-width: 500px; margin-top: 3.5rem;
        }
        .sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem; font-weight: 300;
          color: rgba(255,255,255,0.4);
          text-align: center; line-height: 1.8;
          max-width: 380px; letter-spacing: 0.01em; margin-top: 0.9rem;
        }
        .form-outer {
          width: 100%; max-width: 440px;
          display: flex; flex-direction: column; gap: 0.7rem;
          margin-top: 3rem;
        }
        .form-row { display: flex; flex-direction: column; gap: 0.6rem; }
        @media (min-width: 480px) { .form-row { flex-direction: row; } }
        .inp {
          flex: 1; font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.875rem; font-weight: 300; letter-spacing: 0.02em;
          color: #fff; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,108,0.25);
          padding: 0.9rem 1.2rem; border-radius: 8px; outline: none;
          transition: border-color .3s, background .3s, box-shadow .3s;
        }
        .inp::placeholder { color: rgba(255,255,255,0.2); font-style: italic; }
        .inp:focus {
          border-color: rgba(201,168,108,0.55);
          background: rgba(201,168,108,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,108,0.07), 0 0 20px rgba(201,168,108,0.06);
        }
        .inp:disabled { opacity: 0.22; }
        .btn {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.73rem; font-weight: 500; letter-spacing: 0.09em;
          text-transform: uppercase; cursor: pointer;
          padding: 0.9rem 1.6rem; border-radius: 8px; border: none;
          white-space: nowrap; transition: all .25s ease;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }
        .btn-amber { background: #c9a86c; color: #0a0a0a; }
        .btn-amber:hover:not(:disabled) {
          background: #dabb80; transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(201,168,108,0.3);
        }
        .btn-amber:active:not(:disabled) { transform: translateY(0); }
        .btn-amber:disabled { opacity: 0.7; cursor: default; }
        .btn-green {
          background: transparent; color: #6ee7b7;
          border: 1px solid rgba(110,231,183,0.28); cursor: default;
        }
        .spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(10,10,10,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .meta {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.67rem; font-weight: 300;
          color: rgba(255,255,255,0.3); letter-spacing: 0.025em; text-align: center;
        }
        .meta-a { color: rgba(201,168,108,0.6); }
        .ok-msg {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic; font-size: 0.97rem;
          color: rgba(110,231,183,0.68); text-align: center;
        }
        .err-msg {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.7rem; font-weight: 300;
          color: rgba(255,100,100,0.7); text-align: center; letter-spacing: 0.02em;
        }
        .footer {
          position: fixed; bottom: 1.75rem; left: 0; right: 0;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.62rem; font-weight: 300; letter-spacing: 0.07em;
          color: rgba(255,255,255,0.14); text-align: center;
        }
      `}</style>

      <div className="sonder-root">
        <div className="grain" />
        <div className="vignette" />
        <div className="ambient" />

        <main className="page">
          <div className="s-hero"><h1 className="word">Sonder</h1></div>

          <div className="s-def">
            <p className="definition">
              n. the realisation that each passerby has a life as vivid and complex as your own.
            </p>
          </div>

          <div className="s-div"><div className="divider" /></div>

          <div className="s-tag">
            <p className="tagline">
              Your life is the most important story you'll ever tell.<br />
              Sonder helps you read it.
            </p>
          </div>

          <div className="s-sub">
            <p className="sub">
              An AI that journals with you — surfacing patterns, reflections and insights from your own words.
            </p>
          </div>

          <div className="s-form form-outer">
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'0.7rem',width:'100%'}}>
                <div className="form-row">
                  <input
                    className="inp"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <button className="btn btn-amber" type="submit" disabled={loading}>
                    {loading ? <><div className="spinner" />Joining…</> : "Join the Waitlist"}
                  </button>
                </div>
                {error && <p className="err-msg">{error}</p>}
                <p className="meta">
                  {count !== null && <>Join <span className="meta-a">{count.toLocaleString()}</span> people already on the waitlist.&nbsp;&nbsp;</>}No spam. Ever.
                </p>
              </form>
            ) : (
              <div className="s-ok" style={{display:'flex',flexDirection:'column',gap:'0.8rem',width:'100%',alignItems:'center'}}>
                <div className="form-row" style={{width:'100%'}}>
                  <input className="inp" type="email" disabled placeholder="" />
                  <button className="btn btn-green" disabled>You're on the list ✓</button>
                </div>
                <p className="ok-msg">We'll be in touch when Sonder launches. Tell one person.</p>
                <p className="meta">
                  {count !== null && <>Join <span className="meta-a">{count.toLocaleString()}</span> people already on the waitlist.</>}
                </p>
              </div>
            )}
          </div>
        </main>

        <p className="footer s-footer">© 2026 Sonder AI · getsonder.ai</p>
      </div>
    </>
  );
}