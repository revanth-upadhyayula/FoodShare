import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UsersIcon, HeartIcon, HandIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-70" />
      </div>
      <div className="w-full px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Share Food, <span className="text-primary">Build Community</span>
          </h1>
          <div className="flex justify-center gap-6 mb-6">
            <HeartIcon className="h-12 w-12 text-primary" />
            <UsersIcon className="h-12 w-12 text-accent" />
            <HandIcon className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Connect with neighbors to share surplus food, reduce waste, and help those in need. Join the community movement for a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="w-full sm:w-auto">
                Find Food Near You
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Share Your Food
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
