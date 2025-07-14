import { PrismaClient, ProjectStatus, Technology } from '@prisma/client'

const prisma = new PrismaClient()

// Seed data
const seedExperiences = [
  {
    company: 'Nextbill',
    position: 'Software Engineer',
    description: 'Led development of the flagship product, improving performance by 40% and implementing features that boosted user engagement.',
    startDate: new Date('2023-01-01'),
    current: true,
    location: 'Remote',
    order: 1,
  },
  {
    company: 'IIT Madras',
    position: 'Backend Developer',
    description: 'Worked on multiple research projects using React, Node.js, and AWS, delivering solutions on time and within budget.',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-04-01'),
    current: false,
    location: 'Chennai, India',
    order: 2,
  },
]

const seedTechnologies: Omit<Technology, 'id' | 'createdAt' | 'updatedAt'>[] = [
  { name: 'JavaScript', category: 'Language', icon: '💻', description: null, image: null },
  { name: 'TypeScript', category: 'Language', icon: '📘', description: null, image: null },
  { name: "Python", category: "Language", icon: "🐍", description: null, image: null },
  { name: 'React', category: 'Framework', icon: '⚛️', description: null, image: null },
  { name: 'Next.js', category: 'Framework', icon: '▲', description: null, image: null },
  { name: 'Node.js', category: 'Backend', icon: '🟢', description: null, image: null },
  { name: "Express.js", category: "Backend", icon: "🚀", description: null, image: null },
  { name: 'MongoDB', category: 'Database', icon: '🍃', description: null, image: null },
  { name: "PostgreSQL", category: "Database", icon: "🐘", description: null, image: null },
  { name: "Redis", category: "Database", icon: "⚡", description: null, image: null },
  { name: "Supabase", category: "Platform", icon: " supabase", description: null, image: null },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨', description: null, image: null },
  { name: 'Docker', category: 'DevOps', icon: '🐳', description: null, image: null },
  { name: 'AWS', category: 'Cloud', icon: '☁️', description: null, image: null },
  { name: "Google Cloud Platform", category: "Cloud", icon: "gcp", description: null, image: null },
  { name: "Vercel", category: "Platform", icon: "▲", description: null, image: null },
  { name: "Cloudflare", category: "Platform", icon: "☁️", description: null, image: null },
  { name: "Puppeteer", category: "Tool", icon: "puppeteer", description: null, image: null },
  { name: "OpenAI API", category: "AI", icon: "🤖", description: null, image: null },
  { name: "LangChain", category: "AI", icon: "🦜", description: null, image: null },
  { name: "Pinecone", category: "AI", icon: "🌲", description: null, image: null },
  { name: "Git", category: "Tool", icon: "git", description: null, image: null },
]

const seedProjects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with Next.js and Stripe.',
    content: 'This project is a complete e-commerce platform with features like product catalog, shopping cart, user authentication, and payment processing via Stripe. It is built with a focus on performance and user experience.',
    image: '/placeholder.svg',
    tags: ['E-commerce', 'Full-stack'],
    status: 'COMPLETED' as ProjectStatus,
    featured: false,
    year: '2022',
    github: 'https://github.com/utsavjosh1/ecommerce',
    demo: 'https://ecommerce.joshiutsav.com',
    slug: 'ecommerce-platform',
    published: true,
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  }
]

const seedBlogPosts = [
  {
    title: 'Building Scalable Web Apps with Next.js',
    excerpt: 'Learn to create performant and scalable web applications.',
    content: 'This is a deep dive into building scalable applications with Next.js, covering topics like data fetching, caching, and server components.',
    slug: 'scalable-nextjs-apps',
    featured: true,
    published: true,
    tags: ['Next.js', 'React', 'Performance'],
    category: 'Tutorial',
    publishedAt: new Date('2024-01-15').toISOString(),
  },
]

const seedSkills = [
  { name: 'React', level: 'ADVANCED' as const, category: 'Frontend', order: 1 },
  { name: 'Next.js', level: 'ADVANCED' as const, category: 'Frontend', order: 2 },
  { name: 'Node.js', level: 'INTERMEDIATE' as const, category: 'Backend', order: 3 },
]

const seedTestimonials = [
  {
    name: 'Jane Doe',
    role: 'CEO',
    company: 'TechCorp',
    content: 'Utsav is a phenomenal engineer who consistently delivers high-quality work. His problem-solving skills are top-notch.',
    approved: true,
    featured: true,
  },
]


