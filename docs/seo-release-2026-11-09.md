# Public search discovery — 9 November 2026

This change makes the product's public capabilities discoverable through dedicated feature pages, readable HTML, canonical metadata and crawlable internal links. It reuses the shared `@omevision/static-seo` implementation maintained in `omevision-landing-page/packages/static-seo`.

Feature content and source evidence are in `seo/product.json` where applicable. Existing authored feature URLs remain authoritative. Static crawler files and declared application paths are generated during the production build. Unknown URLs return 404, and account/transaction responses remain excluded from search where applicable. Dependency errors are not converted into successful empty responses.

Validation: production build, generated feature metadata/content checks, shared rendering and failure-boundary tests. Production deployment and Google indexing are separate states; see the portfolio release record for actual live verification.

This release does not establish search rankings, Search Console coverage, or conversion improvement.
