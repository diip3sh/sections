import Link from "next/link";
import TextSphere from "./components/originkit/text-sphere";

const NAV_ITEMS = ["Home", "Pricing", "About", "Tools"];

export default function HomePage() {
  return (
    <main className="hero-shell">
      <header className="top-nav">
        <Link className="logo" href="#" aria-label="Origin home">
          <img
            src="/section-40/logo-wordglobe.svg"
            alt=""
            width="40"
            height="28"
          />
        </Link>
        <nav aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </Link>
          ))}
        </nav>
        <Link className="button button-dark nav-cta" href="#get-started">
          Get started
        </Link>
      </header>

      <div className="content-rails" aria-hidden="true" />
      <div className="wave-pattern" aria-hidden="true" />

      <div className="globe-stage">
        <TextSphere
          word="###"
          color="#d77d84"
          font={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 500,
            fontSize: 15,
          }}
          speed={7}
          rotationSide="counterclockwise"
          twist={50}
          letterSpacing={240}
        />
        /
      </div>

      <section className="hero-content">
        <div className="headline-block">
          <h1>
            Building the Economy
            <br />
            of Tomorrow
          </h1>
          <div className="actions" id="get-started">
            <Link className="button button-dark" href="#">
              Get started
            </Link>
            <Link className="button button-light" href="#">
              Book a call
            </Link>
          </div>
        </div>

        <div className="details-block">
          <p>
            Empowering governments, &amp; enterprises, with the insights,
            frameworks, and technology needed to build resilient economies.
          </p>
          <div className="stats">
            <div>
              <strong>150+</strong>
              <span>Countries engaged</span>
            </div>
            <div>
              <strong>$4.8T</strong>
              <span>Investment tracked</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
