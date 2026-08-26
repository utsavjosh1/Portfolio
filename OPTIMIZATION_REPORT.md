# Portfolio Optimization Report

## Executive Summary

The portfolio is now mostly static and server-rendered, with consistent navigation, crawlable professional content, stronger accessibility, and substantially less client JavaScript.

| Metric                |      Before |              After |
| --------------------- | ----------: | -----------------: |
| Homepage initial JS   | 1,073,540 B | 597,801 B (-44.3%) |
| `.next/static`        | 1,774,105 B | 930,989 B (-47.5%) |
| Font preloads         |           5 |                  3 |
| Audit vulnerabilities |           7 |                  0 |

Lighthouse was not measured because Chrome/Chromium was unavailable.

## Removed Code

- Removed 24 unreferenced legacy components/utilities and 10 unused direct dependencies.
- Removed duplicate Firebase Analytics, broken newsletter behavior, artificial loading screens, and unused admin blog helpers.
- Removed roughly 1.8 MB of unused tracked images and metadata files.

## Architecture Improvements

- Moved blog reads into cached Server Components; Firebase is absent from client bundles.
- Replaced unsafe Markdown string rendering with `react-markdown`.
- Centralized project content and mounted shared navigation from the root layout.
- Contact submissions now await Firestore and report real failures.

## Performance Improvements

- Removed client Firestore reads, theme customization, scroll listeners, cursor loops, and reveal observers.
- Reduced hosted fonts from four families to two plus system monospace.
- Kept home, blog, contact, robots, and sitemap statically generated.

## SEO Improvements

- Added unique metadata, canonical URLs, robots, sitemap, and 1200×630 social images.
- Added truthful Person, WebSite, ProfilePage, project, Article, and breadcrumb JSON-LD.
- Added crawlable project, experience, skill, and identity content.
- Canonical origin is `https://www.utsavjoshi.com`.

## Accessibility Improvements

- Added skip navigation, consistent landmarks, visible focus, stronger contrast, and 44 px targets.
- Added semantic headings, articles, lists, and dates.
- Added complete labels, validation associations, and live feedback to the contact form.

## Bundle Improvements

- Homepage initial JS dropped 44.3%; total static output dropped 47.5%.
- Firebase remains server-only.

## Image Improvements

- Replaced the oversized avatar with a 5 KB WebP.
- Rebuilt correctly sized Apple and manifest icons.
- Added dimensions and lazy decoding for article images.

## Remaining Recommendations

- Verify Firebase contact delivery after deployment.
- Run Lighthouse and mobile visual checks on the public domain.
- Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Remove the untracked 3.1 MB Zenitsu image if it is not intentional.
