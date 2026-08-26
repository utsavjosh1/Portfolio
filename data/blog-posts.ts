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
    title:
      "Building a Cloudflare Workers SaaS API Starter with Hono, Bun, and TypeScript",
    slug: "cloudflare-workers-saas-api-starter",
    excerpt:
      "Explore a Cloudflare Workers SaaS API starter built with Hono, Bun, TypeScript, D1, KV, R2, Queues, Drizzle, OpenAPI, and real SQL tests for SaaS teams.",
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
    content: `Most backend starters create a server, add a sample route, and perhaps connect a database. That proves the stack works, but it leaves the gap between “hello world” and the first product feature untouched.

A SaaS API also needs configuration validation, authentication, consistent errors, migrations, storage, background work, logging, health checks, deployment environments, and meaningful tests. The [BackendTemplate](https://github.com/utsavjosh1/BackendTemplate) starts there.

It combines Bun, TypeScript, Hono, and Cloudflare’s D1, KV, R2, Queues, and Cron Triggers. Each service has a narrow role, while product-specific authorization, billing, webhook behavior, and business rules remain open for the team adopting it.

## The repetition this template removes

The repository is aimed at small teams building a SaaS-style HTTP API on Cloudflare Workers.

Several decisions are already made:

- Bun runs, installs, and tests the TypeScript application.
- Hono and \`@hono/zod-openapi\` handle HTTP, validation, and API documentation.
- D1 and Drizzle provide relational storage and migrations.
- KV and R2 handle distributed state and uploaded objects.
- Queues and Cron Triggers run asynchronous and scheduled work.
- GitHub Actions checks and deploys the application.

The repository then demonstrates those choices through rotating refresh tokens, API keys, organization memberships, uploads, signed webhooks, and queue consumers.

## The shape of the project

The repository combines feature-oriented modules with shared infrastructure:

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

Product-facing capabilities live in \`modules\`; shared HTTP behavior goes into \`middleware\`; infrastructure adapters live in \`services\`; reusable technical code stays under \`lib\`.

The layering is a direction, not a rigid rule. Auth and users follow route → service → repository, while organizations and uploads use fewer layers. A growing application can deepen those boundaries when the extra abstraction becomes useful.

## One Worker, three entry points

\`src/index.ts\` exposes all three event types used by the application:

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

HTTP requests go to Hono, queue batches to a typed dispatcher, and scheduled events to cleanup logic. The Cloudflare event model therefore stays at the boundary.

## How an HTTP request moves through the application

Middleware ordering is explicit in \`src/app/app.ts\`.

A request first passes through environment validation. It then receives a correlation ID, security headers, a declared body-size check, CORS handling, structured logging, and a default KV-backed rate limit before reaching a mounted router.

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

Individual routes then add their own authentication, authorization, validation, or tighter rate-limit rules.

Consider account registration:

1. The global middleware prepares the request context.
2. The auth route applies a stricter rate-limit bucket.
3. Zod validates the JSON body.
4. The thin route handler calls \`AuthService.register\`.
5. The service checks for an existing email.
6. The password is hashed with PBKDF2 through Web Crypto.
7. \`UsersRepository\` inserts the user through Drizzle.
8. A refresh-token session is stored in D1.
9. The handler returns the standard success envelope.

The handler does not contain SQL or password logic. Its job is to translate a valid HTTP request into a service call and then translate the result back into HTTP.

## Configuration fails before business logic runs

Cloudflare bindings and environment variables are validated with Zod in \`src/config/env.ts\`.

The schema checks that D1, KV, R2, and Queue bindings exist. It also validates environment names, log levels, allowed origins, and the minimum length of \`JWT_SECRET\`.

Validated configurations are memoized against the environment object. Failures log field paths and validation messages—but never secret values—before returning a generic configuration error. A missing binding therefore fails immediately instead of causing an unrelated exception deep inside a request.

## Authentication without Node-only crypto dependencies

The authentication module includes account registration, login, refresh-token rotation, logout, API key creation, and API key listing.

Cryptography is built on Web Crypto so the same code can run in Workers and Bun. Passwords use salted PBKDF2-SHA256 hashes. Access tokens are short-lived, while refresh tokens are random opaque values whose SHA-256 hashes are stored in D1.

Refresh tokens are rotated when used. The previous session is revoked before a new pair is issued, and the end-to-end tests verify that reusing the old token returns \`401\`.

API keys follow the same “show once, store a hash” rule. They use recognizable \`nb_live_\` and \`nb_test_\` prefixes, while the database stores the hash and a short display prefix rather than the full secret.

Authentication middleware supports either credential:

\`\`\`text
Authorization: Bearer <access-token>
Authorization: Bearer nb_test_<secret>
\`\`\`

The database remains authoritative for roles and API key scopes. The middleware does not trust a role supplied by the client.

PBKDF2 fits the Worker runtime because Web Crypto supports it without native Node modules. Teams with different password-hardening requirements should still review the iteration count or use an external identity provider.

## Multi-tenancy is a foundation, not a complete policy engine

The schema models users, organizations, and organization memberships. Memberships carry one of three roles:

\`\`\`text
owner → admin → member
\`\`\`

Creating an organization inserts the organization and its owner membership in one database transaction. Adding another member requires an owner or admin role.

This is a starting point, not a complete policy engine. There is no invitation flow, billing model, or complex resource-level permission system. API key scope middleware exists, but adopters must still decide where each scope applies.

## D1, KV, R2, and Queues each have a narrow role

D1 stores users, sessions, organizations, upload metadata, and webhook records; Drizzle supplies typed schemas and migrations. KV powers fixed-window rate limiting plus reusable cache and idempotency abstractions. Its eventual consistency is acceptable for abuse protection, not hard billing quotas—those need something like Durable Objects.

R2 holds uploaded bytes while D1 stores ownership and metadata. A storage service hides the raw bucket binding.

There is one default worth reviewing before using uploads: the upload module defines a 25 MB file limit, while the application-wide \`Content-Length\` guard rejects declared request bodies over 1 MB. In the current configuration, requests carrying that header effectively encounter the lower limit. A real application should align those limits or move larger uploads to an S3-compatible presigned flow.

Queues keep slow work outside HTTP requests. Inbound webhooks are:

1. Verified with an HMAC signature over the timestamp and raw body.
2. Rejected when the timestamp falls outside the replay window.
3. Recorded in D1 as an idempotency ledger.
4. Enqueued for asynchronous processing.
5. Acknowledged with \`202\`.

The consumer retries failures before they reach the dead-letter queue. Webhooks currently use \`JWT_SECRET\` as a placeholder signing secret, so production integrations need separate provider secrets.

## Useful infrastructure that is not wired in by default

The repository contains several extension points that should not be mistaken for active application behavior.

A reusable idempotency middleware can cache successful POST or PATCH responses in KV, but it is not currently mounted on a route. \`CacheService\` exists, but user reads do not use it. \`TurnstileService\` is implemented, but registration does not call it. The email providers and \`SEND_EMAIL\` queue message exist, but the current HTTP flows do not enqueue a welcome or verification email.

These components demonstrate an integration pattern without forcing product decisions. Adopters should still verify route wiring rather than assuming a file enables a feature.

OpenAPI has a similar boundary: auth, users, and organizations participate in the generated document, while the plain Hono upload and webhook routes currently do not.

## Tests exercise the real application path

The test setup is one of the stronger parts of the project.

End-to-end tests create the actual Hono app and run it against an in-memory SQLite database. A D1-compatible shim lets Drizzle execute real SQL, and the test helper applies the migration files used by the deployed application.

KV, R2, and Queue bindings are replaced with in-memory stubs, but repositories and services are not mocked away.

The 36 tests cover health checks, OpenAPI output, the auth lifecycle, API keys, validation, security headers, CORS, crypto, rate limiting, webhook verification, logging, and environment validation. Coverage is strongest around authentication and HTTP middleware; organizations, uploads, cleanup, and queue processing still need deeper integration tests.

## Deployment is defined, but still needs real infrastructure

The repository includes separate Wrangler environments for development, staging, and production. Binding names remain consistent across them, which keeps the application’s \`Env\` type stable.

GitHub Actions runs linting, type checking, tests, and a dry-run Worker build. Pushes to \`main\` deploy staging after applying D1 migrations. Production deployment is a manual workflow and can be protected with GitHub environment approval.

Database IDs, domains, namespace IDs, and origins remain placeholders. A team must create those resources, replace the values, and configure GitHub and Worker secrets before deploying.

## Starting a project from the template

After cloning or creating a repository from the template, the local workflow is:

\`\`\`bash
bun install
cp .dev.vars.example .dev.vars
bun run db:migrate:local
bun run dev
\`\`\`

The example development secret must be replaced before anything leaves local development.

From there, \`bun run typecheck\`, \`bun run lint\`, \`bun test\`, and \`bun run build\` verify the project. Drizzle scripts cover migration generation, local migration, Studio, and seed data. Remote deployment still requires replacing the resource IDs and example domains in \`wrangler.toml\`.

## Who this starter fits

This starter fits small TypeScript teams committed to Cloudflare and building authenticated APIs with organizations, uploads, webhooks, or background work. It fits less well when database portability, Node-only packages, or exact global quotas are requirements.

It does not remove architectural decisions. It moves the starting line past configuration, auth, migrations, storage bindings, and deployment wiring so the team can focus on decisions specific to its product.`,
  },
];
