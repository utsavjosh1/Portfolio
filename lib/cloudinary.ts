import { CldImage, CldConfig } from "next-cloudinary";

const cloudinaryConfig = {
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

/**
 * Fetches all images from Cloudinary.
 *
 * @returns {Promise<string>} A promise that resolves to the URL of the fetched image.
 * @throws {Error} If there is an error fetching the image.
 */
const getAllImages = () =>
  fetch(
    "https://res.cloudinary.com/" +
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
      "/image/upload/v1705006511/sample.jpg"
  ).then((response) => {
    return response.url;
  });

export default getAllImages;
