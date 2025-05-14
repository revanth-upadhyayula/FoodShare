import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RecentPosts from "@/components/home/RecentPosts";
import CallToAction from "@/components/home/CallToAction";
import Testimonials from "@/components/home/Testimonials";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <RecentPosts />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
