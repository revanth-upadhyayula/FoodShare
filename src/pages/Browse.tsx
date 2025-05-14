import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { SearchIcon, FilterIcon } from "lucide-react";

export default function Browse() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [postTypeFilter, setPostTypeFilter] = useState<string>("all");
  const [distance, setDistance] = useState<number[]>([5]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from("posts")
          .select("*, profiles(name, rating)")
          .order("created_at", { ascending: false });
          
        if (error) {
          console.error("Error fetching posts:", error);
          throw error;
        }

        // Transform the data to match the PostCard component expectations
        const transformedPosts = data.map(post => {
          // Calculate mock distance (in a real app, would use geolocation)
          const randomDistance = (Math.random() * 5).toFixed(1);
          
          return {
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
            userRating: post.profiles?.rating || 4.5,
            distanceText: `${randomDistance} miles away`
          };
        });
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
        toast({
          title: "Error loading posts",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [toast]);
  
  // Handle claim post functionality
  const handleClaimPost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to claim posts",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // First, check if the post exists and is available
      const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();
      
      if (fetchError || !post) {
        throw new Error("Post not found or no longer available");
      }
      
      if (post.status !== "active") {
        throw new Error("This post has already been claimed");
      }
      
      // Create a claim record
      const { error: claimError } = await supabase
        .from("claims")
        .insert({
          post_id: postId,
          owner_id: user.id,
          status: "pending"
        });
      
      if (claimError) {
        throw claimError;
      }
      
      // Update post status to "claimed"
      const { error: updateError } = await supabase
        .from("posts")
        .update({ status: "claimed" })
        .eq("id", postId);
      
      if (updateError) {
        throw updateError;
      }
      
      toast({
        title: "Post claimed!",
        description: "The post owner has been notified of your interest."
      });
      
      // Update the local state to reflect the change
      setPosts(posts.map(p => 
        p.id === postId ? { ...p, status: "claimed" } : p
      ));
      
    } catch (error: any) {
      console.error("Error claiming post:", error);
      toast({
        title: "Failed to claim post",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  };
  
  const filteredPosts = posts.filter((post) => {
    // Search term filter
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Post type filter
    const matchesType = postTypeFilter === "all" || post.type === postTypeFilter;
    
    // Distance filter
    const postDistance = parseFloat(post.distanceText?.split(" ")[0] || "0");
    const matchesDistance = postDistance <= distance[0];
    
    return matchesSearch && matchesType && matchesDistance;
  });
  
  return (
    <Layout>
      <section className="py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Available Posts</h1>
            <p className="text-muted-foreground">
              Find food donations and requests in your community
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full"
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="post-type" className="mb-2 block">Post Type</Label>
                  <Select 
                    value={postTypeFilter} 
                    onValueChange={setPostTypeFilter}
                  >
                    <SelectTrigger id="post-type">
                      <SelectValue placeholder="Select post type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Posts</SelectItem>
                        <SelectItem value="donate">Donations</SelectItem>
                        <SelectItem value="request">Requests</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Distance (miles)</Label>
                  <div className="pt-4 px-2">
                    <Slider
                      defaultValue={[5]}
                      max={10}
                      step={0.5}
                      value={distance}
                      onValueChange={setDistance}
                    />
                    <div className="mt-2 text-sm text-muted-foreground text-center">
                      {distance[0]} miles
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setPostTypeFilter("all");
                      setDistance([5]);
                    }}
                    variant="ghost"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="h-4 w-1/3 bg-muted mb-2 rounded animate-pulse"></div>
                  <div className="h-6 bg-muted mb-3 rounded animate-pulse"></div>
                  <div className="h-20 bg-muted mb-4 rounded animate-pulse"></div>
                  <div className="h-8 bg-muted rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onClaim={() => handleClaimPost(post.id)} 
                  isOwner={user?.id === post.userId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search filters or create a new post
              </p>
              <Link to="/create">
                <Button>Create New Post</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
