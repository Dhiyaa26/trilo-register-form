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
}

const StoryboardProgress = ({ activeSection }: StoryboardProgressProps) => {
  const activeIndex = steps.findIndex((s) => s.id === activeSection);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
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
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {isCompleted ? (
                      <Check size={14} className="text-primary-foreground" />
                    ) : (
                      <span className={isActive ? "text-primary-foreground" : "text-muted-foreground"}>
                        {i + 1}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium whitespace-nowrap hidden sm:block ${
                      isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 rounded-full bg-muted overflow-hidden">
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
