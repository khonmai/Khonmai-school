// @ts-check
"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useClassRoom from "@/hooks/useClassRoom";
import useDistrict from "@/hooks/useDistrict";
import useFormModal from "@/hooks/modals/useFormStudentModal";
import useProvince from "@/hooks/useProvince";
import useStudents from "@/hooks/useStudents";
import useSubdistrict from "@/hooks/useSubdistrict";
import useTrip from "@/hooks/useTrip";
import axios from "axios";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import { Merge, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import ImageUpload from "@/components/image-upload";
import { StudentSchema } from "./form-schema";
import { Image as ImageType, Students } from "@prisma/client";

interface FormStudentProps {
  // initialData: Students | null;
  initialData: Merge<Students, { image: ImageType }>;
}

function FormStudent({ initialData }: FormStudentProps) {
  const formModal = useFormModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [isDisableDistrict, setIsDisableDistrict] = useState(true);
  const [isDisableSubDistrict, setIsDisableSubDistrict] = useState(true);
  const [selectedClassRoom, setSelectedClassRoom] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [imageFile, setImateFile] = useState<File>();

  const [isEdit, setIsEdit] = useState(false);

  const { mutate: studentMutate } = useStudents();

  const form = useForm<Students>({
    resolver: zodResolver(StudentSchema),
    defaultValues: initialData || {
      adderss_1: null,
      adderss_2: null,
      remark: null,
    },
  });

  const { data: province = [] } = useProvince();
  let province_data = province.map((data: any) => {
    return {
      value: data.code.toString(),
      label: data.name_th,
    };
  });

  const { data: district = [] } = useDistrict(selectedProvince);
  let district_data = district.map((data: any) => {
    return {
      value: data.code.toString(),
      label: data.name_th,
    };
  });

  const { data: subdistrict = [] } = useSubdistrict(selectedDistrict);
  let subdistrict_data = subdistrict.map((data: any) => {
    return {
      value: data.code.toString(),
      label: data.name_th,
    };
  });

  const { data: classroom = [] } = useClassRoom();
  let classroom_data = classroom.map((data: any) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  const { data: trip = [] } = useTrip();
  let trip_data = trip.map((data: any) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
      handleOnSelectedProvince(initialData.province ?? "41");
      handleOnSelectedDistrict(initialData.district);
      handleOnSelectedSubDistrict(initialData.sub_district);
      handleOnSelectedClassRoom(initialData.classroom_id);
      handleOnSelectedTrip(initialData.trip_id);
    }
  }, [initialData]);

  const handleOnSelectedClassRoom = (val: any) => {
    setSelectedClassRoom(val);
  };

  const handleOnSelectedTrip = (val: any) => {
    setSelectedTrip(val);
  };

  const handleOnSelectedProvince = (val: any) => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedSubDistrict("");

    if (val) {
      setSelectedProvince(val);
      setIsDisableDistrict(false);
    } else {
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedSubDistrict("");
      setIsDisableDistrict(true);
    }
  };

  const handleOnSelectedDistrict = (val: any) => {
    if (val != selectedDistrict) {
      setSelectedDistrict(val);
      setIsDisableSubDistrict(false);
    } else {
      setSelectedDistrict("");
      setSelectedSubDistrict("");
      setIsDisableSubDistrict(true);
    }
  };

  const handleOnSelectedSubDistrict = (val: any) => {
    if (val) {
      setSelectedSubDistrict(val);
      setIsDisableSubDistrict(false);
    } else {
      setSelectedSubDistrict("");
    }
  };

  const onSubmit = async (data: Students) => {
    setIsLoading(true);

    const image_id = await handleFileUpload(imageFile);
    if (
      initialData?.image_id &&
      image_id &&
      image_id !== initialData?.image_id
    ) {
      await handleRemoveImage(initialData?.image_id!);
    }

    console.log("imageFile", imageFile);
    console.log("image_id", image_id);
    console.log("initialData", initialData?.image_id!);

    let body = {
      student_no: data.student_no,
      title: data.title,
      f_name: data.f_name,
      l_name: data.l_name,
      nickname: data.nickname,
      birthdate: birthDate,
      adderss_1: data.adderss_1,
      adderss_2: data.adderss_2,
      province: selectedProvince,
      district: selectedDistrict,
      sub_district: selectedSubDistrict,
      phone: data.phone,
      remark: data.remark,
      classroom_id: selectedClassRoom,
      trip_id: selectedTrip,
      image_id: imageFile ? image_id : initialData?.image_id,
    };

    if (isEdit) {
      update(body, initialData?.id!);
    } else {
      create(body);
    }
    // setIsLoading(true);
  };

  const create = async (data: any) => {
    try {
      await axios.post("/api/student", data);
      studentMutate();
      formModal.onClose();
      toast({
        title: "Success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data: any, id: string) => {
    try {
      await axios.patch(`/api/student/?id=${id}`, data);
      studentMutate();
      formModal.onClose();
      toast({
        title: "Updated success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Updated error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  async function handleFileUpload(file: File | undefined) {
    if (!file) {
      return null; // User canceled file selection
    }

    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/api/image", formData);
    return res.data.image.id;
  }

  async function handleRemoveImage(id: string) {
    if (id) {
      await axios.delete(`/api/image/?id=${id}`);
    }
  }

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">
        {initialData ? "Edit Student" : "Add Student"}
      </h2>
      <Separator className="mt-4" />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap flex-grow space-y-2 space-x-4 w-full"
          >
            <FormField
              control={form.control}
              name="image_id"
              render={({ field }) => (
                <FormItem className="w-full flex justify-center pb-2">
                  <FormControl>
                    <ImageUpload
                      onSelected={(file) => setImateFile(file)}
                      image={initialData?.image ?? null}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="student_no"
              render={({ field }) => {
                return (
                  <FormItem className="min-w-[250px]">
                    <FormLabel>รหัสนักเรียน</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>คำนำหน้า</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="f_name"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="l_name"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>สกุล</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ชื่อเล่น</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>วันเกิด</FormLabel>
                  <FormControl>
                    <DatePicker
                      onSelected={setBirthDate}
                      // onSelected={(e)=> field.value = e}
                      date_value={initialData?.birthdate!}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adderss_1"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ที่อยู่ 1</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adderss_2"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ที่อยู่ 2</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>จังหวัด</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={province_data}
                      label="Province"
                      onSelected={handleOnSelectedProvince}
                      data_value={selectedProvince}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>อำเภอ</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={isDisableDistrict ? [] : district_data}
                      label="District"
                      onSelected={handleOnSelectedDistrict}
                      data_value={selectedDistrict}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sub_district"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ตำบล</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={isDisableSubDistrict ? [] : subdistrict_data}
                      label="Sub-District"
                      onSelected={handleOnSelectedSubDistrict}
                      data_value={selectedSubDistrict}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>โทรศัพท์</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="classroom_id"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ชั้นเรียน</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={classroom_data}
                      label="District"
                      onSelected={handleOnSelectedClassRoom}
                      data_value={selectedClassRoom}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trip_id"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>สายรถ</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={trip_data}
                      label="District"
                      onSelected={handleOnSelectedTrip}
                      data_value={selectedTrip}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>หมายเหตุ</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isLoading} variant={"primary"}>
              บันทึก
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default FormStudent;
