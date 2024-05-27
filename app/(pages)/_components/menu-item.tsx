"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, LucideIcon, LifeBuoy } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ItemProps {
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  child?: [];
}

const MenuItem = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  child = [],
}: ItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [childData, setChildData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [childActive, setChildActive] = useState(false);
  const [childeHeight, setChildeHeight] = useState("h-[190px]");

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  setTimeout(() => {
    const _active = child?.find((f: any) => f?.url! == pathname);
    setChildActive(false);
    if (_active) {
      setChildActive(true);
    }
    setChildeHeight(`h-[${child.length * 38}px]`);
  }, 0);

  const handelExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    setExpanded(!expanded);
    setChildData(expanded ? [] : child);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (child.length > 0) {
      handelExpand(event);
    } else {
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <>
      <div
        onClick={handleMenuClick}
        role="button"
        style={{ paddingLeft: level ? `${level * 18 + 28}px` : "20px" }}
        className={cn(
          "group min-h-[38px] text-sm py-1 pr-3 w-full hover:bg-sea-green-600 flex items-center text-sea-green-50 font-medium",
          (active || childActive) && "bg-sea-green-600/50  font-bold"
        )}
      >
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-sea-green-50" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
            <span className="text-xs text-[8px]">⌃⌘</span>+K
          </kbd>
        )}
        {child.length > 0 && (
          <div
            role="button"
            className="h-full rounded-sm ml-auto "
            onClick={handelExpand}
          >
            <ChevronIcon className=" h-4 w-4 shrink-0 text-sea-green-50 " />
          </div>
        )}
      </div>
      <div
        className={cn(
          "transition-all ease-in-out duration-300",
          !expanded ? "h-0" : childeHeight
        )}
      >
        {childData.length > 0 &&
          childData.map((menu: any) => {
            return (
              <MenuItem
                key={menu.label}
                onClick={() => {
                  router.push(menu.url);
                }}
                label={menu.label}
                icon={menu.icon ?? LifeBuoy}
                child={menu.child}
                level={1}
                active={pathname === menu.url}
              />
            );
          })}
      </div>
    </>
  );
};

export default MenuItem;

MenuItem.Skeleton = function ItemSeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
