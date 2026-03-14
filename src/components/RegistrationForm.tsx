import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, User, Mail, Phone, Calendar, School, GraduationCap } from "lucide-react";

interface RegistrationFormProps {
  selectedProgram: string;
  selectedType: string;
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  highSchool: string;
  graduationYear: string;
  program: string;
  classType: string;
}

const RegistrationForm = ({ selectedProgram, selectedType, onSubmit }: RegistrationFormProps) => {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    highSchool: "",
    graduationYear: "",
    program: selectedProgram,
    classType: selectedType,
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ idCard: boolean; certificate: boolean }>({
    idCard: false,
    certificate: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filledFields = Object.values(form).filter(Boolean).length + Object.values(uploadedFiles).filter(Boolean).length;
  const totalFields = 10;
  const progress = Math.round((filledFields / totalFields) * 100);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.dob) errs.dob = "Required";
    if (!form.highSchool.trim()) errs.highSchool = "Required";
    if (!form.graduationYear.trim()) errs.graduationYear = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    onSubmit({ ...form, program: selectedProgram || form.program, classType: selectedType || form.classType });
  };

  const inputClass = (key: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl text-sm bg-muted border-0 transition-all duration-200 outline-none focus:bg-card focus:ring-2 focus:ring-primary font-body ${
      errors[key] ? "ring-2 ring-destructive" : ""
    }`;

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Online Registration
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Fill in your details to complete registration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Form Progress</span>
              <span className="tabular-nums">{progress}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-[20px] shadow-card p-8">
            {/* Personal */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5 flex items-center gap-2">
              <User size={16} className="text-primary" /> Personal Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <input className={inputClass("fullName")} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" />
                {errors.fullName && <span className="text-xs text-destructive mt-1">{errors.fullName}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Mail size={12} /> Email</label>
                <input type="email" className={inputClass("email")} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" />
                {errors.email && <span className="text-xs text-destructive mt-1">{errors.email}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Phone size={12} /> Phone</label>
                <input className={inputClass("phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+62 xxx xxxx xxxx" />
                {errors.phone && <span className="text-xs text-destructive mt-1">{errors.phone}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Calendar size={12} /> Date of Birth</label>
                <input type="date" className={inputClass("dob")} value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                {errors.dob && <span className="text-xs text-destructive mt-1">{errors.dob}</span>}
              </div>
            </div>

            {/* Education */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5 flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> Education Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><School size={12} /> High School Name</label>
                <input className={inputClass("highSchool")} value={form.highSchool} onChange={(e) => update("highSchool", e.target.value)} placeholder="SMA Negeri 1 Jakarta" />
                {errors.highSchool && <span className="text-xs text-destructive mt-1">{errors.highSchool}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Graduation Year</label>
                <input className={inputClass("graduationYear")} value={form.graduationYear} onChange={(e) => update("graduationYear", e.target.value)} placeholder="2026" />
                {errors.graduationYear && <span className="text-xs text-destructive mt-1">{errors.graduationYear}</span>}
              </div>
            </div>

            {/* Program info */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5">Program Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="px-4 py-3 rounded-xl bg-accent text-sm text-accent-foreground">
                <span className="text-xs text-muted-foreground block mb-0.5">Study Program</span>
                {selectedProgram || "Not selected yet"}
              </div>
              <div className="px-4 py-3 rounded-xl bg-accent text-sm text-accent-foreground">
                <span className="text-xs text-muted-foreground block mb-0.5">Class Type</span>
                {selectedType || "Not selected yet"}
              </div>
            </div>

            {/* Upload */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5 flex items-center gap-2">
              <Upload size={16} className="text-primary" /> Upload Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {([["idCard", "ID Card (KTP)"], ["certificate", "Graduation Certificate"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setUploadedFiles((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-dashed transition-all duration-200 text-sm ${
                    uploadedFiles[key]
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-muted text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Upload size={18} />
                  <span>{uploadedFiles[key] ? `✓ ${label} uploaded` : `Upload ${label}`}</span>
                </button>
              ))}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold text-base shadow-card hover:shadow-card-hover transition-all duration-200 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
