"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
// import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "@/components/ui/use-toast";
import useIsLoading from "@/hooks/modals/useIsLoading";
import useCategory from "@/hooks/useCategory";
import useFormCategoryModal from "@/hooks/modals/useFormCategoryModal";
// import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: Category;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const formModal = useFormCategoryModal();
  const pageLoading = useIsLoading();

  const { mutate: categoryMutate } = useCategory();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      pageLoading.onLoading();
      setLoading(true);

      await axios.delete(`/api/category/?id=${data.id}`);
      categoryMutate();
      toast({
        title: "Deleted success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error?.message}`,
      });
    } finally {
      setLoading(false);
      setOpen(false);

      pageLoading.onLoaded();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => formModal.onOpen(data.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
