import { Link } from "react-router-dom";
import { format, formatDistance } from "date-fns";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PostStatusBadge from "./PostStatusBadge";

export interface PostData {
  id: string;
  type: "donate" | "request";
  title: string;
  description: string;
  quantity: string;
  location: string;
  expiryDate: string;
  createdAt: string;
  status: "active" | "claimed" | "completed" | "expired";
  userId: string;
  userName: string;
  userRating: number;
  distanceText?: string;
}

interface PostCardProps {
  post: PostData;
  onClaim?: () => void;
  isOwner?: boolean;
}

const PostCard = ({ post, onClaim, isOwner }: PostCardProps) => {
  const isExpiringSoon = () => {
    const expiry = new Date(post.expiryDate);
    const now = new Date();
    const diffInDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 2 && diffInDays >= 0;
  };
  
  const formattedDate = () => {
    try {
      return format(new Date(post.expiryDate), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };
  
  const timePosted = () => {
    try {
      return formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };
  
  const canClaim = post.type === "donate" && post.status === "active" && !isOwner;
  
  // Normalize type for UI logic
  const postType = post.type.toLowerCase();
  
  return (
    <Card 
      className={`overflow-hidden h-full flex flex-col border-2 
        ${postType === "donate" ? "border-green-500 bg-green-50" : "border-blue-500 bg-blue-50"}`}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-1">
          <Badge 
            variant={postType === "donate" ? "success" : "info"}
            className="uppercase text-xs font-semibold"
          >
            {postType === "donate" ? "DONATION" : "REQUEST"}
          </Badge>
          <PostStatusBadge status={post.status} type={post.type} />
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{post.title}</h3>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>Posted {timePosted()}</span>
          {post.distanceText && (
            <>
              <span className="mx-1">•</span>
              <span>{post.distanceText}</span>
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <p className="text-sm line-clamp-3 mb-4">{post.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span className={`${isExpiringSoon() ? "text-destructive font-medium" : ""}`}>
              {isExpiringSoon() ? "Expires soon! " : ""}
              {formattedDate()}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPinIcon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{post.location}</span>
          </div>
          
          <div className="flex items-center">
            <UserIcon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <Link 
              to={`/profile/${post.userId}`} 
              className="text-primary hover:underline"
            >
              {post.userName}
            </Link>
            <div className="flex items-center ml-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(post.userRating) 
                      ? "text-yellow-400" 
                      : i < post.userRating 
                      ? "text-yellow-200" 
                      : "text-gray-300"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              ))}
              <span className="ml-1 text-xs text-muted-foreground">{post.userRating}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        {isOwner ? (
          <Button variant="outline" className="w-full" disabled>
            Your Post
          </Button>
        ) : canClaim ? (
          <Button 
            className="w-full" 
            onClick={onClaim}
          >
            Claim This {post.type === "donate" ? "Donation" : "Request"}
          </Button>
        ) : post.status === "claimed" ? (
          <Button variant="outline" className="w-full" disabled>
            Already Claimed
          </Button>
        ) : post.status === "completed" ? (
          <Button variant="outline" className="w-full" disabled>
            Completed
          </Button>
        ) : post.status === "expired" ? (
          <Button variant="outline" className="w-full" disabled>
            Expired
          </Button>
        ) : post.type === "request" ? (
          <Link to={`/chat/${post.userId}`} className="w-full">
            <Button className="w-full">
              Respond to Request
            </Button>
          </Link>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Not Available
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
