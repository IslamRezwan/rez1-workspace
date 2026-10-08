# Hosting and domain setup

The website is a buildless static site in `dist/`, hosted on Vercel and maintained in the public GitHub repository.

- Production website: https://rez1.dev/
- Vercel address: https://rez1-workspace.vercel.app/
- Source: https://github.com/IslamRezwan/rez1-workspace
- Contact: contact@rez1.dev

## Deployments

The Vercel GitHub app is restricted to `IslamRezwan/rez1-workspace`. Changes to `main` trigger production deployments; branches can produce previews. `vercel.json` sets the output directory to `dist` with no build step. No model keys or runtime environment variables are required for this marketing site.

## DNS

Cloudflare manages DNS. Follow the current targets displayed in Vercel's project domain settings rather than hardcoding legacy IP addresses. At migration, apex and www use DNS-only CNAME records to the project-specific Vercel target. Cloudflare flattens the apex CNAME.

Keep the Cloudflare email-routing MX, SPF, and DKIM records. Changing website DNS must not remove email records. The previous Sites-hosted URL remains available separately, but production domain DNS is moved to Vercel.

## Contact form behavior

The website opens a Gmail, Outlook, or mailto draft for the visitor to review and send. It does not store messages or claim a message has been delivered. Email forwarding handles inbound contact mail; sending replies requires an outgoing mail service configured by the maintainer.

## Plan restrictions

Vercel Hobby is for personal, non-commercial use. Review https://vercel.com/docs/plans/hobby and https://vercel.com/docs/limits/fair-use-guidelines before turning this personal open-source foundation into a commercial startup site. No paid upgrade is required by the static source itself; hosting eligibility depends on its use.

## Local preview

Run `python -m http.server 4173 --directory dist` from the repository root and open http://localhost:4173. JavaScript and CSS work without a package installation. Google Fonts has a system fallback.
