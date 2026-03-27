import { useRef, useState } from "react";
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
  photoDataUrl: string;
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
    photoDataUrl: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ idCard: boolean; certificate: boolean }>({
    idCard: false,
    certificate: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const filledFields = Object.values(form).filter(Boolean).length + Object.values(uploadedFiles).filter(Boolean).length;
  const totalFields = 11;
  const progress = Math.round((filledFields / totalFields) * 100);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Wajib diisi";
    if (!form.email.includes("@")) errs.email = "Email tidak valid";
    if (!form.phone.trim()) errs.phone = "Wajib diisi";
    if (!form.dob) errs.dob = "Wajib diisi";
    if (!form.highSchool.trim()) errs.highSchool = "Wajib diisi";
    if (!form.graduationYear.trim()) errs.graduationYear = "Wajib diisi";
     if (!form.photoDataUrl) errs.photoDataUrl = "Wajib diisi";
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

  const handlePhotoChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update("photoDataUrl", String(reader.result));
    };
    reader.readAsDataURL(file);
  };

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
            Formulir Pendaftaran Online
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Lengkapi data diri Anda untuk menyelesaikan pendaftaran.
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
              <span>Progres Formulir</span>
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
              <User size={16} className="text-primary" /> Data Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                <input className={inputClass("fullName")} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Masukkan nama lengkap" />
                {errors.fullName && <span className="text-xs text-destructive mt-1">{errors.fullName}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Mail size={12} /> Email</label>
                <input type="email" className={inputClass("email")} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@contoh.com" />
                {errors.email && <span className="text-xs text-destructive mt-1">{errors.email}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Phone size={12} /> Telepon</label>
                <input className={inputClass("phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+62 xxx xxxx xxxx" />
                {errors.phone && <span className="text-xs text-destructive mt-1">{errors.phone}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Calendar size={12} /> Tanggal Lahir</label>
                <input type="date" className={inputClass("dob")} value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                {errors.dob && <span className="text-xs text-destructive mt-1">{errors.dob}</span>}
              </div>
            </div>

            {/* Education */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5 flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> Riwayat Pendidikan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><School size={12} /> Nama Sekolah</label>
                <input className={inputClass("highSchool")} value={form.highSchool} onChange={(e) => update("highSchool", e.target.value)} placeholder="SMA Negeri 1 Jakarta" />
                {errors.highSchool && <span className="text-xs text-destructive mt-1">{errors.highSchool}</span>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tahun Lulus</label>
                <input className={inputClass("graduationYear")} value={form.graduationYear} onChange={(e) => update("graduationYear", e.target.value)} placeholder="2026" />
                {errors.graduationYear && <span className="text-xs text-destructive mt-1">{errors.graduationYear}</span>}
              </div>
            </div>

            {/* Program info */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5">Pilihan Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="px-4 py-3 rounded-xl bg-accent text-sm text-accent-foreground">
                <span className="text-xs text-muted-foreground block mb-0.5">Program Studi</span>
                {selectedProgram || "Belum dipilih"}
              </div>
              <div className="px-4 py-3 rounded-xl bg-accent text-sm text-accent-foreground">
                <span className="text-xs text-muted-foreground block mb-0.5">Tipe Kelas</span>
                {selectedType || "Belum dipilih"}
              </div>
            </div>

            {/* Upload */}
            <h3 className="text-base font-display font-semibold text-foreground mb-5 flex items-center gap-2">
              <Upload size={16} className="text-primary" /> Unggah Dokumen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div
                className={`flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-dashed transition-all duration-200 text-sm cursor-pointer ${
                  form.photoDataUrl ? "border-primary bg-accent text-accent-foreground" : "border-muted text-muted-foreground hover:border-primary/30"
                }`}
                onClick={() => photoInputRef.current?.click()}
              >
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
                />
                <Upload size={18} />
                <span>{form.photoDataUrl ? "✓ Foto terunggah" : "Unggah Foto"}</span>
                {form.photoDataUrl && (
                  <img src={form.photoDataUrl} alt="Foto pengguna" className="ml-auto w-10 h-10 rounded-lg object-cover" />
                )}
              </div>
              {([["idCard", "KTP"], ["certificate", "Ijazah"]] as const).map(([key, label]) => (
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
                  <span>{uploadedFiles[key] ? `✓ ${label} terunggah` : `Unggah ${label}`}</span>
                </button>
              ))}
            </div>
            {errors.photoDataUrl && <span className="text-xs text-destructive mt-1 block">Foto wajib diunggah</span>}

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
                  Mengirim...
                </span>
              ) : (
                "Kirim Pendaftaran"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
