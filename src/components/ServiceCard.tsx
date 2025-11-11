import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
}

const ServiceCard = ({ icon: Icon, title, description, color, onClick }: ServiceCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
        "border-2 hover:border-primary/20"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl", color)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
