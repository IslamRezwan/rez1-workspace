# Launch checklist

## Project identity

- Working name: rez1 workspace
- Intended domain: rez1.dev
- Contact: contact@rez1.dev
- Current status: foundation; no working coding-agent runtime yet
- License: MIT for this foundation

## Public repository

The public repository is https://github.com/IslamRezwan/rez1-workspace.

Publish this project's source and docs. Keep the `dist` directory: it is authored source for this buildless site. Exclude credentials and generated archives. Add the real repository link to the homepage once the repository exists.

## Website hosting

The website consists only of `dist/index.html`, `dist/styles.css`, and `dist/app.js`. There is no build command, backend, or database. It can be deployed as static files; the Sites manifest is in `.openai/hosting.json`.

The Sites deployment is public at https://rez1-workspace.fuzzymochi4.chatgpt.site. Domain verification for rez1.dev is pending.

## Domain connection

Use only the exact DNS targets returned by the hosting provider for this deployment. Do not guess an IP or CNAME from the preview URL. Connect the apex `rez1.dev` using the provider's apex instructions, and add verification records as requested.

Preserve Cloudflare Email Routing's MX records and email-related TXT records so contact@rez1.dev continues receiving mail. Review any existing root A, AAAA, or CNAME records before replacing website routing.

## Before a startup application

- Verify the public site loads without an owner login.
- Verify contact@rez1.dev receives mail.
- Publish the real repository and accurately describe its current stage.
- Describe Claude integration as planned until it exists.
- Review the program's current eligibility and application requirements.

Suggested factual description:

> We are developing an open-source agent workspace for local and cloud developer workflows. Our initial milestone is a local repository-to-diff workflow, with a planned Claude integration for coding tasks and human review before changes are accepted.
