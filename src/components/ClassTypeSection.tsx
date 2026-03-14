import { motion } from "framer-motion";
import { Sun, Briefcase } from "lucide-react";

const classTypes = [
  {
    id: "Reguler",
    title: "Reguler Class",
    subtitle: "Full-time Academic",
    desc: "Full-time program designed for high school graduates. Attend classes during weekdays with comprehensive academic support and campus activities.",
    icon: Sun,
    features: ["Weekday schedule", "Full campus access", "Student organizations", "Research opportunities"],
  },
  {
    id: "Karyawan",
    title: "Karyawan Class",
    subtitle: "Professional Flex",
    desc: "Evening and weekend classes tailored for working professionals. Balance your career growth with academic advancement.",
    icon: Briefcase,
    features: ["Evening & weekend", "Flexible schedule", "Industry networking", "Career mentoring"],
  },
];

interface ClassTypeSectionProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const ClassTypeSection = ({ selectedType, onSelect }: ClassTypeSectionProps) => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Choose Your Class Type
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select the class format that best fits your lifestyle and learning goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {classTypes.map((ct, i) => {
            const Icon = ct.icon;
            const isSelected = selectedType === ct.id;
            return (
              <motion.button
                key={ct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(ct.id)}
                className={`text-left p-8 rounded-[20px] bg-card transition-all duration-200 ${
                  isSelected ? "ring-2 ring-primary shadow-card-hover" : "shadow-card hover:shadow-card-hover"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-200 ${
                  isSelected ? "bg-primary" : "bg-accent"
                }`}>
                  <Icon size={24} className={isSelected ? "text-primary-foreground" : "text-accent-foreground"} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">{ct.title}</h3>
                <p className="text-sm font-medium text-primary mb-3">{ct.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{ct.desc}</p>
                <ul className="space-y-2">
                  {ct.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClassTypeSection;
