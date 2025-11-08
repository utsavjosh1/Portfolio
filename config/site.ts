export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME!,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION!,
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_OG_IMAGE}`,
  author: process.env.NEXT_PUBLIC_SITE_AUTHOR!,
  email: process.env.NEXT_PUBLIC_SITE_EMAIL!,
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE!,
  keywords: process.env.NEXT_PUBLIC_KEYWORDS?.split(",").map(k => k.trim()) || [],
  links: {
    twitter: process.env.NEXT_PUBLIC_LINK_TWITTER!,
    github: process.env.NEXT_PUBLIC_LINK_GITHUB!,
    linkedin: process.env.NEXT_PUBLIC_LINK_LINKEDIN!,
    email: process.env.NEXT_PUBLIC_LINK_EMAIL!,
  },
  location: {
    city: process.env.NEXT_PUBLIC_LOCATION_CITY!,
    region: process.env.NEXT_PUBLIC_LOCATION_REGION!,
    country: process.env.NEXT_PUBLIC_LOCATION_COUNTRY!,
    postalCode: process.env.NEXT_PUBLIC_LOCATION_POSTAL_CODE!,
  },
};
