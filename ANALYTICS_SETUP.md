# Real Analytics Data Integration Guide

This guide shows you how to integrate real analytics data into your admin dashboard. You have several options:

## Option 1: Vercel Analytics (Recommended - Easiest)

Since you already have Vercel Analytics installed, this is the simplest option.

### Setup Steps:

1. **Get Vercel Access Token:**
   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Create a new token with "Read" permissions
   - Copy the token

2. **Get Project ID:**
   - Go to your project settings in Vercel
   - Copy the Project ID from the General tab

3. **Add Environment Variables:**
   ```bash
   VERCEL_ACCESS_TOKEN="your-vercel-access-token"
   VERCEL_PROJECT_ID="your-project-id"
   VERCEL_TEAM_ID="your-team-id" # Optional, only if using teams
   ```

4. **Update Analytics API Call:**
   Change the fetch URL in `app/admin/analytics/page.tsx`:
   ```typescript
   const response = await fetch(`/api/analytics/vercel?timeRange=${timeRange}`, {
     credentials: 'include'
   })
   ```

## Option 2: Google Analytics 4

### Setup Steps:

1. **Install Google Analytics Data API:**
   ```bash
   npm install @google-analytics/data
   ```

2. **Create Service Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Analytics Data API
   - Create a Service Account
   - Download the JSON key file

3. **Add Service Account to GA4:**
   - Go to Google Analytics
   - Admin → Property → Property Access Management
   - Add the service account email with "Viewer" permissions

4. **Environment Variables:**
   ```bash
   NEXT_PUBLIC_GOOGLE_ANALYTICS="G-XXXXXXXXXX"
   GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   GA4_PROPERTY_ID="your-property-id"
   ```

5. **The API endpoint is already created at `/api/analytics/route.ts`**

## Option 3: Simple Analytics

### Setup Steps:

1. **Install Simple Analytics:**
   ```bash
   npm install simple-analytics-api
   ```

2. **Create API endpoint:**
   ```typescript
   // app/api/analytics/simple/route.ts
   import { NextRequest, NextResponse } from 'next/server'
   
   export async function GET(request: NextRequest) {
     const apiKey = process.env.SIMPLE_ANALYTICS_API_KEY
     const hostname = process.env.SIMPLE_ANALYTICS_HOSTNAME
     
     const response = await fetch(`https://simpleanalytics.com/api/stats/pages?hostname=${hostname}`, {
       headers: {
         'Api-Key': apiKey,
       },
     })
     
     const data = await response.json()
     // Process and return data
   }
   ```

## Option 4: Plausible Analytics

### Setup Steps:

1. **Get API Key:**
   - Go to Plausible Settings → API Keys
   - Create a new API key

2. **Create API endpoint:**
   ```typescript
   // app/api/analytics/plausible/route.ts
   import { NextRequest, NextResponse } from 'next/server'
   
   export async function GET(request: NextRequest) {
     const apiKey = process.env.PLAUSIBLE_API_KEY
     const siteId = process.env.PLAUSIBLE_SITE_ID
     
     const response = await fetch(`https://plausible.io/api/v1/stats/aggregate?site_id=${siteId}&metrics=visitors,pageviews`, {
       headers: {
         'Authorization': `Bearer ${apiKey}`,
       },
     })
     
     const data = await response.json()
     // Process and return data
   }
   ```

## Newsletter Data (Already Working)

Your newsletter admin page already uses real data from your database. The API endpoint at `/api/newsletter/admin` fetches actual newsletter subscriptions.

## Contact Data (Already Working)

Your contact admin page already uses real data from your database. The API endpoints at `/api/contact` handle real contact form submissions.

## Testing Real Data

1. **Start with Vercel Analytics** (easiest to set up)
2. **Add the environment variables** to your `.env.local` file
3. **Deploy to Vercel** or restart your development server
4. **Visit your admin dashboard** at `/admin/analytics`

## Fallback Behavior

The analytics page is designed to fall back to mock data if the real API fails, so your dashboard will always work even during setup.

## Environment Variables Template

Add these to your `.env.local` file:

```bash
# Choose ONE analytics option:

# Option 1: Vercel Analytics (Recommended)
VERCEL_ACCESS_TOKEN="your-vercel-access-token"
VERCEL_PROJECT_ID="your-project-id"
VERCEL_TEAM_ID="your-team-id" # Optional

# Option 2: Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS="G-XXXXXXXXXX"
GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
GA4_PROPERTY_ID="your-property-id"

# Option 3: Simple Analytics
SIMPLE_ANALYTICS_API_KEY="your-api-key"
SIMPLE_ANALYTICS_HOSTNAME="your-domain.com"

# Option 4: Plausible Analytics
PLAUSIBLE_API_KEY="your-api-key"
PLAUSIBLE_SITE_ID="your-domain.com"
```

## Next Steps

1. Choose your preferred analytics provider
2. Follow the setup steps above
3. Add the environment variables
4. Update the API call in the admin page if needed
5. Test the integration

The newsletter and contact data are already using real data from your database, so those sections will show actual submissions immediately. 