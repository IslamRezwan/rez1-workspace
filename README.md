# rez1 workspace

An open-source agent workspace in development for local and cloud developer workflows.

**Status:** project foundation. This repository contains the website, product specification, and contributor documentation. It does not yet contain a coding-agent runtime. Cloud execution is a later milestone.

## What we're building

Connect a local Git repository, describe a task, follow an agent's activity, and review its proposed changes. Begin with one agent integration and one reliable local workflow before adding cloud execution.

## Preview the website

No package installation or build step is required. With Python 3 installed, run from the repository root:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. Alternatively open `dist/index.html` directly. The optional Google Fonts stylesheet needs internet access; system fonts provide a fallback.

## Project structure

```text
dist/                 Deployable static website
  index.html          Homepage
  styles.css          Responsive light and dark themes
  app.js              Theme, interactive concept, contact drafts
docs/
  MVP.md              Scope and acceptance criteria
  ARCHITECTURE.md     Proposed local execution design
  ROADMAP.md          Ordered development milestones
  LAUNCH.md           GitHub, hosting, and domain setup
CONTRIBUTING.md        Contribution workflow
SECURITY.md            Security reporting and design boundaries
LICENSE               MIT license for this foundation
```

## Development priorities

1. Track the implementation in https://github.com/IslamRezwan/rez1-workspace/issues.
2. Implement local repository selection and isolated task worktrees.
3. Integrate one agent with visible tool activity and approval gates.
4. Add diff review, test results, and cancellation.

The first planned integration is Claude through the first-party API. The website uses sample data and makes no model calls. Production website: https://rez1.dev/ · Vercel: https://rez1-workspace.vercel.app/. `vercel.json` deploys `dist` without a build step. See the launch guide for Hobby plan restrictions.

See [the MVP](docs/MVP.md), [architecture](docs/ARCHITECTURE.md), and [launch guide](docs/LAUNCH.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open an issue in the public repository or contact contact@rez1.dev to discuss a contribution.

## License

MIT. The license covers this repository's original source and documentation. Model providers and third-party dependencies retain their own terms. Google Fonts are loaded remotely and are not bundled here.

