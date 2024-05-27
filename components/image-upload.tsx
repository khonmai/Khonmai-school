"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import axios from "axios";
import { join } from "path";

interface InputFileProps {
  onSelected: (date: File) => void;
  image: any;
}

const pathProfile = "/images/profiles";

export default function ImageUpload({ onSelected, image }: InputFileProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setTimeout(() => {
        setSelectedFile(join(image.imageFullUrl, image.filename));
      }, 0);
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
      onSelected(file);
      // handleFileUpload(e.target.files?.[0]);
    }
  };

  const handleRemoveClick = async () => {
    // handleRemoveImate(filename!);
    setSelectedFile(null);
    setFilename(null);
  };

  async function handleFileUpload(file: File | undefined) {
    if (!file) {
      return; // User canceled file selection
    }

    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/api/image", formData);
    setFilename(res.data.filename);
    setSelectedFile(join(pathProfile, "/", res.data.filename));
  }

  async function handleRemoveImate(file_name: string) {
    if (file_name) {
      const res = await axios.delete(`/api/image/?filename=${file_name}`);
    }
  }

  return (
    <div className="grid max-w-sm items-center gap-1.5 ">
      {selectedFile ? (
        <div className="mt-2 relative group/image flex justify-center ">
          <img
            src={selectedFile}
            alt="Preview"
            className="h-[160px] w-[160px] object-contain rounded-xl"
          />
          <X
            onClick={handleRemoveClick}
            className="h-4 w-4 cursor-pointer absolute bottom-0 opacity-0 group-hover/image:opacity-100 group-hover/image:bg-destructive group-hover/image:text-stone-100 rounded-full transition"
            aria-label="Remove image"
          />
          {/* <button
            onClick={handleRemoveClick}
            className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2"
            aria-label="Remove image"
          >
            X
          </button> */}
        </div>
      ) : (
        <div className="mt-2 relative group/image">
          <Label htmlFor="picture" className=" cursor-pointer">
            <img
              className="h-[160px] w-[160px] object-contain rounded-xl"
              src={"/images/placeholder.png"}
              alt="Preview"
            />
          </Label>
          <Input
            id="picture"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
