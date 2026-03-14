import { motion } from "framer-motion";
import { FileText, Upload, ClipboardCheck, Mail } from "lucide-react";

const steps = [
  { icon: FileText, title: "Prepare Documents", desc: "ID card, high school diploma, transcript, and passport photos." },
  { icon: Upload, title: "Submit Application", desc: "Fill out the online registration form and upload your documents." },
  { icon: ClipboardCheck, title: "Verification", desc: "Our admissions team reviews your application within 5 business days." },
  { icon: Mail, title: "Receive Confirmation", desc: "Get your acceptance letter and enrollment instructions via email." },
];

const requirements = [
  "High school diploma or equivalent",
  "National ID card (KTP)",
  "Recent passport-sized photo",
  "Academic transcript",
  "Health certificate",
];

interface AdmissionInfoProps {
  acknowledged: boolean;
  onAcknowledge: () => void;
}

const AdmissionInfo = ({ acknowledged, onAcknowledge }: AdmissionInfoProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Admission Process
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Follow these steps to complete your enrollment at Universitas Trilogi.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-accent-foreground" />
                  </div>
                  <div className="text-xs font-semibold text-primary mb-1 tabular-nums">Step {i + 1}</div>
                  <h4 className="text-sm font-display font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-[20px] shadow-card p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Required Documents</h3>
            <ul className="space-y-3 mb-6">
              {requirements.map((req) => (
                <li key={req} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="hsl(217,85%,29%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {req}
                </li>
              ))}
            </ul>
            <button
              onClick={onAcknowledge}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                acknowledged
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
              }`}
            >
              {acknowledged ? "✓ Requirements Acknowledged" : "I Understand the Requirements"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionInfo;
