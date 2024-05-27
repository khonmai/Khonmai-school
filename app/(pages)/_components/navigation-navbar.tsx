"use client";

import useMenuCollaps from "@/hooks/useMenuCollaps";
import { cn } from "@/lib/utils";
import { ChevronRight, MenuIcon } from "lucide-react";
// import { Title } from "./title";
// import { Banner } from "./banner";
// import { Menu } from "./menu";
// import { Publish } from "./publish";

interface NavigationNavbarProps {
  onResetWidth: () => void;
}

export const NavigationNavbar = ({ onResetWidth }: NavigationNavbarProps) => {
  const menuCollaps = useMenuCollaps();

  return (
    <>
      {!menuCollaps.isCollapsed && (
        <div
          onClick={onResetWidth}
          role="button"
          className={cn(
            "h-7 w-7 p-0.5 text-sea-green-950 rounded-sm hover:bg-sea-green-600 hover:text-sea-green-50 absolute top-2 left-2 transition",
            menuCollaps.isCollapsed ? "opacity-0" : "opacity-100"
          )}
        >
          <MenuIcon className="h-6 w-6" />
        </div>
      )}
      {/* <nav className="bg-background dark:bg-[#d8d8d8] px-3 py-2 flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground "
          />
        )}
        <div className="flex items-center justify-end h-6 w-6"></div>
      </nav> */}

      {/* {document.isArchived && <Banner documentId={document._id} />} */}
    </>
  );
};
