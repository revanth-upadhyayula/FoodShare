import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostCard, { PostData } from "../post/PostCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RecentPosts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(name)")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) {
        setIsLoading(false);
        return;
      }
      const mapped = data.map((post: any) => ({
        id: post.id,
        type: post.type?.toLowerCase() || "donate",
        title: post.title,
        description: post.description,
        quantity: post.quantity,
        location: post.location,
        expiryDate: post.expiry_date,
        createdAt: post.created_at,
        status: post.status?.toLowerCase() || "active",
        userId: post.owner_id,
        userName: post.profiles?.name || "User",
        userRating: 4.5, // Placeholder, update if you have ratings
        distanceText: "Nearby" // Placeholder, update if you have distance
      }));
      setPosts(mapped);
      setIsLoading(false);
    };
    fetchRecentPosts();
  }, []);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Recent Community Activity</h2>
            <p className="text-muted-foreground">See what's happening in your area</p>
          </div>
          <Link to="/browse">
            <Button variant="outline">View All Posts</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[200px] bg-muted rounded-lg animate-pulse" />
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="col-span-full text-center text-muted-foreground">No recent posts found.</div>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link to="/create">
            <Button size="lg">Create Your Post</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
