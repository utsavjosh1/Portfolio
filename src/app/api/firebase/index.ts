import { storage } from "@/config/firebase";
import { ref, getDownloadURL, listAll, StorageError } from "firebase/storage";

export const getImages = async (name: string) => {
  try {
    const storageRef = ref(
      storage,
      `gs://portfolio-1825f.appspot.com/Images/${name}`
    );
    const images = await getDownloadURL(storageRef);

    console.log(images);
    return images;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
