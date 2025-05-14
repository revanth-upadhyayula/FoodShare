import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "@/components/post/PostCard";
import { LogOutIcon, PlusIcon, StarIcon } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [userStats, setUserStats] = useState({
    donationsMade: 0,
    requestsFulfilled: 0,
    donationsReceived: 0,
    requestsMade: 0,
    averageRating: 0,
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Fetch user's posts
        const { data: posts, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false });
          
        if (postsError) {
          console.error("Error fetching posts:", postsError);
          throw postsError;
        }
        
        // Transform post data to match PostCard component's expected format
        const transformedPosts = posts.map(post => ({
          id: post.id,
          type: post.type,
          title: post.title,
          description: post.description,
          quantity: post.quantity,
          location: post.location,
          expiryDate: post.expiry_date,
          createdAt: post.created_at,
          status: post.status,
          userId: post.owner_id,
          userName: user.email?.split('@')[0] || "User",
          userRating: 4.5, // Placeholder
          distanceText: "Your post" // Placeholder
        }));
        
        setUserPosts(transformedPosts);
        
        // Fetch donations made
        const { count: donationsMade, error: donationsError } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('owner_id', user.id)
          .eq('type', 'DONATE');

        if (donationsError) throw donationsError;

        // Fetch requests made
        const { count: requestsMade, error: requestsError } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('owner_id', user.id)
          .eq('type', 'REQUEST');

        if (requestsError) throw requestsError;
        
        setUserStats({
          donationsMade: donationsMade || 0,
          requestsFulfilled: 0, // Placeholder
          donationsReceived: 0, // Placeholder
          requestsMade: requestsMade || 0,
          averageRating: 4.5, // Placeholder
        });
        
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
          <p className="mb-8 text-muted-foreground">Please log in to view your profile</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* User info sidebar */}
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl">
                      {user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.email?.split('@')[0]}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  
                  <div className="flex justify-center mt-2">
                    <Badge variant="secondary" className="flex gap-1 items-center">
                      <StarIcon className="h-3 w-3" />
                      {userStats.averageRating} Rating
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{userStats.donationsMade}</div>
                      <div className="text-sm text-muted-foreground">Donations Made</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{userStats.requestsFulfilled}</div>
                      <div className="text-sm text-muted-foreground">Requests Fulfilled</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{userStats.donationsReceived}</div>
                      <div className="text-sm text-muted-foreground">Donations Received</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{userStats.requestsMade}</div>
                      <div className="text-sm text-muted-foreground">Requests Made</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/create">
                      <Button className="w-full">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        New Post
                      </Button>
                    </Link>
                    
                    <Button variant="outline" className="w-full" onClick={() => signOut()}>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Content area */}
            <div className="md:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="posts">My Posts</TabsTrigger>
                  <TabsTrigger value="claimed">Claimed Items</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="posts">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">My Posts</h2>
                      <Link to="/create">
                        <Button variant="outline" size="sm">
                          <PlusIcon className="mr-2 h-4 w-4" />
                          New Post
                        </Button>
                      </Link>
                    </div>
                    
                    {isLoading ? (
                      <div className="space-y-6">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                      </div>
                    ) : userPosts.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6">
                        {userPosts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border rounded-lg bg-muted/20">
                        <p className="text-muted-foreground mb-4">You haven't created any posts yet</p>
                        <Link to="/create">
                          <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create Your First Post
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="claimed">
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground mb-4">You haven't claimed any items yet</p>
                    <Link to="/browse">
                      <Button>
                        Browse Available Posts
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground mb-4">No activity history yet</p>
                    <p className="text-sm text-muted-foreground">
                      When you complete donations or requests, they'll appear here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
