export interface PinnedRepo {
  url: string;
}

export interface GithubData {
  name: string;
  pinned: PinnedRepo[];
  avatar: string;
  repos: number;
}

export interface ProjectData {
 name: string;
}
