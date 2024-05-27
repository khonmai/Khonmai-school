"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  MenuIcon,
  Gauge,
  Settings,
  FolderKanban,
  Package,
  School2,
  User,
  Users,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Item from "./menu-item";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavigationNavbar } from "./navigation-navbar";
import { UserItem } from "./user-item";
import { signOut } from "next-auth/react";
import useMenuCollaps from "@/hooks/useMenuCollaps";
import { menuData } from "../../(config)/menu-data";
import MenuItem from "./menu-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import { Navbar } from "./navbar";

export const Navigation = () => {
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const router = useRouter();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const menuCollaps = useMenuCollaps();
  // isMobile ? menuCollaps.onClose() : menuCollaps.onOpen();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      menuCollaps.onOpen();
      // setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      menuCollaps.onClose();
      // setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full text-sea-green-50 bg-sea-green-700 relative flex w-60 flex-col z-9999",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0 ",
          menuCollaps.isCollapsed && "px-0"
        )}
      >
        <ScrollArea>
          <div
            onClick={collapse}
            role="button"
            className={cn(
              "h-6 w-6 text-sea-green-200 rounded-sm hover:bg-sea-green-600 hover:text-sea-green-50 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </div>
          <div>
            <UserItem />
            <Separator className="mb-2" />
            {menuData &&
              menuData.map((menu) => {
                const isActive = pathname === menu.url;

                return (
                  <MenuItem
                    onClick={() => {
                      router.push(menu.url);
                    }}
                    label={menu.label}
                    icon={menu.icon ?? LifeBuoy}
                    child={menu.child as []}
                    active={isActive}
                  />
                );
              })}
            {false && (
              <div>
                <div className="bg-primary">primary</div>
                <div className="bg-secondary">secondary</div>
                <div className="bg-background">background</div>
                <div className="bg-sea-green-950">sea-green-950</div>
                <div className="bg-sea-green-900">sea-green-900</div>
                <div className="bg-sea-green-800">sea-green-800</div>
                <div className="bg-sea-green-700">sea-green-700</div>
                <div className="bg-sea-green-600">sea-green-600</div>
                <div className="bg-sea-green-500">sea-green-500</div>
                <div className="bg-sea-green-400">sea-green-400</div>
                <div className="bg-sea-green-300">sea-green-300</div>
                <div className="bg-sea-green-200">sea-green-200</div>
                <div className="bg-sea-green-100">sea-green-100</div>
                <div className="bg-sea-green-50">sea-green-50</div>
                <div className="bg-silver-tree-950">silver-tree-950</div>
                <div className="bg-silver-tree-900">silver-tree-900</div>
                <div className="bg-silver-tree-800">silver-tree-800</div>
                <div className="bg-silver-tree-700">silver-tree-700</div>
                <div className="bg-silver-tree-600">silver-tree-600</div>
                <div className="bg-silver-tree-500">silver-tree-500</div>
                <div className="bg-silver-tree-400">silver-tree-400</div>
                <div className="bg-silver-tree-300">silver-tree-300</div>
                <div className="bg-silver-tree-200">silver-tree-200</div>
                <div className="bg-silver-tree-100">silver-tree-100</div>
                <div className="bg-silver-tree-50">silver-tree-50</div>
                <div className="bg-tidal-950">tidal-950</div>
                <div className="bg-tidal-900">tidal-900</div>
                <div className="bg-tidal-800">tidal-800</div>
                <div className="bg-tidal-700">tidal-700</div>
                <div className="bg-tidal-600">tidal-600</div>
                <div className="bg-tidal-500">tidal-500</div>
                <div className="bg-tidal-400">tidal-400</div>
                <div className="bg-tidal-300">tidal-300</div>
                <div className="bg-tidal-200">tidal-200</div>
                <div className="bg-tidal-100">tidal-100</div>
                <div className="bg-tidal-50">tidal-50</div>
              </div>
            )}
          </div>
          <Separator className="my-2" />
          <Item
            onClick={() => {
              signOut().then(() => {
                router.push("/");
              });
            }}
            label="Logout"
            icon={LogOut}
          />

          {/* <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-sea-green-500 right-0 top-0"
          /> */}
        </ScrollArea>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {true ? (
          <NavigationNavbar
            // isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {menuCollaps.isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 gull-gray-950"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
