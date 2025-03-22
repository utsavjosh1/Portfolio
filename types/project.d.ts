export interface ProjectProps {
  id: string
  title: string
  description: string
  imageUrl: string
  github?: string
  demo?: string
  year: string
  pinned: boolean
  tags?: string[]
  created_at: string
}

