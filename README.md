# Utsav Joshi — Portfolio

A lightweight Next.js portfolio with project and experience content, version-controlled and Firebase-backed writing, and an accessible contact form.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

The canonical origin defaults to `https://www.utsavjoshi.com`. Override it with `NEXT_PUBLIC_SITE_URL` only for another production domain.

## Writing

Long-form posts that belong to this portfolio live in `data/blog-posts.ts`, so they are versioned, available without Firebase, and included in metadata and the sitemap. Published Firestore posts are merged into the same feed; a local post wins when both sources use the same slug.

## Firebase

Additional blog reads and contact submissions use Firestore when the `NEXT_PUBLIC_FIREBASE_*` variables are configured. The expected public collection rules are:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blog_posts/{post} {
      allow read: if resource.data.published == true;
      allow write: if false;
    }
    match /contact_submissions/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Manage posts through Firebase Console or a separate authenticated admin tool; this repository intentionally contains no public write interface for blog content.
