# Portfolio REST API Documentation

This document provides comprehensive information about the REST API endpoints available in the portfolio application.

## Base URL
```
/api
```

## Authentication
Currently, all GET endpoints are public. POST endpoints may require authentication in future versions.

## API Endpoints

### Projects

#### Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `featured` (boolean): Filter for featured projects only
- `status` (string): Filter by project status (PLANNING, IN_PROGRESS, COMPLETED, ARCHIVED, ON_HOLD)
- `year` (string): Filter projects by year

**Example Requests:**
```javascript
// Get all projects
fetch('/api/projects')

// Get featured projects only
fetch('/api/projects?featured=true')

// Get projects by status
fetch('/api/projects?status=COMPLETED')

// Get projects by year
fetch('/api/projects?year=2023')
```

**Response Format:**
```json
[
  {
    "id": "project-id",
    "title": "Project Title",
    "description": "Project description",
    "image": "/images/project.jpg",
    "tags": ["React", "Next.js", "TypeScript"],
    "link": "/projects/project-slug",
    "status": "COMPLETED",
    "featured": true,
    "year": "2023",
    "github": "https://github.com/user/repo",
    "demo": "https://demo.com",
    "slug": "project-slug",
    "published": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Project
```http
GET /api/projects/[slug]
```

### Blog Posts

#### Get All Blog Posts
```http
GET /api/blog
```

**Query Parameters:**
- `featured` (boolean): Filter for featured posts only
- `recent` (boolean): Get recent posts
- `category` (string): Filter by category
- `tag` (string): Filter by tag
- `limit` (number): Limit number of results

**Example Requests:**
```javascript
// Get all blog posts
fetch('/api/blog')

// Get featured posts
fetch('/api/blog?featured=true')

// Get recent posts with limit
fetch('/api/blog?recent=true&limit=5')

// Get posts by category
fetch('/api/blog?category=web-development')

