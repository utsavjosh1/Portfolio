export interface TechUsed {
  name: string;
  img: string;
}

export interface Project {
  _id: string;
  project_name: string;
  project_img: string;
  project_link: string;
  description: string;
  tech_used: TechUsed[];
}
