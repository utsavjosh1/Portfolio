import type { Project } from "@/types";

const Projects: Project[] = [
  {
    _id: "1",
    project_name: "Course Application",
    project_img: "/image/projects/project1.png",
    project_link: "https://github.com/JoshiUtsav/courseapp-frontend",
    description: "",
    tech_used: [
      { name: "Typescript", img: "/image/skills/react.png" },
      { name: "React JS", img: "/image/skills/react.png" },
      { name: "Vercel", img: "/image/skills/vercel.png" },
      { name: "Tailwind", img: "/image/skills/tailwind.png" },
      { name: "MongoDB", img: "/image/skills/mongodb.png" },
      { name: "Nodejs", img: "/image/skills/node-js.png" },
      { name: "Express", img: "/image/skills/express.png" },
      { name: "Swagger", img: "/image/skills/express.png" },
      { name: "React Testing", img: "/image/skills/express.png" },
      { name: "Redux Toolkit", img: "/image/skills/express.png" },
    ],
  },
  {
    _id: "2",
    project_name: "Chat Application",
    project_img: "/image/projects/projects2.png",
    project_link: "https://github.com/JoshiUtsav/ChatApp",
    description: "",
    tech_used: [
      { name: "HTML", img: "/image/skills/react.png" },
      { name: "CSS", img: "/image/skills/react.png" },
      { name: "Javascript", img: "/image/skills/mongodb.png" },
      { name: "Nodejs", img: "/image/skills/node-js.png" },
      { name: "Express", img: "/image/skills/express.png" },
      { name: "Socket.io", img: "/image/skills/express.png" },
      { name: "Render", img: "/image/skills/vercel.png" },
    ],
  },
  {
    _id: "3",
    project_name: "Vector Search",
    project_img: "/image/projects/projects2.png",
    project_link: "https://github.com/JoshiUtsav/vector-search",
    description: "",
    tech_used: [
      { name: "Typescript", img: "/image/skills/react.png" },
      { name: "Nextjs", img: "/image/skills/react.png" },
      { name: "Pinecone", img: "/image/skills/react.png" },
      { name: "PostgresSql", img: "/image/skills/react.png" },
      { name: "OpenAI", img: "/image/skills/react.png" },
      { name: "Shadcn", img: "/image/skills/react.png" },
      { name: "LangChain", img: "/image/skills/react.png" },
      { name: "Docker", img: "/image/skills/react.png" },
      { name: "Redis", img: "/image/skills/react.png" },
      { name: "Tailwind", img: "/image/skills/tailwind.png" },
      { name: "Vercel", img: "/image/skills/react.png" },
    ],
  },
];

export default Projects;
