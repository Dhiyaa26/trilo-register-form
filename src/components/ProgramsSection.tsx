import { motion } from "framer-motion";
import { Monitor, Database, BarChart3, Calculator, MessageSquare, Settings } from "lucide-react";

const programs = [
  { name: "Informatics Engineering", desc: "Build the future with software engineering, AI, and data systems.", icon: Monitor, accreditation: "A" },
  { name: "Information Systems", desc: "Bridge technology and business with enterprise system design.", icon: Database, accreditation: "A" },
  { name: "Management", desc: "Lead organizations with strategic thinking and modern management.", icon: BarChart3, accreditation: "A" },
  { name: "Accounting", desc: "Master financial analysis, auditing, and corporate finance.", icon: Calculator, accreditation: "A" },
  { name: "Communication Science", desc: "Shape narratives through media, PR, and digital communication.", icon: MessageSquare, accreditation: "B" },
  { name: "Industrial Engineering", desc: "Optimize systems and processes for manufacturing excellence.", icon: Settings, accreditation: "A" },
];

interface ProgramsSectionProps {
  selectedProgram: string;
  onSelect: (name: string) => void;
}

const ProgramsSection = ({ selectedProgram, onSelect }: ProgramsSectionProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore Study Programs
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select your program of interest. Each program is designed to prepare you for a successful career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, i) => {
            const Icon = program.icon;
            const isSelected = selectedProgram === program.name;
            return (
              <motion.button
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(program.name)}
                className={`relative text-left p-6 rounded-[20px] bg-card transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-primary shadow-card-hover"
                    : "shadow-card hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    isSelected ? "bg-primary" : "bg-accent"
                  }`}>
                    <Icon size={20} className={isSelected ? "text-primary-foreground" : "text-accent-foreground"} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-accent text-accent-foreground tabular-nums">
                    Akreditasi {program.accreditation}
                  </span>
                </div>
                <h3 className="text-base font-display font-semibold text-foreground mb-2">{program.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{program.desc}</p>
                {isSelected && (
                  <motion.div
                    layoutId="program-check"
                    className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
