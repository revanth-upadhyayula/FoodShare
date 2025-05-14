
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "FoodShare connected me with a local family who could use my extra garden produce. It feels great knowing my surplus veggies are helping others!",
    author: "Emma J.",
    role: "Community Gardener"
  },
  {
    quote: "As a small restaurant owner, I used to throw away unsold food. Now I can post it on FoodShare and know it's going to people who need it.",
    author: "David L.",
    role: "Restaurant Owner"
  },
  {
    quote: "When I was between jobs, FoodShare helped me access free groceries from generous neighbors. Now I'm in a position to give back!",
    author: "Sophia T.",
    role: "Teacher"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our members about their experiences with FoodShare
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-primary text-4xl font-serif mb-4">"</div>
                <p className="mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
