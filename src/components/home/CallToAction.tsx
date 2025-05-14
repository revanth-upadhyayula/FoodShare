
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  HeartIcon, 
  HandIcon 
} from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Join our community and start sharing food with neighbors in need or offer your surplus food to reduce waste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/create">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <HeartIcon className="h-5 w-5" />
                  <span>Donate Food</span>
                </Button>
              </Link>
              
              <Link to="/create">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  <HandIcon className="h-5 w-5" />
                  <span>Request Food</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-sm font-medium">1</span>
                    <span>Post food donations or requests</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-sm font-medium">2</span>
                    <span>Connect with neighbors nearby</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-sm font-medium">3</span>
                    <span>Arrange pickup/delivery</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-sm font-medium">4</span>
                    <span>Share feedback to build community trust</span>
                  </li>
                </ol>
              </div>
              
              <div className="flex justify-center">
                <Link to="/how-it-works">
                  <Button variant="link">Learn more about FoodShare</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
