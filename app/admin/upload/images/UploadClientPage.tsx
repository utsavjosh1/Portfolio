"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  FileImage,
  Copy,
  ExternalLink,
  RefreshCw,
  Info,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AdminNav } from "@/components/admin/admin-nav";

interface UploadedImage extends PutBlobResult {
  uploadedAt: string;
  originalName: string;
  fileSize: number;
}

export function UploadClientPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadHistory, setUploadHistory] = useState<UploadedImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const savedUploads = localStorage.getItem("uploadedImages");
    if (savedUploads) {
      try {
        setUploadHistory(JSON.parse(savedUploads));
      } catch (error) {
        console.error("Error loading upload history:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadHistory));
  }, [uploadHistory]);

  const generateUniqueFilename = (originalName: string): string => {
    const timestamp = Date.now();
    const extension = originalName.split(".").pop();
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    return `${nameWithoutExt}_${timestamp}.${extension}`;
  };

  const handleFile = useCallback(
    (file: File) => {
      const isDuplicate = uploadHistory.some(
        (upload) =>
          upload.originalName === file.name && upload.fileSize === file.size
      );
  
      setError(null);
      setSelectedFile(file);
  
      if (!file.type.match("image.*")) {
        setError("Please select an image file (PNG, JPG, WEBP, GIF)");
        return;
      }
  
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB");
        return;
      }
  
      if (isDuplicate) {
        setError("This image has already been uploaded. Please select a different file.");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
  
      if (inputFileRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputFileRef.current.files = dataTransfer.files;
      }
    },
    [uploadHistory]
  );
  
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const uniqueFilename = generateUniqueFilename(selectedFile.name);

      const response = await fetch(
        `/api/image/upload?filename=${uniqueFilename}`,
        {
          method: "POST",
          body: selectedFile,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const newBlob = (await response.json()) as PutBlobResult;

      const uploadedImage: UploadedImage = {
        ...newBlob,
        uploadedAt: new Date().toISOString(),
        originalName: selectedFile.name,
        fileSize: selectedFile.size,
      };

      setBlob(newBlob);
      setUploadHistory((prev) => [uploadedImage, ...prev.slice(0, 9)]);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBlob(null);
    setPreview(null);
    setError(null);
    setSelectedFile(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const removeFromHistory = (url: string) => {
    setUploadHistory((prev) => prev.filter((item) => item.url !== url));
    toast.success("Image removed from history");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatUploadDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Image Upload
          </h1>
          <p className="text-muted-foreground">
            Upload and manage images for your portfolio
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Upload New Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {blob ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6"
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
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                      </motion.div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Upload Complete!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Your image has been uploaded successfully
                      </p>

                      <div className="w-full max-w-xs mx-auto mb-6">
                        <div className="relative group overflow-hidden rounded-lg border border-border">
                          <Image
                            src={blob.url}
                            alt="Uploaded image"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                      </div>

                      <div className="w-full space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <FileImage className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono text-muted-foreground truncate flex-1">
                            {blob.url}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(blob.url)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(blob.url, "_blank")}
                            className="flex-1"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Image
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                            className="flex-1"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Upload Another
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="upload-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
                        dragActive
                          ? "border-primary bg-primary/5 scale-105"
                          : "border-border hover:border-primary/50"
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
                              <div className="w-32 h-32 rounded-lg overflow-hidden border border-border shadow-sm">
                                <Image
                                  src={preview}
                                  alt="Image preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleReset}
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="upload-icon"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="mb-4"
                            >
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="h-8 w-8 text-primary" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <h3 className="text-lg font-medium mb-2 text-foreground">
                          {preview ? "Ready to upload" : "Drop image here"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {preview
                            ? "Click upload to continue"
                            : "or click to browse files"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Info className="h-3 w-3" />
                          PNG, JPG, WEBP, GIF • Max 10MB
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center p-3 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive"
                        >
                          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                          <p className="text-sm">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={loading || !preview}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Upload History */}
          <div className="space-y-6">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="h-5 w-5 text-primary" />
                  Recent Uploads ({uploadHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadHistory.length > 0 ? (
                  <div className="space-y-3">
                    {uploadHistory.map((item, index) => (
                      <motion.div
                        key={item.url}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                          <Image
                            src={item.url}
                            alt="Uploaded image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.originalName}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatFileSize(item.fileSize)}</span>
                            <span>•</span>
                            <span>{formatUploadDate(item.uploadedAt)}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.url)}
                            className="h-8 w-8 p-0"
                            title="Copy URL"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(item.url, "_blank")}
                            className="h-8 w-8 p-0"
                            title="View image"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromHistory(item.url)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Remove from history"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No uploads yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload your first image to see it here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Guidelines */}
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Supported
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      PNG, JPG, WEBP, GIF
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Max Size
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      10MB per image
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Storage
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Vercel Blob Storage
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Features
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Drag & drop, preview, copy URL
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Duplicate Check
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Prevents uploading same file twice
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
