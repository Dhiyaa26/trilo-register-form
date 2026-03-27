import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { id: "home", label: "Beranda" },
  { id: "admission", label: "Info Pendaftaran" },
  { id: "programs", label: "Program Studi" },
  { id: "class-type", label: "Tipe Kelas" },
  { id: "register", label: "Formulir" },
];

interface StoryboardProgressProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const StoryboardProgress = ({ activeSection, onNavigate }: StoryboardProgressProps) => {
  const activeIndex = steps.findIndex((s) => s.id === activeSection);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button type="button" onClick={() => onNavigate(step.id)} className="flex flex-col items-center gap-1.5">
                  <motion.div
                    animate={{
                      backgroundColor: isCompleted
                        ? "hsl(var(--primary))"
                        : isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {isCompleted ? (
                      <Check size={16} className="text-primary-foreground" />
                    ) : (
                      <span className={isActive ? "text-primary-foreground" : "text-muted-foreground"}>
                        {i + 1}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap hidden sm:block ${
                      isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoryboardProgress;
