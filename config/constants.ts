export const PROFILE_DATA = {
  avatarUrl:
    "https://avatars.githubusercontent.com/u/98454866?s=400&u=cf6b7cebb0f7ac602a9bc5b40ab2e4bae5dce048&v=4",
  repoCount: 42,
  bio: "Coding since, birth, now, till death",
};

export const TECH_STACK = [
  { name: "MongoDB", icon: "/mongodb.svg" },
  { name: "Express.js", icon: "/express.svg" },
  { name: "React", icon: "/reactjs.svg" },
  { name: "Node.js", icon: "/nodejs.svg" },
  { name: "Next.js", icon: "/nextjs.svg" },
  { name: "TypeScript", icon: "/typescript.svg" },
];

export const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://www.joshiutsav.com/#homepage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://www.joshiutsav.com/#person",
    name: "Utsav Joshi",
    alternateName: ["joshiutsav", "utsavjosh1"],
    jobTitle: "Software Engineer",
    knowsAbout: TECH_STACK.map((tech) => tech.name),
    url: "https://www.joshiutsav.com",
    image: PROFILE_DATA.avatarUrl,
    sameAs: [
      "https://github.com/utsavjosh1",
      "https://linkedin.com/in/utsavjosh1",
      "https://twitter.com/utsavjosh1",
      "https://www.instagram.com/utsavjosh1/",
    ],
    description:
      "Utsav Joshi (joshiutsav) - Software Engineer specializing in full stack development. Expert in JavaScript, TypeScript, React, and Node.js.",
    givenName: "Utsav",
    familyName: "Joshi",
    additionalName: "joshiutsav",
    nationality: "Indian",
    worksFor: {
      "@type": "Organization",
      name: "Nextbill",
      description: "Financial Technology Solutions",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.joshiutsav.com",
      },
    ],
  },
}; 