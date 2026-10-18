import type { Project } from "@/types/api";

// BELT and Sharpfish narratives are carried over verbatim from the original
// PHP project pages; the ssi-agent entries are written from the PR history.
// Line breaks inside a narrative are preserved when rendered.
export const PROJECTS: Project[] = [
  {
    slug: "ssi-agent-authorization",
    title: "Agent Authorization",
    summary:
      "A transport-independent authorization layer for Impierce's open-source SSI agent, enforced on every command and query.",
    image: null,
    githubUrl: "https://github.com/impierce/ssi-agent/pull/380",
    liveUrl: null,
    year: 2026,
    status: "shipped",
    tags: ["Rust", "SSI", "Authorization"],
    order: 1,
    narrative: {
      what: "An authorization hook in the shared kernel of ssi-agent, an eIDAS 2.0 self-sovereign identity agent written in Rust. Every command and query the application dispatches now carries an explicit caller (anonymous, an authenticated actor, or internal) and is checked before it reaches the domain. The open-source build ships with an allow-all checker, so behaviour is unchanged until a downstream product plugs in its own rules.",
      why: "Access checks tied to one API transport only protect that transport. Putting authorization below the inbound adapters means HTTP, GraphQL, gRPC and queue consumers all go through the same gate. Keeping the contract product-neutral lets downstream applications make resource- and relationship-based decisions without pushing their policy concepts into the open-source crate.",
      how: `It started as an HTTP middleware, which I closed in favour of moving the check into the shared kernel. Then I tightened the contract:
> Neutral primitives: actors, authorization requests, operations and a pluggable checker
> Callers are explicit at every dispatch, instead of an optional actor
> Requests carry stable operation names plus aggregate and resource identity
> The checker is required when a service is built, and its configuration is validated before the service starts, so missing wiring fails at startup instead of in production
> Denied requests stop before any domain handler runs`,
    },
  },
  {
    slug: "ssi-agent-credential-reissuance",
    title: "Credential Reissuance",
    summary:
      "Manual and automatic reissuance of verifiable credentials in Impierce's open-source SSI agent, linked back to the original.",
    image: null,
    githubUrl: "https://github.com/impierce/ssi-agent/pull/363",
    liveUrl: null,
    year: 2026,
    status: "in-progress",
    tags: ["Rust", "SSI", "OID4VCI"],
    order: 2,
    narrative: {
      what: "Credential reissuance for ssi-agent. An issuer can take an existing SD-JWT credential and prepare a replacement: a new unsigned credential and credential offer, recorded with a relation back to the original. Manual reissuance is merged; automatic refresh, where a holder presents a refresh token to get a new offer, is in review.",
      why: "Credentials go out of date: they expire, or the data behind them changes. Reissuing should produce a proper replacement the holder can redeem, with a traceable link to what it replaces, rather than a one-off issuance that has no history.",
      how: `Built in Rust on the agent's event-sourced domain model:
> Reissuance relation records with their own commands, events and views, including duplicate protection
> A reissuance service with a policy hook, validated against the published credential template and its expiry rules
> HTTP endpoints to create, list and fetch reissuances, with regenerated OpenAPI docs
> Replacements are issued through the standard OID4VCI credential endpoint, and the original's status is left untouched
> Automatic refresh adds a credential-refresh endpoint that turns a refresh token into a credential offer, behind a preparation hook`,
    },
  },
  {
    slug: "belt",
    title: "BELT",
    summary:
      "A cross-platform benchmarking and testing suite for measuring and comparing Factorio UPS performance.",
    image: "/projects/belt.png",
    githubUrl: "https://github.com/florishafkenscheid/belt",
    liveUrl: null,
    year: 2025,
    status: "archived",
    tags: ["Rust", "CLI", "Factorio"],
    order: 3,
    narrative: {
      what: "A benchmarking and testing suite for Factorio that helps measure UPS performance, batch-test save files, stamp blueprints into base saves, and analyze results through reports and generated charts. The goal is to make repeated performance testing and comparison easier, faster, and more reproducible.",
      why: "I wanted a more universal and reusable way to benchmark Factorio saves than the ad-hoc scripts I had seen before. Building BELT let me create a proper tool that works across platforms, is easy to automate, and is useful both for my own testing workflow and for other players who want clearer performance data.",
      how: "Built in Rust as a cross-platform CLI, BELT automates Factorio performance testing through a set of focused commands for benchmarking, blueprint stamping, chart generation, and sanitizer output parsing. It supports parallel execution, pattern-based save selection, CSV and Markdown report generation, SVG chart output, and optional verbose metrics so benchmark data can be inspected in much more detail.",
    },
  },
  {
    slug: "sharpfish",
    title: "Sharpfish",
    summary:
      "A .NET wrapper library for talking to UCI chess engines such as Stockfish.",
    image: "/projects/sharpfish.png",
    githubUrl: "https://github.com/florishafkenscheid/Sharpfish",
    liveUrl: null,
    year: 2023,
    status: "shipped",
    tags: ["C#", "Chess", "UCI"],
    order: 4,
    narrative: {
      what: "A .NET wrapper library for interacting with UCI chess engines such as Stockfish. Instead of manually handling low-level stdin and stdout communication every time, the library provides a cleaner interface for common engine tasks inside C# applications.",
      why: "I made Sharpfish to simplify engine integration in .NET projects. UCI engines are powerful, but the communication layer is repetitive and awkward to rebuild for every project. Wrapping that protocol in a small library makes experimentation and reuse much easier.",
      how: "Built in C# as a wrapper around a UCI chess engine process, Sharpfish focuses on turning raw engine communication into a simpler API. It manages the engine executable, sends commands such as setting a FEN position, and exposes intuitive asynchronous methods for reading the engine response and retrieving data like the best move.",
    },
  },
];
