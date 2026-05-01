Hi there, I'm Utsav Joshi 👋

Full-stack developer with backend expertise. Open-source contributor and freelance developer building scalable solutions.

You'll need to add this rule in your Firebase Console → Firestore → Rules:

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /blog_posts/{post} {
allow read: if resource.data.published == true;
allow write: if false; // manage via Firebase Console
}
match /contact_submissions/{doc} {
allow create: if true;
allow read, update, delete: if false;
}
}
}
