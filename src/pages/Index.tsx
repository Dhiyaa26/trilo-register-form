import { useState, useRef, useCallback, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import ClassTypeSection from "@/components/ClassTypeSection";
import AdmissionInfo from "@/components/AdmissionInfo";
import RegistrationForm from "@/components/RegistrationForm";
import Confirmation from "@/components/Confirmation";
import StoryboardProgress from "@/components/StoryboardProgress";
import type { FormData } from "@/components/RegistrationForm";
import welcomeSound from "@/assets/sound/welcome_sound.mp3";

const sectionOrder = ["home", "admission", "programs", "class-type", "register"] as const;

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [registrationId] = useState(() => `UT-2026-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = useCallback((id: string) => {
    if (id === "home" && submitted) {
      setSubmitted(false);
      setFormData(null);
    }
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, [submitted]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      container.scrollBy({ left: event.deltaY, behavior: "smooth" });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionId = (entry.target as HTMLDivElement).dataset.sectionId;
          if (sectionId) {
            setActiveSection(sectionId);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    sectionOrder.forEach((id) => {
      const section = sectionRefs.current[id];
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = new Audio(welcomeSound);
    audio.preload = "auto";

    const unlockPlayback = () => {
      void audio.play().catch(() => undefined);
    };

    void audio.play().catch(() => {
      window.addEventListener("pointerdown", unlockPlayback, { once: true });
      window.addEventListener("keydown", unlockPlayback, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", unlockPlayback);
      window.removeEventListener("keydown", unlockPlayback);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

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
        <StoryboardProgress activeSection="register" onNavigate={scrollTo} />
        <div className="pt-24">
          <Confirmation data={formData} registrationId={registrationId} onReset={() => scrollTo("home")} />
        </div>
      </>
    );
  }

  return (
    <>
      <StoryboardProgress activeSection={activeSection} onNavigate={scrollTo} />
      <div ref={scrollContainerRef} className="h-screen overflow-x-auto overflow-y-hidden pt-24 snap-x snap-mandatory scroll-smooth">
        <div className="flex w-max h-[calc(100vh-6rem)]">
          <div data-section-id="home" className="w-screen h-full shrink-0 snap-start overflow-y-auto" ref={(el) => { sectionRefs.current["home"] = el; }}>
            <HeroSection onNavigate={scrollTo} />
          </div>
          <div data-section-id="admission" className="w-screen h-full shrink-0 snap-start overflow-y-auto" ref={(el) => { sectionRefs.current["admission"] = el; }}>
            <AdmissionInfo acknowledged={acknowledged} onAcknowledge={() => setAcknowledged(true)} />
          </div>
          <div data-section-id="programs" className="w-screen h-full shrink-0 snap-start overflow-y-auto" ref={(el) => { sectionRefs.current["programs"] = el; }}>
            <ProgramsSection selectedProgram={selectedProgram} onSelect={handleProgramSelect} />
          </div>
          <div data-section-id="class-type" className="w-screen h-full shrink-0 snap-start overflow-y-auto" ref={(el) => { sectionRefs.current["class-type"] = el; }}>
            <ClassTypeSection selectedType={selectedType} onSelect={handleClassTypeSelect} />
          </div>
          <div data-section-id="register" className="w-screen h-full shrink-0 snap-start overflow-y-auto" ref={(el) => { sectionRefs.current["register"] = el; }}>
            <RegistrationForm selectedProgram={selectedProgram} selectedType={selectedType} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
