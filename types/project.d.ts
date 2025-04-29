export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  github?: string;
  year?: number;
  demo?: string;
  pinned: boolean;
  tags?: string[] | undefined;
}
