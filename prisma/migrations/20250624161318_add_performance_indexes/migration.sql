/*
  Warnings:

  - The values [ON_HOLD] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');
ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "projects" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';
COMMIT;

-- CreateIndex
CREATE INDEX "analytics_event_createdAt_idx" ON "analytics"("event", "createdAt");

-- CreateIndex
CREATE INDEX "analytics_page_createdAt_idx" ON "analytics"("page", "createdAt");

-- CreateIndex
CREATE INDEX "blog_posts_published_featured_idx" ON "blog_posts"("published", "featured");

-- CreateIndex
CREATE INDEX "blog_posts_published_publishedAt_idx" ON "blog_posts"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_published_category_idx" ON "blog_posts"("published", "category");

-- CreateIndex
CREATE INDEX "contact_submissions_status_createdAt_idx" ON "contact_submissions"("status", "createdAt");

-- CreateIndex
CREATE INDEX "experiences_order_startDate_idx" ON "experiences"("order", "startDate");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_active_createdAt_idx" ON "newsletter_subscriptions"("active", "createdAt");

-- CreateIndex
CREATE INDEX "project_technologies_projectId_idx" ON "project_technologies"("projectId");

-- CreateIndex
CREATE INDEX "project_technologies_technologyId_idx" ON "project_technologies"("technologyId");

-- CreateIndex
CREATE INDEX "projects_published_featured_idx" ON "projects"("published", "featured");

-- CreateIndex
CREATE INDEX "projects_published_status_idx" ON "projects"("published", "status");

-- CreateIndex
CREATE INDEX "projects_published_createdAt_idx" ON "projects"("published", "createdAt");

-- CreateIndex
CREATE INDEX "skills_category_order_idx" ON "skills"("category", "order");

-- CreateIndex
CREATE INDEX "testimonials_approved_featured_idx" ON "testimonials"("approved", "featured");
