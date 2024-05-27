import {
  Gauge,
  GraduationCap,
  LocateFixed,
  LucideGauge,
  LucideIcon,
  Package,
  School,
  School2,
  Users,
} from "lucide-react";

type MenuInterType = {
  label: string;
  url: string;
  icon?: LucideIcon;
  child?: MenuInterType[];
};
export const menuData: MenuInterType[] = [
  { label: "Dashboard", url: "/dashboard", icon: Gauge },
  { label: "Service", url: "/work-services", icon: School2 },
  { label: "Stock", url: "/stock", icon: Package },
  {
    label: "Master",
    url: "",
    icon: School2,
    child: [
      { label: "Students", url: "/students", icon: GraduationCap },
      { label: "Teacher", url: "/teachers", icon: Users },
      { label: "Classroom", url: "/classroom", icon: School },
      { label: "Trip", url: "/trip", icon: LocateFixed },
      { label: "Category", url: "/category", icon: Package },
      { label: "Product", url: "/product", icon: Package },
    ],
  },
];
