import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import ClassTypeSection from "@/components/ClassTypeSection";
import AdmissionInfo from "@/components/AdmissionInfo";
import RegistrationForm from "@/components/RegistrationForm";
import Confirmation from "@/components/Confirmation";
import StoryboardProgress from "@/components/StoryboardProgress";
import type { FormData } from "@/components/RegistrationForm";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [registrationId] = useState(() => `UT-2026-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = useCallback((id: string) => {
    if (id === "home" && submitted) {
      setSubmitted(false);
      setFormData(null);
    }
    setActiveSection(id);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [submitted]);

  const handleProgramSelect = (name: string) => {
    setSelectedProgram(name);
    // Auto-advance to class type
    setTimeout(() => scrollTo("class-type"), 600);
  };

  const handleClassTypeSelect = (type: string) => {
    setSelectedType(type);
    // Auto-advance to registration
    setTimeout(() => scrollTo("register"), 600);
  };

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted && formData) {
    return (
      <>
        <Navbar activeSection="register" onNavigate={scrollTo} />
        <div className="pt-16">
          <Confirmation data={formData} registrationId={registrationId} onReset={() => scrollTo("home")} />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={scrollTo} />
      <StoryboardProgress activeSection={activeSection} />
      <div className="pt-16">
        <div ref={(el) => { sectionRefs.current["home"] = el; }}>
          <HeroSection onNavigate={scrollTo} />
        </div>
        <div ref={(el) => { sectionRefs.current["admission"] = el; }}>
          <AdmissionInfo acknowledged={acknowledged} onAcknowledge={() => setAcknowledged(true)} />
        </div>
        <div ref={(el) => { sectionRefs.current["programs"] = el; }}>
          <ProgramsSection selectedProgram={selectedProgram} onSelect={handleProgramSelect} />
        </div>
        <div ref={(el) => { sectionRefs.current["class-type"] = el; }}>
          <ClassTypeSection selectedType={selectedType} onSelect={handleClassTypeSelect} />
        </div>
        <div ref={(el) => { sectionRefs.current["register"] = el; }}>
          <RegistrationForm selectedProgram={selectedProgram} selectedType={selectedType} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Index;
