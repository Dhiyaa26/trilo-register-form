import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import type { FormData } from "./RegistrationForm";

interface ConfirmationProps {
  data: FormData;
  registrationId: string;
  onReset: () => void;
}

const Confirmation = ({ data, registrationId, onReset }: ConfirmationProps) => {
  return (
    <section className="py-24 bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-primary" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            Registration Successfully Submitted
          </h2>
          <p className="text-muted-foreground mb-10">
            Your application has been received. Please check your email for further instructions.
          </p>

          {/* Receipt */}
          <div className="bg-card rounded-[20px] shadow-card p-6 text-left border-2 border-dashed border-border mb-8">
            <div className="text-xs font-semibold text-primary mb-4 uppercase tracking-wider">Digital Receipt</div>
            <div className="space-y-3">
              {[
                ["Registration ID", registrationId],
                ["Full Name", data.fullName],
                ["Email", data.email],
                ["Study Program", data.program],
                ["Class Type", data.classType],
                ["Submitted", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-accent rounded-[16px] p-5 text-left mb-8">
            <h4 className="text-sm font-display font-semibold text-foreground mb-2">Next Steps</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Wait for verification (3–5 business days)</li>
              <li>• Check your email for acceptance letter</li>
              <li>• Complete tuition payment upon acceptance</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 bg-card text-foreground hover:-translate-y-0.5">
              <Download size={16} /> Download PDF Receipt
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Back to Home <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Confirmation;
