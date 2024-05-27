import Link from "next/link";
import localFont from "next/font/local";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col")}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className=" h-6 w-6 mr-2" /> No 1 task managment
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-2 w-fit">
          work forword.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-screen-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high risesto the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href={"/sign-up"}>Get Taskify for free</Link>
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              {`Make changes to your profile here. Click save when you're done.`}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MarketingPage;