async function main() {
  console.log('Seeding database...')

  // Clear existing data in reverse order of dependency
  await prisma.projectTechnology.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.skill.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.experience.deleteMany({})
  await prisma.technology.deleteMany({})
  console.log('Cleared existing data.')

  // Seed experiences
  await prisma.experience.createMany({
    data: seedExperiences,
  })
  console.log('Seeded experiences.')

  // Seed technologies
  await prisma.technology.createMany({
    data: seedTechnologies,
  })
  console.log('Seeded technologies.')

  // Get all technologies to map by name
  const allTech = await prisma.technology.findMany()
  const techMap = new Map(allTech.map(t => [t.name, t.id]))

  // Seed projects and their technologies
  for (const projectData of seedProjects) {
    const { technologies, ...rest } = projectData
    const newProject = await prisma.project.create({
      data: {
        ...rest,
        status: rest.status as ProjectStatus,
      },
    })

    if (technologies && technologies.length > 0) {
      for (const techName of technologies) {
        const techId = techMap.get(techName)
        if (techId) {
          await prisma.projectTechnology.create({
            data: {
              projectId: newProject.id,
              technologyId: techId,
            },
          })
        }
      }
    }
  }
  console.log('Seeded base projects and technologies.')
  
  // Seed new projects from aboutme.md
  const newProjects = [
    {
      title: 'Learnest',
      description: 'A content management system for coaching institutes, built for scalability and ease of use.',
      content: 'Learnest is a comprehensive CMS designed to meet the unique needs of coaching centers. It features course management, student enrollment, payment processing, and virtual classroom integrations. The platform is built with a focus on performance and scalability to support a large number of concurrent users.',
      image: '/learnest.png',
      tags: ['SaaS', 'CMS', 'B2B', 'EdTech'],
      status: 'COMPLETED' as ProjectStatus,
      featured: true,
      year: '2023',
      github: 'https://github.com/utsavjosh1/Learnest',
      demo: 'https://learnest.xyz',
      slug: 'learnest',
      published: true,
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    },
    {
      title: 'JobHaunt',
      description: 'An AI-powered job scraper bot to help streamline job discovery and applications.',
      content: 'JobHaunt is an intelligent job scraping bot that aggregates listings from multiple platforms, uses AI to filter them based on user preferences, and can even automate parts of the application process. It is built with Python and Puppeteer for robust scraping capabilities.',
      image: '/placeholder.svg',
      tags: ['AI', 'Automation', 'Scraping', 'Tooling'],
      status: 'IN_PROGRESS' as ProjectStatus,
      featured: false,
      year: '2024',
      github: 'https://github.com/utsavjosh1/JobHaunt',
      slug: 'jobhaunt',
      published: true,
      technologies: ['Python', 'Puppeteer', 'OpenAI API'],
    },
    {
      title: 'QuizGPT',
      description: 'A microservice designed for generating quizzes using AI, part of my B2B SaaS CMS product.',
      content: 'QuizGPT is a powerful microservice that integrates with any learning platform to automatically generate quizzes and assessments from educational content. It leverages the OpenAI API to create relevant and challenging questions, saving educators hours of manual work.',
      image: '/placeholder.svg',
      tags: ['AI', 'SaaS', 'Microservice', 'API'],
      status: 'IN_PROGRESS' as ProjectStatus,
      featured: false,
      year: '2024',
      github: 'https://github.com/utsavjosh1/QuizGPT',
      slug: 'quiz-gpt',
      published: true,
      technologies: ['Node.js', 'Express.js', 'OpenAI API', 'Docker'],
    }
  ];

  for (const projectData of newProjects) {
    const { technologies, ...rest } = projectData;
    const newProject = await prisma.project.create({
      data: rest,
    });

    if (technologies && technologies.length > 0) {
      for (const techName of technologies) {
        const techId = techMap.get(techName);
        if (techId) {
          await prisma.projectTechnology.create({
            data: {
              projectId: newProject.id,
              technologyId: techId,
            },
          });
        }
      }
    }
  }
  console.log('Seeded new projects from aboutme.md.');

  // Seed blog posts
  await prisma.blogPost.createMany({
    data: seedBlogPosts.map(post => ({ ...post, publishedAt: new Date(post.publishedAt) })),
  })
  console.log('Seeded blog posts.')

  // Seed skills
  await prisma.skill.createMany({
    data: seedSkills,
  })
  console.log('Seeded skills.')

  // Seed testimonials
  await prisma.testimonial.createMany({
    data: seedTestimonials,
  })
  console.log('Seeded testimonials.')

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })