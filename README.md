# khromey.com website

Public website for Nataliya Khromey — EMDR Consultant & Supervisor (khromey.com).

- Plain HTML, CSS and JavaScript. No build step, no framework.
- Shared files: `assets/styles.css`, `assets/main.js`, self-hosted Poppins fonts in `assets/fonts`, logo in `assets/img`.
- Pages: `index.html`, `supervision.html`, `organisations.html`, `recent-events.html`, `therapy.html`, `surbiton-clinic.html`, `south-wimbledon-clinic.html`, `about.html`, `contact.html`, `privacy.html`, `404.html`.
- The header and footer are repeated in every page. If you change the menu or footer, change it in all eleven files.
- Each page has a block of structured data (`application/ld+json`) in its head for search engines. If fees, clinic days, addresses or FAQ answers change in the page text, change them in that block too.
- The two clinic pages keep the addresses used on the previous khromey.com so their search rankings carry over. `testimonials.html` from the old site forwards to `therapy.html` (see `_redirects`).
- `_headers` sets browser caching and basic security headers.
- Hosting: Cloudflare (Workers static assets) from `main`. Settings are in `wrangler.jsonc`, address forwards in `_redirects`, and files kept off the public site in `.assetsignore`.
- `html_handling` is `none` on purpose so pages keep their exact `.html` addresses.
- Forms post to Web3Forms. The access key in the HTML and in `assets/main.js` is public by design.
- No email address is shown on the site. Enquiries go through the forms: the general one on `contact.html` and the organisation one on `organisations.html`.
- No cookies, analytics or third-party scripts, so no cookie banner is needed. Add one only if something third-party is ever loaded.
- UK spelling throughout. Target: WCAG 2.2 AA.

## Connecting Cloudflare (once)

1. Cloudflare dashboard, Workers & Pages, Create, Import a repository, choose `HH-Chewbacca/khromey-website`.
2. Leave the build command empty. Deploy command: `npx wrangler deploy`.
3. After the first deploy, check the `workers.dev` preview address, then add `khromey.com` and `www.khromey.com` under Settings, Domains & Routes.
4. Only change the web DNS records. Leave any mail records alone.
5. Once Cloudflare is live, remove the Railway project and delete `package.json` (it exists only so Railway can serve the files).

## Before launch

- Nataliya to read every page, and `privacy.html` in particular: it is a draft. Confirm the retention wording and add an ICO registration number if she has one.
- Confirm the South London & Maudsley mention on `about.html` and `organisations.html` wording is as she wants it.
- Optional: add accreditation or membership numbers, links to her EMDR UK / EMDR Europe / BABCP directory entries, a photo, and real testimonials (with permission). None are on the site at present.
- Send a test message through both forms and check it arrives.
- Nataliya to confirm the therapy fees, clinic days and insurer list (copied from the previous site in Nov 2026).
- After launch: submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools, set up or update Google Business Profile entries for the two clinics, and ask EMDR UK, EMDR Europe and BABCP directory listings to link to khromey.com.
- Remove `<meta name="robots" content="noindex, nofollow" />` from every page except `404.html`, then submit `sitemap.xml` in Google Search Console.