// Get posts by tag
fetch('/api/blog?tag=react')
```

**Response Format:**
```json
[
  {
    "id": "post-id",
    "title": "Post Title",
    "excerpt": "Post excerpt",
    "content": "Full markdown content",
    "slug": "post-slug",
    "featured": false,
    "published": true,
    "tags": ["react", "javascript"],
    "category": "web-development",
    "readingTime": "5 min read",
    "image": "/images/post.jpg",
    "link": "/blog/post-slug",
    "date": "2023-01-01",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "publishedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Blog Post
```http
GET /api/blog/[slug]
```

### Experience

#### Get All Experiences
```http
GET /api/experience
```

**Query Parameters:**
- `current` (boolean): Filter for current positions only
- `recent` (boolean): Get recent experiences
- `company` (string): Filter by company name
- `limit` (number): Limit number of results

**Example Requests:**
```javascript
// Get all experiences
fetch('/api/experience')

// Get current positions
fetch('/api/experience?current=true')

// Get recent experiences
fetch('/api/experience?recent=true&limit=3')

// Get experiences by company
fetch('/api/experience?company=google')
```

**Response Format:**
```json
[
  {
    "id": "experience-id",
    "company": "Company Name",
    "position": "Software Engineer",
    "description": "Job description",
    "startDate": "2023-01-01T00:00:00.000Z",
    "endDate": "2023-12-31T00:00:00.000Z",
    "current": false,
    "location": "San Francisco, CA",
    "website": "https://company.com",
    "logo": "/images/company-logo.jpg",
    "period": "2023 - 2023",
    "order": 0,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Create Experience
```http
POST /api/experience
```

**Request Body:**
```json
{
  "company": "Company Name",
  "position": "Software Engineer",
  "description": "Job description",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "current": false,
  "location": "San Francisco, CA",
  "website": "https://company.com",
  "logo": "/images/company-logo.jpg",
  "order": 0
}
```

### Skills

#### Get All Skills
```http
GET /api/skills
```

**Query Parameters:**
- `category` (string): Filter by skill category
- `level` (string): Filter by skill level (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `grouped` (boolean): Return skills grouped by category
- `top` (boolean): Get top skills only
- `limit` (number): Limit number of results

**Example Requests:**
```javascript
// Get all skills
fetch('/api/skills')

// Get skills by category
fetch('/api/skills?category=frontend')

// Get skills by level
fetch('/api/skills?level=EXPERT')

// Get skills grouped by category
fetch('/api/skills?grouped=true')

// Get top skills
fetch('/api/skills?top=true&limit=10')
```

**Response Format:**
```json
[
  {
    "id": "skill-id",
    "name": "React",
    "level": "EXPERT",
    "category": "Frontend",
    "description": "JavaScript library for building user interfaces",
    "yearsOfExp": 5,
    "order": 1,
    "technologyName": "React",
    "technologyIcon": "/icons/react.svg",
    "technologyCategory": "Frontend Framework",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

**Grouped Response Format (when `grouped=true`):**
```json
{
  "Frontend": [
    {
      "id": "skill-1",
      "name": "React",
      "level": "EXPERT",
      ...
    }
  ],
  "Backend": [
    {
      "id": "skill-2",
      "name": "Node.js",
      "level": "ADVANCED",
      ...
    }
  ]
}
```

#### Create Skill
```http
POST /api/skills
```

**Request Body:**
```json
{
  "name": "React",
  "level": "EXPERT",
  "category": "Frontend",
  "description": "JavaScript library for building user interfaces",
  "yearsOfExp": 5,
  "order": 1,
  "technologyId": "tech-id-optional"
}
```

### Testimonials

#### Get All Testimonials
```http
GET /api/testimonials
```

**Query Parameters:**
- `approved` (boolean): Filter for approved testimonials only
- `featured` (boolean): Filter for featured testimonials only
- `recent` (boolean): Get recent testimonials
- `company` (string): Filter by company name
- `rating` (number): Filter by minimum rating
- `limit` (number): Limit number of results

**Example Requests:**
```javascript
// Get all testimonials
fetch('/api/testimonials')

// Get approved testimonials
fetch('/api/testimonials?approved=true')

// Get featured testimonials
fetch('/api/testimonials?featured=true')

// Get recent testimonials
fetch('/api/testimonials?recent=true&limit=5')

// Get testimonials by company
fetch('/api/testimonials?company=google')

// Get high-rated testimonials
fetch('/api/testimonials?rating=4')
```

**Response Format:**
```json
[
  {
    "id": "testimonial-id",
    "name": "John Doe",
    "role": "CEO",
    "company": "Tech Corp",
    "content": "Outstanding work on our project...",
    "avatar": "/images/avatar.jpg",
    "rating": 5,
    "featured": true,
    "approved": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### Create Testimonial
```http
POST /api/testimonials
```

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "CEO",
  "company": "Tech Corp",
  "content": "Outstanding work on our project...",
  "avatar": "/images/avatar.jpg",
  "rating": 5
}
```

### Contact

#### Submit Contact Form
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

### Newsletter

#### Subscribe to Newsletter
```http
POST /api/newsletter
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

## Using the API Client

The application includes a built-in API client for easy data fetching:

```javascript
import { ApiClient } from '@/lib/api/client'

// Get featured projects
const projects = await ApiClient.getProjects({ featured: true })

// Get recent blog posts
const posts = await ApiClient.getBlogPosts({ recent: true, limit: 5 })

// Get current experiences
const experiences = await ApiClient.getExperiences({ current: true })

// Get top skills
const skills = await ApiClient.getSkills({ top: true, limit: 10 })

// Get featured testimonials
const testimonials = await ApiClient.getTestimonials({ featured: true })

// Submit contact form
await ApiClient.submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
})
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message description"
}
```

## Database Integration

The API uses Prisma ORM with the following models:
- `Project` - Portfolio projects
- `BlogPost` - Blog articles
- `Experience` - Work experience
- `Skill` - Technical skills
- `Testimonial` - Client testimonials
- `ContactSubmission` - Contact form submissions
- `NewsletterSubscription` - Newsletter subscribers
- `Technology` - Technologies/tools
- `User` - User profiles

All data is stored in a PostgreSQL database and accessed through the service layer for proper data validation and error handling. 