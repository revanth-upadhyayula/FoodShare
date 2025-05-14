
import { CheckIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create an Account",
      description: "Sign up with your email to join the FoodShare community.",
      icon: CheckIcon,
    },
    {
      title: "Post Food Donations",
      description: "Have extra food? Create a post with details like quantity, pickup location, and expiry date.",
      icon: CheckIcon,
    },
    {
      title: "Browse Available Food",
      description: "Look through listings of available food donations in your area.",
      icon: CheckIcon,
    },
    {
      title: "Make Food Requests",
      description: "Need food? Create a request specifying what you're looking for.",
      icon: CheckIcon,
    },
    {
      title: "Claim & Pickup",
      description: "Claim food donations that interest you and arrange pickup with the donor.",
      icon: CheckIcon,
    },
    {
      title: "Rate & Review",
      description: "After completing a donation or request, rate your experience to help build community trust.",
      icon: CheckIcon,
    },
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How FoodShare Works</h1>
            <p className="text-xl text-muted-foreground">
              Our platform connects food donors with those in need, making it easy to share and reduce waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 border rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Is FoodShare completely free to use?</h3>
                <p className="text-muted-foreground">Yes, FoodShare is 100% free for both food donors and recipients. Our platform aims to reduce food waste and help those in need.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How do I know the food is safe?</h3>
                <p className="text-muted-foreground">Donors provide expiry dates and details about the food condition. We encourage users to use good judgment and inspect food before consumption.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Can I donate prepared meals?</h3>
                <p className="text-muted-foreground">Yes, but please provide accurate information about ingredients, preparation date, and storage conditions.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How is pickup arranged?</h3>
                <p className="text-muted-foreground">Once you claim a food item, you'll be able to contact the donor to arrange a convenient pickup time and location.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
