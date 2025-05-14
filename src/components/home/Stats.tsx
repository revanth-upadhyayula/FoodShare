
import { 
  HeartIcon, 
  UsersIcon, 
  AlertCircleIcon, 
  CheckIcon 
} from "lucide-react";

export default function Stats() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Making a Difference Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our community is growing and helping reduce food waste while supporting those in need
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <HeartIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">2,500+</div>
            <div className="text-muted-foreground">Successful Donations</div>
          </div>
          
          <div className="bg-card p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UsersIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">1,200</div>
            <div className="text-muted-foreground">Active Members</div>
          </div>
          
          <div className="bg-card p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircleIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">4,800 lbs</div>
            <div className="text-muted-foreground">Food Saved</div>
          </div>
          
          <div className="bg-card p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-muted-foreground">Positive Feedback</div>
          </div>
        </div>
      </div>
    </section>
  );
}
