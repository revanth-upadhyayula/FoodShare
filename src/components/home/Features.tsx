
import { 
  HeartIcon, 
  MapPinIcon, 
  CalendarClockIcon, 
  StarIcon 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="bg-card p-6 rounded-lg">
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Share Food, Build Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            FoodShare makes it easy to connect with neighbors and share resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            icon={<HeartIcon className="h-6 w-6 text-primary" />}
            title="Donate Surplus"
            description="Share extra food with neighbors instead of throwing it away"
          />
          
          <Feature
            icon={<MapPinIcon className="h-6 w-6 text-primary" />}
            title="Local Connections"
            description="Find food resources and requests in your neighborhood"
          />
          
          <Feature
            icon={<CalendarClockIcon className="h-6 w-6 text-primary" />}
            title="Real-time Updates"
            description="Track status changes with a simple timeline view"
          />
          
          <Feature
            icon={<StarIcon className="h-6 w-6 text-primary" />}
            title="Community Trust"
            description="Build reputation through positive interactions"
          />
        </div>
      </div>
    </section>
  );
}
