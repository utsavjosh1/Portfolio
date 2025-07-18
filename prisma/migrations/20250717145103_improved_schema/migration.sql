/*
  Warnings:

  - You are about to alter the column `title` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `excerpt` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `slug` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `category` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `readingTime` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `image` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `name` on the `contact_submissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `contact_submissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `subject` on the `contact_submissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `company` on the `experiences` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `position` on the `experiences` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `location` on the `experiences` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `website` on the `experiences` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `logo` on the `experiences` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `email` on the `newsletter_subscriptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `source` on the `newsletter_subscriptions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `title` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `image` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `year` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4)`.
  - You are about to alter the column `github` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `demo` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `slug` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `video` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `name` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `category` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `yearsOfExp` on the `skills` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `name` on the `technologies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `icon` on the `technologies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `category` on the `technologies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `image` on the `technologies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to drop the `analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testimonials` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'EXPERT');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP', 'VOLUNTEER');

-- CreateEnum
CREATE TYPE "NewsletterFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY');

-- AlterEnum
ALTER TYPE "ContactStatus" ADD VALUE 'SPAM';

-- AlterEnum
ALTER TYPE "ProjectStatus" ADD VALUE 'ON_HOLD';

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "authorEmail" VARCHAR(100),
ADD COLUMN     "authorName" VARCHAR(100),
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" VARCHAR(160),
ADD COLUMN     "metaTitle" VARCHAR(60),
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "excerpt" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "readingTime" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "contact_submissions" ADD COLUMN     "honeypot" VARCHAR(100),
ADD COLUMN     "ipAddress" INET,
ADD COLUMN     "repliedAt" TIMESTAMP(3),
ADD COLUMN     "spamScore" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "userAgent" VARCHAR(500),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "subject" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "experiences" ADD COLUMN     "achievements" TEXT[],
ADD COLUMN     "employmentType" "ExperienceType" NOT NULL DEFAULT 'FULL_TIME',
ADD COLUMN     "skills" TEXT[],
ALTER COLUMN "company" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "position" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "website" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "logo" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "newsletter_subscriptions" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "frequency" "NewsletterFrequency" NOT NULL DEFAULT 'WEEKLY',
ADD COLUMN     "ipAddress" INET,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "source" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "project_technologies" ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "clientName" VARCHAR(100),
ADD COLUMN     "difficulty" "ProjectDifficulty" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "duration" VARCHAR(50),
ADD COLUMN     "metaDescription" VARCHAR(160),
ADD COLUMN     "metaTitle" VARCHAR(60),
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "teamSize" INTEGER,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "year" SET DATA TYPE VARCHAR(4),
ALTER COLUMN "github" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "demo" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "video" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "endorsed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "yearsOfExp" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "technologies" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "color" VARCHAR(7),
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" VARCHAR(500),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "icon" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(500);

-- DropTable
DROP TABLE "analytics";

-- DropTable
DROP TABLE "testimonials";

-- CreateTable
CREATE TABLE "blog_comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "website" VARCHAR(500),
    "content" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "userAgent" VARCHAR(500),
    "ipAddress" INET,
    "referer" VARCHAR(500),
    "country" VARCHAR(2),
    "city" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_sessions" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(100) NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" INET,
    "userAgent" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_comments_postId_approved_idx" ON "blog_comments"("postId", "approved");

-- CreateIndex
CREATE INDEX "blog_comments_parentId_idx" ON "blog_comments"("parentId");

-- CreateIndex
CREATE INDEX "page_views_path_createdAt_idx" ON "page_views"("path", "createdAt");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sessions_token_key" ON "admin_sessions"("token");

-- CreateIndex
CREATE INDEX "admin_sessions_userId_idx" ON "admin_sessions"("userId");

-- CreateIndex
CREATE INDEX "admin_sessions_expiresAt_idx" ON "admin_sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_viewCount_idx" ON "blog_posts"("viewCount");

-- CreateIndex
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions"("email");

-- CreateIndex
CREATE INDEX "contact_submissions_spamScore_idx" ON "contact_submissions"("spamScore");

-- CreateIndex
CREATE INDEX "experiences_current_idx" ON "experiences"("current");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_confirmed_active_idx" ON "newsletter_subscriptions"("confirmed", "active");

-- CreateIndex
CREATE INDEX "project_technologies_isPrimary_idx" ON "project_technologies"("isPrimary");

-- CreateIndex
CREATE INDEX "projects_slug_idx" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_private_published_idx" ON "projects"("private", "published");

-- CreateIndex
CREATE INDEX "projects_priority_idx" ON "projects"("priority");

-- CreateIndex
CREATE INDEX "skills_level_idx" ON "skills"("level");

-- CreateIndex
CREATE INDEX "technologies_category_order_idx" ON "technologies"("category", "order");

-- CreateIndex
CREATE INDEX "technologies_active_idx" ON "technologies"("active");

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "blog_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
