import CourseHero from "@/components/CourseHero";
import Overview from "@/components/Overview";
import Curriculum from "@/components/Curriculum";

export default function CoursePage() {
  return (
    <main className="bg-[#050b2c] text-white min-h-screen">
      <CourseHero />
      <Overview />
      <Curriculum />
    </main>
  );
}