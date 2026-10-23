# Visitor analytics

See how many people visit mohamadchehade.com, **where they are**, which pages
they read, and how they found you.

Tracking is **off right now**. It stays off, and nothing is added to the
pages, until you paste an ID in step 3.

---

## Turn it on (about two minutes, one time)

**1. Make a free account**

Go to <https://cloud.umami.is> and sign up. The free "Hobby" plan is
$0/month: 1 website, 100,000 events per month, 6 months of history. Your
site will use a few hundred of those events a month, so you will not run out.

**2. Add your website**

Inside Umami: **Settings -> Websites -> Add website**

- Name: `mohamadchehade.com`
- Domain: `mohamadchehade.com`

**3. Copy the Website ID**

Still under **Settings -> Websites**, click **Edit** on the site you just made.
You will see a **Website ID** that looks like
`b4f2e1a0-7c3d-4e5f-9a8b-1c2d3e4f5a6b`. Copy it.

**4. Paste it into one file**

Open `src/config/analytics.ts` and put it between the quotes:

```ts
export const UMAMI_WEBSITE_ID = "b4f2e1a0-7c3d-4e5f-9a8b-1c2d3e4f5a6b";
```

**5. Push**

```bash
git add -A && git commit -m "Enable visitor analytics" && git push
```

GitHub Pages rebuilds in a minute or two. Open your site once, then open the
Umami dashboard: you should see your own visit appear.

---

## Checking it afterwards

Log in at <https://cloud.umami.is> and pick your site. The dashboard is
private to you. The **Locations** panel is the one you asked for: it breaks
visitors down by country, region and city.

You also get: visitors vs. page views, which pages are read most, referrers
(so you can see when a visit comes from Google Scholar, X, LinkedIn or a
university page), browser, OS and device.

---

## Turning it off

Set the ID back to an empty string and push:

```ts
export const UMAMI_WEBSITE_ID = "";
```

The script tag disappears from every page and no requests are made.

---

## What is already handled for you

- **Your own visits are not counted.** `npm run dev` never injects the
  script, and `data-domains` means events are only recorded when the page is
  actually served from `mohamadchehade.com` or `www.mohamadchehade.com`.
- **No cookie banner needed.** Umami sets no cookies and does not store
  personal data, so under GDPR/ePrivacy you do not need a consent popup the
  way Google Analytics requires one.
- **Nothing breaks if the ID is blank or wrong.** A bad ID just means no data
  is recorded; the site itself is unaffected.

---

## What this can and cannot tell you

**It can** tell you the city/region/country an IP resolves to, the referring
page, and what someone read.

**It cannot** tell you *who* a specific visitor is. There is no name, no
email, no company. IP-based location is approximate: it often lands on the
visitor's ISP or a nearby city, and anyone on a VPN or on a university or
corporate network will appear wherever that network exits. Treat city-level
data as a hint, not a fact.

Expect a modest undercount. Visitors running an ad blocker or Safari's strict
privacy mode will block the script. This is true of every client-side
analytics tool, including Google Analytics. Relative trends stay meaningful
even though absolute counts run low.

---

## If you ever want to switch tools

Everything lives in `src/config/analytics.ts` and one conditional block at
the end of `<head>` in `src/layouts/Layout.astro`. Swapping in a different
provider means changing the script URL and its data attributes.

Alternatives worth knowing: **Cloudflare Web Analytics** is free with no
event cap but reports country only, no city. **GoatCounter** is free for
personal use and very lightweight, also mostly country level. **Plausible**
is the closest paid equivalent to Umami at about $9/month. Umami was chosen
here because it is the only one of the four that is free *and* reports city.
