import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

/**
 * Fetches all images from Cloudinary.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of image URLs.
 * @throws {Error} If there is an error fetching the images.
 */
const getAllImages = async () => {
  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
    });

    await getAllFolders();

    // Extract URLs from the response
    const imageUrls = response.resources.map((resource) => resource.public_id);
    console.log(response);
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    throw new Error("Failed to fetch images");
  }
};

const getAllFolders = async () => {
  try {
    const response = await cloudinary.api.root_folders();
    const folders = response.folders.map((folder) => folder.path);
    
    console.log(folders);
    

    return folders;
  } catch (error) {
    console.error("Error fetching folders from Cloudinary:", error);
    throw new Error("Failed to fetch folders");
  }
};

export default getAllImages;
