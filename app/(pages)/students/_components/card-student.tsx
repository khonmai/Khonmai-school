"use client";

import React, { useEffect, useState } from "react";

import { ClassRoom, Image as ImageType, Students } from "@prisma/client";
import { join } from "path";
import { Merge } from "react-hook-form";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useFormStudentModal from "@/hooks/modals/useFormStudentModal";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Edit } from "lucide-react";

type studentClassroom = Merge<Students, { classroom: ClassRoom }>;

interface CardStudentProps {
  data: Merge<studentClassroom, { image: ImageType | null }> | null;
  isEdit?: boolean;
}

function CardStudent({ data, isEdit = false }: CardStudentProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const formModal = useFormStudentModal();

  useEffect(() => {
    setSelectedFile("/images/placeholder.png");
    const image = data?.image;
    if (image) {
      setSelectedFile(image.imageFullUrl + image.filename);
    }
  }, []);

  return (
    <>
      {isEdit ? (
        <Card className="group/card w-[300px] relative">
          <CardHeader>
            <CardTitle>No. {data?.student_no!}</CardTitle>
            <div className="absolute right-4 top-2 group-hover/card:block hidden ">
              <Button
                size={"icon"}
                className="rounded-full"
                variant={"primary"}
                onClick={() => formModal.onOpen(data?.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mt-[-16px]">
              <img
                src={selectedFile!}
                alt="Preview"
                className="h-[150px] w-[250px] object-cover rounded-xl p-1 "
              />
            </div>

            <div className="grid items-start pt-4 ">
              <div className="w-[250px]">
                <p className="text-lg font-medium leading-none truncate mb-2">
                  {data?.title!}
                  {data?.f_name!} {data?.l_name!}
                </p>
                <p className="text-base text-muted-foreground mb-2">
                  {data?.nickname!}
                </p>
                <div className="flex justify-between">
                  <p>{data?.classroom?.name}</p>
                  {/* <p>{data?.classroom?.name}</p> */}
                  <p className="text-base text-muted-foreground text-right">
                    {data?.birthdate
                      ? format(data?.birthdate, "dd MMMM yyyy")
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-[250px] mx-auto flex flex-row gap-x-2 items-center">
          <img
            src={selectedFile!}
            alt="Preview"
            className="h-[75px] w-[75px] object-contain rounded-xl p-1 border"
          />
          <div className="w-[180px]">
            <p className="truncate">
              <b>รหัสนักเรียน : </b>
              {data?.student_no!}
            </p>
            <p className="truncate">
              <b>ชื่อ : </b>
              {data?.title!}
              {data?.f_name!} {data?.l_name!}
            </p>
            <p className="truncate">
              <b>ชื่อเล่น : </b>
              {data?.nickname!}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CardStudent;
