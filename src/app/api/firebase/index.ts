import { storage } from "@/config/firebase";
import { ref, getDownloadURL, list } from "firebase/storage";

// Fetch a single image's URL by its name
export const getImage = async (name: string) => {
  try {
    const storageRef = ref(storage, `Images/${name}`);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error: any) {
    console.error("Error fetching image:", error.message, error.code);
    throw error;
  }
};

// Fetch list of all images in the 'Images' directory with pagination support
export const getImagesList = async () => {
  try {
    const listRef = ref(storage, "Images");
    let allItems: any[] = [];
    let nextPageToken: string | undefined;

    do {
      const listResult = await list(listRef, {
        maxResults: 1000, // Number of items per page
        pageToken: nextPageToken,
      });

      allItems = [...allItems, ...listResult.items];

      // If there are more items, set the nextPageToken to get the next page of results
      nextPageToken = listResult.nextPageToken;
    } while (nextPageToken);

    const imageUrls = await Promise.all(
      allItems.map(async (item) => {
        try {
          const imageUrl = await getDownloadURL(item);
          return imageUrl;
        } catch (itemError) {
          console.error(
            "Error fetching image URL for item:",
            item.name,
            itemError
          );
        }
      })
    );
    return imageUrls;
  } catch (error: any) {
    console.error("Error fetching image list:", error.message, error.code);
    throw error;
  }
};
