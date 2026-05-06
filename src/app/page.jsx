// src/app/(public)/page.jsx

import CategorySection from "@/components/Home page/CategorySection";
import CTASection from "@/components/Home page/CTASection";
import FeaturedCourses from "@/components/Home page/FeaturedCourses";
import HeroSection from "@/components/Home page/HeroSection";
import WhyUsSection from "@/components/Home page/WhyUsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <HeroSection />
      <CategorySection />
      <FeaturedCourses />
      <WhyUsSection />
      <CTASection />
    </div>
  )
}