"use client";

import React, { useEffect, useState } from "react";

import { Image as ImageType, Students } from "@prisma/client";
import { join } from "path";
import { Merge } from "react-hook-form";
import Image from "next/image";

interface CardStudentProps {
  data: Merge<Students, { image: ImageType | null }> | null;
}

function CardStudent({ data }: CardStudentProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  setTimeout(() => {
    setSelectedFile("/images/placeholder.png");
    const image = data?.image;
    if (image) {
      setSelectedFile(join(image.imageFullUrl, image.filename));
    }
  }, 0);

  return (
    <div className="w-full mx-auto flex flex-row gap-x-2 items-center">
      <Image
        src={selectedFile!}
        alt="Preview"
        className="h-[75px] w-[75px] object-contain rounded-xl p-1 border"
      />
      <div>
        <p>
          <b>รหัสนักเรียน : </b>
          {data?.student_no!}
        </p>
        <p>
          <b>ชื่อ : </b>
          {data?.title!}
          {data?.f_name!} {data?.l_name!}
        </p>
        <p>
          <b>ชื่อเล่น : </b>
          {data?.nickname!}
        </p>
      </div>
    </div>
  );
}

export default CardStudent;
