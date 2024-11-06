import { GithubData, ProjectData } from "@/types/github";
import gs from "github-scraper";

export async function fetchGithubData(): Promise<GithubData> {
  return new Promise((resolve) => {
    console.log("Fetching GitHub data...");
    setTimeout(() => {
      resolve({
        name: "Utsav Joshi",
        pinned: [{ url: "" }, { url: "" }],
        avatar: "https://avatars.githubusercontent.com/u/98454866?v=4",
        repos: 10,
      });
    }, 1000);
  });
}

export async function fetchProjectData(url: string): Promise<ProjectData> {
  return new Promise((resolve, reject) => {
    gs(url, (err, data) => {
      console.log(data);

      if (err) {
        reject(err);
      } else {
        resolve(data as ProjectData);
      }
    });
  });
}
