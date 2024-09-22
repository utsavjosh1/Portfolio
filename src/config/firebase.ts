// Get Images

import { storage } from "@/app/api/firebase/config";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export const getImages = async (name: string) => {
  const storageRef = ref(
    storage,
    `gs://portfolio-1825f.appspot.com/Images/${name}`
  );
  const images = await getDownloadURL(storageRef);
  return images;
};
