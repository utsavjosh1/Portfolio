export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  github?: string;
  demo?: string;
  year: number;
  pinned: boolean;
  tags?: string[] | undefined;
}
