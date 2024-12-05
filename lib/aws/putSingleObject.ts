import { promises as fs } from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./s3";

interface UploadedFile {
  path: string;
  filename: string;
  mimetype: string;
}

interface UploadedFileUrl {
  filename: string;
  url: string;
}

export const putSingleObject = async (
  file: UploadedFile,
  folder: string
): Promise<UploadedFileUrl> => {
  // Validate environment variables
  const bucketName = process.env.BUCKET_NAME;
  const bucketRegion = process.env.BUCKET_REGION_NAME;

  if (!bucketName || !bucketRegion) {
    throw new Error(
      "Environment variables BUCKET_NAME and BUCKET_REGION_NAME must be defined."
    );
  }

  try {
    // Read file content
    const fileContent = await fs.readFile(file.path);

    // Create the command to upload the file to S3
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `${folder}/${file.filename}`,
      ContentType: file.mimetype,
      Body: fileContent,
    });

    // Send the command to S3
    await client.send(command);

    // Construct the public URL for the uploaded file
    const uploadUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${folder}/${file.filename}`;

    // Delete the local file after upload
    await fs.unlink(file.path);

    // Return the filename and public URL
    return {
      filename: file.filename,
      url: uploadUrl,
    };
  } catch (error) {
    console.error(`Error uploading file ${file.filename}:`, error);
    throw new Error(
      `Could not upload ${file.filename}. ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
