import { GithubData, ProjectData } from "@/types/github";
import gs from "github-scraper";

const githubUsername: string = "/joshiutsav";

/**
 * Fetches the GitHub profile data for a specified username.
 *
 * @param {string} [username] - The GitHub username to fetch data for. Defaults to {@link githubUsername}.
 * @returns {Promise<GithubData>} A Promise resolving to the user's GitHub profile data.
 */
export function fetchGithubData(
  username: string = githubUsername
): Promise<GithubData> {
  return new Promise((resolve, reject) => {
    gs(username, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data as GithubData);
      }
    });
  });
}

/**
 * Fetches the pinned projects for a specified GitHub username.
 *
 * @param {string} [username] - The GitHub username to fetch pinned projects for.
 * @returns {Promise<ProjectData[]>} A Promise resolving to an array of pinned projects.
 */
export function fetchPinnedProjects(
  username: string = githubUsername
): Promise<ProjectData[]> {
  return new Promise((resolve, reject) => {
    gs(username, (error, data) => {
      if (error) {
        reject(error);
      } else if (data && data.pinnedProjects) {
        resolve(data.pinnedProjects as ProjectData[]);
      } else {
        reject(new Error(`Failed to fetch pinned projects for ${username}`));
      }
    });
  });
}

/**
 * Fetches detailed project data from a specified GitHub URL.
 *
 * @param {string} url - The GitHub URL of the project.
 * @returns {Promise<ProjectData>} A Promise resolving to the project's details.
 */
export function fetchProjectData(url: string): Promise<ProjectData> {
  return new Promise((resolve, reject) => {
    gs(url, (error, data) => {
      if (error || !data) {
        reject(new Error(`Failed to fetch project data for ${url}`));
      } else {
        resolve(data as ProjectData);
      }
    });
  });
}
