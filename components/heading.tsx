import useMenuCollaps from "@/hooks/useMenuCollaps";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  const menuCollaps = useMenuCollaps();

  return (
    <div>
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight",
          menuCollaps.isCollapsed ? "" : "pl-8"
        )}
      >
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
