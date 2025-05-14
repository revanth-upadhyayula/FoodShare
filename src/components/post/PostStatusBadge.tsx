
import { cn } from "@/lib/utils";

type PostStatus = "active" | "claimed" | "pickedUp" | "completed" | "expired";
type PostType = "donate" | "request";

interface PostStatusBadgeProps {
  status: PostStatus;
  type: PostType;
  className?: string;
}

export default function PostStatusBadge({ status, type, className }: PostStatusBadgeProps) {
  const getStatusLabel = () => {
    switch (status) {
      case "active":
        return type === "donate" ? "Available" : "Requested";
      case "claimed":
        return "Claimed";
      case "pickedUp":
        return "Picked Up";
      case "completed":
        return "Completed";
      case "expired":
        return "Expired";
      default:
        return "";
    }
  };

  const getBadgeClass = () => {
    if (status === "active") {
      return type === "donate" 
        ? "foodshare-badge-donate" 
        : "foodshare-badge-request";
    } else if (status === "claimed") {
      return "foodshare-badge-claimed";
    } else if (status === "completed" || status === "pickedUp") {
      return "foodshare-badge-completed";
    } else if (status === "expired") {
      return "foodshare-badge-expired";
    }
    return "";
  };

  return (
    <span className={cn("foodshare-badge", getBadgeClass(), className)}>
      {getStatusLabel()}
    </span>
  );
}
