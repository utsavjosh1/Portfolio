"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Upload, CheckCircle, AlertCircle, X } from "lucide-react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  // Process the selected file
  const handleFile = (file: File) => {
    // Reset states
    setError(null);

    // Check if file is an image
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Update the file input
    if (inputFileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputFileRef.current.files = dataTransfer.files;
    }
  };

  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files?.length) {
      setError("Please select an image to upload");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    setBlob(null);
    setPreview(null);
    setError(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Camera className="h-10 w-10 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-primary to-indigo-600 text-transparent bg-clip-text">
                Upload Your Avatar
              </h1>
            </div>

            <AnimatePresence mode="wait">
              {blob ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="mb-4"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>
                    <h2 className="text-xl font-semibold mb-2">
                      Upload Successful!
                    </h2>

                    <div className="mb-6 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                      <img
                        src={blob.url}
                        alt="Uploaded avatar"
                        className="h-32 w-32 object-cover"
                      />
                    </div>

                    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm break-all">
                      <p className="font-mono text-gray-800 dark:text-gray-200">
                        {blob.url}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <a
                        href={blob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        View Image
                      </a>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Upload Another
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="upload-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      name="file"
                      ref={inputFileRef}
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    <div className="flex flex-col items-center justify-center text-center">
                      <AnimatePresence mode="wait">
                        {preview ? (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative mb-4 group"
                          >
                            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                              <img
                                src={preview}
                                alt="Avatar preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleReset}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="upload-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Upload className="h-16 w-16 text-gray-400 mb-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <h3 className="text-lg font-medium mb-1">
                        {preview ? "Ready to upload!" : "Drop your image here"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {preview
                          ? "Looking good! Click upload when ready."
                          : "or click to browse (PNG, JPG, WEBP)"}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Maximum file size: 5MB
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                      >
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !preview}
                    className={`w-full py-3 px-4 rounded-xl font-medium shadow transition-all
                      ${
                        preview
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      }
                      ${loading ? "opacity-70 cursor-wait" : ""}
                    `}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Upload Avatar"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
