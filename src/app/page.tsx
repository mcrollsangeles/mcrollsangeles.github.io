import { EducationSection } from "@/components/education-section";
import { ProfileSection } from "@/components/profile-section";
import { TechToolsSection } from "@/components/tech-tools-section";
import { getTechGroups } from "@/lib/data";

export default function Home() {
  const groups = getTechGroups();

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <ProfileSection />
      <TechToolsSection groups={groups} />
      <EducationSection />
    </div>
  );
}
