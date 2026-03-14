import { motion } from "framer-motion";
import { FileText, Upload, ClipboardCheck, Mail } from "lucide-react";

const steps = [
  { icon: FileText, title: "Siapkan Dokumen", desc: "KTP, ijazah SMA, transkrip nilai, dan pas foto terbaru." },
  { icon: Upload, title: "Kirim Pendaftaran", desc: "Isi formulir pendaftaran online dan unggah dokumen yang diperlukan." },
  { icon: ClipboardCheck, title: "Verifikasi", desc: "Tim admisi akan meninjau pendaftaran Anda dalam 5 hari kerja." },
  { icon: Mail, title: "Terima Konfirmasi", desc: "Dapatkan surat penerimaan dan instruksi selanjutnya melalui email." },
];

const requirements = [
  "Ijazah SMA atau sederajat",
  "Kartu Tanda Penduduk (KTP)",
  "Pas foto terbaru",
  "Transkrip nilai akademik",
  "Surat keterangan sehat",
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
            Proses Pendaftaran
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ikuti langkah-langkah berikut untuk menyelesaikan pendaftaran di Universitas Trilogi.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
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
                  <div className="text-xs font-semibold text-primary mb-1 tabular-nums">Langkah {i + 1}</div>
                  <h4 className="text-sm font-display font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-[20px] shadow-card p-8"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4">Dokumen yang Diperlukan</h3>
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
              {acknowledged ? "✓ Persyaratan Dipahami" : "Saya Memahami Persyaratan"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionInfo;
