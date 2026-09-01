export interface BuiltInBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
}

export const builtInBlogPosts: BuiltInBlogPost[] = [
  {
    id: "cloudflare-workers-saas-api-starter",
    title: "I Built a Production-Ready SaaS API Starter on Cloudflare Workers",
    slug: "cloudflare-workers-saas-api-starter",
    excerpt:
      "I built a Cloudflare Workers SaaS API starter with Hono, Bun, TypeScript, D1, KV, R2, Queues, Drizzle, OpenAPI, and real SQL tests.",
    tags: [
      "TypeScript",
      "Cloudflare Workers",
      "Hono",
      "Bun",
      "Cloudflare D1",
      "Drizzle ORM",
      "Backend Development",
      "SaaS Architecture",
    ],
    createdAt: "2026-08-26T00:00:00.000Z",
    updatedAt: "2026-08-26T00:00:00.000Z",
    content: `Most backend starters stop after a server, a sample route, and maybe a database connection. That proves the tools can run, but it still leaves all the painful SaaS work untouched.

I built [BackendTemplate](https://github.com/utsavjosh1/BackendTemplate) to start much closer to a real product. It already includes configuration validation, authentication, consistent error handling, migrations, D1, KV, R2, Queues, Cron Triggers, OpenAPI documentation, GitHub Actions, and integration-style tests.

The goal was simple: I wanted a Cloudflare Workers API starter that feels like something I can actually build on, not another polished hello-world repository.

## What I already built

This starter combines Bun, TypeScript, Hono, and Cloudflare's platform services into one SaaS-ready backend foundation.

The repository already has:

- Bun for installing, running, and testing the TypeScript application.
- Hono and @hono/zod-openapi for HTTP routing, request validation, and API documentation.
- Cloudflare D1 with Drizzle for relational storage and migrations.
- KV for rate limiting, cache helpers, and idempotency primitives.
- R2 for uploaded object storage.
- Queues and Cron Triggers for async and scheduled work.
- GitHub Actions for linting, type checking, testing, build verification, and deployment workflows.

I also added real product-shaped modules: refresh-token auth, API keys, organizations, uploads, signed webhooks, queue consumers, health checks, and structured middleware.

## Project structure

I organized the code around product features and shared infrastructure:

\`\`\`text
BackendTemplate/
├── src/
│   ├── app/                 # Hono bootstrap, router assembly, context types
│   ├── config/              # Environment validation and shared limits
│   ├── db/                  # Drizzle client and schema
│   ├── jobs/                # Queue consumer and scheduled cleanup
│   ├── lib/                 # Crypto, logging, OpenAPI, pagination, responses
│   ├── middleware/          # Auth, errors, rate limiting, security, request IDs
│   ├── modules/
│   │   ├── auth/
│   │   ├── health/
│   │   ├── organizations/
│   │   ├── uploads/
│   │   ├── users/
│   │   └── webhooks/
│   ├── repositories/
│   ├── services/
│   └── index.ts
├── migrations/
├── tests/
├── wrangler.toml
└── package.json
\`\`\`

Feature routes live in \`modules\`, shared HTTP behavior lives in \`middleware\`, infrastructure adapters live in \`services\`, and reusable technical code lives in \`lib\`.

I kept the layering practical instead of over-engineered. Auth and users use route → service → repository because they benefit from stronger boundaries. Smaller modules stay thinner until they need more structure.

## One Worker with HTTP, queues, and scheduled jobs

The Worker entry point already handles the three Cloudflare events I wanted this starter to support:

\`\`\`ts
export default {
  async fetch(request, env, ctx) {
    return app.fetch(request, env, ctx)
  },

  async queue(batch, env) {
    const provider = createEmailProviderFromEnv(env)
    await createQueueConsumer(provider)(batch, env)
  },

  async scheduled(_event, env) {
    const config = getConfig(env)
    await runCleanup({
      db: createDb(config.DB),
      logLevel: config.LOG_LEVEL,
    })
  },
}
\`\`\`

HTTP requests go through Hono, queue messages go through a typed consumer, and scheduled events run cleanup logic. Cloudflare's event model stays at the edge of the application instead of leaking through every module.

## Request handling is already wired like a real API

In \`src/app/app.ts\`, middleware order is explicit. A request passes through environment validation, request IDs, security headers, request-size checks, CORS, structured logging, and default KV-backed rate limiting before it reaches a route.

A simplified version looks like this:

\`\`\`ts
app.use(async (c, next) => {
  c.set('config', getConfig(c.env))
  await next()
})

app.use(requestIdMiddleware())
app.use(securityHeadersMiddleware())
app.use(requestBodyLimitMiddleware())
app.use('*', cors(/* configured allowlist */))
app.use(loggingMiddleware())
app.use(rateLimit('public', RATE_LIMITS.publicPerMinute))

app.route('/', healthRoutes)
app.route('/api/v1', apiV1)
app.route('/webhooks', webhooks)

app.onError(errorMiddleware())
\`\`\`

Routes can then add stricter authentication, authorization, validation, or rate-limit rules.

For example, registration already follows the full path I expect in a production-style API:

1. Global middleware prepares the request context.
2. The auth route applies a stricter rate-limit bucket.
3. Zod validates the JSON body.
4. The handler calls \`AuthService.register\`.
5. The service checks for an existing user.
6. The password is hashed with PBKDF2 through Web Crypto.
7. \`UsersRepository\` inserts the user through Drizzle.
8. A refresh-token session is stored in D1.
9. The handler returns a standard success envelope.

The route handler does not contain SQL, password hashing, or token rotation details. It translates HTTP into a service call and returns a clean response.

## Configuration fails early

I used Zod in \`src/config/env.ts\` to validate Cloudflare bindings and environment variables before business logic runs.

The schema checks D1, KV, R2, and Queue bindings. It also validates environment names, log levels, allowed origins, and the minimum length for \`JWT_SECRET\`.

When validation fails, the app logs field paths and validation messages without leaking secret values. That means a missing binding fails clearly at the boundary instead of throwing a confusing error deep inside a request.

## Authentication is Worker-native

I built the authentication module without Node-only crypto dependencies so it can run cleanly in Cloudflare Workers and Bun.

It includes:

- Account registration and login.
- Short-lived access tokens.
- Opaque refresh tokens stored as SHA-256 hashes.
- Refresh-token rotation.
- Logout.
- API key creation and listing.

Refresh tokens are rotated every time they are used. The old session is revoked before a new token pair is returned, and the tests verify that reusing the old refresh token returns \`401\`.

API keys follow the same “show once, store a hash” rule. They use recognizable \`nb_live_\` and \`nb_test_\` prefixes, but the database only stores the hash and a short display prefix.

Authentication middleware accepts both token styles:

\`\`\`text
Authorization: Bearer <access-token>
Authorization: Bearer nb_test_<secret>
\`\`\`

Roles and API key scopes still come from the database. I did not trust role data supplied by the client.

## Multi-tenancy is ready to extend

The starter already models users, organizations, and memberships. Memberships use three roles:

\`\`\`text
owner → admin → member
\`\`\`

Creating an organization inserts both the organization and the owner membership in one transaction. Adding members requires an owner or admin role.

I intentionally stopped before building a complete policy engine. There is no invitation system, billing model, or complex resource-level permission layer yet. The point is to provide a solid multi-tenant foundation without pretending every SaaS product needs the same authorization model.

## D1, KV, R2, and Queues each have a focused job

I used D1 for durable relational data: users, sessions, organizations, upload metadata, and webhook records. Drizzle provides typed schema definitions and migrations.

I used KV for rate limiting, cache helpers, and idempotency primitives. Its eventual consistency is fine for lightweight abuse protection, but I would not use it for exact billing quotas. For that, I would reach for Durable Objects or another strongly consistent design.

I used R2 for uploaded bytes while D1 stores ownership and metadata.

I used Queues to keep slow work out of HTTP requests. Webhook handling already follows this flow:

1. Verify the HMAC signature over the timestamp and raw body.
2. Reject stale timestamps outside the replay window.
3. Record the webhook in D1 as an idempotency ledger.
4. Enqueue async processing.
5. Return \`202\` quickly.

The queue consumer retries failures before they reach the dead-letter path.

## I left useful extension points without forcing product decisions

Some infrastructure is implemented but not mounted everywhere by default.

The idempotency middleware can cache successful POST or PATCH responses in KV, but I did not attach it to every route. \`CacheService\` exists, but user reads do not use it yet. \`TurnstileService\` is implemented, but registration does not require it by default. Email provider abstractions and a \`SEND_EMAIL\` queue message exist, but the current auth flow does not force welcome or verification emails.

I built these as clear integration patterns, not as hidden behavior. If I adopt this starter for a real product, I can wire only the pieces that fit that product.

## The tests run through the real app path

I made the test setup closer to integration testing than unit testing.

The tests create the actual Hono app and run it against an in-memory SQLite database. A D1-compatible shim lets Drizzle execute real SQL, and the test helper applies the same migration files used by the deployed application.

KV, R2, and Queue bindings are replaced with in-memory stubs, but repositories and services are not mocked away.

The suite covers health checks, OpenAPI output, the auth lifecycle, API keys, validation, security headers, CORS, crypto, rate limiting, webhook verification, logging, and environment validation.

## Deployment is already defined

The repository includes separate Wrangler environments for development, staging, and production. Binding names stay consistent across environments so the Worker \`Env\` type remains stable.

GitHub Actions already runs linting, type checking, tests, and a dry-run Worker build. Pushes to \`main\` deploy staging after applying D1 migrations. Production deployment is a manual workflow so it can be protected with GitHub environment approval.

The remaining values are intentionally placeholders: database IDs, domains, namespace IDs, origins, and secrets. A real deployment still needs those resources created and configured.

## How I start from it

The local workflow is straightforward:

\`\`\`bash
bun install
cp .dev.vars.example .dev.vars
bun run db:migrate:local
bun run dev
\`\`\`

Before deploying anywhere real, I replace the example development secret and update the Cloudflare resource IDs in \`wrangler.toml\`.

Then I use:

\`\`\`bash
bun run typecheck
bun run lint
bun test
bun run build
\`\`\`

That gives me confidence that the starter still works before I begin product-specific changes.

## Who I built it for

I built this for small TypeScript teams, solo founders, and backend-heavy SaaS projects that already want to use Cloudflare Workers.

It fits especially well when the product needs authentication, organizations, uploads, webhooks, scheduled jobs, or background processing from day one.

It is not meant to remove every architecture decision. It moves the starting line forward so I can spend less time rebuilding auth, migrations, bindings, tests, and deployment wiring—and more time building the actual product.`
  },
];
